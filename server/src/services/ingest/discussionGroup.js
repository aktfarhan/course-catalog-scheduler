"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDiscussionGroup = upsertDiscussionGroup;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
/**
 * Upserts a single discussion group by unique composite key (courseId + term).
 * If the discussion group exists, does nothing or updates fields if needed.
 * Otherwise, creates a new discussion group.
 *
 * @param discussionGroup - Object containing courseId and term
 * @returns The created or existing discussion group record
 */
async function upsertDiscussionGroup(discussionGroup) {
    return prismaClient_1.default.discussionGroup.upsert({
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
