import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, PanelRightOpen, X, Settings2 } from 'lucide-react';

// Hooks
import { useCatalogData } from './hooks/useCatalogData';
import { useCoursePagination } from './hooks/useCoursePagination';

// Components
import SearchBar from './components/SearchBar';
import CourseList from './components/course/CourseList';
import Pagination from './components/Pagination';
import FilterSidebar from './components/FilterSideBar';
import clsx from 'clsx';
import WeeklyCalendar from './components/WeeklyCalendar';
import CalendarSidebar from './components/CalendarSideBar';

function App() {
    const [expandedCourseIds, setExpandedCourseIds] = useState<Set<number>>(
        new Set()
    );
    const [pinnedCourses, setPinnedCourses] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [jumpValue, setJumpValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'catalog' | 'calendar'>(
        'catalog'
    );
    const [isGenerating, setIsGenerating] = useState(false);

    const canGenerate = pinnedCourses.size > 0;

    const handleGenerateSchedule = () => {
        if (!canGenerate) return;
        setIsGenerating(true);

        // Mock 2026 AI Algorithm Trigger
        setTimeout(() => {
            console.log(
                'Algorithm: Calculating best fit for',
                pinnedCourses.size,
                'courses...'
            );
            // Logic to auto-populate selectedSections based on constraints would go here
            setIsGenerating(false);
        }, 800);
    };

    const [showWeekend, setShowWeekend] = useState(false); // Default to off
    const [selectedSections, setSelectedSections] = useState<
        Map<number, number>
    >(new Map());
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    // Function to handle Section Toggling with exclusive choice (one per course)
    const handleSectionSelect = (courseId: number, sectionId: number) => {
        setSelectedSections((prev) => {
            const newMap = new Map(prev);
            if (newMap.get(courseId) === sectionId) {
                newMap.delete(courseId); // Deselect if already active
            } else {
                newMap.set(courseId, sectionId); // Overwrite with new section
            }
            return newMap;
        });
    };

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const {
        departments,
        courses,
        sections, // Now used for instructor/days/time filtering
        sectionsByCourseId,
        lookupData, // Now used for 0ms smart parsing
        isLoading,
    } = useCatalogData();

    const { pagedCourses, totalPages, totalResults, activeFilters } =
        useCoursePagination({
            courses,
            sections,
            lookupData,
            searchQuery,
            pinnedCourses,
            currentPage,
        });

    // --- ONLY CHANGE HERE: use string keys for sectionsByCourseId ---
    const calendarSectionsByCourseId = React.useMemo(() => {
        const map: Record<string, any[]> = {};
        sections.forEach((section: any) => {
            const key = section.courseId.toString();
            if (!map[key]) {
                map[key] = [];
            }
            map[key].push(section);
        });
        return map;
    }, [sections]);

    // Reset scroll on navigation or search change
    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, searchQuery]);

    const handleJumpPage = (e: React.FormEvent) => {
        e.preventDefault();
        const num = parseInt(jumpValue);
        if (num >= 1 && num <= totalPages) {
            setCurrentPage(num);
            setJumpValue('');
        }
    };

    const handleSidebarFilter = (type: string, value: any) => {
        if (type === 'clear') {
            setSearchQuery('');
            setCurrentPage(1);
            return;
        }

        const valueStr = String(value).trim();
        const currentTokens = searchQuery
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        // Helpers to identify categories
        const isDay = (val: string) =>
            ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].includes(val);
        const isTerm = (val: string) =>
            ['2025 Fall', '2026 Winter', '2026 Spring', '2026 Summer'].includes(
                val
            );
        const isType = (val: string) => ['Lecture', 'Discussion'].includes(val);
        const isTime = (val: string) =>
            ['Morning', 'Afternoon', 'Evening'].includes(val);

        const alreadySelected = currentTokens.some(
            (t) => t.toLowerCase() === valueStr.toLowerCase()
        );

        let newTokens;
        if (alreadySelected) {
            // Toggle OFF
            newTokens = currentTokens.filter(
                (t) => t.toLowerCase() !== valueStr.toLowerCase()
            );
        } else {
            // Toggle ON: Remove previous tokens of the same category (Except for Days, which can have multiple)
            newTokens = currentTokens.filter((t) => {
                if (type === 'term') return !isTerm(t);
                if (type === 'type') return !isType(t);
                if (type === 'time') return !isTime(t);
                if (type === 'dept')
                    return !lookupData.departmentMap.has(t.toUpperCase());
                return true;
            });
            newTokens.push(valueStr);
        }

        setSearchQuery(newTokens.join(', '));
        setCurrentPage(1);
    };

    // Wrapper to ensure searching resets pagination to Page 1
    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    return (
        <main className="h-screen w-full bg-gray-50 flex justify-center antialiased overflow-hidden relative">
            {/* MOBILE OVERLAY DRAWER */}
            {isPanelOpen && activeTab === 'calendar' && (
                <div className="fixed inset-0 z-50 2xl:hidden">
                    <div
                        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
                        onClick={() => setIsPanelOpen(false)}
                    />
                    <div className="absolute top-0 right-0 w-80 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-gray-200">
                        <div className="p-4 flex justify-between items-center border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-2">
                                <Settings2
                                    size={16}
                                    className="text-theme-blue"
                                />
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                                    Settings
                                </span>
                            </div>
                            <button
                                onClick={() => setIsPanelOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={18} className="text-gray-500" />
                            </button>
                        </div>

                        {/* MOBILE CONTROLS: Toggle & Text-Based Clear */}
                        <div className="p-4 bg-gray-50 border-b border-gray-100 flex gap-2">
                            <button
                                onClick={() => setShowWeekend(!showWeekend)}
                                className="flex-1 py-2.5 rounded-xl border-2 border-theme-blue text-theme-blue text-[10px] font-black uppercase tracking-widest hover:bg-theme-blue hover:text-white transition-all"
                            >
                                {showWeekend ? 'Hide Sat/Sun' : 'Show Sat/Sun'}
                            </button>
                            <button
                                onClick={() => setSelectedSections(new Map())}
                                className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all"
                            >
                                Clear
                            </button>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <CalendarSidebar
                                pinnedCourses={pinnedCourses}
                                courses={courses}
                                sectionsByCourseId={calendarSectionsByCourseId}
                                selectedSections={selectedSections}
                                onSectionSelect={handleSectionSelect}
                            />
                        </div>
                    </div>
                </div>
            )}

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

                    {/* DESKTOP CONTROLS: Toggle & Text-Based Clear */}
                    {activeTab === 'calendar' && (
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex gap-2">
                            <button
                                onClick={() => setShowWeekend(!showWeekend)}
                                className="flex-1 py-2 rounded-xl border-2 border-gray-200 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:border-theme-blue hover:text-theme-blue transition-all"
                            >
                                {showWeekend ? 'Hide Sat/Sun' : 'Show Sat/Sun'}
                            </button>
                            <button
                                onClick={() => setSelectedSections(new Map())}
                                className="px-4 py-2 rounded-xl border-2 border-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest hover:border-red-200 hover:text-red-500 transition-all"
                            >
                                Clear
                            </button>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {activeTab === 'catalog' ? (
                            <FilterSidebar
                                lookupData={lookupData}
                                filters={activeFilters}
                                searchQuery={searchQuery}
                                onFilterChange={handleSidebarFilter}
                            />
                        ) : (
                            <CalendarSidebar
                                pinnedCourses={pinnedCourses}
                                courses={courses}
                                sectionsByCourseId={calendarSectionsByCourseId}
                                selectedSections={selectedSections}
                                onSectionSelect={handleSectionSelect}
                            />
                        )}
                    </div>

                    {/* DESKTOP GENERATE BUTTON */}
                    {activeTab === 'calendar' && (
                        <div className="p-6 border-t border-gray-100 bg-white">
                            <button
                                disabled={pinnedCourses.size === 0}
                                onClick={handleGenerateSchedule}
                                className={clsx(
                                    'w-full h-14 rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase text-[11px] tracking-widest',
                                    pinnedCourses.size > 0
                                        ? 'bg-gradient-to-r from-theme-blue to-cyan-500 text-white shadow-xl shadow-blue-100 hover:brightness-105 active:scale-95'
                                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                )}
                            >
                                <Sparkles
                                    size={16}
                                    className={
                                        pinnedCourses.size > 0
                                            ? 'text-white/80'
                                            : ''
                                    }
                                />
                                {isGenerating
                                    ? 'Optimizing...'
                                    : 'Generate Schedule'}
                            </button>
                        </div>
                    )}
                </aside>

                <div className="flex-1 min-w-0 flex flex-col bg-white overflow-hidden h-full relative">
                    <div className="w-full px-10 pt-6 pb-0 flex-shrink-0 bg-gray-50 border-b border-gray-100">
                        <div className="flex items-end gap-1 h-12">
                            <button
                                onClick={() => setActiveTab('catalog')}
                                className={clsx(
                                    'px-10 h-full flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-t-2xl border-t-2 border-x-2',
                                    activeTab === 'catalog'
                                        ? 'bg-white border-gray-200 text-gray-900 translate-y-[1px] z-10'
                                        : 'bg-transparent border-transparent text-gray-400'
                                )}
                            >
                                Catalog
                                <span
                                    className={clsx(
                                        'px-2 py-0.5 rounded-md text-[9px] font-black',
                                        activeTab === 'catalog'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-400'
                                    )}
                                >
                                    {totalResults.toLocaleString()}
                                </span>
                            </button>
                            <button
                                onClick={() => setActiveTab('calendar')}
                                className={clsx(
                                    'px-10 h-full flex items-center justify-center text-[11px] font-black uppercase tracking-[0.15em] transition-all rounded-t-2xl border-t-2 border-x-2',
                                    activeTab === 'calendar'
                                        ? 'bg-white border-gray-200 text-gray-900 translate-y-px z-10'
                                        : 'bg-transparent border-transparent text-gray-400'
                                )}
                            >
                                Calendar
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col overflow-hidden relative">
                        {activeTab === 'catalog' ? (
                            <>
                                <div className="pt-6 bg-white border-b border-gray-50">
                                    <SearchBar
                                        searchQuery={searchQuery}
                                        setSearchQuery={handleSearchChange}
                                        lookupData={lookupData}
                                    />
                                </div>
                                <div
                                    ref={scrollContainerRef}
                                    className="flex-1 overflow-y-auto custom-scrollbar"
                                >
                                    <CourseList
                                        pagedCourses={pagedCourses}
                                        activeFilters={activeFilters}
                                        pinnedCourses={pinnedCourses}
                                        setPinnedCourses={setPinnedCourses}
                                        expandedCourseIds={expandedCourseIds}
                                        setExpandedCourseIds={
                                            setExpandedCourseIds
                                        }
                                        sectionsByCourseId={sectionsByCourseId}
                                    />
                                </div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    jumpValue={jumpValue}
                                    setCurrentPage={setCurrentPage}
                                    setJumpValue={setJumpValue}
                                    handleJumpPage={handleJumpPage}
                                />
                            </>
                        ) : (
                            <div className="flex-1 overflow-hidden bg-white relative">
                                <WeeklyCalendar
                                    selectedSections={selectedSections}
                                    courses={courses}
                                    sectionsByCourseId={
                                        calendarSectionsByCourseId
                                    }
                                    showWeekend={showWeekend}
                                    setShowWeekend={setShowWeekend}
                                />

                                {/* MOBILE ACTION BAR */}
                                <div className="2xl:hidden absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-40">
                                    <div className="bg-white/80 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-2.5 flex items-center gap-2.5 ring-1 ring-black/5">
                                        <button
                                            disabled={pinnedCourses.size === 0}
                                            onClick={handleGenerateSchedule}
                                            className={clsx(
                                                'flex-1 h-14 rounded-2xl flex items-center justify-center gap-3 transition-all font-black uppercase text-[11px] tracking-widest',
                                                pinnedCourses.size > 0
                                                    ? 'bg-gradient-to-r from-theme-blue to-cyan-500 text-white shadow-lg active:scale-95'
                                                    : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                            )}
                                        >
                                            <Sparkles size={16} />
                                            {isGenerating
                                                ? 'Analyzing...'
                                                : 'Generate'}
                                        </button>
                                        <button
                                            onClick={() => setIsPanelOpen(true)}
                                            className="w-16 h-14 rounded-2xl bg-theme-blue text-white flex items-center justify-center shadow-lg active:rotate-12 transition-all"
                                        >
                                            <PanelRightOpen size={22} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
export default App;
