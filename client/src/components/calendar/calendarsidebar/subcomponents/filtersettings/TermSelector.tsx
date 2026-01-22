import { Calendar } from 'lucide-react';
import clsx from 'clsx';

const TERMS = ['2025 Fall', '2026 Winter', '2026 Spring', '2026 Summer'];

export default function TermSelector({ selectedTerm, onChange }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Calendar size={12} /> Academic Term
            </label>
            <div className="grid grid-cols-2 gap-2">
                {TERMS.map((term) => (
                    <button
                        key={term}
                        onClick={() => onChange(term)}
                        className={clsx(
                            'py-2 rounded-xl text-[11px] font-semibold border-2 transition-all',
                            selectedTerm === term
                                ? 'border-theme-blue bg-white text-theme-blue shadow-sm'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200',
                        )}
                    >
                        {term}
                    </button>
                ))}
            </div>
        </div>
    );
}
