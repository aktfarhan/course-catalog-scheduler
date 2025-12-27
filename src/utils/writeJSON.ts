import fs from 'fs';

/**
 * Writes a JavaScript object as formatted JSON to a file.
 *
 * @param filePath - The path to the output file.
 * @param data - The data object to serialize as JSON.
 */
export function writeJSONToFile(filePath: string, data: unknown): void {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf-8');
        console.log(`Successfully wrote JSON to ${filePath}`);
    } catch (error) {
        console.error(`Failed to write JSON to ${filePath}:`, error);
    }
}
