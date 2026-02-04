import clsx from 'clsx';
import CourseCard from './CourseCard';
import { useCallback, useMemo } from 'react';
import { Bookmark, ChevronDown } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import type { AcademicTerm } from '../../../../constants';
import type { ApiCourseWithSections } from '../../../../types';
import type { ApiSectionWithRelations } from '../../../../types';

interface CourseListProps {
    expandedId: number | null;
    selectedTerm: AcademicTerm;
    isCoursesOpen: Boolean;
    pinnedCourses: ApiCourseWithSections[];
    selectedSections: Set<number>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
    setExpandedId: Dispatch<SetStateAction<number | null>>;
    onSectionSelect: (courseId: number, sectionId: number) => void;
    setIsCoursesOpen: Dispatch<SetStateAction<boolean>>;
}

function CourseList({
    expandedId,
    selectedTerm,
    pinnedCourses,
    isCoursesOpen,
    selectedSections,
    sectionsByCourseId,
    setExpandedId,
    onSectionSelect,
    setIsCoursesOpen,
}: CourseListProps) {
    const handleExpand = useCallback(
        (courseId: number) => {
            setExpandedId((prev) => (prev === courseId ? null : courseId));
        },
        [setExpandedId],
    );

    const filteredSectionsMap = useMemo(() => {
        const map = new Map<number, ApiSectionWithRelations[]>();
        pinnedCourses.forEach((course) => {
            const sections = sectionsByCourseId.get(course.id) || [];
            map.set(
                course.id,
                sections.filter((s) => s.term === selectedTerm),
            );
        });
        return map;
    }, [pinnedCourses, sectionsByCourseId, selectedTerm]);

    return (
        <div className="border-b border-gray-100 bg-gray-50/50">
            <button
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                className="flex w-full cursor-pointer items-center justify-between p-5 hover:bg-gray-100/60"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-theme-blue rounded-lg p-2 text-white shadow-md shadow-blue-100">
                        <Bookmark size={18} />
                    </div>
                    <span className="text-[12px] font-bold text-gray-900">Pinned Courses</span>
                    <div className="text-theme-blue border-theme-blue/10 bg-theme-blue/5 rounded-md border px-2 py-0.5 text-[11px] font-bold">
                        {pinnedCourses.length}
                    </div>
                </div>
                <ChevronDown
                    size={18}
                    className={clsx(
                        'text-gray-400 transition-transform duration-200 ease-in-out',
                        isCoursesOpen && '-rotate-180',
                    )}
                />
            </button>
            {isCoursesOpen && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-1 flex flex-col gap-3 px-5 pb-5">
                    {pinnedCourses.length > 0 ? (
                        pinnedCourses.map((course: ApiCourseWithSections) => {
                            const isExpanded = expandedId === course.id;
                            const sections = filteredSectionsMap.get(course.id)!;
                            return (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    sections={sections}
                                    isExpanded={isExpanded}
                                    selectedSections={selectedSections}
                                    onSectionSelect={onSectionSelect}
                                    onExpandCourse={() => handleExpand(course.id)}
                                />
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-4 text-center">
                            <span className="text-[11px] font-medium text-gray-400 italic">
                                No courses pinned yet.
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CourseList;
