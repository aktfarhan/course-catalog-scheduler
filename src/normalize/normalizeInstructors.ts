import type { Instructor } from '../types';

/**
 * Parses name string into first and last name.
 *
 * @param name - Instructor name or ',' if none.
 * @returns Object with first and last name, or null if no instructor.
 */
function normalizeInstructorName(name: string): Instructor | null {
    // Return if there are no instructors
    if (name === ',') return null;

    // Split the first and last name
    const [lastName, firstName] = name.split(',').map((name) => name.trim());

    // Edge cases where a part of the name is missing, or both parts are numeric
    if (!lastName || !firstName) return null;
    if (/^\d+$/.test(firstName) || /^\d+$/.test(lastName)) return null;

    // Return object of first and last name
    return { firstName: firstName, lastName: lastName };
}

/**
 * Parses names string that might contain multiple instructors separated by '|'.
 *
 * @param names - Raw instructor string, with multiple instructors separated by '|'.
 * @returns Array of normalized instructor objects, or array with placeholder if not valid.
 */
function normalizeInstructorNames(names: string): Instructor[] {
    // Split the string by '|' to get each instructor separately
    const instructors = names.split('|');

    // Normalize each instructor name and filter out invalid/null results
    const normalizedInstructors = instructors
        .map(normalizeInstructorName)
        .filter((i): i is Instructor => i !== null);

    // If no valid instructors found, return a placeholder entry
    if (normalizedInstructors.length === 0)
        return [{ firstName: '-', lastName: '-' }];

    // Return the list of valid normalized instructors
    return normalizedInstructors;
}

/**
 * Attaches emails to a list of normalized instructors using an email lookup map.
 *
 * @param instructors - Array of normalized instructors without emails.
 * @param emailMap - Map with name: "firstname lastname", value: email string or null.
 * @returns New array of instructors with email attached if found, otherwise null.
 */
function attachEmailsToInstructors(
    instructors: Instructor[],
    emailMap: Map<string, string | null>
): Instructor[] {
    return instructors.map((instructor) => {
        // Write the full name of the instructor
        const key = `${instructor.firstName} ${instructor.lastName}`;

        // Return the instructor with the attached email
        return {
            ...instructor,
            email: emailMap.get(key) ?? null,
        };
    });
}

/**
 * Normalizes instructor names and attaches emails.
 *
 * @param names - Raw instructor string, possibly with multiple instructors separated by '|'.
 * @param emailMap - Map for quick email lookup keyed by "firstname lastname".
 * @returns Array of normalized instructors with emails attached where found.
 */
export function normalizeInstructors(
    names: string,
    emailMap: Map<string, string | null>
): Instructor[] {
    // Normalize raw instructor names into structured objects
    const instructors = normalizeInstructorNames(names);

    // Attach emails to each normalized instructor using the email map
    const normalized = attachEmailsToInstructors(instructors, emailMap);

    // Return the final array of instructors with emails
    return normalized;
}
