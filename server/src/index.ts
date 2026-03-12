import 'dotenv/config';
import path from 'path';
import { logger } from './utils/logger';
import { writeJSONToFile } from './utils';
import { syncToRailway } from './services/sync';
import { ingestData } from './services/ingest/ingest';
import { matchMapInfo } from './services/matchMapInfo';
import { scrapeData } from './services/scraper/scraper';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import type { InstructorInfo, RawDepartment } from './types';

// Runs the full pipeline: scrape, match, normalize, and ingest.
export async function runPipeline() {
    // Phase 1: Scrape course catalog (returns raw data + writes data.json)
    logger.phase(1, 'Scraping Course Catalog');
    const rawData: RawDepartment[] = await scrapeData();

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
}

async function main() {
    try {
        logger.header();
        await runPipeline();

        // Phases 6-7
        const synced = await syncToRailway(5);
        if (!synced) logger.info('Skipping sync — missing DATABASE_URL or RAILWAY_DB_URL');

        logger.summary();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

// Only run when executed directly
if (require.main === module) main();
