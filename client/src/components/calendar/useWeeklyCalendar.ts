import { getInstructorNames } from '../../utils/formatInstructorNames';
import { formatTime, formatTimeToMinutes } from '../../utils/formatTime';
import { CALENDAR_CONFIG, COURSE_COLORS, type CourseColor } from '../../constants';
import { useMemo, useState, useRef, useEffect, useCallback, type MouseEvent } from 'react';
import type { ApiSectionWithRelations, Block } from '../../types';

interface UseWeeklyCalendarParams {
    showWeekend: boolean;
    selectedSections: Set<number>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
}

export function useWeeklyCalendar({
    showWeekend,
    selectedSections,
    sectionsByCourseId,
}: UseWeeklyCalendarParams) {
    const { START_TIME, TOTAL_MINS, ALL_DAYS, WEEK_DAYS } = CALENDAR_CONFIG;

    // ----- UI State -----
    const days = showWeekend ? ALL_DAYS : WEEK_DAYS;
    const [gridWidth, setGridWidth] = useState(0);
    const [popover, setPopover] = useState<Block | null>(null);

    // Columns wider than 200px show course code + time on one line
    const isWide = days.length > 0 && gridWidth / days.length >= 200;

    // ----- Refs -----
    const gridRef = useRef<HTMLDivElement>(null);

    // ----- Effects -----

    // Track grid width so isWide can toggle content tiers
    useEffect(() => {
        const element = gridRef.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            setGridWidth(entry.contentRect.width);
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Close popover when sections change or weekend toggle flips
    useEffect(() => {
        setPopover(null);
    }, [selectedSections, showWeekend]);

    // ----- Action Handlers -----

    // Blocks lack a unique ID so compare course, section, day, and time to match
    const handleBlockClick = useCallback((e: MouseEvent, block: Block) => {
        e.stopPropagation();
        // Toggle off if clicking the same block, otherwise switch
        setPopover((prev) =>
            prev &&
            prev.courseCode === block.courseCode &&
            prev.sectionNumber === block.sectionNumber &&
            prev.day === block.day &&
            prev.startMins === block.startMins
                ? null
                : block,
        );
    }, []);

    // Dismiss the popover when clicking the grid background or the X button
    const handlePopoverClose = useCallback(() => setPopover(null), []);

    // ----- Data -----

    // Builds calendar blocks, assigns course colors, and detects conflicts.
    const { activeBlocks, courseColorMap } = useMemo(() => {
        const grouped: Record<string, Block[]> = {};
        const courseCodes = new Set<string>();

        // Pre-fill grouped with empty arrays for M-F or M-Su
        days.forEach((day) => (grouped[day] = []));

        // 1. Build blocks from selected sections, grouped by day
        for (const sections of sectionsByCourseId.values()) {
            for (const section of sections) {
                if (!selectedSections.has(section.id)) continue;

                const courseCode = `${section.course.department.code} ${section.course.code}`;
                const instructors = getInstructorNames(section.instructors);
                courseCodes.add(courseCode);

                // Convert each meeting into a renderable block with time in minutes
                for (const meeting of section.meetings) {
                    const timeRange = formatTime(meeting);
                    const minutes = formatTimeToMinutes(timeRange);
                    if (!minutes) continue;

                    // Only push to days that exist in the current view
                    if (grouped[meeting.day]) {
                        grouped[meeting.day].push({
                            day: meeting.day,
                            endMins: minutes.endMins,
                            location: meeting.location,
                            timeRange,
                            startMins: minutes.startMins,
                            courseCode,
                            columnIndex: 0,
                            instructors,
                            hasConflict: false,
                            totalColumns: 1,
                            sectionNumber: section.sectionNumber,
                        });
                    }
                }
            }
        }

        // 2. Sweep-line conflict detection + greedy column assignment per day
        for (const day of days) {
            const dayBlocks = grouped[day];

            // Skip days with 0 or 1 block, no conflicts possible
            if (dayBlocks.length < 2) continue;

            // Sort by start time so the sweep reads left-to-right
            dayBlocks.sort((a, b) => a.startMins - b.startMins || a.endMins - b.endMins);

            // Track the current collision group's start index and furthest end time
            let groupStart = 0;
            let maxEnd = dayBlocks[0].endMins;

            for (let i = 1; i <= dayBlocks.length; i++) {
                if (i < dayBlocks.length && dayBlocks[i].startMins < maxEnd) {
                    // Push the group boundary forward to the latest end time seen
                    maxEnd = Math.max(maxEnd, dayBlocks[i].endMins);
                    continue;
                }

                // Conflict group [groupStart, i), assign side-by-side columns
                if (i - groupStart > 1) {
                    const columns: Block[][] = [];

                    // Greedy: place each block in the first column with no overlap
                    for (let j = groupStart; j < i; j++) {
                        const block = dayBlocks[j];

                        // Find a column where the last block ends before this one starts
                        const col = columns.findIndex(
                            (c) => c[c.length - 1].endMins <= block.startMins,
                        );

                        if (col !== -1) {
                            // Fit into existing column
                            columns[col].push(block);
                            block.columnIndex = col;
                        } else {
                            // Open a new column
                            block.columnIndex = columns.length;
                            columns.push([block]);
                        }

                        // Mark every block in a multi-block group as conflicting
                        block.hasConflict = true;
                    }

                    // All blocks in the group share the same total column count
                    for (let j = groupStart; j < i; j++) {
                        dayBlocks[j].totalColumns = columns.length;
                    }
                }

                // Reset for the next group
                groupStart = i;
                if (i < dayBlocks.length) maxEnd = dayBlocks[i].endMins;
            }
        }

        // 3. Assign a color to each course
        const colorMap = new Map<string, CourseColor>();
        [...courseCodes].sort().forEach((code, i) => {
            colorMap.set(code, COURSE_COLORS[i % COURSE_COLORS.length]);
        });

        return { activeBlocks: grouped, courseColorMap: colorMap };
    }, [selectedSections, sectionsByCourseId, days]);

    // Compute popover position as CSS percentages so the browser repositions
    const popoverPosition = useMemo(() => {
        if (!popover) return null;

        const dayIndex = days.indexOf(popover.day);
        if (dayIndex === -1) return null;

        const colPercent = 100 / days.length;
        const gap = 8;

        // Show right for the first half of days, left for the second half
        const showRight = dayIndex < days.length / 2;

        const blockTopPercent = ((popover.startMins - START_TIME * 60) / TOTAL_MINS) * 100;

        return showRight
            ? {
                  top: `clamp(0px, ${blockTopPercent}%, calc(100% - 220px))`,
                  left: `calc(${(dayIndex + 1) * colPercent}% + ${gap}px)`,
              }
            : {
                  top: `clamp(0px, ${blockTopPercent}%, calc(100% - 220px))`,
                  right: `calc(${(days.length - dayIndex) * colPercent}% + ${gap}px)`,
              };
    }, [popover, days, START_TIME, TOTAL_MINS]);

    // ----- Export state, data, refs, and actions -----
    return {
        state: { popover, isWide },
        data: { days, activeBlocks, courseColorMap, popoverPosition },
        refs: { gridRef },
        actions: { handleBlockClick, handlePopoverClose },
    };
}
