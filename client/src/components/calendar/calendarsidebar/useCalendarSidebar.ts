import { generateSchedulesDFS } from '../../../scheduler';
import type { DayLiteral, AcademicTerm } from '../../../constants';
import type { ApiSectionWithRelations, TimeRange } from '../../../types';
import { useState, useRef, useCallback, useMemo, startTransition } from 'react';
import { CALENDAR_CONFIG, ACADEMIC_TERMS, UI_LIMITS } from '../../../constants';
import type { Dispatch, SetStateAction, PointerEvent as ReactPointerEvent } from 'react';

interface CalendarSideBarParams {
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
    setSelectedSections: Dispatch<SetStateAction<Set<number>>>;
    pinnedCourses: Set<number>;
}

export function useCalendarSidebar({
    sectionsByCourseId,
    setSelectedSections,
    pinnedCourses,
}: CalendarSideBarParams) {
    // ----- UI State -----
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [generatedSchedules, setGeneratedSchedules] = useState<ApiSectionWithRelations[][]>([]);

    // ----- Filter & Range State -----
    const initialDays = useMemo(() => [...CALENDAR_CONFIG.WEEK_DAYS], []);
    const [selectedDays, setSelectedDays] = useState<DayLiteral[]>(initialDays);
    const [selectedTerm, setSelectedTerm] = useState<AcademicTerm>(ACADEMIC_TERMS.TERMS[2]);
    const [minimumGap, setMinimumGap] = useState<number>(UI_LIMITS.PRESETS[1]);
    const [timeRange, setTimeRange] = useState<TimeRange>({
        start: CALENDAR_CONFIG.START_TIME,
        end: CALENDAR_CONFIG.END_TIME,
    });

    // ----- Refs -----
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const draggingRef = useRef<'start' | 'end' | null>(null);
    const trackRectRef = useRef<DOMRect | null>(null);

    // ----- Action Handlers -----

    // Toggle a day in the selectedDays filter
    const toggleDay = useCallback((day: DayLiteral) => {
        setSelectedDays((prev) =>
            // if the day is already selected, remove it; otherwise add it
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    }, []);

    // Filters data, checks for invalid courses, and runs DFS
    const handleGenerateSchedule = useCallback(() => {
        // Map pinned course IDs to their respective sections
        const coursesToSchedule = Array.from(pinnedCourses).map((id) => {
            const allSections = sectionsByCourseId.get(id) || [];
            return {
                id,
                // Filter out sections that lack meeting data
                sections: allSections.filter((s) => s.meetings && s.meetings.length > 0),
            };
        });

        // Identify any course that has no valid sections to schedule
        const invalidCourse = coursesToSchedule.find((c) => c.sections.length === 0);
        if (invalidCourse) {
            setGeneratedSchedules([]);
            setSelectedSections(new Set());
            return;
        }

        // Return if no courses are pinned
        if (coursesToSchedule.length === 0) return;

        // Start a transition to prevent UI not responding during DFS
        startTransition(() => {
            const results = generateSchedulesDFS(coursesToSchedule, {
                selectedDays,
                selectedTerm,
                minimumGap,
                timeRange,
            });

            if (results.length > 0) {
                // Save valid combinations and select the first path
                setGeneratedSchedules(results);

                const firstValidPath = results[0];
                const newSelection = new Set<number>(firstValidPath.map((s) => s.id));
                setSelectedSections(newSelection);
            } else {
                // Reset state if no valid schedules are found
                setGeneratedSchedules([]);
                setSelectedSections(new Set());
            }
        });
    }, [
        sectionsByCourseId,
        pinnedCourses,
        selectedDays,
        selectedTerm,
        minimumGap,
        timeRange,
        setSelectedSections,
    ]);

    // Updates the active term and removes sections that are no longer valid for that term
    const handleTermChange = useCallback(
        (newTerm: AcademicTerm) => {
            setSelectedTerm(newTerm);
            setSelectedSections((prev) => {
                const next = new Set(prev);
                let hasChanges = false;

                // Check every ID in the current selection
                next.forEach((sectionId) => {
                    // Find the section across all courses in this Map
                    let sectionFound = false;
                    for (const sections of sectionsByCourseId.values()) {
                        const s = sections.find((sec) => sec.id === sectionId);
                        if (s && s.term === newTerm) {
                            sectionFound = true;
                            break;
                        }
                    }

                    if (!sectionFound) {
                        next.delete(sectionId);
                        hasChanges = true;
                    }
                });

                return hasChanges ? next : prev;
            });
        },
        [sectionsByCourseId, setSelectedSections],
    );

    const updateSliderValue = useCallback((clientX: number) => {
        if (!draggingRef.current || !trackRectRef.current) return;

        // Capture which thumb is active now, before the async state update
        const thumb = draggingRef.current;

        // Use the cached rect from the element that received the pointer down
        const rect = trackRectRef.current;

        // Convert pointer position to a 0–1 percentage
        const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);

        // Convert percentage to time value
        const range = CALENDAR_CONFIG.END_TIME - CALENDAR_CONFIG.START_TIME;
        const rawValue = CALENDAR_CONFIG.START_TIME + percent * range;

        // Snap to nearest 0.5 hour increment
        const newValue = Math.round(rawValue * 2) / 2;

        setTimeRange((prev) => {
            // Update start thumb, clamped to stay before end
            if (thumb === 'start') {
                return { ...prev, start: Math.min(newValue, prev.end - 1) };
            }

            // Update end thumb, clamped to stay after start
            return { ...prev, end: Math.max(newValue, prev.start + 1) };
        });
    }, []);

    // Determines which thumb is closer to the tap and captures the pointer to the track
    const onPointerDown = useCallback(
        (e: ReactPointerEvent) => {
            if (e.button !== 0) return;
            e.preventDefault();

            // Cache the rect from the actual visible element that received the event
            trackRectRef.current = (e.currentTarget as HTMLElement).getBoundingClientRect();

            // Calculate which thumb is closer to the tapped position
            const rect = trackRectRef.current;
            const percent = (e.clientX - rect.left) / rect.width;
            const range = CALENDAR_CONFIG.END_TIME - CALENDAR_CONFIG.START_TIME;
            const tappedValue = CALENDAR_CONFIG.START_TIME + percent * range;

            const distToStart = Math.abs(tappedValue - timeRange.start);
            const distToEnd = Math.abs(tappedValue - timeRange.end);
            draggingRef.current = distToStart <= distToEnd ? 'start' : 'end';

            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            updateSliderValue(e.clientX);
        },
        [timeRange, updateSliderValue],
    );

    // Updates the slider value as the pointer moves (only while dragging)
    const onPointerMove = useCallback(
        (e: ReactPointerEvent) => {
            if (!draggingRef.current) return;
            updateSliderValue(e.clientX);
        },
        [updateSliderValue],
    );

    // Resets drag state when the pointer is released or capture is lost
    const onPointerUp = useCallback(() => {
        draggingRef.current = null;
    }, []);

    // ----- Export state, data, refs, and actions -----
    return {
        state: {
            expandedId,
            isFilterOpen,
            isCoursesOpen,
            selectedDays,
            selectedTerm,
            minimumGap,
            timeRange,
            generatedSchedules,
            sliderMin: CALENDAR_CONFIG.START_TIME,
            sliderMax: CALENDAR_CONFIG.END_TIME,
            daysList: CALENDAR_CONFIG.ALL_DAYS,
        },
        data: {
            availableTerms: ACADEMIC_TERMS.TERMS,
            gapPresets: UI_LIMITS.PRESETS,
            maxGap: UI_LIMITS.MAX_GAP,
        },
        refs: {
            sliderRef,
        },
        actions: {
            setExpandedId,
            setIsFilterOpen,
            setIsCoursesOpen,
            setSelectedDays,
            setMinimumGap,
            setTimeRange,
            toggleDay,
            handleTermChange,
            onPointerDown,
            onPointerMove,
            onPointerUp,
            handleGenerateSchedule,
        },
    };
}

export type CalendarSidebar = ReturnType<typeof useCalendarSidebar>;
