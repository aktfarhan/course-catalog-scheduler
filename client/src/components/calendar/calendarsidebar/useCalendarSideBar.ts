import { useState, useRef, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ApiSectionWithRelations } from '../../../types/api/section';

interface CalendarSideBarParams {
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
    setSelectedSections: Dispatch<SetStateAction<Map<number, number>>>;
}

export function useCalendarSideBar({
    sectionsByCourseId,
    setSelectedSections,
}: CalendarSideBarParams) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedDays, setSelectedDays] = useState(['M', 'Tu', 'W', 'Th', 'F']);
    const days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
        );
    };

    const [selectedTerm, setSelectedTerm] = useState('2026 Spring');
    const [minGap, setMinGap] = useState(15);
    const [timeRange, setTimeRange] = useState({ start: 8, end: 22 });

    const SLIDER_MIN = 6;
    const SLIDER_MAX = 22;

    const sliderRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef<'start' | 'end' | null>(null);

    const handleTermChange = (newTerm: string) => {
        setSelectedTerm(newTerm);
        setSelectedSections((prev: Map<number, number>) => {
            const newMap = new Map(prev);
            let hasChanges = false;

            newMap.forEach((sectionId, courseId) => {
                const section = sectionsByCourseId
                    .get(courseId)!
                    .find((s: any) => s.id === sectionId);
                if (!section || section.term !== newTerm) {
                    newMap.delete(courseId);
                    hasChanges = true;
                }
            });

            return hasChanges ? newMap : prev;
        });
    };

    const updateSliderValue = useCallback(
        (clientX: number) => {
            if (!draggingRef.current || !sliderRef.current) return;

            const rect = sliderRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max(0, (clientX - rect.left) / rect.width), 1);
            const rawValue = SLIDER_MIN + percent * (SLIDER_MAX - SLIDER_MIN);
            const newValue = Math.round(rawValue * 2) / 2;

            setTimeRange((prev) => {
                if (draggingRef.current === 'start') {
                    return { ...prev, start: Math.min(newValue, prev.end - 1) };
                }
                return { ...prev, end: Math.max(newValue, prev.start + 1) };
            });
        },
        [SLIDER_MIN, SLIDER_MAX],
    );

    const onPointerDown = (thumb: 'start' | 'end') => (e: React.PointerEvent) => {
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

    const formatTimeLabel = useCallback((hour: number) => {
        const hours24 = Math.floor(hour);
        const minutes = hour % 1 === 0.5 ? '30' : '00';

        // Convert 24h to 12h logic
        const meridiem = hours24 >= 12 ? 'pm' : 'am';
        const hours12 = ((hours24 + 11) % 12) + 1;

        return `${hours12}:${minutes}${meridiem}`;
    }, []);

    return {
        expandedId,
        setExpandedId,
        isFilterOpen,
        setIsFilterOpen,
        selectedDays,
        days,
        toggleDay,
        selectedTerm,
        handleTermChange,
        minGap,
        setMinGap,
        timeRange,
        setTimeRange,
        sliderRef,
        SLIDER_MIN,
        SLIDER_MAX,
        onPointerDown,
        formatTimeLabel,
    };
}
