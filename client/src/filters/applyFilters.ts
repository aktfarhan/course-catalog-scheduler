import type { ApiCourseWithSections, ApiSectionWithRelations } from '../types';
import type { SearchFilters } from './parseSearchInput';
import * as CourseRules from './coursePredicates';
import * as SectionRules from './sectionPredicates';

// applyFilters.ts
export function applyFilters(
    courses: ApiCourseWithSections[],
    sections: ApiSectionWithRelations[],
    filters: SearchFilters
) {
    // 1. Filter sections first
    const validSections = sections.filter(
        (section) =>
            SectionRules.sectionMatchesTerm(section, filters.term) &&
            SectionRules.sectionMatchesInstructor(
                section,
                filters.instructorName
            ) &&
            SectionRules.sectionMatchesDays(section, filters.days) &&
            SectionRules.sectionMatchesDuration(section, filters.duration)
    );

    const validSectionIds = new Set(validSections.map((s) => s.id));

    return courses.filter((course) => {
        const basicMatch =
            CourseRules.courseMatchesDept(course, filters.departmentCode) &&
            CourseRules.courseMatchesCode(course, filters.courseCode) &&
            CourseRules.courseMatchesText(course, filters.text);

        if (!basicMatch) return false;

        // BUG FIX: If no section-specific filters are active,
        // don't hide courses just because some sections don't match a "default"
        const hasSectionFilters = !!(
            filters.term ||
            filters.instructorName ||
            filters.days ||
            filters.duration
        );

        if (!hasSectionFilters) return true;

        // If filters ARE active, ensure the course has at least one matching section
        return course.sections.some((s) => validSectionIds.has(s.id));
    });
}
