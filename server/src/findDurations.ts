import path from 'path';
import fs from 'fs/promises';
import { toMinutes } from './utils';
import type { RawDepartment } from './types';

const DATA_PATH = path.resolve(__dirname, '../data/data.json');
const CONSTANTS_PATH = path.resolve(__dirname, 'constants.ts');
const TIME_REGEX = /^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*(am|pm)$/i;

/**
 * Parses a time range string and returns the duration in minutes.
 *
 * @param range - A time range like "12:30 - 1:15 pm"
 * @returns Duration in minutes, or null if unparseable.
 */
function parseDuration(range: string): number | null {
    const match = range.match(TIME_REGEX);
    if (!match) return null;

    const [, startH, startM, endH, endM, meridiem] = match;

    // End time meridiem is known, convert directly
    const end = toMinutes(Number(endH), Number(endM), meridiem.toLowerCase());

    // Start time has no meridiem, try both combinations
    const durationAM = end - toMinutes(Number(startH), Number(startM), 'am');
    const durationPM = end - toMinutes(Number(startH), Number(startM), 'pm');

    // Whichever gives a positive duration is the right one
    if (durationAM > 0 && durationPM <= 0) return durationAM;
    if (durationPM > 0 && durationAM <= 0) return durationPM;

    // If both are positive, return the minimum
    if (durationAM > 0 && durationPM > 0) return Math.min(durationAM, durationPM);

    return null;
}

/**
 * Scans all sections in data.json and collects unique class durations.
 *
 * @param data - Raw department data.
 * @returns Set of unique durations in minutes.
 */
function collectDurations(data: RawDepartment[]): Set<number> {
    const durations = new Set<number>();

    // Iterate through every section in the raw data
    for (const department of data) {
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    if (!section.time || section.time === '-') continue;

                    // Split on '|' for sections with multiple meeting times
                    for (const range of section.time.split('|')) {
                        const duration = parseDuration(range.trim());
                        if (duration !== null) durations.add(duration);
                    }
                }
            }
        }
    }

    return durations;
}

/**
 * Writes the updated CLASS_DURATIONS into constants.ts.
 *
 * @param durations - Set of unique durations.
 */
async function writeDurations(durations: Set<number>): Promise<void> {
    const contents = await fs.readFile(CONSTANTS_PATH, 'utf-8');

    // Swap the old CLASS_DURATIONS array with the updated one
    const updated = contents.replace(
        /export const CLASS_DURATIONS = \[[\s\S]*?\];/,
        `export const CLASS_DURATIONS = [\n    ${[...durations].join(', ')},\n];`,
    );

    await fs.writeFile(CONSTANTS_PATH, updated, 'utf-8');
}

/**
 * Scans data.json for all unique class durations and writes the
 * updated CLASS_DURATIONS array directly into constants.ts.
 */
export async function findDurations(): Promise<void> {
    const data: RawDepartment[] = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
    const durations = collectDurations(data);
    await writeDurations(durations);
}
