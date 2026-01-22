import { ChevronDown, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function CourseCard({
    course,
    isExpanded,
    activeSectionId,
    sections,
    onToggle,
    onSectionSelect,
    formatMeetingTime,
}: any) {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className={clsx(
                    'w-full p-3.5 rounded-lg border transition-all duration-200 flex justify-between items-center',
                    isExpanded
                        ? 'bg-white border-theme-blue ring-4 ring-theme-blue/5 shadow-sm'
                        : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm',
                )}
            >
                <div className="flex flex-col text-left">
                    <span className="text-[9px] text-theme-blue font-bold uppercase tracking-wider">
                        {course.department?.code} {course.code}
                    </span>
                    <span className="text-[12px] font-bold text-gray-800 leading-tight truncate max-w-42.5">
                        {course.title}
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className={clsx(
                        'text-gray-300 transition-transform duration-300',
                        isExpanded && 'rotate-180',
                    )}
                />
            </button>

            {isExpanded && (
                <div className="relative ml-5 mt-1.5 pl-3 border-l-2 border-theme-blue/20 flex flex-col gap-1.5 py-1 animate-in slide-in-from-left-2">
                    {sections.length > 0 ? (
                        sections.map((section: any) => (
                            <button
                                key={section.id}
                                onClick={() => onSectionSelect(course.id, section.id)}
                                className={clsx(
                                    'w-full py-2.5 px-4 rounded-lg border text-left flex items-center justify-between transition-all',
                                    activeSectionId === section.id
                                        ? 'bg-theme-blue border-theme-blue text-white shadow-md'
                                        : 'bg-gray-50/80 border-gray-100 text-gray-600 hover:bg-gray-100',
                                )}
                            >
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-bold uppercase leading-none mb-1">
                                        Section {section.sectionNumber}
                                    </span>
                                    <span
                                        className={clsx(
                                            'text-[9px] font-medium',
                                            activeSectionId === section.id
                                                ? 'text-blue-100'
                                                : 'text-gray-400',
                                        )}
                                    >
                                        {formatMeetingTime(section.meetings)}
                                    </span>
                                </div>
                                {activeSectionId === section.id && <CheckCircle2 size={14} />}
                            </button>
                        ))
                    ) : (
                        <div className="py-3 px-4 rounded-lg bg-gray-50 text-center border border-dashed border-gray-200">
                            <span className="text-[10px] text-gray-400 italic">
                                No sections found
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
