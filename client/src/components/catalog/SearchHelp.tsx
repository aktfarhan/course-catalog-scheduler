import { X } from 'lucide-react';

interface SearchHelpProps {
    onClose: () => void;
}

const FILTERS = [
    {
        label: 'Department',
        example: 'CS, Biology',
        description: 'Filter by department code or name',
    },
    {
        label: 'Term',
        example: 'Spring 2026, 2026 Fall',
        description: 'Filter by academic semester',
    },
    { label: 'Days', example: 'MWF, TuTh', description: 'Filter by class meeting days' },
    { label: 'Course Code', example: 'CS110, MATH140', description: 'Search by exact course code' },
    {
        label: 'Instructor',
        example: 'prof Smith, professor Lee',
        description: 'Search by instructor name',
    },
    {
        label: 'Time Range',
        example: 'Morning, 9am - 2pm',
        description: 'Filter by time period or range',
    },
    { label: 'Duration', example: '90min, 2hr', description: 'Filter by class length' },
    {
        label: 'Section Type',
        example: 'Lecture, Discussion',
        description: 'Filter by section type',
    },
];

function SearchHelp({ onClose }: SearchHelpProps) {
    return (
        <div className="max-h-[calc(100vh-12rem)] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
            <p className="mb-4 text-[12px] text-slate-400">Separate multiple filters with commas</p>
            <div className="flex flex-col gap-2">
                {FILTERS.map((filter, i) => (
                    <div
                        key={filter.label}
                        className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3"
                    >
                        <div className="flex w-28 shrink-0 items-center gap-1">
                            <span className="font-space text-[11px] font-bold text-slate-300">
                                [{i + 1}]
                            </span>
                            <span className="text-[11px] font-bold tracking-wide text-slate-500 uppercase">
                                {filter.label}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-gray-700">
                                {filter.description}
                            </span>
                            <span className="font-space mt-0.5 text-[11px] text-slate-400">
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
