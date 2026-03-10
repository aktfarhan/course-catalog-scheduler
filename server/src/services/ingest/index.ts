/**
 * @fileoverview
 * Re-export bulk upsert functions for course scheduling data ingestion.
 *
 * upsertDepartments - Bulk upsert department records.
 * upsertCourses - Bulk upsert course records.
 * upsertInstructors - Bulk upsert instructor records.
 * upsertSections - Bulk upsert section records.
 * upsertMeetings - Bulk upsert meeting records.
 * upsertDiscussionGroups - Bulk upsert discussion group records.
 */

export { upsertDepartment, upsertDepartments } from './department';
export { upsertCourse, upsertCourses } from './course';
export { upsertSection, upsertSections } from './section';
export { upsertMeeting, upsertMeetings } from './meeting';
export { upsertDiscussionGroup, upsertDiscussionGroups } from './discussionGroup';
export {
    preloadInstructorMap,
    upsertInstructorViaEmail,
    upsertInstructorViaLink,
} from './instructor';
