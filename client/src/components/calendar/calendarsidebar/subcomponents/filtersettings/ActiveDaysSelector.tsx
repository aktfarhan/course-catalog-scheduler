import clsx from 'clsx';
import { CheckSquare } from 'lucide-react';
import type { DayLiteral } from '../../../../../constants';

interface ActiveDaysSelectorProps {
    days: DayLiteral[];
    selectedDays: DayLiteral[] | undefined;
    toggleDay: (day: DayLiteral) => void;
}

function ActiveDaysSelector({ days, selectedDays, toggleDay }: ActiveDaysSelectorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="bg-theme-blue/10 text-theme-blue flex h-6 w-6 items-center justify-center rounded-md">
                    <CheckSquare size={13} />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Active Days
                </span>
            </div>
            <div className="flex justify-between gap-0.5">
                {days.map((day) => {
                    const isActive = selectedDays?.includes(day);
                    return (
                        <button
                            type="button"
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={clsx(
                                'flex-1 cursor-pointer rounded-md border-2 py-2 text-[12px] font-medium transition-all',
                                isActive
                                    ? 'border-theme-blue bg-theme-blue text-white'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300',
                            )}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ActiveDaysSelector;
