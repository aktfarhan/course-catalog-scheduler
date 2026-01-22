import type { ApiCourseWithDepartment } from './course';
import type { ApiInstructor } from './instructor';
import type { ApiMeeting } from './meeting';
import type { ApiDiscussionGroup } from './discussionGroup';

export type SectionType = 'LECTURE' | 'DISCUSSION';

export interface ApiSection {
    id: number;
    sectionNumber: string;
    classNumber: string;
    term: string;
    isAsync: boolean;
    courseId: number;
    discussionGroupId: number | null;
    type: SectionType;
}

/**
 * Full section response
 */
export interface ApiSectionWithRelations extends ApiSection {
    course: ApiCourseWithDepartment;
    instructors: ApiInstructor[];
    meetings: ApiMeeting[];
    discussionGroup: ApiDiscussionGroup | null;
}

/**
 * Used when sections are nested under courses
 */
export type ApiSectionSummary = ApiSection;
