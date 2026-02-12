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
export function removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
