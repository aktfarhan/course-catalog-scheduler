import clsx from 'clsx';
import { Clock } from 'lucide-react';
import { DATA_MAPS } from '../../../constants';

interface TimeSelectorProps {
    times: readonly string[];
    selectedTime: { start?: string; end?: string } | string | null | undefined;
    onSelect: (time: string) => void;
}

function TimeSelector({ times, selectedTime, onSelect }: TimeSelectorProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="bg-theme-blue/10 text-theme-blue flex h-6 w-6 items-center justify-center rounded-md">
                    <Clock size={13} />
                </span>
                <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
                    Time Range
                </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                {times.map((t) => {
                    const isSelected =
                        typeof selectedTime === 'string'
                            ? selectedTime.toLowerCase() === t.toLowerCase()
                            : selectedTime?.start === DATA_MAPS.PERIOD_MAP[t.toLowerCase()]?.start;
                    return (
                        <button
                            type="button"
                            key={t}
                            onClick={() => onSelect(t)}
                            className={clsx(
                                'cursor-pointer rounded-lg border-2 py-2 text-[12px] font-medium transition-all',
                                isSelected
                                    ? 'bg-theme-blue border-theme-blue text-white'
                                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300',
                            )}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default TimeSelector;
