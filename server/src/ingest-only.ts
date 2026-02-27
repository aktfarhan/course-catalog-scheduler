import colors from 'ansi-colors';
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
    const startTime = Date.now();
    try {
        console.log(colors.bold.white('\nSTARTING DATABASE INGEST'));
        console.log(colors.bold.cyan('\n➤ Phase 1: Database Ingestion'));
        await runIngest();
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(colors.bold.green(`\n✨ Ingest completed successfully in ${duration}s!\n`));
    } catch (error) {
        logger.stop();
        console.error(colors.bold.red('\n❌ Ingest error:'), error);
        process.exit(1);
    }
}

main();
