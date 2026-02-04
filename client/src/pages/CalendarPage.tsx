import { PanelRightOpen } from 'lucide-react';
import WeeklyCalendar from '../components/calendar/WeeklyCalendar';
import type { AppController } from '../hooks/useAppController';

interface CatalogPageProps {
    data: AppController['data'];
    state: AppController['state'];
    actions: AppController['actions'];
    schedule: () => void;
}

function CalendarPage({ data, state, actions }: CatalogPageProps) {
    return (
        <div className="relative flex-1 overflow-hidden bg-white">
            <WeeklyCalendar
                selectedSections={state.selectedSections}
                sectionsByCourseId={data.sectionsByCourseId}
                showWeekend={state.showWeekend}
            />
            <div className="absolute right-12 bottom-8 z-40 sm:max-w-sm xl:hidden">
                <div className="flex items-center gap-1 rounded-xl border border-white/20 p-1 shadow-2xl ring-1 ring-black/5 backdrop-blur-2xl">
                    <button
                        onClick={() => actions.setIsPanelOpen(true)}
                        className="bg-theme-blue flex h-12 w-14 cursor-pointer items-center justify-center rounded-xl text-white shadow-lg transition-all active:rotate-12"
                    >
                        <PanelRightOpen size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;
