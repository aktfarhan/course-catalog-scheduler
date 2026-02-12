import prisma from '../prismaClient';
import { Request, Response } from 'express';

/**
 * Fetches all instructors.
 *
 * @returns {Promise<void>} JSON array of instructors including:
 * - Associated Departments
 * - Taught Sections
 */
export const getInstructors = async (_req: Request, res: Response) => {
    const instructors = await prisma.instructor.findMany({
        include: {
            departments: true,
            sections: true,
        },
    });
    res.json(instructors);
};
