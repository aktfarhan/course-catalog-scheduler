"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDaysFull = normalizeDaysFull;
/**
 * Normalize a raw days string that may contain one or two days separated by '|'.
 *
 * @param days - Raw meeting days of class, possibly with two days separated by '|'.
 * @returns Array of arrays, each containing normalized day abbreviations.
 *          Returns [['TBA']] if no valid days are found.
 */
function normalizeDaysFull(days) {
    // Split the input string on '|' into two, secondDays defaults to '' if absent
    const [firstDays, secondDays = ''] = days.split('|');
    // Normalize each part into arrays of day abbreviations
    const normalizedFirstDays = normalizeDays(firstDays);
    const normalizedSecondDays = normalizeDays(secondDays);
    // Combine and filter out any empty arrays
    const normalizedDays = [normalizedFirstDays, normalizedSecondDays].filter((arr) => arr.length > 0);
    // Return a placeholder if days weren't normalized.
    if (normalizedDays.length === 0) {
        return [['TBA']];
    }
    // Return the array(s) of normalized days.
    return normalizedDays;
}
/**
 * Normalize a raw days string into an array of day abbreviations.
 *
 * @param days - Raw meeting days of class.
 * @returns Array of the days.
 */
function normalizeDays(days) {
    // Matches the days and builds an array
    const matches = days.match(/Tu|Th|Sa|Su|M|W|F/g) || [];
    // Returns the array
    return matches.map((day) => day);
}
