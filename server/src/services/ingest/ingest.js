"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingestData = ingestData;
exports.runIngest = runIngest;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
const index_1 = require("./index");
/**
 * Ingests normalized data into the database.
 *
 * This function processes departments, courses, discussion groups, sections,
 * meetings, and instructors in order, ensuring proper relations are established.
 *
 * @param data - NormalizedData containing departments, courses, sections, instructors, and meetings.
 */
async function ingestData(data) {
    // Map department codes to their corresponding database IDs
    const departmentIdMap = new Map();
    // Map composite keys of "departmentCode:courseCode" to course IDs
    const courseIdMap = new Map();
    // Set of unique discussion groups identified by "courseId:term"
    const discussionGroups = new Set();
    // Map composite keys of "courseId:term" to discussion group IDs
    const discussionGroupIdMap = new Map();
    // Map composite keys of "classNumber:term" to section IDs
    const sectionIdMap = new Map();
    // Map to accumulate department IDs per instructor ID
    const instructorDepartments = new Map();
    // Map section IDs to the set of instructor IDs assigned
    const sectionInstructors = new Map();
    // Upsert departments first and store their IDs for future reference
    for (const department of data) {
        const dept = await (0, index_1.upsertDepartment)({
            code: department.departmentCode,
            title: department.departmentName,
        });
        departmentIdMap.set(department.departmentCode, dept.id);
    }
    // Preload a map of instructors keyed by name+department
    const instructorMap = await (0, index_1.preloadInstructorMap)();
    // Upsert courses and identify discussion groups for later processing
    for (const department of data) {
        // Get the department Id
        const departmentId = departmentIdMap.get(department.departmentCode);
        // Iterate through all courses
        for (const course of department.courses) {
            // Upsert courses in each department
            const cours = await (0, index_1.upsertCourse)({
                code: course.courseCode,
                title: course.courseName,
                description: course.description,
                departmentId: departmentId,
            });
            // Store the course Id for this course
            courseIdMap.set(`${department.departmentCode}:${course.courseCode}`, cours.id);
            // Collect keys of discussion groups to upsert later
            for (const section of course.sections) {
                if (section.type === 'DISCUSSION') {
                    discussionGroups.add(`${cours.id}:${section.term}`);
                }
            }
        }
    }
    // Upsert all discussion groups and store their IDs
    for (const key of discussionGroups) {
        const [courseIdStr, term] = key.split(':', 2);
        const courseId = Number(courseIdStr);
        // Upsert a discussion group for a course
        const discussionGroup = await (0, index_1.upsertDiscussionGroup)({
            courseId,
            term,
        });
        // Store the id of this discussion group
        discussionGroupIdMap.set(key, discussionGroup.id);
    }
    // Upsert all sections, and assign them to a discussionGroupId
    for (const department of data) {
        for (const course of department.courses) {
            const courseId = courseIdMap.get(`${department.departmentCode}:${course.courseCode}`);
            for (const section of course.sections) {
                let discussionGroupId = null;
                if (section.type === 'DISCUSSION') {
                    discussionGroupId = discussionGroupIdMap.get(`${courseId}:${section.term}`);
                }
                // Upsert a section, link it to a course and discussionGroup
                const sect = await (0, index_1.upsertSection)({
                    sectionNumber: section.sectionNumber,
                    classNumber: section.classNumber,
                    term: section.term,
                    type: section.type,
                    isAsync: section.isAsync,
                    courseId,
                    discussionGroupId,
                });
                sectionIdMap.set(`${sect.classNumber}:${sect.term}`, sect.id);
            }
        }
    }
    // Upsert all meetings, link them to their section
    for (const department of data) {
        for (const course of department.courses) {
            for (const section of course.sections) {
                const sectionId = sectionIdMap.get(`${section.classNumber}:${section.term}`);
                // Upsert all meetings of a section, and link them to the section
                for (const meeting of section.meetings) {
                    await (0, index_1.upsertMeeting)({
                        day: meeting.day,
                        startTime: `1970-01-01T${meeting.startTime}Z`,
                        endTime: `1970-01-01T${meeting.endTime}Z`,
                        location: meeting.location,
                        sectionId,
                    });
                }
            }
        }
    }
    // Upsert instructors and accumulate department and section relations
    for (const department of data) {
        // Get the stored department ID for this department code
        const departmentId = departmentIdMap.get(department.departmentCode);
        for (const course of department.courses) {
            for (const section of course.sections) {
                // Get the stored section ID for this section (by classNumber and term)
                const sectionId = sectionIdMap.get(`${section.classNumber}:${section.term}`);
                // Array to keep track of instructor IDs linked to this section
                const instructorIds = [];
                for (const instructor of section.instructors) {
                    let inst;
                    // If instructor has an email, upsert by email
                    if (instructor.email) {
                        inst = await (0, index_1.upsertInstructorViaEmail)(instructor, [departmentId]);
                    }
                    else {
                        // Otherwise, upsert by name and department using the preloaded map
                        inst = await (0, index_1.upsertInstructorViaLink)(instructor, [departmentId], instructorMap);
                    }
                    // Track which departments this instructor belongs to (for batch update)
                    if (!instructorDepartments.has(inst.id)) {
                        instructorDepartments.set(inst.id, new Set());
                    }
                    instructorDepartments.get(inst.id).add(departmentId);
                    // Add instructor ID to list for connecting to section later
                    instructorIds.push(inst.id);
                }
                // Ensure a set exists to track instructors for this section
                if (!sectionInstructors.has(sectionId)) {
                    sectionInstructors.set(sectionId, new Set());
                }
                // Add each instructor ID to the section's instructor set
                for (const instructorId of instructorIds) {
                    sectionInstructors.get(sectionId).add(instructorId);
                }
            }
        }
    }
    // After processing all sections, update each instructor's linked departments
    for (const [instructorId, departmentSet] of instructorDepartments) {
        await prismaClient_1.default.instructor.update({
            where: { id: instructorId },
            data: {
                departments: {
                    // Replace linked departments with the collected set
                    set: Array.from(departmentSet).map((id) => ({ id })),
                },
            },
        });
    }
    // Update each section's instructor connections in batch
    for (const [sectionId, instructorIdSet] of sectionInstructors) {
        await prismaClient_1.default.section.update({
            where: { id: sectionId },
            data: {
                instructors: {
                    // Clear existing instructors, then connect new set
                    set: [],
                    connect: Array.from(instructorIdSet).map((id) => ({ id })),
                },
            },
        });
    }
}
/**
 * Wrapper function to load normalized JSON and trigger ingestion.
 */
async function runIngest() {
    try {
        const filePath = path_1.default.resolve(__dirname, '../../../data/normalizedData.json');
        const fileContents = await promises_1.default.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContents);
        console.log('Starting ingestion...');
        await ingestData(data);
        console.log('Ingestion complete!');
    }
    catch (error) {
        console.error('Ingestion failed:', error);
    }
    finally {
        await prismaClient_1.default.$disconnect();
    }
}
