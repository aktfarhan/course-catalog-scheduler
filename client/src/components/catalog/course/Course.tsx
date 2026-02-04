import clsx from 'clsx';
import CourseMeta from './CourseMeta';
import { Bookmark } from 'lucide-react';
import Sections from '../section/Sections';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ApiSectionWithRelations, ApiCourseWithDepartment } from '../../../types';

interface CourseProps {
    course: ApiCourseWithDepartment;
    isPinned: boolean;
    sections: ApiSectionWithRelations[];
    isSectionExpanded: boolean;
    onTogglePin: () => void;
    onToggleSectionExpand: () => void;
}

function Course({
    course,
    sections,
    isPinned,
    isSectionExpanded,
    onTogglePin,
    onToggleSectionExpand,
}: CourseProps) {
    // Whether this course has more than one section
    const isMultiple = sections.length > 1;

    // Ref to the description paragraph for overflow measurement
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    // Tracks whether the description actually overflows its container
    const [isOverflowing, setIsOverflowing] = useState(false);

    // Controls whether the course description is expanded or line-clamped
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    // Compute a display-friendly instructor label
    const handleInstructors = useMemo(() => {
        if (isMultiple) return 'Multiple';
        const instructors = sections[0]?.instructors || [];
        if (instructors.length === 0) return 'TBA';
        return instructors
            .map((instructor) => `${instructor.firstName} ${instructor.lastName}`)
            .join(', ');
    }, [isMultiple, sections]);

    // Detect whether the description text overflows its container
    useEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;
        const checkOverflow = () => {
            // scrollHeight (total content height) vs clientHeight (visible height)
            if (!isDescriptionExpanded) {
                setIsOverflowing(element.scrollHeight > element.clientHeight);
            }
        };
        // ResizeObserver handles overflow checks if the window or container size changes
        const observer = new ResizeObserver(checkOverflow);
        observer.observe(element);
        checkOverflow();

        // Cleanup observer on unmount
        return () => observer.disconnect();
    }, [isDescriptionExpanded]);

    // Shared bookmark icon styles based on pinned state
    const iconStyles = clsx(
        'transition-all duration-500 ease-out',
        isPinned
            ? 'fill-theme-blue text-theme-blue scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]'
            : 'text-gray-400 group-hover:text-gray-600',
    );
    return (
        <div className="mx-4 mt-4 max-w-7xl sm:mx-10">
            <div
                className={clsx(
                    'relative flex flex-col items-stretch overflow-hidden border-2 border-gray-200 bg-white transition-shadow lg:flex-row',
                    isSectionExpanded ? 'rounded-t-xl' : 'rounded-xl hover:shadow-sm',
                )}
            >
                <button
                    onClick={onTogglePin}
                    className={clsx(
                        'group relative hidden min-w-14 cursor-pointer items-center justify-center overflow-hidden border-r-2 border-gray-100 transition-all duration-200 lg:flex',
                        isPinned ? 'bg-slate-50' : 'hover:bg-gray-50',
                    )}
                >
                    {isPinned && (
                        <div className="bg-theme-blue absolute top-4 bottom-4 left-0 w-1.5 rounded-r-full"></div>
                    )}
                    <Bookmark
                        size={22}
                        className={`${iconStyles} transition-transform duration-150 ease-out active:scale-110`}
                    />
                </button>
                <div className="flex flex-1 flex-col items-stretch md:flex-row">
                    <div className="relative flex-1 grow p-5 md:p-6 lg:pr-6">
                        <button
                            onClick={() => onTogglePin()}
                            className={clsx(
                                'absolute top-4 right-4 z-10 cursor-pointer rounded-full border p-2.5 shadow-sm transition-all duration-300 active:scale-90 sm:top-5 sm:right-5 lg:hidden',
                                isPinned
                                    ? 'border-blue-200 bg-blue-50 shadow-inner'
                                    : 'border-gray-100 bg-white/90 backdrop-blur-sm hover:bg-gray-50',
                            )}
                        >
                            <Bookmark size={20} className={iconStyles} />
                        </button>
                        <h2 className="pr-10 text-xl leading-tight font-semibold text-gray-900 lg:pr-0">
                            {course.title}
                        </h2>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-gray-600">
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-gray-700">
                                {course.department.code} {course.code}
                            </span>
                            <span className="hidden text-gray-300 sm:inline">•</span>
                            <span>{handleInstructors}</span>
                            <span className="hidden text-gray-300 sm:inline">•</span>
                            <span>{course.department.title}</span>
                        </div>
                        <p
                            ref={descriptionRef}
                            onClick={() =>
                                (isOverflowing || isDescriptionExpanded) &&
                                setIsDescriptionExpanded(!isDescriptionExpanded)
                            }
                            className={clsx(
                                'mt-3 text-sm leading-relaxed text-gray-600 select-none',
                                isDescriptionExpanded ? 'line-clamp-none' : 'line-clamp-2',
                                isOverflowing || isDescriptionExpanded
                                    ? 'cursor-pointer'
                                    : 'cursor-default',
                            )}
                        >
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
                            corporis, dolore itaque pariatur deleniti quisquam exercitationem nihil
                            magnam, repellendus ipsum aliquam neque sed. Cupiditate saepe
                            consectetur molestiae sapiente animi nulla! Lorem ipsum dolor, sit amet
                            consectetur adipisicing elit. Error, vel tenetur corrupti consequuntur
                            recusandae, aut numquam qui quia, explicabo adipisci non velit nihil
                            magnam. Enim ullam dolor quia quo est.
                        </p>
                    </div>
                    <div className="my-6 hidden w-px bg-gray-200 md:block" />
                    <CourseMeta
                        showSections={isSectionExpanded}
                        setShowSections={onToggleSectionExpand}
                        sections={sections}
                    />
                </div>
            </div>
            {isSectionExpanded && (
                <div className="w-full">
                    <div className="ml-0 overflow-hidden rounded-b-xl border-x-2 border-b-2 border-gray-200 bg-white shadow-inner lg:ml-14">
                        <Sections sections={sections} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(Course);
