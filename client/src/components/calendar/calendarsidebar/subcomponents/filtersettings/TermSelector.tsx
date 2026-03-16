import clsx from 'clsx';
import { Calendar } from 'lucide-react';
import type { AcademicTerm } from '../../../../../constants';

interface TermSelectorProps {
    selectedTerm: AcademicTerm | null;
    availableTerms: readonly AcademicTerm[];
    onChangeTerm: (term: AcademicTerm) => void;
}

function TermSelector({ selectedTerm, availableTerms, onChangeTerm }: TermSelectorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="bg-theme-blue/10 text-theme-blue flex h-6 w-6 items-center justify-center rounded-md">
                    <Calendar size={13} />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Academic Term
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {availableTerms.map((term) => (
                    <button
                        key={term}
                        onClick={() => onChangeTerm(term)}
                        className={clsx(
                            'cursor-pointer rounded-lg border-2 py-2 text-[12px] font-medium transition-all',
                            selectedTerm === term
                                ? 'bg-theme-blue border-theme-blue text-white'
                                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300',
                        )}
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TermSelector;
