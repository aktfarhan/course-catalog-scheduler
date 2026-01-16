import React, { useState, useRef, useCallback } from 'react';
import {
    ChevronDown,
    Bookmark,
    CheckCircle2,
    Settings2,
    Clock,
    Timer,
    CheckSquare,
    Calendar,
} from 'lucide-react';
import clsx from 'clsx';

export default function CalendarSidebar({
    courses,
    pinnedCourses,
    sectionsByCourseId,
    selectedSections,
    onSectionSelect,
    setSelectedSections,
}: any) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState([
        'M',
        'Tu',
        'W',
        'Th',
        'F',
    ]);
    const days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };
    // 2026 Filter States
    const [selectedTerm, setSelectedTerm] = useState('2026 Spring');
    const [minGap, setMinGap] = useState(15);
    const [timeRange, setTimeRange] = useState({ start: 8, end: 17 });

    // Slider Constants & Refs
    const SLIDER_MIN = 6; // 6 AM
    const SLIDER_MAX = 22; // 10 PM
    const sliderRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef<'start' | 'end' | null>(null);

    // Term Change Handler
    const handleTermChange = (newTerm: string) => {
        setSelectedTerm(newTerm);
        setSelectedSections((prev: Map<number, number>) => {
            const newMap = new Map(prev);
            let hasChanges = false;
            newMap.forEach((sectionId, courseId) => {
                const section = sectionsByCourseId[courseId]?.find(
                    (s: any) => s.id === sectionId
                );
                if (!section || section.term !== newTerm) {
                    newMap.delete(courseId);
                    hasChanges = true;
                }
            });
            return hasChanges ? newMap : prev;
        });
    };

    // Format meeting times for display
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

    // --- Dual-thumb Slider Logic ---
    const updateSliderValue = useCallback(
        (clientX: number) => {
            if (!draggingRef.current || !sliderRef.current) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const percent = Math.min(
                Math.max(0, (clientX - rect.left) / rect.width),
                1
            );
            const rawValue = SLIDER_MIN + percent * (SLIDER_MAX - SLIDER_MIN);

            // Snap to 30-minute increments (0.5)
            const newValue = Math.round(rawValue * 2) / 2;

            setTimeRange((prev) => {
                if (draggingRef.current === 'start') {
                    return { ...prev, start: Math.min(newValue, prev.end - 1) };
                }
                return { ...prev, end: Math.max(newValue, prev.start + 1) };
            });
        },
        [SLIDER_MIN, SLIDER_MAX]
    );

    const onPointerDown =
        (thumb: 'start' | 'end') => (e: React.PointerEvent) => {
            e.preventDefault();
            draggingRef.current = thumb;

            const handlePointerMove = (moveEvent: PointerEvent) => {
                updateSliderValue(moveEvent.clientX);
            };

            const handlePointerUp = () => {
                draggingRef.current = null;
                window.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('pointerup', handlePointerUp);
            };

            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        };

    // Format time label like "8:00 AM" or "12:30 PM"
    const formatTimeLabel = (hour: number) => {
        const h = Math.floor(hour);
        const m = hour % 1 === 0.5 ? ':30' : ':00';
        const period = h >= 12 ? 'PM' : 'AM';
        const displayH = h % 12 || 12;
        return `${displayH}${m} ${period}`;
    };

    const startPercent =
        ((timeRange.start - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
    const endPercent =
        ((timeRange.end - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

    const pinnedData = courses.filter((c: any) => pinnedCourses.has(c.id));

    // Format minGap for display
    const formatGapLabel = (val: number) => {
        if (val === 0) return 'None';
        if (val < 60) return `${val}m`;
        return `${val / 60}h`;
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            {/* TOP SETTINGS SECTION */}
            <div className="border-b border-gray-100 bg-gray-50/50">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-100/50 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-theme-blue rounded-xl text-white shadow-lg shadow-blue-100">
                            <Settings2 size={18} />
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[13px] font-bold text-gray-900 tracking-tight">
                                Schedule Options
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                {selectedTerm}
                            </span>
                        </div>
                    </div>
                    <ChevronDown
                        size={18}
                        className={clsx(
                            'text-gray-400 transition-transform duration-300',
                            isFilterOpen && 'rotate-180'
                        )}
                    />
                </button>

                {isFilterOpen && (
                    <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                        {/* Term Selection */}
                        {/* Academic Term Section */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold  uppercase tracking-widest flex items-center gap-1.5">
                                <Calendar size={12} /> Academic Term
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    '2025 Fall',
                                    '2026 Winter',
                                    '2026 Spring',
                                    '2026 Summer',
                                ].map((term) => (
                                    <button
                                        key={term}
                                        onClick={() => handleTermChange(term)}
                                        className={clsx(
                                            'py-2 rounded-xl text-[11px] font-semibold border-2 transition-all',
                                            selectedTerm === term
                                                ? 'border-theme-blue bg-white text-theme-blue shadow-sm'
                                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                        )}
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="px-6">
                            <div className="border-t border-gray-200" />
                        </div>

                        {/* 2. Active Days Filter Section */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                <CheckSquare size={12} /> Active Days
                            </label>
                            <div className="flex justify-between gap-1">
                                {days.map((day) => {
                                    const isActive = selectedDays.includes(day);
                                    return (
                                        <button
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`flex-1 py-2 text-[11px] font-bold rounded-md border transition-all cursor-pointer
                            ${
                                isActive
                                    ? 'bg-theme-blue border-theme-blue text-white shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-400 hover:border-theme-blue/30'
                            }`}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="px-6">
                            <div className="border-t border-gray-200" />
                        </div>

                        {/* 3. Preferred Window Slider */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <Clock size={12} /> Preferred Window
                                </label>
                                <span className="text-[11px] font-bold text-theme-blue bg-theme-blue/5 px-2 py-0.5 rounded-md border border-theme-blue/10">
                                    {formatTimeLabel(timeRange.start)} -{' '}
                                    {formatTimeLabel(timeRange.end)}
                                </span>
                            </div>

                            <div
                                ref={sliderRef}
                                className="relative h-6 w-full select-none touch-none flex items-center"
                            >
                                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
                                <div
                                    className="absolute h-1.5 bg-theme-blue rounded-full"
                                    style={{
                                        left: `${startPercent}%`,
                                        width: `${endPercent - startPercent}%`,
                                    }}
                                />
                                <div
                                    onPointerDown={onPointerDown('start')}
                                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform -translate-x-1/2"
                                    style={{ left: `${startPercent}%` }}
                                />
                                <div
                                    onPointerDown={onPointerDown('end')}
                                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform -translate-x-1/2"
                                    style={{ left: `${endPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* 4. Minimum Gap Slider (Fixed to match UI) */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <Timer size={12} /> Minimum Gap
                                </label>
                                <span className="text-[11px] font-bold text-theme-blue bg-theme-blue/5 px-2 py-0.5 rounded-md border border-theme-blue/10">
                                    {minGap >= 60
                                        ? `${Math.floor(minGap / 60)}h ${
                                              minGap % 60
                                          }m`
                                        : `${minGap}m`}
                                </span>
                            </div>

                            <div className="relative h-6 w-full flex items-center select-none touch-none">
                                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
                                <div
                                    className="absolute h-1.5 bg-theme-blue rounded-full"
                                    style={{
                                        width: `${(minGap / 300) * 100}%`,
                                    }}
                                />

                                {/* The Invisible Input with specific thumb size for perfect grab */}
                                <input
                                    type="range"
                                    min={0}
                                    max={300}
                                    step={5}
                                    value={minGap}
                                    onChange={(e) =>
                                        setMinGap(parseInt(e.target.value))
                                    }
                                    className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-30 opacity-0
                           [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none
                           [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-none"
                                />

                                {/* The Visual Circle (now matches the Double Slider) */}
                                <div
                                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md pointer-events-none transition-transform -translate-x-1/2"
                                    style={{ left: `${(minGap / 300) * 100}%` }}
                                />
                            </div>

                            <div className="flex gap-1.5">
                                {[0, 15, 60, 120].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => setMinGap(val)}
                                        className={clsx(
                                            'flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all',
                                            minGap === val
                                                ? 'bg-theme-blue border-theme-blue text-white'
                                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                        )}
                                    >
                                        {val === 0
                                            ? 'None'
                                            : val < 60
                                            ? `${val}m`
                                            : `${val / 60}h`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* SELECTION LIST */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <Bookmark size={16} className="text-theme-blue/60" />
                        <span className="text-[12px] font-bold text-gray-900">
                            Selection
                        </span>
                    </div>
                    <div className="px-2 py-0.5 bg-theme-blue/5 text-theme-blue rounded-md text-[10px] font-bold border border-theme-blue/10">
                        {pinnedData.length}
                    </div>
                </div>

                {pinnedData.map((course: any) => {
                    const isExpanded = expandedId === course.id;
                    const activeSectionId = selectedSections.get(course.id);
                    const sections = (
                        sectionsByCourseId[course.id] || []
                    ).filter((s: any) => s.term === selectedTerm);

                    return (
                        <div key={course.id} className="relative">
                            <button
                                onClick={() =>
                                    setExpandedId(isExpanded ? null : course.id)
                                }
                                className={clsx(
                                    'w-full p-3.5 rounded-xl border transition-all duration-200 flex justify-between items-center',
                                    isExpanded
                                        ? 'bg-white border-theme-blue ring-4 ring-theme-blue/5 shadow-sm'
                                        : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                                )}
                            >
                                <div className="flex flex-col text-left">
                                    <span className="text-[9px] text-theme-blue font-bold uppercase tracking-wider">
                                        {course.department?.code} {course.code}
                                    </span>
                                    <span className="text-[12px] font-bold text-gray-800 leading-tight truncate max-w-[170px]">
                                        {course.title}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={clsx(
                                        'text-gray-300 transition-transform duration-300',
                                        isExpanded && 'rotate-180'
                                    )}
                                />
                            </button>

                            {isExpanded && (
                                <div className="relative ml-5 mt-1.5 pl-3 border-l-2 border-theme-blue/20 flex flex-col gap-1.5 py-1 animate-in slide-in-from-left-2">
                                    {sections.length > 0 ? (
                                        sections.map((section: any) => (
                                            <button
                                                key={section.id}
                                                onClick={() =>
                                                    onSectionSelect(
                                                        course.id,
                                                        section.id
                                                    )
                                                }
                                                className={clsx(
                                                    'w-full py-2.5 px-4 rounded-lg border text-left flex items-center justify-between transition-all',
                                                    activeSectionId ===
                                                        section.id
                                                        ? 'bg-theme-blue border-theme-blue text-white shadow-md'
                                                        : 'bg-gray-50/80 border-gray-100 text-gray-600 hover:bg-gray-100'
                                                )}
                                            >
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-bold uppercase leading-none mb-1">
                                                        Section{' '}
                                                        {section.sectionNumber}
                                                    </span>
                                                    <span
                                                        className={clsx(
                                                            'text-[9px] font-medium',
                                                            activeSectionId ===
                                                                section.id
                                                                ? 'text-blue-100'
                                                                : 'text-gray-400'
                                                        )}
                                                    >
                                                        {formatMeetingTime(
                                                            section.meetings
                                                        )}
                                                    </span>
                                                </div>
                                                {activeSectionId ===
                                                    section.id && (
                                                    <CheckCircle2 size={14} />
                                                )}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="py-3 px-4 rounded-lg bg-gray-50 text-center border border-dashed border-gray-200">
                                            <span className="text-[10px] text-gray-400 italic">
                                                No sections found
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
