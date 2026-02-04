import clsx from 'clsx';
import { User, Copy, Check } from 'lucide-react';
import type { ApiInstructor } from '../../../types';

interface SectionInstructorsProps {
    copiedId: string | null;
    instructors: ApiInstructor[];
    onCopy: (email: string | null | undefined, id: string) => void;
}

function SectionInstructors({ instructors, copiedId, onCopy }: SectionInstructorsProps) {
    return (
        <div className="flex flex-row items-start gap-2 lg:flex-col lg:items-center lg:justify-center">
            <span className="mt-1 w-24 shrink-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
                Instructors
            </span>
            <div className="flex min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-2">
                {instructors.map((i, idx) => {
                    const instructorId = `${i.id}` || `${i.firstName}-${i.lastName}-${idx}`;
                    const hasEmail = Boolean(i.email);
                    return (
                        <div
                            key={instructorId}
                            className="group/inst relative flex items-center gap-x-1"
                        >
                            <User
                                size={14}
                                className={clsx(
                                    'shrink-0 text-gray-400',
                                    hasEmail && 'group-hover/inst:text-theme-blue cursor-pointer',
                                )}
                            />
                            <span
                                className={clsx(
                                    'text-xs font-semibold text-gray-700 transition-all',
                                    hasEmail &&
                                        'hover:text-theme-blue hover:border-theme-blue/30 cursor-pointer border-b border-transparent',
                                )}
                            >
                                {i.firstName} {i.lastName}
                            </span>
                            {hasEmail && (
                                <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2.5 flex -translate-x-1/2 translate-y-1.5 items-center gap-3 rounded-xl border border-gray-200 bg-white/95 p-2 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover/inst:pointer-events-auto group-hover/inst:visible group-hover/inst:translate-y-0 group-hover/inst:opacity-100">
                                    <span className="ml-1 text-[12px] whitespace-nowrap text-gray-800">
                                        {i.email}
                                    </span>
                                    <button
                                        onClick={() => onCopy(i.email, instructorId)}
                                        className="bg-theme-blue shadow-theme-blue/20 flex cursor-pointer items-center justify-center rounded-lg p-1.5 text-white shadow-md transition-all hover:scale-105 active:scale-95"
                                    >
                                        {copiedId === instructorId ? (
                                            <Check size={14} />
                                        ) : (
                                            <Copy size={14} />
                                        )}
                                    </button>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-7 border-transparent border-t-white/95"></div>
                                </div>
                            )}
                            {idx < instructors.length - 1 && (
                                <span className="text-lg text-gray-600">,</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionInstructors;
