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
                    <div className="border-b border-gray-100 bg-gray-50/30 p-8 select-none">
                        <div className="flex items-center gap-2">
                            <div className="bg-theme-blue flex h-10 w-14 items-center justify-center rounded-md text-sm font-black text-white shadow-lg shadow-blue-100">
                                UMB
                            </div>
                            <h1 className="flex h-10 items-center rounded-md p-2 text-xl font-extrabold tracking-tighter text-gray-700 uppercase">
                                Course Search
                            </h1>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {state.activeTab === 'catalog' ? (
                            <FilterSidebar
                                filters={data.activeFilters}
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
                                schedule={actions.calendarSidebar.handleGenerateSchedule}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
