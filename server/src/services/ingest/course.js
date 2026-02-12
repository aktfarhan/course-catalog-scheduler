"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertCourse = upsertCourse;
exports.upsertCourses = upsertCourses;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
/**
 * Upserts a single course by its unique composite key (departmentId + code).
 * If the course exists, updates the title.
 * Otherwise, creates a new course.
 *
 * @param course - Course input object containing code, title, and departmentId
 * @returns The created or updated course record
 */
async function upsertCourse(course) {
    return prismaClient_1.default.course.upsert({
        where: {
            departmentId_code: {
                departmentId: course.departmentId,
                code: course.code,
            },
        },
        update: { title: course.title, description: course.description },
        create: {
            departmentId: course.departmentId,
            code: course.code,
            title: course.title,
            description: course.description,
        },
    });
}
/**
 * Bulk upsert many courses inside a single transaction.
 * Rolls back all changes if any insertion or update fails.
 *
 * @param courses - Array of courses inside a single transaction.
 * @returns An array of created or updated course records
 */
async function upsertCourses(courses) {
    return prismaClient_1.default.$transaction(courses.map((course) => prismaClient_1.default.course.upsert({
        where: {
            departmentId_code: {
                departmentId: course.departmentId,
                code: course.code,
            },
        },
        update: { title: course.title, description: course.description },
        create: {
            departmentId: course.departmentId,
            code: course.code,
            title: course.title,
            description: course.description,
        },
    })));
}
