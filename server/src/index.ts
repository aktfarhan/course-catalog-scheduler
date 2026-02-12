import path from 'path';
import fs from 'fs'; // Added for manual file reading
import { writeJSONToFile } from './utils';
import { runIngest } from './services/ingest/ingest';
import { matchMapInfo } from './services/matchMapInfo';
import { ScrapeData } from './services/scraper/scraper';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import type { Instructor, InstructorInfo, RawDepartment } from './types';

async function main() {
    try {
        console.log('Step 1: Scraping course catalog data...');
        const rawData: RawDepartment[] = await ScrapeData();

        console.log('Step 2: Matching instructor info...');
        await matchMapInfo();

        console.log('Step 3: Creating instructor info map...');

        // Manual JSON reading - bypasses TypeScript's build-time module resolution
        const instructorInfoPath = path.resolve(__dirname, '../data/instructorInfo.json');
        const fileContent = fs.readFileSync(instructorInfoPath, 'utf8');
        const rawInstructorInfo = JSON.parse(fileContent);

        // Map creation
        const instructorInfoMap: Map<string, InstructorInfo> = new Map(
            (rawInstructorInfo as Instructor[]).map(
                ({ firstName, lastName, title, email, phone }) => [
                    `${firstName} ${lastName}`,
                    { title, email, phone },
                ],
            ),
        );

        console.log('Step 4: Normalizing scraped data...');
        const normalizedData = writeNormalizedJSON(rawData as RawDepartment[], instructorInfoMap);

        // Write normalized data to file
        const normalizedDataPath = path.resolve(__dirname, '../data/normalizedData.json');
        await writeJSONToFile(normalizedDataPath, normalizedData);

        console.log('Step 5: Ingesting normalized data into the database...');
        await runIngest();

        console.log('Pipeline completed successfully!');
    } catch (error) {
        console.error('Pipeline error:', error);
        process.exit(1);
    }
}

main();
