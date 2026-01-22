import { useAppController } from './hooks/useAppController';
import CatalogPage from './pages/CatalogPage';
import CalendarPage from './pages/CalendarPage';
import FilterSidebar from './components/catalog/FilterSideBar';
import CalendarSidebar from './components/calendar/calendarsidebar/CalendarSideBar';
import NavigationTabs from './components/layout/NavigationTabs';
import MobileSettingsDrawer from './components/layout/MobileSettingsDrawer';

export default function App() {
    const controller = useAppController();

    return (
        <main className="h-screen w-full bg-gray-50 flex justify-center antialiased overflow-hidden relative">
            {controller.state.isPanelOpen && <MobileSettingsDrawer controller={controller} />}

            <div className="flex w-full h-full">
                <aside className="hidden 2xl:flex w-80 shrink-0 border-r border-gray-200 bg-white flex-col">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-theme-blue rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100">
                                U
                            </div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tighter">
                                UMB CATALOG
                            </h1>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {controller.state.activeTab === 'catalog' ? (
                            <FilterSidebar
                                lookupData={controller.data.lookupData}
                                filters={controller.data.activeFilters}
                                searchQuery={controller.state.searchQuery}
                                onFilterChange={controller.actions.handleSidebarFilter}
                            />
                        ) : (
                            <CalendarSidebar controller={controller} />
                        )}
                    </div>
                </aside>
                <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden h-full relative">
                    <NavigationTabs
                        activeTab={controller.state.activeTab}
                        setActiveTab={controller.actions.setActiveTab}
                        totalResults={controller.state.totalResults}
                    />

                    <div className="flex-1 flex flex-col overflow-hidden relative">
                        {controller.state.activeTab === 'catalog' ? (
                            <CatalogPage controller={controller} />
                        ) : (
                            <CalendarPage controller={controller} />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
