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

// Max rows per transaction
const CHUNK_SIZE = 500;

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
    const deptResults = [];
    for (let i = 0; i < deptInputs.length; i += CHUNK_SIZE) {
        const chunk = deptInputs.slice(i, i + CHUNK_SIZE);
        deptResults.push(...(await upsertDepartments(chunk)));
        logger.updateTask(Math.min(i + CHUNK_SIZE, deptInputs.length));
    }
    logger.completeTask();

    // Map department codes to their DB IDs for foreign key lookups
    const departmentIdMap = new Map<string, number>();
    for (const dept of deptResults) {
        departmentIdMap.set(dept.code, dept.id);
    }

    // Preload existing instructors so name-based matching can skip DB calls
    const instructorMap = await preloadInstructorMap();

    // 2. Batch upsert all courses
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
    const courseResults = [];
    for (let i = 0; i < courseInputs.length; i += CHUNK_SIZE) {
        const chunk = courseInputs.slice(i, i + CHUNK_SIZE);
        courseResults.push(...(await upsertCourses(chunk)));
        logger.updateTask(Math.min(i + CHUNK_SIZE, courseInputs.length));
    }
    logger.completeTask();

    // Composite key "departmentId:courseCode" -> courseId for FK lookups
    const courseIdMap = new Map<string, number>();
    for (const course of courseResults) {
        courseIdMap.set(`${course.departmentId}:${course.code}`, course.id);
    }

    // Collect unique discussion group keys from DISCUSSION sections
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

    // Map "courseId:term" -> discussionGroupId for linking DISCUSSION sections
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
                // Only DISCUSSION sections belong to a discussion group
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
    const sectionResults = [];
    for (let i = 0; i < sectionInputs.length; i += CHUNK_SIZE) {
        const chunk = sectionInputs.slice(i, i + CHUNK_SIZE);
        sectionResults.push(...(await upsertSections(chunk)));
        logger.updateTask(Math.min(i + CHUNK_SIZE, sectionInputs.length));
    }
    logger.completeTask();

    // Map "classNumber:term" -> sectionId for meeting and instructor FK lookups
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
                    // Prisma DateTime needs a full ISO string, date part is ignored
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
    for (let i = 0; i < meetingInputs.length; i += CHUNK_SIZE) {
        const chunk = meetingInputs.slice(i, i + CHUNK_SIZE);
        await upsertMeetings(chunk);
        logger.updateTask(Math.min(i + CHUNK_SIZE, meetingInputs.length));
    }
    logger.completeTask();

    // 6. Upsert instructors one at a time
    logger.startTask(data.length, 'Instructors');

    // Track which departments and sections each instructor belongs to
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
                    // Email is the best unique key, fall back to name matching
                    const inst = instructor.email
                        ? await upsertInstructorViaEmail(instructor, [departmentId])
                        : await upsertInstructorViaLink(instructor, [departmentId], instructorMap);

                    if (!instructorDepartments.has(inst.id)) {
                        instructorDepartments.set(inst.id, new Set());
                    }
                    instructorDepartments.get(inst.id)!.add(departmentId);

                    instructorIds.push(inst.id);
                }

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

    // 7. Batch link instructors to departments and sections
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

    // Link each section to its instructors and clear old links
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
