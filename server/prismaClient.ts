import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './prisma/generated/prisma/client';

/**
 * PostgreSQL adapter configuration.
 */
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Prisma Client instance.
 */
const prisma = new PrismaClient({
    adapter,
    transactionOptions: {
        timeout: 120000,
    },
});

export default prisma;
