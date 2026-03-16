import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { Search, Building2, X } from 'lucide-react';
import type { ApiDepartmentWithRelations } from '../../../types';

interface DepartmentSelectorProps {
    departmentMap: Map<string, ApiDepartmentWithRelations>;
    selectedDeptCode: string | undefined | null;
    onSelect: (code: string) => void;
}

function DepartmentSelector({
    departmentMap,
    selectedDeptCode,
    onSelect,
}: DepartmentSelectorProps) {
    const [departmentSearch, setDepartmentSearch] = useState('');

    const filteredDepts = useMemo(() => {
        const departments = Array.from(departmentMap.values());
        const query = departmentSearch.toLowerCase();
        const filtered = departments.filter(
            (d) => d.title.toLowerCase().includes(query) || d.code.toLowerCase().includes(query),
        );
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
    }, [departmentMap, departmentSearch]);

    return (
        <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2">
                    <span className="bg-theme-blue/10 text-theme-blue flex h-6 w-6 items-center justify-center rounded-md">
                        <Building2 size={13} />
                    </span>
                    <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                        Departments
                    </span>
                </h3>
                <span className="text-theme-blue border-theme-blue/10 bg-theme-blue/5 rounded-md border px-2 py-0.5 text-[11px] font-bold">
                    {filteredDepts.length}
                </span>
            </div>
            <div className="relative mb-3">
                <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400" size={14} />
                <input
                    type="text"
                    spellCheck="false"
                    placeholder="Search departments..."
                    value={departmentSearch}
                    onChange={(e) => setDepartmentSearch(e.target.value)}
                    className={clsx(
                        'h-10 w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-9 text-left text-xs font-semibold transition-all outline-none focus:border-slate-300 focus:bg-white placeholder:text-slate-400',
                        departmentSearch ? 'pr-8' : 'pr-3',
                    )}
                />
                {departmentSearch && (
                    <button
                        onClick={() => setDepartmentSearch('')}
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded bg-slate-100 p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-600"
                    >
                        <X size={10} />
                    </button>
                )}
            </div>
            <div>
                <div className="h-66 overflow-y-auto rounded-lg border-2 border-slate-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {filteredDepts.length === 0 && (
                        <div className="flex h-full flex-col items-center justify-center gap-2 text-slate-400">
                            <Search size={20} />
                            <span className="text-[11px] font-semibold">No departments found</span>
                        </div>
                    )}
                    {filteredDepts.map((dept) => {
                        const isSelected = selectedDeptCode === dept.code;
                        return (
                            <button
                                key={dept.code}
                                onClick={() => onSelect(dept.code)}
                                className={clsx(
                                    'relative flex w-full cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-3 text-left transition-all',
                                    isSelected
                                        ? 'bg-theme-blue/8 text-theme-blue'
                                        : 'text-slate-600 hover:bg-slate-50/80',
                                )}
                            >
                                {isSelected && (
                                    <div className="bg-theme-blue absolute top-1 bottom-1 left-0 w-0.75 rounded-r-full" />
                                )}
                                <span
                                    className={clsx(
                                        'min-w-14 shrink-0 rounded px-1.5 py-0.5 text-center text-[10px] font-bold tracking-tight font-space uppercase',
                                        isSelected
                                            ? 'bg-theme-blue text-white'
                                            : 'bg-slate-100 text-slate-500',
                                    )}
                                >
                                    {dept.code}
                                </span>
                                <span className="flex min-w-0 items-center text-[11px] leading-snug font-semibold">
                                    <span className="truncate">{dept.title}</span>
                                    <span className="shrink-0 ml-2 flex items-center gap-1.5 font-normal text-slate-400">
                                        <span className="h-0.75 w-0.75 rounded-full bg-slate-300" />
                                        {dept.courses.length}
                                    </span>
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DepartmentSelector;
