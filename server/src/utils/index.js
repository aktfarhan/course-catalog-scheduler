"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = exports.writeJSONToFile = exports.findSectionType = void 0;
var sectionType_1 = require("./sectionType");
Object.defineProperty(exports, "findSectionType", { enumerable: true, get: function () { return sectionType_1.findSectionType; } });
var writeJSON_1 = require("./writeJSON");
Object.defineProperty(exports, "writeJSONToFile", { enumerable: true, get: function () { return writeJSON_1.writeJSONToFile; } });
var removeAccents_1 = require("./removeAccents");
Object.defineProperty(exports, "removeAccents", { enumerable: true, get: function () { return removeAccents_1.removeAccents; } });
