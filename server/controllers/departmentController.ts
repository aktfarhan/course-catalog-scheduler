import prisma from '../prismaClient';
import { Request, Response } from 'express';

/**
 * Fetches all departments.
 *
 * @returns {Promise<void>} JSON array of departments including:
 * - All related Courses
 * - Affiliated Instructors
 */
export const getDepartments = async (_req: Request, res: Response) => {
    const departments = await prisma.department.findMany({
        include: {
            courses: true,
            instructors: true,
        },
    });
    res.json(departments);
};
