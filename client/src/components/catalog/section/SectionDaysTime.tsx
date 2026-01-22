import { formatTime } from '../../../utils/formatTime';
import type { ApiSection } from '../../../types';
import { Clock3 } from 'lucide-react';
import clsx from 'clsx';

const DAYS = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];

function SectionDaysTime({ meetings }: { meetings: ApiSection['meetings'] }) {
    const meetingMap: Record<string, string[]> = {};
    const timeSet = new Set<string>();

    meetings.forEach((m) => {
        const time = formatTime(m);
        timeSet.add(time);
        if (!meetingMap[m.day]) meetingMap[m.day] = [];
        meetingMap[m.day].push(time);
    });

    const uniqueTimes = Array.from(timeSet);

    return (
        <div className="flex flex-row items-center lg:flex-col lg:items-center gap-2">
            <span className="w-24 lg:hidden mt-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
                Schedule
            </span>
            <div className="flex flex-col gap-2">
                <div className="flex justify-start lg:justify-center gap-1">
                    {DAYS.map((day) => {
                        const timesForDay = meetingMap[day] || [];
                        const isMeetingDay = timesForDay.length > 0;
                        return (
                            <span key={day} className="flex relative w-7 h-7 group/day">
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
                                    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 flex items-center gap-2 rounded-md bg-gray-100 border border-gray-300 px-3 py-1.5 text-[11px] font-medium text-gray-700 opacity-0 invisible pointer-events-none transition-all duration-200 group-hover/day:opacity-100 group-hover/day:visible z-50 whitespace-nowrap shadow-md">
                                        <Clock3 size={12} className="text-gray-500" />
                                        <span>{timesForDay.join(', ')}</span>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-gray-300" />
                                    </div>
                                )}
                            </span>
                        );
                    })}
                </div>
                <div className="w-full items-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 flex flex-col gap-1">
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
