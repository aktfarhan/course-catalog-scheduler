import prisma from '../../../prismaClient';
import { logger } from '../../utils/logger';
import type {
    NormalizedData,
    DepartmentInput,
    CourseInput,
    DiscussionGroupInput,
    SectionInput,
    MeetingInput,
} from '../../types';
import {
    upsertDepartments,
    upsertCourses,
    upsertSections,
    upsertMeetings,
    upsertDiscussionGroups,
    preloadInstructorMap,
    upsertInstructorViaEmail,
    upsertInstructorViaLink,
} from './index';

const CHUNK_SIZE = 500;

/**
 * Splits an array into chunks and runs each chunk through a batch function.
 * Prevents oversized transactions from timing out or exceeding DB limits.
 *
 * @param items - Full array of items to process
 * @param batchFn - Function that processes a chunk via $transaction
 * @param onProgress - Optional callback fired after each chunk with total items processed
 * @returns Flattened array of all results
 */
async function batchInChunks<T, R>(
    items: T[],
    batchFn: (chunk: T[]) => Promise<R[]>,
    onProgress?: (processed: number) => void,
): Promise<R[]> {
    const results: R[] = [];
    let processed = 0;
    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunk = items.slice(i, i + CHUNK_SIZE);
        const chunkResults = await batchFn(chunk);
        results.push(...chunkResults);
        processed += chunk.length;
        if (onProgress) onProgress(processed);
    }
    return results;
}

/**
 * Ingests normalized data into the database using batched transactions.
 *
 * Processes departments, courses, discussion groups, sections, meetings,
 * and instructors in order, ensuring proper relations are established.
 *
 * @param data - NormalizedData containing departments, courses, sections, instructors, and meetings.
 */
export async function ingestData(data: NormalizedData) {
    // 1. Batch upsert all departments
    const deptInputs: DepartmentInput[] = data.map((dept) => ({
        code: dept.departmentCode,
        title: dept.departmentName,
    }));
    logger.startTask(deptInputs.length, 'Departments');
    const deptResults = await batchInChunks(deptInputs, upsertDepartments, (n) => logger.updateTask(n));
    logger.completeTask();

    // Map department codes to their database IDs
    const departmentIdMap = new Map<string, number>();
    for (const dept of deptResults) {
        departmentIdMap.set(dept.code, dept.id);
    }

    // Preload a map of instructors keyed by name+department
    const instructorMap = await preloadInstructorMap();

    // 2. Batch upsert all courses and identify discussion groups
    const courseInputs: CourseInput[] = [];
    for (const department of data) {
        const departmentId = departmentIdMap.get(department.departmentCode)!;
        for (const course of department.courses) {
            courseInputs.push({
                code: course.courseCode,
                title: course.courseName,
                description: course.description,
                departmentId,
            });
        }
    }
    logger.startTask(courseInputs.length, 'Courses');
    const courseResults = await batchInChunks(courseInputs, upsertCourses, (n) => logger.updateTask(n));
    logger.completeTask();

    // Map "departmentId:courseCode" to course IDs
    const courseIdMap = new Map<string, number>();
    for (const course of courseResults) {
        courseIdMap.set(`${course.departmentId}:${course.code}`, course.id);
    }

    // Collect unique discussion group keys from sections
    const discussionGroupKeys = new Set<string>();
    for (const department of data) {
        const departmentId = departmentIdMap.get(department.departmentCode)!;
        for (const course of department.courses) {
            const courseId = courseIdMap.get(`${departmentId}:${course.courseCode}`)!;
            for (const section of course.sections) {
                if (section.type === 'DISCUSSION') {
                    discussionGroupKeys.add(`${courseId}:${section.term}`);
                }
            }
        }
    }

    // 3. Batch upsert all discussion groups
    const dgInputs: DiscussionGroupInput[] = Array.from(discussionGroupKeys).map((key) => {
        const [courseIdStr, term] = key.split(':', 2);
        return { courseId: Number(courseIdStr), term };
    });
    const dgResults = await upsertDiscussionGroups(dgInputs);

    // Map "courseId:term" to discussion group IDs
    const discussionGroupIdMap = new Map<string, number>();
    for (const dg of dgResults) {
        discussionGroupIdMap.set(`${dg.courseId}:${dg.term}`, dg.id);
    }

    // 4. Batch upsert all sections
    const sectionInputs: SectionInput[] = [];
    for (const department of data) {
        const departmentId = departmentIdMap.get(department.departmentCode)!;
        for (const course of department.courses) {
            const courseId = courseIdMap.get(`${departmentId}:${course.courseCode}`)!;
            for (const section of course.sections) {
                const discussionGroupId =
                    section.type === 'DISCUSSION'
                        ? discussionGroupIdMap.get(`${courseId}:${section.term}`)!
                        : null;
                sectionInputs.push({
                    sectionNumber: section.sectionNumber,
                    classNumber: section.classNumber,
                    term: section.term,
                    type: section.type,
                    isAsync: section.isAsync,
                    courseId,
                    discussionGroupId,
                });
            }
        }
    }
    logger.startTask(sectionInputs.length, 'Sections');
    const sectionResults = await batchInChunks(sectionInputs, upsertSections, (n) => logger.updateTask(n));
    logger.completeTask();

    // Map "classNumber:term" to section IDs
    const sectionIdMap = new Map<string, number>();
    for (const sect of sectionResults) {
        sectionIdMap.set(`${sect.classNumber}:${sect.term}`, sect.id);
    }

    // 5. Batch upsert all meetings
    const meetingInputs: MeetingInput[] = [];
    for (const department of data) {
        for (const course of department.courses) {
            for (const section of course.sections) {
                const sectionId = sectionIdMap.get(`${section.classNumber}:${section.term}`)!;
                for (const meeting of section.meetings) {
                    meetingInputs.push({
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
    logger.startTask(meetingInputs.length, 'Meetings');
    await batchInChunks(meetingInputs, upsertMeetings, (n) => logger.updateTask(n));
    logger.completeTask();

    // 6. Upsert instructors sequentially (two code paths + map mutation make batching unsafe)
    logger.startTask(data.length, 'Instructors');

    // Accumulate department IDs per instructor and instructor IDs per section
    const instructorDepartments = new Map<number, Set<number>>();
    const sectionInstructors = new Map<number, Set<number>>();

    for (const [deptIndex, department] of data.entries()) {
        logger.updateTask(deptIndex + 1);
        const departmentId = departmentIdMap.get(department.departmentCode)!;

        for (const course of department.courses) {
            for (const section of course.sections) {
                const sectionId = sectionIdMap.get(`${section.classNumber}:${section.term}`)!;
                const instructorIds: number[] = [];

                for (const instructor of section.instructors) {
                    // Upsert by email if available, otherwise by name+department
                    const inst = instructor.email
                        ? await upsertInstructorViaEmail(instructor, [departmentId])
                        : await upsertInstructorViaLink(instructor, [departmentId], instructorMap);

                    // Track which departments this instructor belongs to
                    if (!instructorDepartments.has(inst.id)) {
                        instructorDepartments.set(inst.id, new Set());
                    }
                    instructorDepartments.get(inst.id)!.add(departmentId);

                    instructorIds.push(inst.id);
                }

                // Track which instructors belong to this section
                if (!sectionInstructors.has(sectionId)) {
                    sectionInstructors.set(sectionId, new Set());
                }
                for (const instructorId of instructorIds) {
                    sectionInstructors.get(sectionId)!.add(instructorId);
                }
            }
        }
    }
    logger.completeTask();

    // 7. Batch update instructor-department and section-instructor links (chunked)
    const instructorEntries = Array.from(instructorDepartments);
    for (let i = 0; i < instructorEntries.length; i += CHUNK_SIZE) {
        const chunk = instructorEntries.slice(i, i + CHUNK_SIZE);
        await prisma.$transaction(
            chunk.map(([instructorId, departmentSet]) =>
                prisma.instructor.update({
                    where: { id: instructorId },
                    data: {
                        departments: {
                            set: Array.from(departmentSet).map((id) => ({ id })),
                        },
                    },
                }),
            ),
        );
    }

    const sectionEntries = Array.from(sectionInstructors);
    for (let i = 0; i < sectionEntries.length; i += CHUNK_SIZE) {
        const chunk = sectionEntries.slice(i, i + CHUNK_SIZE);
        await prisma.$transaction(
            chunk.map(([sectionId, instructorIdSet]) =>
                prisma.section.update({
                    where: { id: sectionId },
                    data: {
                        instructors: {
                            set: [],
                            connect: Array.from(instructorIdSet).map((id) => ({ id })),
                        },
                    },
                }),
            ),
        );
    }

    await prisma.$disconnect();
}

