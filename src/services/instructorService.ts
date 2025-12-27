import prisma from '../prismaClient';

export interface InstructorInput {
    firstName: string;
    lastName: string;
}

/**
 * Inserts a new instructor record.
 *
 * @param instructor - Instructor input object containing first and last name
 * @returns The created instructor record
 */
export async function createInstructor(instructor: InstructorInput) {
    return prisma.instructor.create({
        data: {
            firstName: instructor.firstName,
            lastName: instructor.lastName,
        },
    });
}

/**
 * Bulk insert many instructors inside a single transaction.
 *
 * @param instructors - Array of instructor input objects
 * @returns An array of created instructor records
 */
export async function createInstructors(instructors: InstructorInput[]) {
    return prisma.$transaction(
        instructors.map((instructor) =>
            prisma.instructor.create({
                data: {
                    firstName: instructor.firstName,
                    lastName: instructor.lastName,
                },
            })
        )
    );
}
