import { RotateCcw } from 'lucide-react';
import type { ApiDepartmentWithRelations } from '../../../types';
import type { SearchFilters } from '../../../types';
import { FILTER_CATEGORIES, type AcademicTerm } from '../../../constants';
import TermSelector from '../../calendar/calendarsidebar/subcomponents/filtersettings/TermSelector';
import ActiveDaysSelector from '../../calendar/calendarsidebar/subcomponents/filtersettings/ActiveDaysSelector';
import DepartmentSelector from './DepartmentSelector';
import TimeSelector from './TimeSelector';
import Separator from '../../Separator';
import SectionTypeSelector from './SectionTypeSelector';
import type { FilterType } from '../../../types';

interface FilterSidebarProps {
    departmentMap: Map<string, ApiDepartmentWithRelations>;
    filters: SearchFilters;
    searchQuery: string;
    onFilterChange: (type: FilterType, value: any) => void;
}

function FilterSidebar({
    filters,
    searchQuery,
    departmentMap,
    onFilterChange,
}: FilterSidebarProps) {
    return (
        <div className="flex h-full flex-col border-gray-100 bg-white select-none">
            <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6">
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
                    departmentMap={departmentMap}
                    selectedDeptCode={filters.departmentCode}
                    onSelect={(code) => onFilterChange('departmentCode', code)}
                />
            </div>
            <div className="border-t border-gray-100 bg-gray-50/30 p-5">
                <button
                    onClick={() => onFilterChange('clear', '')}
                    className="group flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border-2 border-gray-200 py-3 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase transition-all hover:border-red-200 hover:bg-white hover:text-red-600 active:scale-95"
                >
                    <RotateCcw
                        size={14}
                        strokeWidth={2.5}
                        className="transition-transform duration-500 group-hover:-rotate-180"
                    />
                    <span>Reset</span>
                </button>
            </div>
        </div>
    );
}

export default FilterSidebar;
