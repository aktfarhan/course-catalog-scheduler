import path from 'path';
import fs from 'fs/promises';
import { logger } from './utils/logger';
import { ingestData } from './services/ingest/ingest';
import type { NormalizedData } from './types';

const DATA_PATH = path.resolve(__dirname, '../data/normalizedData.json');

/**
 * Entry point for running database ingestion.
 *
 * Intended for:
 * - Local database setup
 * - Re-populating the database
 * - Running ingestion without triggering the full pipeline
 */
async function main(): Promise<void> {
    try {
        logger.header();
        logger.phase(1, 'Database Ingestion');

        const data: NormalizedData = JSON.parse(await fs.readFile(DATA_PATH, 'utf-8'));
        await ingestData(data);

        logger.summary();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main();
