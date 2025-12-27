/**
 * Builds a Map for quick instructor email lookup
 *
 * @param emails - Array of instructor email objects.
 * @returns Map with key: "firstName lastName", value: email string or null.
 */
export function buildInstructorEmailMap(
    emails: {
        firstName: string;
        lastName: string;
        email: string | null;
    }[]
): Map<string, string | null> {
    // Initialize a new Map to store email lookup by full name
    const emailMap = new Map<string, string | null>();

    // Iterate over the email records
    for (const instructor of emails) {
        // Construct the key using first and last name
        const key = `${instructor.firstName} ${instructor.lastName}`;

        // Store the email under the key in the Map
        emailMap.set(key, instructor.email ?? null);
    }

    // Return the Map for lookups
    return emailMap;
}
