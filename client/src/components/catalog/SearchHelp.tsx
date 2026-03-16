import { X } from 'lucide-react';

interface SearchHelpProps {
    onClose: () => void;
}

const FILTERS = [
    { label: 'Course Code', example: 'CS110, MATH140', description: 'Search by exact course code' },
    { label: 'Department', example: 'CS, Biology', description: 'Filter by department code or name' },
    { label: 'Term', example: 'Spring 2026, 2026 Fall', description: 'Filter by academic semester' },
    { label: 'Days', example: 'MWF, TuTh', description: 'Filter by class meeting days' },
    { label: 'Time of Day', example: 'Morning, Evening', description: 'Filter by general time period' },
    { label: 'Time Range', example: '9am - 2pm, 10am to 12pm', description: 'Filter by specific time range' },
    { label: 'Duration', example: '90min, 2hr', description: 'Filter by class length' },
    { label: 'Instructor', example: 'prof Smith, professor Lee', description: 'Search by instructor name' },
    { label: 'Section Type', example: 'Lecture, Discussion', description: 'Filter by section type' },
];

function SearchHelp({ onClose }: SearchHelpProps) {
    return (
        <div className="animate-in fade-in zoom-in-95 w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl duration-200">
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-800">Search Filters</h2>
                    <span className="text-theme-blue border-theme-blue/10 bg-theme-blue/5 rounded-md border px-2 py-0.5 text-[11px] font-bold">
                        {FILTERS.length}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-lg bg-gray-100 p-1.5 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600 active:scale-90"
                >
                    <X size={14} strokeWidth={2.5} />
                </button>
            </div>
            <p className="mb-4 text-[12px] text-slate-400">
                Separate multiple filters with commas
            </p>
            <div className="flex flex-col gap-2">
                {FILTERS.map((filter) => (
                    <div
                        key={filter.label}
                        className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3"
                    >
                        <span className="w-24 shrink-0 text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                            {filter.label}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-gray-700">
                                {filter.description}
                            </span>
                            <span className="mt-0.5 text-[11px] text-slate-400 font-space">
                                {filter.example}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchHelp;
