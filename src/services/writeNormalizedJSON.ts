import { findSectionType } from '../utils';
import {
    normalizeTimes,
    normalizeDaysFull,
    normalizeInstructors,
} from '../normalize';

import type {
    RawDepartment,
    RawCourse,
    NormalizedDepartment,
    NormalizedSection,
    NormalizedMeeting,
} from '../types';

/**
 * Converts raw scraped course catalog data into a fully normalized format.
 *
 * @returns Array of normalized departments with courses and sections.
 */
export function writeNormalizedJSON(
    data: RawDepartment[],
    emailMap: Map<string, string | null>
): NormalizedDepartment[] {
    // Map raw department data into normalized department data
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
                    // Normalize meeting days into groups
                    const dayGroups = normalizeDaysFull(section.days);

                    // Normalize meeting times into start/end times
                    const times = normalizeTimes(section.time);

                    const meetings: NormalizedMeeting[] = [];

                    // For each group of days, pair with corresponding time range
                    for (let i = 0; i < dayGroups.length; i++) {
                        const days = dayGroups[i];
                        const time = times[i];

                        // Skip if time is missing or invalid
                        if (!time) continue;

                        // For each day in the group, add a meeting entry
                        for (const day of days) {
                            meetings.push({
                                day,
                                startTime: time.startTime,
                                endTime: time.endTime,
                                location: section.location,
                            });
                        }
                    }

                    // Determine if section is asynchronous (no meetings)
                    const isAsync = meetings.length === 0;

                    // Normalize instructor information, including email
                    const instructors = normalizeInstructors(
                        section.instructor,
                        emailMap
                    );

                    // Determine section type (e.g., LECTURE, DISCUSSION)
                    const sectionType: string = findSectionType(
                        section.section
                    );

                    // Collect normalized section data
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

            // Return normalized course with all its sections
            return {
                courseCode: rawCourse.courseCode,
                courseName: rawCourse.courseName,
                sections: allSections,
            };
        }),
    }));
}
