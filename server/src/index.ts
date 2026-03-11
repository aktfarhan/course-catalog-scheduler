import path from 'path';
import { logger } from './utils/logger';
import { writeJSONToFile } from './utils';
import { ingestData } from './services/ingest/ingest';
import { matchMapInfo } from './services/matchMapInfo';
import { ScrapeData } from './services/scraper/scraper';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import type { InstructorInfo, RawDepartment } from './types';

async function main() {
    try {
        logger.header();

        // Phase 1: Scrape course catalog (returns raw data + writes data.json)
        logger.phase(1, 'Scraping Course Catalog');
        const rawData: RawDepartment[] = await ScrapeData();

        // Phase 2: Scrape instructor directory + fuzzy match
        logger.phase(2, 'Instructor Matching');
        const matchedInstructors = await matchMapInfo(rawData);

        // Phase 3: Build instructor info map from matched results
        logger.phase(3, 'Creating Instructor Map');
        const instructorInfoMap: Map<string, InstructorInfo> = new Map(
            matchedInstructors.map(({ firstName, lastName, title, email, phone }) => [
                `${firstName} ${lastName}`,
                { title, email, phone },
            ]),
        );
        logger.info(`Indexed ${instructorInfoMap.size} instructors`);

        // Phase 4: Normalize scraped data (writes normalizedData.json as cache)
        logger.phase(4, 'Normalizing Scraped Data');
        const normalizedData = writeNormalizedJSON(rawData, instructorInfoMap);
        const normalizedDataPath = path.resolve(__dirname, '../data/normalizedData.json');
        await writeJSONToFile(normalizedDataPath, normalizedData);
        logger.info(`Normalized ${normalizedData.length} departments`);

        // Phase 5: Ingest normalized data into database (uses data directly)
        logger.phase(5, 'Database Ingestion');
        await ingestData(normalizedData);

        logger.summary();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main();
