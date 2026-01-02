import { scrapeInstructorInfo } from './scraper/instructorInfoScraper';
import { normalizeInstructorNames } from '../normalize/normalizeInstructors';
import { InstructorName, InstructorInfo, Instructor } from '../types';
import { writeJSONToFile } from '../utils';
import Fuse from 'fuse.js';
import path from 'path';
import fs from 'fs/promises';

/**
 * Matches instructor names from raw course data to scraped instructor info,
 * including fuzzy matching for names that don't directly match.
 * Outputs a JSON file with normalized instructor details for all instructors found.
 *
 * @returns {Promise<void>} Resolves when matching and writing are complete.
 */
export async function matchMapInfo() {
    // Read the raw course data JSON file
    const dataFilePath = path.resolve(__dirname, '../../data/data.json');
    const fileContents = await fs.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContents);

    // Scrape instructor contact info from directory and store in a Map
    const instructorMap = await scrapeInstructorInfo();

    // Array to store matched instructors with their info
    const matchedInstructors: Instructor[] = [];

    // Track which instructor full names have already been processed
    const addedKeys = new Set<string>();

    // Prepare fuzzy search on scraped instructor names
    const keys = Array.from(instructorMap.keys());
    const threshold = 0.2; // Fuse.js fuzzy matching threshold (lower = stricter)
    const fuse = new Fuse(keys, {
        includeScore: true,
        threshold,
    });

    // Iterate through each instructor listed in the raw course data
    for (const department of data) {
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    // Normalize instructor names; handle multiple instructors separated by '|'
                    const instructors = normalizeInstructorNames(
                        section.instructor
                    );
                    for (const instructor of instructors) {
                        // Skip if instructor normalization failed (null)
                        if (!instructor) continue;

                        // Combine first and last name to create a unique key
                        const name = `${instructor.firstName} ${instructor.lastName}`;

                        // Skip if this instructor is already processed
                        if (addedKeys.has(name)) continue;

                        // Try exact match lookup in scraped instructor map
                        let info = instructorMap.get(name);

                        // If no exact match, try fuzzy search with Fuse.js
                        if (!info) {
                            const results = fuse.search(name);
                            if (results.length > 0) {
                                const bestMatch = results[0];
                                if (
                                    bestMatch.score !== undefined &&
                                    bestMatch.score <= threshold
                                ) {
                                    info = instructorMap.get(bestMatch.item);
                                }
                            }
                        }

                        // If still no match, fill info with null fields
                        if (!info) {
                            info = { email: null, title: null, phone: null };
                        }

                        // Add matched instructor info to result list
                        pushMatchedInstructor(
                            info,
                            matchedInstructors,
                            instructor
                        );

                        // Mark this instructor as processed
                        addedKeys.add(name);
                    }
                }
            }
        }
    }
    // Write the final array of matched instructors to a JSON file
    const outputFilePath = path.resolve(
        __dirname,
        '../../data/instructorInfo.json'
    );
    await writeJSONToFile(outputFilePath, matchedInstructors);
}

/**
 * Adds an instructor's info and name to the matched instructors list.
 *
 * @param info - Instructor contact info (email, title, phone).
 * @param matchedInstructors - Array accumulating matched instructors.
 * @param name - Normalized instructor name (first and last).
 */
function pushMatchedInstructor(
    info: InstructorInfo,
    matchedInstructors: Instructor[],
    name: InstructorName
) {
    matchedInstructors.push({
        firstName: name.firstName,
        lastName: name.lastName,
        title: info.title,
        email: info.email,
        phone: info.phone,
    });
}
