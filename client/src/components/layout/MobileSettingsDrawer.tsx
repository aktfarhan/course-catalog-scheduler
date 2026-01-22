import { Settings2, X } from 'lucide-react';
import CalendarSidebar from '../calendar/calendarsidebar/CalendarSideBar';
import type { AppController } from '../../hooks/useAppController';

interface MobileSettingsDrawerProps {
    controller: AppController; // Using your AppController
}

export default function MobileSettingsDrawer({ controller }: MobileSettingsDrawerProps) {
    const { state, actions, data } = controller;

    // Only render if the panel is open and we are on the calendar tab (per your Part 2 logic)
    if (!state.isPanelOpen || state.activeTab !== 'calendar') return null;

    return (
        <div className="fixed inset-0 z-50 2xl:hidden">
            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
                onClick={() => actions.setIsPanelOpen(false)}
            />

            {/* DRAWER CONTENT */}
            <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200">
                <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2">
                        <Settings2 size={16} className="text-theme-blue" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                            Settings
                        </span>
                    </div>
                    <button
                        onClick={() => actions.setIsPanelOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* MOBILE CONTROLS (Your Part 2 Logic) */}
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

                <div className="flex-1 overflow-hidden">
                    <CalendarSidebar controller={controller} />
                </div>
            </div>
        </div>
    );
}
