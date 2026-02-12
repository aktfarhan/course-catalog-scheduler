"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = removeAccents;
/**
 * Removes marks (accents) from a string.
 *
 * Uses Unicode normalization (NFD) to separate base
 * characters from combining marks, then strips the
 * diacritics.
 *
 * @param str - The input string.
 * @returns The string without accents.
 */
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
