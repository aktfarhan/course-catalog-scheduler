"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeJSONToFile = writeJSONToFile;
const promises_1 = __importDefault(require("fs/promises"));
/**
 * Writes a JavaScript object as formatted JSON to a file.
 *
 * @param filePath - The path to the output file.
 * @param data - Any serializable value to write as JSON.
 */
async function writeJSONToFile(filePath, data) {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        await promises_1.default.writeFile(filePath, jsonString, 'utf-8');
        console.log(`Successfully wrote JSON to ${filePath}`);
    }
    catch (error) {
        console.error(`Failed to write JSON to ${filePath}:`, error);
    }
}
