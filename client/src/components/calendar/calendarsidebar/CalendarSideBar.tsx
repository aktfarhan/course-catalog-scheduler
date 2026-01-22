import { Bookmark } from 'lucide-react';
import { useCalendarSideBar } from './useCalendarSideBar';
import FilterSettings from './subcomponents/filtersettings/FilterSettings';
import CourseList from './subcomponents/CourseList';
import type { AppController } from '../../../hooks/useAppController';

interface CatalogPageProps {
    controller: AppController;
}

export default function CalendarSidebar({ controller }: CatalogPageProps) {
    const { data, state, actions } = controller;

    const calendarState = useCalendarSideBar({
        sectionsByCourseId: data.sectionsByCourseId,
        setSelectedSections: actions.setSelectedSections,
    });

    const pinnedData = data.courses.filter((c: any) => state.pinnedCourses.has(c.id));

    const formatMeetingTime = (meetings: any[]) => {
        if (!meetings || meetings.length === 0) return 'TBD';
        const formatT = (d: string) =>
            new Date(d).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'UTC',
            });

        const groups: Record<string, string[]> = {};
        meetings.forEach((m) => {
            const k = `${formatT(m.startTime)} - ${formatT(m.endTime)}`;
            groups[k] = [...(groups[k] || []), m.day];
        });

        return Object.entries(groups)
            .map(([t, d]) => `${d.join('')} ${t}`)
            .join(' | ');
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
                <button
                    onClick={() => actions.setShowWeekend(!state.showWeekend)}
                    className="flex-1 py-2.5 rounded-xl border-2 border-theme-blue text-theme-blue text-[10px] font-black uppercase tracking-widest hover:bg-theme-blue hover:text-white transition-all"
                >
                    {state.showWeekend ? 'Hide Sat/Sun' : 'Show Sat/Sun'}
                </button>
                <button
                    onClick={() => actions.setSelectedSections(new Map())}
                    className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all"
                >
                    Clear
                </button>
            </div>

            <FilterSettings {...calendarState} />

            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <Bookmark size={16} className="text-theme-blue/60" />
                        <span className="text-[12px] font-bold text-gray-900">Selection</span>
                    </div>
                    <div className="px-2 py-0.5 bg-theme-blue/5 text-theme-blue rounded-md text-[10px] font-bold border border-theme-blue/10">
                        {pinnedData.length}
                    </div>
                </div>

                <CourseList
                    pinnedData={pinnedData}
                    expandedId={calendarState.expandedId}
                    setExpandedId={calendarState.setExpandedId}
                    selectedSections={state.selectedSections}
                    sectionsByCourseId={data.sectionsByCourseId}
                    selectedTerm={calendarState.selectedTerm}
                    onSectionSelect={actions.handleSectionSelect}
                    formatMeetingTime={formatMeetingTime}
                />
            </div>
        </div>
    );
}
