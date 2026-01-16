import type { ApiCourse } from './course';
import type { ApiInstructor } from './instructor';
import type { ApiMeeting } from './meeting';

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
    course: ApiCourse;
    instructors: ApiInstructor[];
    meetings: ApiMeeting[];
    discussionGroup: number | null;
}

/**
 * Used when sections are nested under courses
 */
export type ApiSectionSummary = ApiSection;
