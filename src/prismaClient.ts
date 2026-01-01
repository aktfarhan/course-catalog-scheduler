import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';

/**
 * PostgreSQL adapter configuration.
 * Uses DATABASE_URL from the environment
 * to establish the database connection.
 */
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

/**
 * Prisma Client instance.
 * Import this client anywhere database
 * access is needed.
 */
const prisma = new PrismaClient({ adapter });

export default prisma;
