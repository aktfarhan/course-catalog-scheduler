import prisma from '../../../prismaClient';
import { DiscussionGroupInput } from '../../types';

/**
 * Upserts a single discussion group by unique composite key (courseId + term).
 * If the discussion group exists, does nothing or updates fields if needed.
 * Otherwise, creates a new discussion group.
 *
 * @param discussionGroup - Object containing courseId and term
 * @returns The created or existing discussion group record
 */
export async function upsertDiscussionGroup(discussionGroup: DiscussionGroupInput) {
    return prisma.discussionGroup.upsert({
        where: {
            courseId_term: {
                courseId: discussionGroup.courseId,
                term: discussionGroup.term,
            },
        },
        update: {},
        create: {
            courseId: discussionGroup.courseId,
            term: discussionGroup.term,
        },
    });
}

/**
 * Bulk upsert discussion groups by unique composite key (courseId + term).
 * If the discussion group exists, does nothing or updates fields if needed.
 * Otherwise, creates a new discussion group.
 *
 * @param groups - Array of discussion group objects to upsert
 * @returns An array of created or existing discussion group records
 */
export async function upsertDiscussionGroups(groups: DiscussionGroupInput[]) {
    return prisma.$transaction(
        groups.map((group) =>
            prisma.discussionGroup.upsert({
                where: {
                    courseId_term: {
                        courseId: group.courseId,
                        term: group.term,
                    },
                },
                update: {},
                create: {
                    courseId: group.courseId,
                    term: group.term,
                },
            }),
        ),
    );
}
