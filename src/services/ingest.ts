// import prisma from '../prismaClient';
// import path from 'path';
// import fs from 'fs/promises';
// import { upsertDepartments } from './departmentService';
// import { upsertCourses } from './courseService';
// import { upsertSections } from './sectionService';
// import { createInstructors } from './instructorService';
// import { upsertMeetings } from './meetingService';
// import {
//     normalizeDays,
//     normalizeTime,
//     normalizeInstructorName,
// } from './normalize';

// const DATA_FILE = path.resolve(process.cwd(), 'data.json');

// export async function ingestData() {
//     try {
//         const rawData = await fs.readFile(DATA_FILE, 'utf-8');
//         const departmentsData = JSON.parse(rawData);

//         for (const dept of departmentsData) {
//             const department = await upsertDepartments([
//                 { code: dept.departmentCode, title: dept.departmentName },
//             ]);
//             const departmentId = department[0].id;

//             for (const course of dept.courses ?? []) {
//                 const upsertedCourse = await upsertCourses([
//                     {
//                         code: course.courseCode,
//                         title: course.courseName,
//                         departmentId,
//                     },
//                 ]);
//                 const courseId = upsertedCourse[0].id;

//                 for (const semester of course.semesters ?? []) {
//                     for (const section of semester.sections ?? []) {
//                         // Defensive: ensure instructor is a string
//                         const instructorStr =
//                             typeof section.instructor === 'string'
//                                 ? section.instructor
//                                 : '';

//                         const instructorData =
//                             normalizeInstructorName(instructorStr);

//                         let instructorId: number | undefined;

//                         if (
//                             instructorData &&
//                             typeof instructorData.firstName === 'string' &&
//                             instructorData.firstName.trim() !== '' &&
//                             typeof instructorData.lastName === 'string' &&
//                             instructorData.lastName.trim() !== ''
//                         ) {
//                             console.log('Creating instructor:', instructorData);
//                             const createdInstructors = await createInstructors([
//                                 instructorData,
//                             ]);
//                             instructorId = createdInstructors[0].id;
//                         } else {
//                             console.log(
//                                 'Skipping invalid instructor:',
//                                 instructorStr
//                             );
//                             instructorId = undefined;
//                         }

//                         const upsertedSection = await upsertSections([
//                             {
//                                 sectionNumber: section.section ?? '',
//                                 classNumber: section.classNumber ?? '',
//                                 term: semester.semester ?? '',
//                                 isAsync:
//                                     !section.days || section.days.trim() === '',
//                                 courseId,
//                                 instructorId,
//                             },
//                         ]);
//                         const sectionId = upsertedSection[0].id;

//                         const days = normalizeDays(section.days ?? '');

//                         const timeRanges = section.time
//                             ? section.time
//                                   .split('|')
//                                   .map((t: string) => t.trim())
//                             : [];

//                         for (const timeRange of timeRanges) {
//                             if (timeRange === '-' || timeRange === '') continue;

//                             try {
//                                 const normalized = normalizeTime(timeRange);
//                                 const startTime = normalized.startTime;
//                                 const endTime = normalized.endTime;

//                                 if (days.length > 0 && startTime && endTime) {
//                                     const meetingsInput = days.map((day) => ({
//                                         day,
//                                         startTime: new Date(
//                                             `1970-01-01T${startTime}`
//                                         ),
//                                         endTime: new Date(
//                                             `1970-01-01T${endTime}`
//                                         ),
//                                         location: section.location || null,
//                                         sectionId,
//                                     }));
//                                     await upsertMeetings(meetingsInput);
//                                 }
//                             } catch (err: any) {
//                                 console.warn(
//                                     `Skipping invalid time range "${timeRange}" for section ${section.classNumber}:`,
//                                     err.message
//                                 );
//                             }
//                         }
//                     }
//                 }
//             }
//         }

//         console.log('Data ingestion complete.');
//     } catch (error) {
//         console.error('Error during data ingestion:', error);
//     }
// }
