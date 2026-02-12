/**
 * @fileoverview
 * Re-export normalization utilities for course scheduling data.
 *
 * - normalizeTimes: Converts raw time strings into standardized time objects.
 * - normalizeDaysFull: Parses raw day strings into arrays of day abbreviations.
 * - normalizeInstructors: Normalizes raw instructor names and attaches contact info.
 */

import { normalizeTimes } from './normalizeMeetingTime';
import { normalizeDaysFull } from './normalizeMeetingDay';
import { normalizeInstructors } from './normalizeInstructors';

export { normalizeTimes, normalizeDaysFull, normalizeInstructors };
