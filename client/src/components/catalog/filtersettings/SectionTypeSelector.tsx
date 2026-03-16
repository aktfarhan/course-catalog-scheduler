import clsx from 'clsx';
import { BookOpen } from 'lucide-react';
import type { SectionType } from '../../../types';

interface SectionTypeSelectorProps {
    types: readonly string[];
    selectedType: SectionType | undefined | null;
    searchQuery: string;
    onSelect: (type: string) => void;
}

function SectionTypeSelector({
    types,
    selectedType,
    searchQuery,
    onSelect,
}: SectionTypeSelectorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="bg-theme-blue/10 text-theme-blue flex h-6 w-6 items-center justify-center rounded-md">
                    <BookOpen size={13} />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Type
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {types.map((type) => {
                    const isSelected =
                        selectedType === type.toUpperCase() ||
                        searchQuery?.toLowerCase().includes(type.toLowerCase());

                    return (
                        <button
                            key={type}
                            onClick={() => onSelect(type)}
                            className={clsx(
                                'cursor-pointer rounded-lg border-2 py-2 text-[12px] font-medium transition-all',
                                isSelected
                                    ? 'bg-theme-blue border-theme-blue text-white'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300',
                            )}
                        >
                            {type}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default SectionTypeSelector;
