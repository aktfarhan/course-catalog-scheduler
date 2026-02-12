"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInstructorName = normalizeInstructorName;
exports.normalizeInstructorNames = normalizeInstructorNames;
exports.normalizeInstructors = normalizeInstructors;
/**
 * Parses name string into first and last name.
 *
 * @param name - Instructor name or ',' if none.
 * @returns Object with first and last name, or null if no instructor.
 */
function normalizeInstructorName(name) {
    // Return if there are no instructors
    if (name === ',')
        return null;
    // Split the first and last name
    const [lastName, firstName] = name.split(',').map((name) => name.trim());
    // Edge cases where a part of the name is missing, or both parts are numeric
    if (!lastName || !firstName)
        return null;
    if (/^\d+$/.test(firstName) || /^\d+$/.test(lastName))
        return null;
    // Return object of first and last name
    return { firstName: firstName, lastName: lastName };
}
/**
 * Parses names string that might contain multiple instructors separated by '|'.
 *
 * @param names - Raw instructor string, with multiple instructors separated by '|'.
 * @returns Array of normalized instructor objects, or array with placeholder if not valid.
 */
function normalizeInstructorNames(names) {
    // Split the string by '|' to get each instructor separately
    const instructors = names.split('|');
    // Normalize each instructor name and filter out invalid/null results
    const normalizedInstructors = instructors
        .map(normalizeInstructorName)
        .filter((i) => i !== null);
    // If no valid instructors found, return a placeholder entry
    if (normalizedInstructors.length === 0)
        return [{ firstName: '-', lastName: '-' }];
    // Return the list of valid normalized instructors
    return normalizedInstructors;
}
/**
 * Normalizes instructor names and attaches additional info.
 *
 * @param names - Raw instructor string, possibly with multiple instructors separated by '|'.
 * @param infoMap - Map of additional info lookup keyed by "firstname lastname".
 * @returns Array of normalized instructors with info attached.
 */
function normalizeInstructors(names, infoMap) {
    // Normalize raw instructor names into structured objects
    const instructors = normalizeInstructorNames(names);
    // For each instructor, get the key and attach info
    const normalizedInstructors = instructors
        .map(({ firstName, lastName }) => {
        const name = `${firstName} ${lastName}`;
        const info = infoMap.get(name);
        if (!info)
            return null;
        // Return instructor object with attached info
        return {
            firstName,
            lastName,
            title: info.title,
            email: info.email,
            phone: info.phone,
        };
    })
        // Filter out null instructors
        .filter((instructor) => instructor !== null);
    // Return the normalized instructors
    return normalizedInstructors;
}
