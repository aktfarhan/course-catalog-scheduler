"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTimes = normalizeTimes;
// All of the valid class durations
const CLASS_DURATIONS = [
    25, 50, 60, 75, 89, 90, 100, 105, 110, 120, 150, 165, 170, 179, 180, 195, 210, 230, 239, 240,
    360, 480, 570, 600, 630, 660,
];
/**
 * Normalizes multiple time ranges separated by '|'.
 *
 * @param times - Raw time ranges string, e.g. "10:00 - 10:50 am|11:00 - 11:50 am"
 * @returns Array of objects with startTime and endTime in "HH:MM:SS" format.
 */
function normalizeTimes(times) {
    // Split input string on '|' and trim each range
    const [firstRange, secondRange = ''] = times.split('|').map((range) => range.trim());
    const normalizedTimes = [];
    // If there is a valid first time, normalize it
    if (firstRange !== '-') {
        normalizedTimes.push(normalizeTime(firstRange));
    }
    // If there is a valid second time, normalize it
    if (secondRange !== '' && secondRange !== '-') {
        normalizedTimes.push(normalizeTime(secondRange));
    }
    // Return the normalized times
    return normalizedTimes;
}
/**
 * Normalizes a class time string into 24-hour formatted start and end times.
 *
 * @param time - A time range string, e.g. "11:00 - 12:15 PM"
 * @returns Object with start and end times in "HH:MM:SS"
 * @throws An error if the time range is invalid or ambiguous
 */
function normalizeTime(time) {
    const [startTime, endTimeMeridiem] = time.split(' - ');
    // Separate the end time and meridiem
    const [endTime, meridiem] = endTimeMeridiem.split(' ');
    // Calculate start times for both AM and PM interpretations
    const startAM = timeToMinutes(startTime, 'am');
    const startPM = timeToMinutes(startTime, 'pm');
    const endTimeMin = timeToMinutes(endTime, meridiem);
    // Calculate durations based on start time assumptions
    const durationAM = endTimeMin - startAM;
    const durationPM = endTimeMin - startPM;
    // Return the time with the correct meridiem if duration matches known class durations
    if (CLASS_DURATIONS.includes(durationAM)) {
        return {
            startTime: minutesToHHMMSS(startAM),
            endTime: minutesToHHMMSS(endTimeMin),
        };
    }
    if (CLASS_DURATIONS.includes(durationPM)) {
        return {
            startTime: minutesToHHMMSS(startPM),
            endTime: minutesToHHMMSS(endTimeMin),
        };
    }
    // Throw an error if the duration is not in the possible durations
    throw new Error(`Invalid time range: ${time}`);
}
/**
 * Converts a time string and meridiem to the number of minutes after midnight.
 *
 * @param time - A time string "HH:MM" format.
 * @param meridiem - Either 'am' or 'pm'.
 * @returns Number of minutes after midnight.
 */
function timeToMinutes(time, meridiem) {
    // Split the hour and minutes
    let [hour, minutes] = time.split(':').map((time) => Number(time));
    // Checking for edge cases when the hour is 12
    if (meridiem === 'am' && hour === 12)
        hour = 0;
    if (meridiem === 'pm' && hour != 12)
        hour += 12;
    // Return minutes after midnight
    return hour * 60 + minutes;
}
/**
 * Converts minutes after midnight to a "HH:MM:SS" formatted string.
 *
 * @param time - Number of minutes after midnight.
 * @returns Time string in "HH:MM:SS" format.
 */
function minutesToHHMMSS(time) {
    const hour = Math.floor(time / 60)
        .toString()
        .padStart(2, '0');
    const minutes = (time % 60).toString().padStart(2, '0');
    // Return "HH:MM:SS" format
    return `${hour}:${minutes}:00`;
}
