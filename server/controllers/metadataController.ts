import prisma from '../prismaClient';
import { Request, Response } from 'express';

/**
 * Fetches pipeline metadata.
 *
 * @returns {Promise<void>} JSON object with lastUpdatedAt timestamp, or null if no pipeline has run.
 */
export const getMetadata = async (_req: Request, res: Response) => {
    const metadata = await prisma.metadata.findUnique({ where: { id: 1 } });
    res.json(metadata);
};
