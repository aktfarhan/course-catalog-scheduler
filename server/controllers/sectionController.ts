import prisma from '../prismaClient';
import { Request, Response } from 'express';

/**
 * Fetches all sections.
 *
 * @returns {Promise<void>} JSON array of sections including:
 * - Nested Course (with Department)
 * - Assigned Instructors
 * - Meeting Schedules
 * - Associated Discussion Groups
 */
export const getSections = async (_req: Request, res: Response) => {
    const sections = await prisma.section.findMany({
        include: {
            course: { include: { department: true } },
            instructors: true,
            meetings: true,
            discussionGroup: true,
        },
    });
    res.json(sections);
};
