import { SectionType } from '../types';

/**
 * Detects the section type based on the last character of the section number.
 * Defaults to LECTURE if no discussion suffix is present.
 *
 * @param sectionNumber - The section number string (e.g., "01", "01D").
 * @returns The section type as one of: 'LECTURE', or 'DISCUSSION'
 */
export function findSectionType(sectionNumber: string): SectionType {
    // Extract the last character and convert it to uppercase
    const lastChar = sectionNumber.slice(-1).toUpperCase();

    // If last char is 'D', treat as DISCUSSION
    if (lastChar === 'D') {
        return 'DISCUSSION';
    }

    // Default to LECTURE
    return 'LECTURE';
}
