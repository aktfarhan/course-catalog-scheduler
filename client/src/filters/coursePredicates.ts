import type { ApiCourseWithDepartment } from '../types';
import type { SearchFilters } from './parseSearchInput';

export const courseMatchesDept = (
    course: ApiCourseWithDepartment,
    deptCode?: string
) => !deptCode || course.department.code === deptCode;

export const courseMatchesCode = (
    course: ApiCourseWithDepartment,
    courseCode?: string
) => {
    if (!courseCode) return true;
    // Normalizing "AF 310" vs "AF310"
    const combined = `${course.department.code}${course.code}`
        .replace(/\s/g, '')
        .toUpperCase();
    return combined === courseCode;
};

export const courseMatchesText = (
    course: ApiCourseWithDepartment,
    text?: string
) => {
    if (!text) return true;
    const lower = text.toLowerCase();
    return (
        course.title.toLowerCase().includes(lower) ||
        course.code.includes(lower)
    );
};
