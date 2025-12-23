import { chromium, Locator, Page } from 'playwright-chromium';
import * as fs from 'fs/promises';

export async function ScrapeData() {
    // Launch a browser and create a page
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // The complete data from the course catalog
    const catalog = [];

    // Get the department titles
    const departments = await scrapeDepartmentTitles(page);

    // Get all the courses for all departments
    for (const department of departments) {
        const courses = await scrapeDepartmentCourses(
            page,
            department.departmentCode
        );
        const courseData = [];

        // Getting the section data for each course
        for (const course of courses) {
            const semesters = await scrapeCourseSections(
                page,
                department.departmentCode,
                course.courseCode
            );
            courseData.push({
                courseCode: course.courseCode,
                courseName: course.courseName,
                semesters,
            });
        }

        // Adding the department info to the catalog
        catalog.push({
            departmentCode: department.departmentCode,
            departmentName: department.departmentName,
            courses: courseData,
        });
    }

    // Close the browser
    await browser.close();
    await fs.writeFile('data.json', JSON.stringify(catalog, null, 2), 'utf-8');

    // Return the catalog data
    return catalog;
}

/**
 * Function that scrapes all the department titles in the catalog.
 * Returns all the departments found.
 */
async function scrapeDepartmentTitles(page: Page) {
    // Get department titles
    await page.goto('https://courses.umb.edu/course_catalog/listing/ugrd');
    const titles = await page.locator('#content li').allTextContents();

    // Split department code and name
    const departments = titles.map((title) => {
        const [departmentCode, departmentName] = title
            .split('|')
            .map((item) => item.trim());
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
    await page.goto(
        `https://courses.umb.edu/course_catalog/courses/ugrd_${department}_all`
    );
    const titles = await page
        .locator('ul.showHideList li h4')
        .allTextContents();

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
 * Function that scrapes all sections for a course.
 * Returns all the sections found.
 */
async function scrapeCourseSections(
    page: Page,
    departmentCode: string,
    courseCode: string
) {
    // Go to the course page and scrape the sections
    await page.goto(
        `https://courses.umb.edu/course_catalog/course_info/ugrd_${departmentCode}_all_${courseCode}`
    );

    // Get all the semesters available
    const offering = page.locator('h2:has-text("Offered in:")').first();
    const semesters = offering.locator('xpath=following-sibling::h3');
    const semesterCount = await semesters.count();

    const allSemesters = [];
    for (let i = 0; i < semesterCount; i++) {
        const semester = semesters.nth(i);
        const semesterName = await getTrimmedText(semester);

        // Get the sections that are offered in a semester
        const sectionsLocator = semester.locator(
            'xpath=following-sibling::table[1]'
        );
        const semesterSections = sectionsLocator.locator(
            'tbody > tr.class-info-rows'
        );
        // Get all the sections using the locator
        const sectionCount = await semesterSections.count();
        const sections = [];

        // Get the course info for all sections
        for (let j = 0; j < sectionCount; j++) {
            const row = semesterSections.nth(j);
            const section = await scrapeSectionRows(row);
            sections.push(section);
        }
        allSemesters.push({
            semester: semesterName,
            sections,
        });
    }

    // Return info for all sections
    return allSemesters;
}

/**
 * Function that scrapes one section of a course.
 * Returns info of one section of a course.
 */
async function scrapeSectionRows(row: Locator) {
    // Cache all locators for each column in the current row
    const sectionInfo = {
        section: row.locator('td[data-label="Section"]'), // Section ID
        classNumber: row.locator('td[data-label="Class Number"]'), // Class identifier
        schedule: row.locator('td[data-label="Schedule/Time"]'), // Days and time info
        instructor: row.locator('td[data-label="Instructor"]'), // Instructor
        location: row.locator('td[data-label="Location"]'), // Location of the class
    };

    // Get all the section content
    const section = await getTrimmedText(sectionInfo.section);
    const classNumber = await getTrimmedText(sectionInfo.classNumber);

    // Seperate days and time for each section
    const [days, time] = (await sectionInfo.schedule.innerText())
        .split('\n')
        .map((dt) => dt.trim());
    const instructor = await getTrimmedText(sectionInfo.instructor);
    const location = await getTrimmedText(sectionInfo.location);

    // Return section info
    return { section, classNumber, days, time, instructor, location };
}

/**
 * Helper function to get the content from a locator.
 * Returns an empty string if no text content is found.
 */
async function getTrimmedText(locator: Locator): Promise<string> {
    return (await locator.textContent())?.trim() ?? '';
}
