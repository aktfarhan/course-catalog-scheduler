import { CheckSquare } from 'lucide-react';

export default function ActiveDaysSelector({ days, selectedDays, toggleDay }: any) {
    return (
        <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <CheckSquare size={12} /> Active Days
            </label>
            <div className="flex justify-between gap-1">
                {days.map((day: string) => {
                    const isActive = selectedDays.includes(day);
                    return (
                        <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`flex-1 py-2 text-[11px] font-bold rounded-md border transition-all cursor-pointer ${
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
    );
}
