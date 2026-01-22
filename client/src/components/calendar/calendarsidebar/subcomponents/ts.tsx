import { useState, useRef, useCallback, useMemo } from 'react';
import { CALENDAR_CONFIG, ACADEMIC_TERMS, UI_LIMITS } from '../../../../constants';
import type { Dispatch, SetStateAction, PointerEvent as ReactPointerEvent } from 'react';
import type { ApiSectionWithRelations, TimeRange } from '../../../../types';
import type { DayLiteral, AcademicTerm } from '../../../../constants';

interface CalendarSideBarParams {
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
    setSelectedSections: Dispatch<SetStateAction<Map<number, number>>>;
}

export function useCalendarSideBar({
    sectionsByCourseId,
    setSelectedSections,
}: CalendarSideBarParams) {
    // ----- UI State -----
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // ----- Filter & Range State -----
    const initialDays = useMemo(() => [...CALENDAR_CONFIG.DAYS], []);
    const [selectedDays, setSelectedDays] = useState<DayLiteral[]>(initialDays);
    const [selectedTerm, setSelectedTerm] = useState<AcademicTerm>(ACADEMIC_TERMS.TERMS[2]);
    const [minimumGap, setMinimumGap] = useState(UI_LIMITS.PRESETS[1]);
    const [timeRange, setTimeRange] = useState<TimeRange>({
        start: CALENDAR_CONFIG.START_TIME,
        end: CALENDAR_CONFIG.END_TIME,
    });

    // ----- Refs -----
    const sliderRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef<'start' | 'end' | null>(null);

    // ----- Action Handlers -----

    // Toggle a day in the selectedDays filter
    const toggleDay = useCallback((day: DayLiteral) => {
        setSelectedDays((prev) =>
            // if the day is already selected, remove it; otherwise add it
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    }, []);

    // Updates the active term and removes sections that are no longer valid for that term
    const handleTermChange = useCallback(
        (newTerm: AcademicTerm) => {
            setSelectedTerm(newTerm);
            setSelectedSections((prev) => {
                const newMap = new Map(prev);
                let hasChanges = false;

                // Validate each selected section against the new term
                newMap.forEach((sectionId, courseId) => {
                    const section = sectionsByCourseId
                        .get(courseId)!
                        .find((section) => section.id === sectionId);

                    // Remove section if it does not exist or belongs to another term
                    if (!section || section.term !== newTerm) {
                        newMap.delete(courseId);
                        hasChanges = true;
                    }
                });

                // Preserve referential equality if nothing changed
                return hasChanges ? newMap : prev;
            });
        },
        [sectionsByCourseId, setSelectedSections],
    );

    const updateSliderValue = useCallback((clientX: number) => {
        if (!draggingRef.current || !sliderRef.current) return;

        // Get slider bounds
        const rect = sliderRef.current.getBoundingClientRect();

        // Convert pointer position to a 0–1 percentage
        const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);

        // Convert percentage to time value
        const range = CALENDAR_CONFIG.END_TIME - CALENDAR_CONFIG.START_TIME;
        const rawValue = CALENDAR_CONFIG.START_TIME + percent * range;

        // Snap to nearest 0.5 hour increment
        const newValue = Math.round(rawValue * 2) / 2;

        setTimeRange((prev) => {
            // Update start thumb, clamped to stay before end
            if (draggingRef.current === 'start') {
                return { ...prev, start: Math.min(newValue, prev.end - 1) };
            }

            // Update end thumb, clamped to stay after start
            return { ...prev, end: Math.max(newValue, prev.start + 1) };
        });
    }, []);

    /**
     * Pointer-down handler factory for slider thumbs.
     * Registers global pointer listeners so dragging
     * continues even when leaving the slider bounds.
     */
    const onPointerDown = useCallback(
        (thumb: 'start' | 'end') => (e: ReactPointerEvent) => {
            e.preventDefault();
            // Mark which thumb is being dragged
            draggingRef.current = thumb;

            // Handle pointer movement
            const handlePointerMove = (moveEvent: PointerEvent) =>
                updateSliderValue(moveEvent.clientX);

            // Cleanup when dragging ends
            const handlePointerUp = () => {
                draggingRef.current = null;
                window.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('pointerup', handlePointerUp);
            };

            // Attach global listeners
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        },
        [updateSliderValue],
    );

    // Format a numeric hour value (e.g. 13.5) into a 12-hour time string
    const formatTimeLabel = useCallback((hour: number) => {
        const hours24 = Math.floor(hour);
        const minutes = hour % 1 === 0.5 ? '30' : '00';

        // Convert 24-hour time to 12-hour format
        const meridiem = hours24 >= 12 ? 'pm' : 'am';
        const hours12 = ((hours24 + 11) % 12) + 1;

        return `${hours12}:${minutes}${meridiem}`;
    }, []);

    // ----- Export state, data, refs, and actions -----
    return {
        state: {
            expandedId,
            isFilterOpen,
            selectedDays,
            selectedTerm,
            minimumGap,
            timeRange,
            sliderMin: CALENDAR_CONFIG.START_TIME,
            sliderMax: CALENDAR_CONFIG.END_TIME,
            daysList: CALENDAR_CONFIG.DAYS,
        },
        data: {
            availableTerms: ACADEMIC_TERMS.TERMS,
            gapPresets: UI_LIMITS.PRESETS,
        },
        refs: {
            sliderRef,
        },
        actions: {
            setExpandedId,
            setIsFilterOpen,
            setSelectedDays,
            setMinimumGap,
            setTimeRange,
            toggleDay,
            handleTermChange,
            onPointerDown,
            formatTimeLabel,
        },
    };
}

export type CalendarSideBarController = ReturnType<typeof useCalendarSideBar>;
