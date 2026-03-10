import path from 'path';
import * as fs from 'fs/promises';
import { logger } from '../../utils/logger';
import { withRetry } from '../../utils';
import { chromium, Page } from 'playwright-chromium';
import type { RawDepartment } from '../../types';

const CONCURRENCY = 8;

export async function ScrapeData(): Promise<RawDepartment[]> {
    // Launch a browser and get department list
    const browser = await chromium.launch({ headless: true });
    const scoutPage = await browser.newPage();
    const departments = await scrapeDepartmentTitles(scoutPage);
    await scoutPage.close();

    // Build a work queue of departments with their original indices
    const queue = [...departments.entries()];
    const catalog = new Map<number, RawDepartment>();

    logger.startTask(departments.length, 'Scraping Catalog');
    let completed = 0;

    // Worker function: each worker gets its own browser context and page
    async function worker() {
        const context = await browser.newContext();
        const page = await context.newPage();

        while (queue.length > 0) {
            const [deptIndex, department] = queue.shift()!;

            try {
                const courses = await withRetry(() =>
                    scrapeDepartmentCourses(page, department.departmentCode),
                );

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

                // Store result with original index to preserve ordering
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

    // Restore original department ordering, skip any departments that failed
    const orderedCatalog: RawDepartment[] = [];
    for (let i = 0; i < departments.length; i++) {
        const dept = catalog.get(i);
        if (dept) orderedCatalog.push(dept);
    }

    // Close the browser
    await browser.close();
    const outputPath = path.resolve(__dirname, '../../../data/data.json');
    await fs.writeFile(outputPath, JSON.stringify(orderedCatalog, null, 2), 'utf-8');

    logger.completeTask();

    // Return the catalog data
    return orderedCatalog;
}

/**
 * Function that scrapes all the department titles in the catalog.
 * Returns all the departments found.
 */
async function scrapeDepartmentTitles(page: Page) {
    // Get department titles
    await page.goto('https://courses.umb.edu/course_catalog/listing/ugrd', { timeout: 30000 });
    const titles = await page.locator('#content li').allTextContents();

    // Split department code and name
    const departments = titles.map((title) => {
        const [departmentCode, departmentName] = title.split('|').map((item) => item.trim());
        return { departmentCode, departmentName };
    });

    // Return departments
    return departments;
}

/**
 * Function that scrapes all courses and codes for a specific department.
 * Returns all the courses found in a department.
 */
async function scrapeDepartmentCourses(page: Page, department: string) {
    // Get all courses from the department
    await page.goto(`https://courses.umb.edu/course_catalog/courses/ugrd_${department}_all`, {
        timeout: 30000,
    });
    const titles = await page.locator('ul.showHideList li h4').allTextContents();

    // Get the code and name of the course
    const regex = /^([A-Z]+)\s+(\d+[A-Z]*)\s+(.+?)\s*\+?\s*$/;
    const courses = titles
        .map((title) => {
            const match = title.match(regex);
            if (!match) return null;
            return { courseCode: match[2], courseName: match[3] };
        })
        // Type guard to filter if match is null
        .filter(Boolean) as { courseCode: string; courseName: string }[];

    // Return courses
    return courses;
}

/**
 * Scrapes all sections for a course using a single page.evaluate() call.
 * Extracts description, semesters, and section data in one DOM traversal
 * to minimize protocol round-trips between Node and the browser.
 */
async function scrapeCourseSections(page: Page, departmentCode: string, courseCode: string) {
    // Navigate to the course page
    await page.goto(
        `https://courses.umb.edu/course_catalog/course_info/ugrd_${departmentCode}_all_${courseCode}`,
        { timeout: 30000 },
    );

    // Single evaluate extracts all data from the DOM at once
    return await page.evaluate(() => {
        // 1. Get the course description
        let description = '';
        for (const strong of document.querySelectorAll('p > strong')) {
            if (strong.textContent?.includes('Description')) {
                const paragraph = strong.closest('p') as HTMLElement | null;
                if (paragraph) {
                    description = paragraph.innerText
                        .replace(/^Description:\s*/i, '')
                        .replace(/\s+/g, ' ')
                        .trim();
                }
                break;
            }
        }

        // 2. Find the "Offered in:" heading
        let offeringH2: Element | null = null;
        for (const h2 of document.querySelectorAll('h2')) {
            if (h2.textContent?.includes('Offered in:')) {
                offeringH2 = h2;
                break;
            }
        }
        if (!offeringH2) return { description, semesters: [] as { semester: string; sections: { section: string; classNumber: string; days: string; time: string; instructor: string; location: string }[] }[] };

        // 3. Walk siblings — h3 tags are semester headers, tables hold section rows
        const semesters: { semester: string; sections: { section: string; classNumber: string; days: string; time: string; instructor: string; location: string }[] }[] = [];
        let sibling = offeringH2.nextElementSibling;
        let currentIdx = -1;

        while (sibling) {
            if (sibling.tagName === 'H3') {
                semesters.push({ semester: sibling.textContent?.trim() ?? '', sections: [] });
                currentIdx = semesters.length - 1;
            } else if (sibling.tagName === 'TABLE' && currentIdx >= 0) {
                // Extract all section rows from this semester's table
                for (const row of sibling.querySelectorAll('tbody > tr.class-info-rows')) {
                    const get = (label: string) =>
                        row.querySelector(`td[data-label="${label}"]`)?.textContent?.trim() ?? '';
                    const scheduleEl = row.querySelector('td[data-label="Schedule/Time"]') as HTMLElement | null;
                    const [days = '', time = ''] = (scheduleEl?.innerText ?? '').split('\n').map((s) => s.trim());

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
