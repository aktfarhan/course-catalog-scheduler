import CatalogPage from './pages/CatalogPage';
import CalendarPage from './pages/CalendarPage';
import { useAppController } from './hooks/useAppController';
import NavigationTabs from './components/layout/NavigationTabs';
import MobileSettingsDrawer from './components/layout/MobileSettingsDrawer';
import FilterSidebar from './components/catalog/filtersettings/FilterSidebar';
import CalendarSidebar from './components/calendar/calendarsidebar/CalendarSidebar';

function App() {
    const { data, state, refs, actions } = useAppController();

    return (
        <main className="relative flex h-screen w-full justify-center overflow-hidden bg-gray-50 antialiased">
            {state.isPanelOpen && (
                <MobileSettingsDrawer data={data} state={state} actions={actions} refs={refs} />
            )}
            <div className="flex h-full w-full">
                <aside className="hidden w-80 shrink-0 flex-col border-r border-gray-200 bg-white xl:flex">
                    <div className="relative p-8 select-none">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-16 items-center justify-center rounded-xl bg-linear-to-b from-[#006da8] to-[#004a75] text-lg font-black tracking-wide text-white ring-1 ring-inset ring-white/10 shadow-md shadow-blue-200/40 font-space">
                                UMB
                            </div>
                            <div>
                                <h1 className="text-xl leading-tight font-extrabold tracking-tight font-space">
                                    <span className="text-gray-800">Course</span>{' '}
                                    <span className="text-theme-blue">Search</span>
                                </h1>
                                <p className="mt-0.5 text-[10px] font-medium tracking-widest text-slate-400 uppercase">
                                    UMass Boston
                                </p>
                            </div>
                        </div>
                        <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-theme-blue/20 to-transparent" />
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {state.activeTab === 'catalog' ? (
                            <FilterSidebar
                                filters={data.activeFilters}
                                isLoading={data.isLoading}
                                searchQuery={state.searchQuery}
                                departmentMap={data.lookupData.departmentMap}
                                onFilterChange={actions.handleSidebarFilter}
                            />
                        ) : (
                            <CalendarSidebar
                                courses={data.courses}
                                showWeekend={state.showWeekend}
                                pinnedCourses={state.pinnedCourses}
                                selectedSections={state.selectedSections}
                                sectionsByCourseId={data.sectionsByCourseId}
                                setShowWeekend={actions.setShowWeekend}
                                setSelectedSections={actions.setSelectedSections}
                                handleSectionSelect={actions.handleSectionSelect}
                                sidebar={{
                                    state: state.calendarSidebar,
                                    actions: actions.calendarSidebar,
                                    data: data.calendarSidebar,
                                    refs: refs.calendarSidebar,
                                }}
                            />
                        )}
                    </div>
                </aside>
                <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white">
                    <NavigationTabs
                        activeTab={state.activeTab}
                        setActiveTab={actions.setActiveTab}
                        totalResults={state.totalResults}
                    />
                    <div className="relative flex flex-1 flex-col overflow-hidden">
                        {state.activeTab === 'catalog' ? (
                            <CatalogPage data={data} state={state} refs={refs} actions={actions} />
                        ) : (
                            <CalendarPage
                                data={data}
                                state={state}
                                actions={actions}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
