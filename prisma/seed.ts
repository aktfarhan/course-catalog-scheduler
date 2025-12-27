import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.$connect();

    // Delete all data in dependency order to avoid FK issues
    await prisma.meeting.deleteMany();
    await prisma.section.deleteMany();
    await prisma.course.deleteMany();
    await prisma.instructor.deleteMany();
    await prisma.department.deleteMany();

    console.log('Database cleared.');
}

main()
    .catch(async (e) => {
        console.error('Error during clearing database:', e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
