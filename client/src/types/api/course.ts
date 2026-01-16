import type { ApiDepartment } from './department';
import type { ApiSectionSummary } from './section';

export interface ApiCourse {
    id: number;
    code: string;
    title: string;
    departmentId: number;
}

/**
 * Course with its department populated
 */
export interface ApiCourseWithDepartment extends ApiCourse {
    department: ApiDepartment;
}

/**
 * Course returned with sections (common search response)
 */
export interface ApiCourseWithSections extends ApiCourseWithDepartment {
    sections: ApiSectionSummary[];
    discussionGroups: unknown[];
}

/**
 * Lightweight course reference
 */
export type ApiCourseSummary = ApiCourse;
