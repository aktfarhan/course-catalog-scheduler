import path from 'path';
import { logger } from '../../utils/logger';
import { withRetry, writeJSONToFile } from '../../utils';
import { chromium, Page } from 'playwright-chromium';
import type { RawDepartment } from '../../types';

const CONCURRENCY = 8;
const BASE_URL = 'https://courses.umb.edu/course_catalog';
const OUTPUT_PATH = path.resolve(__dirname, '../../../data/data.json');

/**
 * Scrapes the entire UMB course catalog using parallel browser contexts.
 * Collects departments, courses, sections, and writes the result to data.json.
 *
 * @returns Array of raw department data with courses and sections.
 */
export async function scrapeData(): Promise<RawDepartment[]> {
    const browser = await chromium.launch({ headless: true });

    // Scout page to get all department codes and names
    const scoutPage = await browser.newPage();
    const departments = await scrapeDepartmentTitles(scoutPage);
    await scoutPage.close();

    // Build a work queue with original indices to preserve ordering
    const queue = [...departments.entries()];
    const catalog = new Map<number, RawDepartment>();

    logger.startTask(departments.length, 'Scraping Catalog');
    let completed = 0;

    // Each worker gets its own browser context and pulls departments from the shared queue
    async function worker() {
        const context = await browser.newContext();
        const page = await context.newPage();

        while (queue.length > 0) {
            const [deptIndex, department] = queue.shift()!;

            try {
                // Scrape course list for this department
                const courses = await withRetry(() =>
                    scrapeDepartmentCourses(page, department.departmentCode),
                );

                // Scrape sections and description for each course
                const courseData = [];
                for (const course of courses) {
                    const { description, semesters } = await withRetry(() =>
                        scrapeCourseSections(page, department.departmentCode, course.courseCode),
                    );
                    courseData.push({
                        courseCode: course.courseCode,
                        courseName: course.courseName,
                        description,
                        semesters,
                    });
                }

                // Store with original index to restore ordering later
                catalog.set(deptIndex, {
                    departmentCode: department.departmentCode,
                    departmentName: department.departmentName,
                    courses: courseData,
                });
            } catch (error) {
                console.error(`Failed to scrape department ${department.departmentCode}:`, error);
            }

            completed++;
            logger.updateTask(completed);
        }

        await context.close();
    }

    // Run workers in parallel
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
    await browser.close();

    // Restore original department ordering
    const orderedCatalog: RawDepartment[] = [];
    for (let i = 0; i < departments.length; i++) {
        const dept = catalog.get(i);
        if (dept) orderedCatalog.push(dept);
    }

    await writeJSONToFile(OUTPUT_PATH, orderedCatalog);
    logger.completeTask();

    return orderedCatalog;
}

/**
 * Scrapes all department codes and names from the catalog page.
 *
 * @param page - Playwright Page instance.
 * @returns Array of department codes and names.
 */
async function scrapeDepartmentTitles(page: Page) {
    await page.goto(`${BASE_URL}/listing/ugrd`, { timeout: 30000 });
    const titles = await page.locator('#content li').allTextContents();

    // Split department code and name
    const departments = titles.map((title) => {
        const [departmentCode, departmentName] = title.split('|').map((item) => item.trim());
        return { departmentCode, departmentName };
    });

    return departments;
}

/**
 * Scrapes all course codes and names for a specific department.
 *
 * @param page - Playwright Page instance.
 * @param department - Department code (e.g. "CS").
 * @returns Array of course codes and names.
 */
async function scrapeDepartmentCourses(page: Page, department: string) {
    await page.goto(`${BASE_URL}/courses/ugrd_${department}_all`, { timeout: 30000 });
    const titles = await page.locator('ul.showHideList li h4').allTextContents();

    const regex = /^([A-Z]+)\s+(\d+[A-Z]*)\s+(.+?)\s*\+?\s*$/;

    // Get the code and name of the course
    const courses = titles
        .map((title) => {
            const match = title.match(regex);
            if (!match) return null;
            return { courseCode: match[2], courseName: match[3] };
        })
        // Type guard to filter if match is null
        .filter(Boolean) as { courseCode: string; courseName: string }[];

    return courses;
}

/**
 * Scrapes all sections for a specific course.
 * Extracts the course description, semester headers, and section details
 * (section number, class number, days, time, instructor, location).
 *
 * @param page - Playwright Page instance.
 * @param departmentCode - Department code (e.g. "CS").
 * @param courseCode - Course code (e.g. "110").
 * @returns Object with description and array of semesters containing sections.
 */
async function scrapeCourseSections(page: Page, departmentCode: string, courseCode: string) {
    // Navigate to the course info page
    await page.goto(`${BASE_URL}/course_info/ugrd_${departmentCode}_all_${courseCode}`, {
        timeout: 30000,
    });

    // Extract all data from the DOM in one browser call
    return await page.evaluate(() => {
        type Section = {
            section: string;
            classNumber: string;
            days: string;
            time: string;
            instructor: string;
            location: string;
        };
        type Semester = { semester: string; sections: Section[] };

        // 1. Grab the course description from the <strong>Description</strong> paragraph
        let description = '';
        for (const strong of document.querySelectorAll('p > strong')) {
            if (strong.textContent?.includes('Description')) {
                const paragraph = strong.closest('p') as HTMLElement | null;
                if (paragraph) {
                    // Remove the "Description:" label and clean up extra whitespace
                    description = paragraph.innerText
                        .replace(/^Description:\s*/i, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                }
                break;
            }
        }

        // 2. Find the "Offered in:" heading — everything after it is semester data
        let offeringH2: Element | null = null;
        for (const h2 of document.querySelectorAll('h2')) {
            if (h2.textContent?.includes('Offered in:')) {
                offeringH2 = h2;
                break;
            }
        }
        // Some courses have no offerings listed
        if (!offeringH2) return { description, semesters: [] as Semester[] };

        // 3. Loop through elements after the heading to collect semesters and sections
        const semesters: Semester[] = [];
        let sibling = offeringH2.nextElementSibling;
        let currentIdx = -1;

        while (sibling) {
            if (sibling.tagName === 'H3') {
                // New semester found
                semesters.push({ semester: sibling.textContent?.trim() ?? '', sections: [] });
                currentIdx = semesters.length - 1;
            } else if (sibling.tagName === 'TABLE' && currentIdx >= 0) {
                // Each table row is a section for the current semester
                for (const row of sibling.querySelectorAll('tbody > tr.class-info-rows')) {
                    // Helper to grab cell text by its data-label
                    const get = (label: string) =>
                        row.querySelector(`td[data-label="${label}"]`)?.textContent?.trim() ?? '';

                    // Days and time are in the same cell, separated by a newline
                    const scheduleEl = row.querySelector(
                        'td[data-label="Schedule/Time"]',
                    ) as HTMLElement | null;
                    const [days = '', time = ''] = (scheduleEl?.innerText ?? '')
                        .split('\n')
                        .map((s) => s.trim());

                    semesters[currentIdx].sections.push({
                        section: get('Section'),
                        classNumber: get('Class Number'),
                        days,
                        time,
                        instructor: get('Instructor'),
                        location: get('Location'),
                    });
                }
            }
            sibling = sibling.nextElementSibling;
        }

        return { description, semesters };
    });
}
