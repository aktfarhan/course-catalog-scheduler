"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeNormalizedJSON = writeNormalizedJSON;
const utils_1 = require("../utils");
const normalize_1 = require("../normalize");
/**
 * Converts raw scraped course catalog data into a fully normalized format.
 *
 * This involves:
 * - Normalizing meeting days and times into structured meeting objects.
 * - Associating instructor contact info from the info map.
 * - Classifying section types (e.g., LECTURE or DISCUSSION).
 * - Handling asynchronous sections with no meetings.
 *
 * @param data - Array of raw department data from the scraper.
 * @param instructorInfoMap - Map of instructor names to contact info.
 * @returns Array of normalized departments containing courses and sections.
 */
function writeNormalizedJSON(data, instructorInfoMap) {
    return data.map((department) => ({
        departmentCode: department.departmentCode,
        departmentName: department.departmentName,
        // Normalize each course within the department
        courses: department.courses.map((rawCourse) => {
            const allSections = [];
            // Iterate over all semesters for this course
            for (const semester of rawCourse.semesters) {
                // Iterate over all sections within the semester
                for (const section of semester.sections) {
                    // Normalize days string into groups of day abbreviations
                    const dayGroups = (0, normalize_1.normalizeDaysFull)(section.days);
                    // Normalize time strings into start and end times
                    const times = (0, normalize_1.normalizeTimes)(section.time);
                    const meetings = [];
                    // Pair each day group with corresponding time slot
                    for (let i = 0; i < dayGroups.length; i++) {
                        const days = dayGroups[i];
                        const time = times[i];
                        // Skip entries where time is missing or invalid
                        if (!time)
                            continue;
                        // Create a meeting for each day in the day group
                        for (const day of days) {
                            meetings.push({
                                day,
                                startTime: time.startTime,
                                endTime: time.endTime,
                                location: section.location,
                            });
                        }
                    }
                    // Mark section as asynchronous if it has no meetings
                    const isAsync = meetings.length === 0;
                    // Normalize instructor names and attach contact info
                    const instructors = (0, normalize_1.normalizeInstructors)(section.instructor, instructorInfoMap);
                    // Determine section type from section identifier
                    const sectionType = (0, utils_1.findSectionType)(section.section);
                    // Add this normalized section to the list
                    allSections.push({
                        sectionNumber: section.section,
                        classNumber: section.classNumber,
                        term: semester.semester,
                        type: sectionType,
                        isAsync,
                        instructors,
                        meetings,
                    });
                }
            }
            // Return the fully normalized course object
            return {
                courseCode: rawCourse.courseCode,
                courseName: rawCourse.courseName,
                description: rawCourse.description,
                sections: allSections,
            };
        }),
    }));
}
