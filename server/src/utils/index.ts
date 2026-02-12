/**
 * @fileoverview
 * Re-export utility functions used across the system.
 *
 * - findSectionType: Determines the section type (LECTURE or DISCUSSION)
 *   based on the section number suffix.
 * - writeJSONToFile: Writes a JavaScript object to a JSON file with formatting.
 * - removeAccents: Removes accents and marks from strings,
 *   useful for normalization of names.
 */

export { findSectionType } from './sectionType';
export { writeJSONToFile } from './writeJSON';
export { removeAccents } from './removeAccents';
