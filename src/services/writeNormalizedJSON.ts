import { findSectionType } from '../utils';
import {
    normalizeTimes,
    normalizeDaysFull,
    normalizeInstructors,
} from '../normalize';

import type {
    InstructorInfo,
    SectionType,
    RawDepartment,
    RawCourse,
    NormalizedDepartment,
    NormalizedSection,
    NormalizedMeeting,
} from '../types';

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
export function writeNormalizedJSON(
    data: RawDepartment[],
    instructorInfoMap: Map<string, InstructorInfo>
): NormalizedDepartment[] {
    return data.map((department: RawDepartment) => ({
        departmentCode: department.departmentCode,
        departmentName: department.departmentName,

        // Normalize each course within the department
        courses: department.courses.map((rawCourse: RawCourse) => {
            const allSections: NormalizedSection[] = [];

            // Iterate over all semesters for this course
            for (const semester of rawCourse.semesters) {
                // Iterate over all sections within the semester
                for (const section of semester.sections) {
                    // Normalize days string into groups of day abbreviations
                    const dayGroups = normalizeDaysFull(section.days);

                    // Normalize time strings into start and end times
                    const times = normalizeTimes(section.time);

                    const meetings: NormalizedMeeting[] = [];

                    // Pair each day group with corresponding time slot
                    for (let i = 0; i < dayGroups.length; i++) {
                        const days = dayGroups[i];
                        const time = times[i];

                        // Skip entries where time is missing or invalid
                        if (!time) continue;

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
                    const instructors = normalizeInstructors(
                        section.instructor,
                        instructorInfoMap
                    );

                    // Determine section type from section identifier
                    const sectionType: SectionType = findSectionType(
                        section.section
                    );

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
                sections: allSections,
            };
        }),
    }));
}
