import prisma from '../prismaClient';

export interface DepartmentInput {
    code: string;
    title: string;
}

/**
 * Upserts a department by its unique code.
 * If department exists, updates the title.
 * Otherwise, creates a new one.
 *
 * @param department - Department input object containing code and title
 * @returns The created or updated department record
 */
export async function upsertDepartment(department: DepartmentInput) {
    return prisma.department.upsert({
        where: { code: department.code },
        update: { title: department.title },
        create: { code: department.code, title: department.title },
    });
}

/**
 * Bulk upsert many departments inside a single transaction.
 * Rolls back all changes if any insertion or update fails.
 *
 * @param departments - Array of departments inside a single transaction.
 * @returns An array of created or updated department records
 */
export async function upsertDepartments(departments: DepartmentInput[]) {
    return prisma.$transaction(
        departments.map((department) =>
            prisma.department.upsert({
                where: { code: department.code },
                update: { title: department.title },
                create: { code: department.code, title: department.title },
            })
        )
    );
}
