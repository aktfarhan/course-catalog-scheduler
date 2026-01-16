import React from 'react';
import { Search } from 'lucide-react';
import Course from './Course';
import type { SearchFilters } from '../../filters/parseSearchInput';
import * as SectionRules from '../../filters/sectionPredicates'; // Adjust path
import type {
    ApiCourseWithDepartment,
    ApiSectionWithRelations,
} from '../../types';

interface CourseListProps {
    pagedCourses: ApiCourseWithDepartment[];
    activeFilters: SearchFilters; // Required for section-level hiding
    pinnedCourses: Set<number>;
    setPinnedCourses: React.Dispatch<React.SetStateAction<Set<number>>>;
    expandedCourseIds: Set<number>;
    setExpandedCourseIds: React.Dispatch<React.SetStateAction<Set<number>>>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
}

export default function CourseList({
    pagedCourses,
    activeFilters,
    pinnedCourses,
    setPinnedCourses,
    expandedCourseIds,
    setExpandedCourseIds,
    sectionsByCourseId,
}: CourseListProps) {
    return (
        <div className="flex flex-col scrollbar-hide">
            {pagedCourses.length > 0 ? (
                pagedCourses.map((course) => {
                    // 1. Get all raw sections for this course
                    const rawSections = sectionsByCourseId.get(course.id) ?? [];

                    // 2. Filter sections so the UI only shows what matches the search
                    // This ensures "Spring 2026" disappears if "Fall 2025" is searched
                    const visibleSections = rawSections.filter(
                        (section) =>
                            SectionRules.sectionMatchesTerm(
                                section,
                                activeFilters.term
                            ) &&
                            SectionRules.sectionMatchesInstructor(
                                section,
                                activeFilters.instructorName
                            ) &&
                            SectionRules.sectionMatchesDays(
                                section,
                                activeFilters.days
                            ) &&
                            SectionRules.sectionMatchesDuration(
                                section,
                                activeFilters.duration
                            )
                    );

                    return (
                        <Course
                            key={course.id}
                            {...course}
                            isPinned={pinnedCourses.has(course.id)}
                            onTogglePin={() =>
                                setPinnedCourses((prev) => {
                                    const next = new Set(prev);
                                    next.has(course.id)
                                        ? next.delete(course.id)
                                        : next.add(course.id);
                                    return next;
                                })
                            }
                            isSectionExpanded={expandedCourseIds.has(course.id)}
                            onToggleSectionExpand={() =>
                                setExpandedCourseIds((prev) => {
                                    const next = new Set(prev);
                                    next.has(course.id)
                                        ? next.delete(course.id)
                                        : next.add(course.id);
                                    return next;
                                })
                            }
                            // Pass ONLY the sections that match the user's current search
                            sections={visibleSections}
                        />
                    );
                })
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Search size={48} className="mb-4 opacity-10" />
                    <p className="text-lg font-medium tracking-tight">
                        No courses match your search
                    </p>
                </div>
            )}
        </div>
    );
}
