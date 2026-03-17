import Separator from '../../Separator';
import { RotateCcw } from 'lucide-react';
import TimeSelector from './TimeSelector';
import DepartmentSelector from './DepartmentSelector';
import SectionTypeSelector from './SectionTypeSelector';
import { FILTER_CATEGORIES, type AcademicTerm } from '../../../constants';
import TermSelector from '../../calendar/calendarsidebar/subcomponents/filtersettings/TermSelector';
import ActiveDaysSelector from '../../calendar/calendarsidebar/subcomponents/filtersettings/ActiveDaysSelector';
import type { ApiDepartmentWithRelations, SearchFilters, FilterType } from '../../../types';

interface FilterSidebarProps {
    filters: SearchFilters;
    isLoading: boolean;
    searchQuery: string;
    departmentMap: Map<string, ApiDepartmentWithRelations>;
    onFilterChange: (type: FilterType, value: string) => void;
}

function FilterSidebar({
    filters,
    isLoading,
    searchQuery,
    departmentMap,
    onFilterChange,
}: FilterSidebarProps) {
    return (
        <div className="flex h-full flex-col bg-white select-none">
            <div className="flex-1 space-y-5 overflow-y-auto p-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <TermSelector
                    availableTerms={[...FILTER_CATEGORIES.TERMS]}
                    selectedTerm={filters.term as AcademicTerm}
                    onChangeTerm={(term) => onFilterChange('term', term)}
                />
                <ActiveDaysSelector
                    days={[...FILTER_CATEGORIES.DAYS]}
                    selectedDays={filters.days}
                    toggleDay={(day) => onFilterChange('day', day)}
                />
                <TimeSelector
                    times={[...FILTER_CATEGORIES.TIMES]}
                    selectedTime={filters.timeRange}
                    onSelect={(t) => onFilterChange('timeRange', t)}
                />
                <SectionTypeSelector
                    types={[...FILTER_CATEGORIES.TYPES]}
                    selectedType={filters.sectionType}
                    searchQuery={searchQuery}
                    onSelect={(type) => onFilterChange('sectionType', type)}
                />
                <Separator />
                <DepartmentSelector
                    isLoading={isLoading}
                    departmentMap={departmentMap}
                    selectedDeptCode={filters.departmentCode}
                    onSelect={(code) => onFilterChange('departmentCode', code)}
                />
            </div>
            <div className="relative p-5">
                <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
                <button
                    type="button"
                    onClick={() => onFilterChange('clear', '')}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-slate-200 bg-slate-50 py-2.5 text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase transition-all hover:bg-slate-100 hover:text-slate-500 active:scale-[0.97]"
                >
                    <RotateCcw
                        size={13}
                        strokeWidth={2.5}
                        className="transition-transform duration-500 group-hover:-rotate-180"
                    />
                    <span>Reset Filters</span>
                </button>
                <div className="mt-3 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
                <div className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-slate-400">
                    <span className="text-xs font-bold tracking-wide uppercase font-space">Data Update:</span>
                    <span className="text-sm font-bold tabular-nums tracking-widest font-space">48:05:32</span>
                    <span className="-ml-0.5 text-xs font-normal text-slate-300">ago</span>
                </div>
            </div>
        </div>
    );
}

export default FilterSidebar;
