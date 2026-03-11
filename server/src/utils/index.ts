/**
 * @fileoverview
 * Re-export utility functions used across the system.
 *
 * - findSectionType: Determines the section type (LECTURE or DISCUSSION)
 *   based on the section number suffix.
 * - writeJSONToFile: Writes a JavaScript object to a JSON file with formatting.
 * - removeAccents: Removes accents and marks from strings,
 *   useful for normalization of names.
 * - withRetry: Retries an async function with exponential backoff.
 * - toMinutes: Converts 12-hour time components to minutes after midnight.
 */

export { withRetry } from './retry';
export { toMinutes } from './formatTime';
export { writeJSONToFile } from './writeJSON';
export { findSectionType } from './sectionType';
export { removeAccents } from './removeAccents';
