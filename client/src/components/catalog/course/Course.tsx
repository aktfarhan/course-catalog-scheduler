import { Bookmark } from 'lucide-react';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import type { ApiSectionWithRelations, ApiDepartment } from '../../../types';
import CourseMeta from './CourseMeta';
import Sections from '../section/Sections';

interface CourseProps {
    title: string;
    code: string;
    department: ApiDepartment;
    isPinned: boolean;
    isSectionExpanded: boolean; // Added
    onTogglePin: () => void;
    onToggleSectionExpand: () => void; // Added
    sections: ApiSectionWithRelations[]; // Added
}

function Course({
    title,
    code,
    department,
    isPinned,
    isSectionExpanded, // Now properly typed
    onTogglePin,
    onToggleSectionExpand, // Now properly typed
    sections, // Now properly typed
}: CourseProps) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const isMultiple = sections.length > 1;
    const isMultipleInstructors = sections[0]?.instructors.length > 1;

    function handleInstructors() {
        if (isMultiple) return 'Multiple';

        let instructors = [];

        if (isMultipleInstructors) {
            for (const instructor of sections[0].instructors) {
                instructors.push(`${instructor.firstName} ${instructor.lastName}`);
            }
            return instructors.join(', ');
        }

        if (sections[0]?.instructors.length === 1)
            return `${sections[0].instructors[0].firstName} ${sections[0].instructors[0].lastName}`;

        return 'TBA';
    }

    function checkOverflow() {
        if (descriptionRef.current) {
            if (isDescriptionExpanded) return;

            const { scrollHeight, clientHeight } = descriptionRef.current;
            setIsOverflowing(scrollHeight > clientHeight);
        }
    }

    useEffect(() => {
        const observer = new ResizeObserver(checkOverflow);
        if (descriptionRef.current) observer.observe(descriptionRef.current);
        checkOverflow();

        return observer.disconnect();
    }, [isDescriptionExpanded]);

    const iconStyles = clsx(
        'transition-all duration-500 ease-out',
        isPinned
            ? 'fill-[#005a8c] text-[#005a8c] scale-110 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]'
            : 'text-gray-400 group-hover:text-gray-600',
    );

    return (
        <div className="max-w-7xl sm:mx-10 mx-4 mt-4">
            <div
                className={clsx(
                    'flex flex-col lg:flex-row items-stretch border-2 border-gray-200 bg-white overflow-hidden relative transition-shadow',
                    isSectionExpanded ? 'rounded-t-xl' : 'rounded-xl hover:shadow-md',
                )}
            >
                <button
                    onClick={onTogglePin}
                    className={clsx(
                        'lg:flex relative items-center justify-center min-w-14 border-r-2 border-gray-100 cursor-pointer transition-all duration-300 group hidden overflow-hidden',
                        isPinned ? 'bg-slate-50' : 'bg-transparent hover:bg-gray-50',
                    )}
                >
                    {isPinned && (
                        <div className="absolute w-1.5 left-0 top-4 bottom-4 bg-theme-blue rounded-r-full"></div>
                    )}
                    <Bookmark
                        size={22}
                        className={`${iconStyles} active:scale-110 transition-transform duration-150 ease-out`}
                    />
                </button>
                <div className="flex flex-col md:flex-row flex-1 items-stretch">
                    <div className="flex-1 relative md:p-6 lg:pr-6 p-5 grow">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onTogglePin();
                            }}
                            className={clsx(
                                'absolute sm:top-5 sm:right-5 lg:hidden top-4 right-4 z-10 p-2.5 rounded-full transition-all duration-300 active:scale-90 shadow-sm cursor-pointer',
                                isPinned
                                    ? 'bg-blue-50 border border-blue-200 shadow-inner'
                                    : 'bg-white/90 backdrop-blur-sm border border-gray-100 hover:bg-gray-50',
                            )}
                        >
                            <Bookmark size={20} className={iconStyles} />
                        </button>
                        <h2 className="font-semibold text-xl text-gray-900 leading-tight pr-10 lg:pr-0">
                            {title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 font-medium text-sm text-gray-600">
                            <span className="px-2 py-0.5 rounded text-gray-700 bg-gray-100">
                                {department.code} {code}
                            </span>
                            <span className="sm:inline hidden text-gray-300">•</span>
                            <span>{handleInstructors()}</span>
                            <span className="sm:inline hidden text-gray-300">•</span>
                            <span>{department.title}</span>
                        </div>
                        <p
                            ref={descriptionRef}
                            onClick={() =>
                                (isOverflowing || isDescriptionExpanded) &&
                                setIsDescriptionExpanded(!isDescriptionExpanded)
                            }
                            className={clsx(
                                'mt-3 text-sm text-gray-600 leading-relaxed select-none',
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
                    <div className="md:block w-px my-6 hidden bg-gray-200" />
                    <CourseMeta
                        showSections={isSectionExpanded}
                        setShowSections={onToggleSectionExpand}
                        sections={sections}
                    />
                </div>
            </div>
            {isSectionExpanded && (
                <div className="w-full">
                    <div className="ml-0 lg:ml-14 border-x-2 border-b-2 border-gray-200 rounded-b-xl bg-white overflow-hidden shadow-inner">
                        <Sections sections={sections} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default React.memo(Course);
