"use strict";
/**
 * @fileoverview
 * Re-export normalization utilities for course scheduling data.
 *
 * - normalizeTimes: Converts raw time strings into standardized time objects.
 * - normalizeDaysFull: Parses raw day strings into arrays of day abbreviations.
 * - normalizeInstructors: Normalizes raw instructor names and attaches contact info.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInstructors = exports.normalizeDaysFull = exports.normalizeTimes = void 0;
const normalizeMeetingTime_1 = require("./normalizeMeetingTime");
Object.defineProperty(exports, "normalizeTimes", { enumerable: true, get: function () { return normalizeMeetingTime_1.normalizeTimes; } });
const normalizeMeetingDay_1 = require("./normalizeMeetingDay");
Object.defineProperty(exports, "normalizeDaysFull", { enumerable: true, get: function () { return normalizeMeetingDay_1.normalizeDaysFull; } });
const normalizeInstructors_1 = require("./normalizeInstructors");
Object.defineProperty(exports, "normalizeInstructors", { enumerable: true, get: function () { return normalizeInstructors_1.normalizeInstructors; } });
