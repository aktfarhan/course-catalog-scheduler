import { logger } from './utils/logger';
import { runIngest } from './services/ingest/ingest';

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
        await runIngest();
        logger.summary();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main();
