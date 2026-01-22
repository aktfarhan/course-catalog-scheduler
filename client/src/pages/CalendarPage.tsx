import WeeklyCalendar from '../components/calendar/WeeklyCalendar';
import { Sparkles, PanelRightOpen } from 'lucide-react';
import clsx from 'clsx';
import type { AppController } from '../hooks/useAppController';

interface CatalogPageProps {
    controller: AppController;
}

function CalendarPage({ controller }: CatalogPageProps) {
    const { data, state, actions } = controller;

    return (
        <div className="flex-1 relative bg-white overflow-hidden">
            <WeeklyCalendar
                courses={data.courses}
                selectedSections={state.selectedSections}
                sectionsByCourseId={data.sectionsByCourseId}
                showWeekend={state.showWeekend}
            />
            <div className="absolute w-[92%] max-w-sm 2xl:hidden bottom-8 left-1/2 -translate-x-1/2 z-40">
                <div className="flex items-center border border-white/20 bg-white/80 backdrop-blur-2xl shadow-2xl rounded-3xl p-2.5 gap-2.5 ring-1 ring-black/5">
                    <button
                        disabled={state.pinnedCourses.size === 0}
                        onClick={actions.handleGenerateSchedule}
                        className={clsx(
                            'flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase text-[11px] tracking-widest',
                            state.pinnedCourses.size > 0
                                ? 'bg-linear-to-r from-theme-blue to-cyan-500 text-white shadow-lg active:scale-95'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed',
                        )}
                    >
                        <Sparkles size={16} />
                        {state.isGenerating ? 'Analyzing...' : 'Generate Schedule'}
                    </button>
                    <button
                        onClick={() => actions.setIsPanelOpen(true)}
                        className="w-16 h-14 rounded-2xl bg-theme-blue text-white flex items-center justify-center shadow-lg active:rotate-12 transition-all"
                    >
                        <PanelRightOpen size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
