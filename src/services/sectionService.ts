import prisma from '../prismaClient';

export interface SectionInput {
    sectionNumber: string;
    classNumber: string;
    term: string;
    isAsync?: boolean;
    courseId: number;
    instructorId?: number | null;
}

/**
 * Upserts a single section by its unique classNumber.
 * If the section exists, updates the provided fields.
 * Otherwise, creates a new section.
 *
 * @param section - Section input object containing section details
 * @returns The created or updated section record
 */
export async function upsertSection(section: SectionInput) {
    return prisma.section.upsert({
        where: { classNumber: section.classNumber },
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
export async function upsertSections(sections: SectionInput[]) {
    return prisma.$transaction(
        sections.map((section) =>
            prisma.section.upsert({
                where: {
                    classNumber: section.classNumber,
                },
                update: buildSectionData(section),
                create: {
                    ...buildSectionData(section),
                    classNumber: section.classNumber,
                },
            })
        )
    );
}

/**
 * Helper function that builds the data object for upsert
 */
function buildSectionData(section: SectionInput) {
    return {
        sectionNumber: section.sectionNumber,
        term: section.term,
        isAsync: section.isAsync ?? false,
        courseId: section.courseId,
        instructorId: section.instructorId ?? null,
    };
}
