"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertSection = upsertSection;
exports.upsertSections = upsertSections;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
/**
 * Upserts a single section by its unique classNumber and term.
 * If the section exists, updates the provided fields; otherwise, creates a new section.
 *
 * @param section - Section input object containing section details
 * @returns The created or updated section record
 */
async function upsertSection(section) {
    return prismaClient_1.default.section.upsert({
        where: {
            classNumber_term: {
                classNumber: section.classNumber,
                term: section.term,
            },
        },
        update: buildSectionData(section),
        create: {
            ...buildSectionData(section),
            classNumber: section.classNumber,
        },
    });
}
/**
 * Bulk upsert many sections inside a single transaction.
 * Rolls back all changes if any insertion or update fails.
 *
 * @param sections - Array of section input objects
 * @returns An array of created or updated section records
 */
async function upsertSections(sections) {
    return prismaClient_1.default.$transaction(sections.map((section) => prismaClient_1.default.section.upsert({
        where: {
            classNumber_term: {
                classNumber: section.classNumber,
                term: section.term,
            },
        },
        update: buildSectionData(section),
        create: {
            ...buildSectionData(section),
            classNumber: section.classNumber,
        },
    })));
}
/**
 * Builds the data object for creating or updating a section.
 *
 * @param section - Section input object
 * @returns The data object used for Prisma upsert operations
 */
function buildSectionData(section) {
    return {
        sectionNumber: section.sectionNumber,
        term: section.term,
        isAsync: section.isAsync,
        courseId: section.courseId,
        type: section.type,
        discussionGroupId: section.discussionGroupId,
    };
}
