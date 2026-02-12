import type { ApiCourseSummary } from './course';
import type { ApiInstructor } from './instructor';

export interface ApiDepartment {
    id: number;
    code: string;
    title: string;
}

export interface ApiDepartmentWithRelations extends ApiDepartment {
    courses: ApiCourseSummary[];
    instructors: ApiInstructor[];
}
