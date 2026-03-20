import clsx from 'clsx';
import CalendarBlock from './CalendarBlock';
import { useMemo, useState, useRef, useEffect } from 'react';
import { getInstructorNames } from '../../utils/formatInstructorNames';
import { CALENDAR_CONFIG, COURSE_COLORS, type CourseColor } from '../../constants';
import { formatTime, formatTimeToMinutes, formatHour } from '../../utils/formatTime';
import type { ApiSectionWithRelations, Block } from '../../types';

interface WeeklyCalendarProps {
    showWeekend: boolean;
    selectedSections: Set<number>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
}

function WeeklyCalendar({
    showWeekend,
    selectedSections,
    sectionsByCourseId,
}: WeeklyCalendarProps) {
    const { START_TIME, END_TIME, TOTAL_MINS, ALL_DAYS, WEEK_DAYS } = CALENDAR_CONFIG;
    const days = showWeekend ? ALL_DAYS : WEEK_DAYS;

    // Track grid dimensions so CalendarBlock can determine how many text lines fit
    const gridRef = useRef<HTMLDivElement>(null);
    const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

    // Single ResizeObserver on the grid container
    useEffect(() => {
        const element = gridRef.current;
        if (!element) return;
        const observer = new ResizeObserver(([entry]) => {
            setGridSize({
                width: entry.contentRect.width,
                height: entry.contentRect.height,
            });
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    // Columns wider than 200px show course code + time on one line
    const isWide = days.length > 0 && gridSize.width / days.length >= 200;

    // Builds calendar blocks, assigns course colors, and detects conflicts
    const { activeBlocks, courseColorMap } = useMemo(() => {
        const grouped: Record<string, Block[]> = {};
        days.forEach((d) => (grouped[d] = []));
        const allBlocks: Block[] = [];

        // 1. Iterate through the Set of Section IDs
        selectedSections.forEach((sectionId) => {
            // 2. Find the section object by searching through the Map values
            let section: ApiSectionWithRelations | undefined;
            for (const courseSections of sectionsByCourseId.values()) {
                section = courseSections.find((s) => s.id === sectionId);
                if (section) break;
            }

            if (!section) return;

            // 3. Convert each meeting into a renderable block with time in minutes
            section.meetings.forEach((meeting) => {
                const timeRange = formatTime(meeting);
                const minutes = formatTimeToMinutes(timeRange);
                if (!minutes) return;

                allBlocks.push({
                    day: meeting.day,
                    startMins: minutes.startMins,
                    endMins: minutes.endMins,
                    timeRange,
                    location: meeting.location,
                    sectionNumber: section!.sectionNumber,
                    instructors: getInstructorNames(section!.instructors),
                    courseCode: `${section!.course.department.code} ${section!.course.code}`,
                    hasConflict: false,
                });
            });
        });

        // 4. Flag blocks that overlap on the same day, then group by day
        allBlocks.forEach((block1, i) => {
            const hasConflict = allBlocks.some(
                (block2, j) =>
                    i !== j &&
                    block1.day === block2.day &&
                    block1.startMins < block2.endMins &&
                    block1.endMins > block2.startMins,
            );
            if (grouped[block1.day]) {
                grouped[block1.day].push({ ...block1, hasConflict });
            }
        });

        // 5. Assign a color to each course
        const colorMap = new Map<string, CourseColor>();
        const codes = [...new Set(allBlocks.map((b) => b.courseCode))].sort();
        codes.forEach((code, i) => {
            colorMap.set(code, COURSE_COLORS[i % COURSE_COLORS.length]);
        });

        return { activeBlocks: grouped, courseColorMap: colorMap };
    }, [selectedSections, sectionsByCourseId, days]);

    return (
        <div className="flex h-full w-full flex-col bg-white select-none">
            <div
                className={clsx(
                    'grid border-b border-gray-100 bg-white',
                    showWeekend ? 'grid-cols-7' : 'grid-cols-5',
                )}
            >
                {days.map((day) => (
                    <div
                        key={day}
                        className="border-r border-gray-100 bg-gray-50/50 py-4 text-center last:border-r-0"
                    >
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                            {day}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex-1">
                <div
                    ref={gridRef}
                    className={clsx('grid h-full', showWeekend ? 'grid-cols-7' : 'grid-cols-5')}
                >
                    {days.map((day, dayIndex) => (
                        <div
                            key={day}
                            className={clsx(
                                'relative border-r border-gray-100',
                                dayIndex % 2 === 1 && 'bg-gray-50/60',
                            )}
                        >
                            {Array.from({ length: END_TIME - START_TIME + 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="relative border-b border-gray-100/60"
                                    style={{
                                        height: `${100 / (END_TIME - START_TIME + 1)}%`,
                                    }}
                                >
                                    <span className="absolute top-2 left-2 text-[9px] text-slate-400 uppercase">
                                        {formatHour(i + START_TIME)}
                                    </span>
                                </div>
                            ))}
                            {activeBlocks[day]?.map((block) => (
                                <CalendarBlock
                                    key={`${block.courseCode}-${block.sectionNumber}-${block.startMins}`}
                                    top={((block.startMins - START_TIME * 60) / TOTAL_MINS) * 100}
                                    block={block}
                                    color={courseColorMap.get(block.courseCode)!}
                                    height={((block.endMins - block.startMins) / TOTAL_MINS) * 100}
                                    isWide={isWide}
                                    totalMins={TOTAL_MINS}
                                    gridHeight={gridSize.height}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeeklyCalendar;
