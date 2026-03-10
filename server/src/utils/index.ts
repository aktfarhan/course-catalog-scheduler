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
 */

export { findSectionType } from './sectionType';
export { writeJSONToFile } from './writeJSON';
export { removeAccents } from './removeAccents';
export { withRetry } from './retry';
