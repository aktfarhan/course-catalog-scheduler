import path from 'path';
import Fuse from 'fuse.js';
import { logger } from '../utils/logger';
import { writeJSONToFile } from '../utils';
import { normalizeInstructorNames } from '../normalize/normalizeInstructors';
import { scrapeInstructorInfo } from './scraper/instructorInfoScraper';
import type { RawDepartment, Instructor } from '../types';

const OUTPUT_PATH = path.resolve(__dirname, '../../data/instructorInfo.json');

/**
 * Matches instructor names from raw course data to scraped directory info
 * using exact lookup first, then fuzzy matching as a fallback.
 *
 * @param data - Raw scraped course data.
 * @returns Array of matched instructors with their contact info.
 */
export async function matchMapInfo(data: RawDepartment[]): Promise<Instructor[]> {
    // Scrape instructor contact info from the directory
    const instructorMap = await scrapeInstructorInfo();

    // Store matched instructors and track already-processed names
    const matchedInstructors: Instructor[] = [];
    const seen = new Set<string>();

    // Prepare fuzzy search over scraped instructor names
    const fuse = new Fuse(Array.from(instructorMap.keys()), { threshold: 0.2 });

    logger.startTask(data.length, 'Fuzzy Matching');

    // Iterate through every instructor listed in the raw course data
    for (const [deptIndex, department] of data.entries()) {
        logger.updateTask(deptIndex + 1);
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    // Normalize names and handle multiple instructors separated by '|'
                    const instructors = normalizeInstructorNames(section.instructor);

                    for (const instructor of instructors) {
                        if (!instructor) continue;

                        // Combine first and last name to create a unique key
                        const name = `${instructor.firstName} ${instructor.lastName}`;
                        if (seen.has(name)) continue;

                        // Try exact match first
                        let info = instructorMap.get(name);

                        // If no exact match, use Fuse.js to find the closest name
                        if (!info) {
                            const fuzzyMatch = fuse.search(name)[0];
                            // Use fuzzy result if found, otherwise fall back to null fields
                            info = (fuzzyMatch && instructorMap.get(fuzzyMatch.item)) ?? {
                                email: null,
                                title: null,
                                phone: null,
                            };
                        }

                        // Add the matched instructor to the results
                        matchedInstructors.push({
                            firstName: instructor.firstName,
                            lastName: instructor.lastName,
                            title: info.title,
                            email: info.email,
                            phone: info.phone,
                        });

                        // Mark this instructor as seen
                        seen.add(name);
                    }
                }
            }
        }
    }

    // Write matched instructors to JSON
    await writeJSONToFile(OUTPUT_PATH, matchedInstructors);
    logger.completeTask();

    return matchedInstructors;
}
