import { Bookmark, RotateCcw, Sparkles } from 'lucide-react';
import CourseList from './subcomponents/CourseList';
import FilterSettings from './subcomponents/filtersettings/FilterSettings';
import React, { useMemo, type Dispatch, type SetStateAction } from 'react';
import type { ApiCourseWithSections, ApiSectionWithRelations } from '../../../types';
import type { CalendarSidebar as CalendarSidebarType } from './useCalendarSidebar';
import clsx from 'clsx';

interface CalendarSidebarProps {
    courses: ApiCourseWithSections[];
    showWeekend: boolean;
    pinnedCourses: Set<number>;
    selectedSections: Set<number>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
    setShowWeekend: (val: boolean) => void;
    setSelectedSections: Dispatch<SetStateAction<Set<number>>>;
    handleSectionSelect: (courseId: number, sectionId: number) => void;
    sidebar: {
        state: CalendarSidebarType['state'];
        actions: CalendarSidebarType['actions'];
        data: CalendarSidebarType['data'];
        refs: CalendarSidebarType['refs'];
    };
}

function CalendarSidebar({
    courses,
    showWeekend,
    pinnedCourses,
    selectedSections,
    sectionsByCourseId,
    setShowWeekend,
    setSelectedSections,
    handleSectionSelect,
    sidebar,
}: CalendarSidebarProps) {
    const sidebarCourses = useMemo(
        () => courses.filter((course) => pinnedCourses.has(course.id)),
        [courses, pinnedCourses],
    );

    return (
        <div className="flex h-full flex-col overflow-hidden bg-white">
            <div className="flex shrink-0 gap-2 border-b border-gray-100 bg-gray-50 p-4">
                <button
                    onClick={() => setShowWeekend(!showWeekend)}
                    className="border-theme-blue text-theme-blue hover:bg-theme-blue flex-1 cursor-pointer rounded-lg border-2 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all hover:text-white"
                >
                    {showWeekend ? 'Hide' : 'Show'} Sat/Sun
                </button>
                <button
                    onClick={() => setSelectedSections(new Set())}
                    className="group flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-4 py-2.5 text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase transition-all hover:border-red-200 hover:bg-white hover:text-red-600 active:scale-95"
                >
                    <RotateCcw
                        size={13}
                        strokeWidth={2.5}
                        className="transition-transform duration-500 group-hover:-rotate-180"
                    />
                    <span>Clear</span>
                </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto bg-white">
                <FilterSettings
                    filterState={{
                        isFilterOpen: sidebar.state.isFilterOpen,
                        selectedTerm: sidebar.state.selectedTerm,
                        selectedDays: sidebar.state.selectedDays,
                        minGap: sidebar.state.minimumGap,
                        timeRange: sidebar.state.timeRange,
                    }}
                    filterActions={{
                        setIsFilterOpen: sidebar.actions.setIsFilterOpen,
                        handleTermChange: sidebar.actions.handleTermChange,
                        toggleDay: sidebar.actions.toggleDay,
                        setMinGap: sidebar.actions.setMinimumGap,
                        onPointerDown: sidebar.actions.onPointerDown,
                    }}
                    days={sidebar.state.daysList}
                    sliderRef={sidebar.refs.sliderRef}
                    SLIDER_MIN={sidebar.state.sliderMin}
                    SLIDER_MAX={sidebar.state.sliderMax}
                    availableTerms={sidebar.data.availableTerms}
                    gapPresets={sidebar.data.gapPresets}
                    maxGap={sidebar.data.maxGap}
                />
                <CourseList
                    expandedId={sidebar.state.expandedId}
                    selectedTerm={sidebar.state.selectedTerm}
                    selectedSections={selectedSections}
                    pinnedCourses={sidebarCourses}
                    sectionsByCourseId={sectionsByCourseId}
                    setExpandedId={sidebar.actions.setExpandedId}
                    onSectionSelect={handleSectionSelect}
                    isCoursesOpen={sidebar.state.isCoursesOpen}
                    setIsCoursesOpen={sidebar.actions.setIsCoursesOpen}
                />
            </div>
            <div className="shrink-0 border-t border-gray-100 bg-white p-5">
                <button
                    disabled={pinnedCourses.size === 0}
                    onClick={sidebar.actions.handleGenerateSchedule}
                    className={clsx(
                        'flex h-12 w-full items-center justify-center gap-3 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all',
                        pinnedCourses.size > 0
                            ? 'from-theme-blue to-theme-blue/70 cursor-pointer bg-linear-to-r text-white shadow-lg active:scale-95'
                            : 'cursor-not-allowed bg-gray-100 text-gray-300',
                    )}
                >
                    <Sparkles size={16} />
                    Generate Schedule
                </button>
            </div>
        </div>
    );
}

export default React.memo(CalendarSidebar);
