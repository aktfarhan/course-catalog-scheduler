import prisma from '../prismaClient';
import { Request, Response } from 'express';

/**
 * Fetches all courses.
 *
 * @returns {Promise<void>} JSON array of courses including:
 * - Parent Department
 * - Related Sections
 * - Associated Discussion Groups
 */
export const getCourses = async (_req: Request, res: Response) => {
    const courses = await prisma.course.findMany({
        include: {
            department: true,
            sections: true,
            discussionGroups: true,
        },
    });
    res.json(courses);
};
