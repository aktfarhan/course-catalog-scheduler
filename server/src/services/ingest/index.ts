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

export { upsertDepartment } from './department';
export { upsertCourse } from './course';
export { upsertSection } from './section';
export { upsertMeeting } from './meeting';
export { upsertDiscussionGroup } from './discussionGroup';
export {
    preloadInstructorMap,
    upsertInstructorViaEmail,
    upsertInstructorViaLink,
} from './instructor';
