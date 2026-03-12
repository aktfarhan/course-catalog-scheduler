/**
 * @fileoverview
 * Syncs the local PostgreSQL database to Railway's remote database.
 */

import 'dotenv/config';
import { logger } from './utils/logger';
import { syncToRailway } from './services/sync';

async function main() {
    try {
        logger.header();

        // Standalone sync requires both URLs
        const synced = await syncToRailway();
        if (!synced) {
            console.error('Missing DATABASE_URL or RAILWAY_DB_URL in .env');
            process.exit(1);
        }

        logger.summary();
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main();
