"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("./prisma/generated/prisma/client");
/**
 * PostgreSQL adapter configuration.
 */
const adapter = new adapter_pg_1.PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
/**
 * Prisma Client instance.
 */
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
