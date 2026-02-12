"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertDepartment = upsertDepartment;
exports.upsertDepartments = upsertDepartments;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
/**
 * Upserts a department by its unique code.
 * If department exists, updates the title.
 * Otherwise, creates a new one.
 *
 * @param department - Department input object containing code and title
 * @returns The created or updated department record
 */
async function upsertDepartment(department) {
    return prismaClient_1.default.department.upsert({
        where: { code: department.code },
        update: { title: department.title },
        create: { code: department.code, title: department.title },
    });
}
/**
 * Bulk upsert many departments inside a single transaction.
 * All operations succeed or fail together.
 *
 * @param departments - Array of department input objects to upsert.
 * @returns An array of created or updated department records.
 */
async function upsertDepartments(departments) {
    return prismaClient_1.default.$transaction(departments.map((department) => prismaClient_1.default.department.upsert({
        where: { code: department.code },
        update: { title: department.title },
        create: { code: department.code, title: department.title },
    })));
}
