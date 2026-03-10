import path from 'path';
import fs from 'fs/promises';
import type { RawDepartment } from './types';

/**
 * Scans data.json and prints all unique class durations found.
 * Use this to keep CLASS_DURATIONS in normalizeMeetingTime.ts up to date.
 */
async function main() {
    const filePath = path.resolve(__dirname, '../data/data.json');
    const data: RawDepartment[] = JSON.parse(await fs.readFile(filePath, 'utf-8'));

    const durations = new Set<number>();

    for (const department of data) {
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    if (!section.time || section.time === '-') continue;

                    for (const range of section.time.split('|')) {
                        const duration = parseDuration(range.trim());
                        if (duration !== null) durations.add(duration);
                    }
                }
            }
        }
    }

    const sorted = Array.from(durations).sort((a, b) => a - b);
    console.log(`\nFound ${sorted.length} unique class durations:\n`);
    console.log(`const CLASS_DURATIONS = [\n    ${sorted.join(', ')},\n];`);
}

/**
 * Parses a time range string and returns the duration in minutes.
 *
 * @param range - A time range like "12:30 - 1:15 pm"
 * @returns Duration in minutes, or null if unparseable
 */
function parseDuration(range: string): number | null {
    const match = range.match(/^(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})\s*(am|pm)$/i);
    if (!match) return null;

    const [, startH, startM, endH, endM, meridiem] = match;
    const endMinutes = toMinutes(Number(endH), Number(endM), meridiem.toLowerCase());

    // Try both AM and PM interpretations for the ambiguous start time
    const startAM = toMinutes(Number(startH), Number(startM), 'am');
    const startPM = toMinutes(Number(startH), Number(startM), 'pm');

    const durationAM = endMinutes - startAM;
    const durationPM = endMinutes - startPM;

    // Pick whichever interpretation gives a positive, reasonable duration
    if (durationAM > 0 && durationPM <= 0) return durationAM;
    if (durationPM > 0 && durationAM <= 0) return durationPM;
    if (durationAM > 0 && durationPM > 0) return Math.min(durationAM, durationPM);

    return null;
}

function toMinutes(hour: number, minutes: number, meridiem: string): number {
    if (meridiem === 'am' && hour === 12) hour = 0;
    if (meridiem === 'pm' && hour !== 12) hour += 12;
    return hour * 60 + minutes;
}

main();
