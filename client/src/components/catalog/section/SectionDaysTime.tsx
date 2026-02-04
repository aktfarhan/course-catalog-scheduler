import clsx from 'clsx';
import { useMemo } from 'react';
import { Clock3 } from 'lucide-react';
import { CALENDAR_CONFIG } from '../../../constants';
import { formatTime } from '../../../utils/formatTime';
import type { ApiMeeting } from '../../../types';

interface SectionDaysTimeProps {
    meetings: ApiMeeting[];
}

function SectionDaysTime({ meetings }: SectionDaysTimeProps) {
    // Transforms raw meeting data into organized UI structures
    const { meetingMap, uniqueTimes } = useMemo(() => {
        // map: Groups times by day key for the hover tooltips
        const map: Record<string, string[]> = {};

        // timeSet: Filters out duplicate times for the summary list
        const timeSet = new Set<string>();

        meetings.forEach((meeting) => {
            const time = formatTime(meeting);
            timeSet.add(time);
            if (!map[meeting.day]) map[meeting.day] = [];
            map[meeting.day].push(time);
        });

        return { meetingMap: map, uniqueTimes: Array.from(timeSet) };
    }, [meetings]);

    return (
        <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-center">
            <span className="mt-1 w-24 shrink-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase lg:hidden">
                Schedule
            </span>
            <div className="flex flex-col gap-2">
                <div className="flex justify-start gap-1 lg:justify-center">
                    {CALENDAR_CONFIG.ALL_DAYS.map((day) => {
                        const timesForDay = meetingMap[day] || [];
                        const isMeetingDay = timesForDay.length > 0;
                        return (
                            <span key={day} className="group/day relative flex h-7 w-7">
                                <span
                                    className={clsx(
                                        'flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition-all',
                                        isMeetingDay
                                            ? 'bg-theme-blue text-white shadow-sm'
                                            : 'border border-gray-200 text-gray-300',
                                    )}
                                >
                                    {day}
                                </span>
                                {isMeetingDay && (
                                    <div className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-2 flex -translate-x-1/2 items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-gray-700 opacity-0 shadow-md transition-all duration-200 group-hover/day:visible group-hover/day:opacity-100">
                                        <Clock3 size={12} className="text-gray-500" />
                                        <span>{timesForDay.join(', ')}</span>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-300" />
                                    </div>
                                )}
                            </span>
                        );
                    })}
                </div>
                <div className="flex w-full flex-col items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                    {uniqueTimes.map((time) => (
                        <div key={time} className="flex items-center gap-2">
                            <Clock3 size={13} className="text-gray-400" />
                            <span className="text-xs font-medium text-gray-700">{time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SectionDaysTime;
