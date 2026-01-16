import React, { useState } from 'react';
import { Search, X, Layers, Calendar, Trash2, Landmark, Clock, RotateCcw } from 'lucide-react'; // Suggested icons
import clsx from 'clsx';

interface FilterSidebarProps {
    lookupData: any;
    filters: any;
    searchQuery: string;
    onFilterChange: (type: string, value: any) => void;
}

export default function FilterSidebar({
    lookupData,
    filters,
    searchQuery,
    onFilterChange,
}: FilterSidebarProps) {
    const [deptSearch, setDeptSearch] = useState('');

    const semesters = [
        '2025 Fall',
        '2026 Winter',
        '2026 Spring',
        '2026 Summer',
    ];
    const days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
    const times = ['Morning', 'Afternoon', 'Evening'];
    const types = ['Lecture', 'Discussion'];

    const filteredDepts = Array.from(lookupData.departmentMap.values()).filter(
        (d: any) => d.title.toLowerCase().includes(deptSearch.toLowerCase())
    );

    return (
        <div className="h-full flex flex-col bg-white border-r-2 border-gray-100 select-none">
            {/* Scrollable Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
                {/* 1. Semesters (2x2 Grid) */}
                <section>
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Calendar size={14} /> Semesters
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {semesters.map((term) => (
                            <button
                                key={term}
                                onClick={() => onFilterChange('term', term)}
                                className={clsx(
                                    'py-2.5 rounded-xl border-2 text-[11px] font-bold transition-all',
                                    filters.term === term
                                        ? 'border-theme-blue bg-blue-50 text-theme-blue'
                                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                )}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 2. Days of the Week (Row) */}
                <section>
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Clock size={14} /> Meeting Days
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {days.map((day) => (
                            <button
                                key={day}
                                onClick={() => onFilterChange('days', day)}
                                className={clsx(
                                    'w-9 h-9 rounded-lg border-2 text-[11px] font-bold transition-all flex items-center justify-center',
                                    filters.days?.includes(day)
                                        ? 'border-theme-blue bg-blue-50 text-theme-blue'
                                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                )}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 3. Departments (Fixed Height Search) */}
                <section>
                    <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Landmark size={14} /> Departments
                    </h3>
                    <div className="relative mb-3">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                            size={14}
                        />
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={deptSearch}
                            onChange={(e) => setDeptSearch(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl pl-9 pr-3 py-2 text-xs outline-none focus:border-theme-blue/30 transition-all"
                        />
                    </div>
                    <div className="h-44 overflow-y-auto space-y-0.5 pr-2 custom-scrollbar">
                        {filteredDepts.map((dept: any) => (
                            <button
                                key={dept.code}
                                onClick={() =>
                                    onFilterChange('dept', dept.code)
                                }
                                className={clsx(
                                    'w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all',
                                    filters.departmentCode === dept.code
                                        ? 'text-theme-blue font-bold bg-blue-50/50'
                                        : 'text-gray-500 hover:bg-gray-50'
                                )}
                            >
                                {dept.title}
                            </button>
                        ))}
                    </div>
                </section>

                {/* 4. Time & Type (Combined Grid) */}
                <div className="grid grid-cols-2 gap-8">
                    <section>
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                            Time
                        </h3>
                        <div className="space-y-2">
                            {times.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => onFilterChange('time', t)}
                                    className={clsx(
                                        'w-full py-2 px-3 rounded-lg border-2 text-[10px] font-bold text-left transition-all',
                                        filters.timeRange?.start?.includes(
                                            t.toLowerCase()
                                        ) || searchQuery?.includes(t)
                                            ? 'border-theme-blue bg-blue-50 text-theme-blue'
                                            : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
                            Type
                        </h3>
                        <div className="space-y-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => onFilterChange('type', type)}
                                    className={clsx(
                                        'w-full py-2 px-3 rounded-lg border-2 text-[10px] font-bold text-left transition-all',
                                        filters.sectionType ===
                                            type.toUpperCase() ||
                                            searchQuery?.includes(type)
                                            ? 'border-theme-blue bg-blue-50 text-theme-blue'
                                            : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                    )}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            {/* Fixed Reset Button at Bottom */}
            <div className="p-6 border-t-2 border-gray-50 bg-white">
                <button
                    onClick={() => onFilterChange('clear', '')}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-red-500 hover:border-red-200 transition-all active:scale-95"
                >
                    <RotateCcw size={14} /> Reset All
                </button>
            </div>
        </div>
    );
}
