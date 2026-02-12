import fs from 'fs/promises';

/**
 * Writes a JavaScript object as formatted JSON to a file.
 *
 * @param filePath - The path to the output file.
 * @param data - Any serializable value to write as JSON.
 */
export async function writeJSONToFile(filePath: string, data: unknown): Promise<void> {
    try {
        const jsonString = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonString, 'utf-8');
    } catch (error) {
        console.error(`Failed to write JSON to ${filePath}:`, error);
    }
}
