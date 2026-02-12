"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapeData = ScrapeData;
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs/promises"));
const playwright_chromium_1 = require("playwright-chromium");
async function ScrapeData() {
    // Launch a browser and create a page
    const browser = await playwright_chromium_1.chromium.launch({ headless: true });
    const page = await browser.newPage();
    // The complete data from the course catalog
    const catalog = [];
    // Get the department titles
    const departments = await scrapeDepartmentTitles(page);
    console.log(`Found ${departments.length} departments.`);
    // Get all the courses for all departments
    for (const department of departments) {
        console.log(`Scraping department: ${department.departmentCode} - ${department.departmentName}`);
        const courses = await scrapeDepartmentCourses(page, department.departmentCode);
        console.log(`  Found ${courses.length} courses in ${department.departmentCode}.`);
        const courseData = [];
        // Getting the section data for each course
        for (const course of courses) {
            console.log(`    Scraping course: ${course.courseCode} - ${course.courseName}`);
            const { description, semesters } = await scrapeCourseSections(page, department.departmentCode, course.courseCode);
            courseData.push({
                courseCode: course.courseCode,
                courseName: course.courseName,
                description,
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
    const outputPath = path_1.default.resolve(__dirname, '../../../data/data.json');
    await fs.writeFile(outputPath, JSON.stringify(catalog, null, 2), 'utf-8');
    console.log('Scraping complete! Data saved to data.json');
    // Return the catalog data
    return catalog;
}
/**
 * Function that scrapes all the department titles in the catalog.
 * Returns all the departments found.
 */
async function scrapeDepartmentTitles(page) {
    // Get department titles
    await page.goto('https://courses.umb.edu/course_catalog/listing/ugrd');
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
async function scrapeDepartmentCourses(page, department) {
    // Get all courses from the department
    await page.goto(`https://courses.umb.edu/course_catalog/courses/ugrd_${department}_all`);
    const titles = await page.locator('ul.showHideList li h4').allTextContents();
    // Get the code and name of the course
    const regex = /^([A-Z]+)\s+(\d+[A-Z]*)\s+(.+?)\s*\+?\s*$/;
    const courses = titles
        .map((title) => {
        const match = title.match(regex);
        if (!match)
            return null;
        return { courseCode: match[2], courseName: match[3] };
    })
        // Type guard to filter if match is null
        .filter(Boolean);
    // Return courses
    return courses;
}
/**
 * Function that scrapes all sections for a course.
 * Returns all the sections found.
 */
async function scrapeCourseSections(page, departmentCode, courseCode) {
    // Go to the course page and scrape the sections
    await page.goto(`https://courses.umb.edu/course_catalog/course_info/ugrd_${departmentCode}_all_${courseCode}`);
    // Get the course description
    const description = await getCourseDescription(page);
    // Get all the semesters available
    const offering = page.locator('h2:has-text("Offered in:")').first();
    const semesters = offering.locator('xpath=following-sibling::h3');
    const semesterCount = await semesters.count();
    const allSemesters = [];
    for (let i = 0; i < semesterCount; i++) {
        const semester = semesters.nth(i);
        const semesterName = await getTrimmedText(semester);
        // Get the sections that are offered in a semester
        const sectionsLocator = semester.locator('xpath=following-sibling::table[1]');
        const semesterSections = sectionsLocator.locator('tbody > tr.class-info-rows');
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
    return { description, semesters: allSemesters };
}
/**
 * Function that scrapes one section of a course.
 * Returns info of one section of a course.
 */
async function scrapeSectionRows(row) {
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
 * Helper function that scrapes the course description from the course page.
 * Returns an empty string if no description is found.
 */
async function getCourseDescription(page) {
    // Locate the paragraph that contains the "Description" label
    const locator = page.locator('p:has(strong:has-text("Description"))');
    // Return empty string if the description does not exist
    if (!(await locator.count()))
        return '';
    // Get the text content of the description paragraph
    const text = await locator.first().innerText();
    // Clean the text by removing the label and extra whitespace
    return text
        .replace(/^Description:\s*/i, '')
        .replace(/\s+/g, ' ')
        .trim();
}
/**
 * Helper function to get the content from a locator.
 * Returns an empty string if no text content is found.
 */
async function getTrimmedText(locator) {
    return (await locator.textContent())?.trim() ?? '';
}
