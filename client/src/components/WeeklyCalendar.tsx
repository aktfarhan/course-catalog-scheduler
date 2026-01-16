import React, { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function WeeklyCalendar({
    selectedSections,
    courses,
    sectionsByCourseId,
    showWeekend,
    setShowWeekend,
}: any) {
    const days = showWeekend
        ? ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
        : ['M', 'Tu', 'W', 'Th', 'F'];
    const START_HOUR = 8,
        END_HOUR = 23; // 11 PM
    const TOTAL_MINS = (END_HOUR - START_HOUR) * 60;

    const activeBlocks = useMemo(() => {
        const blocks: any[] = [];
        selectedSections.forEach((sectionId: number, courseId: number) => {
            const course = courses.find((c: any) => c.id === courseId);
            const section = sectionsByCourseId[courseId]?.find(
                (s: any) => s.id === sectionId
            );
            if (!section || !course) return;

            section.meetings.forEach((m: any) => {
                const start = new Date(m.startTime),
                    end = new Date(m.endTime);
                blocks.push({
                    courseId,
                    sectionId,
                    day: m.day,
                    courseCode: `${course.department.code} ${course.code}`,
                    title: course.title,
                    secNum: section.sectionNumber, // Use sectionNumber from your example
                    startMins: start.getUTCHours() * 60 + start.getUTCMinutes(),
                    endMins: end.getUTCHours() * 60 + end.getUTCMinutes(),
                    displayTime: `${start.getUTCHours()}:${start
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, '0')}`,
                });
            });
        });

        // Conflict detection (Overlaps)
        return blocks.map((b1, i) => ({
            ...b1,
            hasConflict: blocks.some(
                (b2, j) =>
                    i !== j &&
                    b1.day === b2.day &&
                    b1.startMins < b2.endMins &&
                    b1.endMins > b2.startMins
            ),
        }));
    }, [selectedSections, courses, sectionsByCourseId]);

    // Helper to format hour with AM/PM nicely
    const formatHour = (hour: number) => {
        const h = hour % 12 === 0 ? 12 : hour % 12;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${h} ${ampm}`;
    };

    return (
        <div className="h-full w-full flex flex-col bg-white overflow-hidden relative select-none">
            {/* CALENDAR HEADER BAR */}
            <div
                className={clsx(
                    'grid border-b border-gray-100 bg-white',
                    showWeekend ? 'grid-cols-7' : 'grid-cols-5'
                )}
            >
                {days.map((day) => (
                    <div
                        key={day}
                        className="py-4 text-center border-r border-gray-50 last:border-r-0"
                    >
                        <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                            {day}
                        </span>
                    </div>
                ))}
            </div>

            {/* Time Grid (Scaled to 100% Height) */}
            <div className="flex-1 relative pt-2">
                <div
                    className={clsx(
                        'grid h-full bg-white',
                        showWeekend ? 'grid-cols-7' : 'grid-cols-5'
                    )}
                >
                    {days.map((day) => (
                        <div
                            key={day}
                            className="relative border-r border-gray-100 h-full"
                        >
                            {/* Hour Background Markers */}
                            {Array.from({ length: END_HOUR - START_HOUR }).map(
                                (_, i) => (
                                    <div
                                        key={i}
                                        className="border-b border-gray-50 relative"
                                        style={{
                                            height: `${
                                                100 / (END_HOUR - START_HOUR)
                                            }%`,
                                        }}
                                    >
                                        <span className="absolute top-1 left-2 text-[9px] text-gray-400 uppercase">
                                            {formatHour(i + START_HOUR)}
                                        </span>
                                    </div>
                                )
                            )}

                            {/* Active Course Blocks */}
                            {activeBlocks
                                .filter((b) => b.day === day)
                                .map((block, i) => {
                                    const top =
                                        ((block.startMins - START_HOUR * 60) /
                                            TOTAL_MINS) *
                                        100;
                                    const height =
                                        ((block.endMins - block.startMins) /
                                            TOTAL_MINS) *
                                        100;

                                    return (
                                        <div
                                            key={i}
                                            style={{
                                                top: `${top}%`,
                                                height: `${height}%`,
                                            }}
                                            className={clsx(
                                                'absolute left-1.5 right-1.5 p-2 rounded-xl border-l-[6px] transition-all z-20 shadow-md',
                                                block.hasConflict
                                                    ? 'bg-red-50 border-red-500 animate-pulse shadow-red-100 ring-2 ring-red-100'
                                                    : 'bg-white border-theme-blue border-2'
                                            )}
                                        >
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <div className="flex justify-between items-start">
                                                    <span
                                                        className={clsx(
                                                            'text-[9px] uppercase',
                                                            block.hasConflict
                                                                ? 'text-red-600'
                                                                : 'text-theme-blue'
                                                        )}
                                                    >
                                                        {block.courseCode}
                                                    </span>
                                                    {block.hasConflict && (
                                                        <AlertTriangle
                                                            size={12}
                                                            className="text-red-600"
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-gray-800 truncate mt-1">
                                                    Section {block.secNum}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
