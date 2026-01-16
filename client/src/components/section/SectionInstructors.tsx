import { User, Copy, Check } from 'lucide-react';
import type { ApiInstructor } from '../../types';

interface SectionInstructorsProps {
    instructors: ApiInstructor[];
    copiedId: string | null;
    onCopy: (email: string | null | undefined, id: string) => void;
}

function SectionInstructors({
    instructors,
    copiedId,
    onCopy,
}: SectionInstructorsProps) {
    return (
        <div className="flex flex-row lg:flex-col items-start lg:items-center lg:justify-center gap-2">
            <span className="lg:hidden w-24 shrink-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Instructors
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 min-w-0">
                {instructors.map((i, idx) => {
                    const instructorId =
                        `${i.id}` || `${i.firstName}-${i.lastName}-${idx}`;
                    return (
                        <div
                            key={instructorId}
                            className="group/inst relative flex items-center gap-2"
                        >
                            <User
                                size={14}
                                className="text-gray-400 group-hover/inst:text-theme-blue shrink-0"
                            />
                            <span className="cursor-pointer font-semibold text-gray-700 hover:text-theme-blue border-b border-transparent hover:border-theme-blue/30 transition-all text-xs">
                                {i.firstName} {i.lastName}
                            </span>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 mb-2.5 -translate-x-1/2 flex items-center gap-3 rounded-xl bg-white/95 backdrop-blur-sm border border-gray-200 p-2.5 shadow-xl opacity-0 invisible pointer-events-none translate-y-1.5 transition-all duration-300 group-hover/inst:opacity-100 group-hover/inst:visible group-hover/inst:pointer-events-auto group-hover/inst:translate-y-0 z-50">
                                <span className="text-[12px] text-gray-800 ml-1 whitespace-nowrap">
                                    {i.email}
                                </span>
                                <button
                                    onClick={() =>
                                        onCopy(i.email, instructorId)
                                    }
                                    className="cursor-pointer p-1.5 bg-theme-blue text-white rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md shadow-theme-blue/20 flex items-center justify-center"
                                >
                                    {copiedId === instructorId ? (
                                        <Check size={14} />
                                    ) : (
                                        <Copy size={14} />
                                    )}
                                </button>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-white/95"></div>
                            </div>
                            {idx < instructors.length - 1 && (
                                <span className="text-gray-300 text-xs -ml-1">
                                    ,
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionInstructors;
