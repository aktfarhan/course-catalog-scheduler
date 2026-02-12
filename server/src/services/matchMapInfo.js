"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchMapInfo = matchMapInfo;
const path_1 = __importDefault(require("path"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const promises_1 = __importDefault(require("fs/promises"));
const utils_1 = require("../utils");
const instructorInfoScraper_1 = require("./scraper/instructorInfoScraper");
const normalizeInstructors_1 = require("../normalize/normalizeInstructors");
/**
 * Matches instructor names from raw course data to scraped instructor info,
 * including fuzzy matching for names that don't directly match.
 * Outputs a JSON file with normalized instructor details for all instructors found.
 *
 * @returns {Promise<void>} Resolves when matching and writing are complete.
 */
async function matchMapInfo() {
    // Read the raw course data JSON file
    const dataFilePath = path_1.default.resolve(__dirname, '../../data/data.json');
    const fileContents = await promises_1.default.readFile(dataFilePath, 'utf-8');
    const data = JSON.parse(fileContents);
    // Scrape instructor contact info from directory and store in a Map
    const instructorMap = await (0, instructorInfoScraper_1.scrapeInstructorInfo)();
    // Array to store matched instructors with their info
    const matchedInstructors = [];
    // Track which instructor full names have already been processed
    const addedKeys = new Set();
    // Prepare fuzzy search on scraped instructor names
    const keys = Array.from(instructorMap.keys());
    const threshold = 0.2; // Fuse.js fuzzy matching threshold (lower = stricter)
    const fuse = new fuse_js_1.default(keys, {
        includeScore: true,
        threshold,
    });
    // Iterate through each instructor listed in the raw course data
    for (const department of data) {
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    // Normalize instructor names; handle multiple instructors separated by '|'
                    const instructors = (0, normalizeInstructors_1.normalizeInstructorNames)(section.instructor);
                    for (const instructor of instructors) {
                        // Skip if instructor normalization failed (null)
                        if (!instructor)
                            continue;
                        // Combine first and last name to create a unique key
                        const name = `${instructor.firstName} ${instructor.lastName}`;
                        // Skip if this instructor is already processed
                        if (addedKeys.has(name))
                            continue;
                        // Try exact match lookup in scraped instructor map
                        let info = instructorMap.get(name);
                        // If no exact match, try fuzzy search with Fuse.js
                        if (!info) {
                            const results = fuse.search(name);
                            if (results.length > 0) {
                                const bestMatch = results[0];
                                if (bestMatch.score !== undefined && bestMatch.score <= threshold) {
                                    info = instructorMap.get(bestMatch.item);
                                }
                            }
                        }
                        // If still no match, fill info with null fields
                        if (!info) {
                            info = { email: null, title: null, phone: null };
                        }
                        // Add matched instructor info to result list
                        pushMatchedInstructor(info, matchedInstructors, instructor);
                        // Mark this instructor as processed
                        addedKeys.add(name);
                    }
                }
            }
        }
    }
    // Write the final array of matched instructors to a JSON file
    const outputFilePath = path_1.default.resolve(__dirname, '../../data/instructorInfo.json');
    await (0, utils_1.writeJSONToFile)(outputFilePath, matchedInstructors);
}
/**
 * Adds an instructor's info and name to the matched instructors list.
 *
 * @param info - Instructor contact info (email, title, phone).
 * @param matchedInstructors - Array accumulating matched instructors.
 * @param name - Normalized instructor name (first and last).
 */
function pushMatchedInstructor(info, matchedInstructors, name) {
    matchedInstructors.push({
        firstName: name.firstName,
        lastName: name.lastName,
        title: info.title,
        email: info.email,
        phone: info.phone,
    });
}
