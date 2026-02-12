import clsx from 'clsx';
import { Clock } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface MinGapSliderProps {
    minGap: number;
    maxGap: number;
    gapPresets: readonly number[];
    setMinGap: Dispatch<SetStateAction<number>>;
}

function MinGapSlider({ minGap, maxGap, gapPresets, setMinGap }: MinGapSliderProps) {
    const percentage = (minGap / maxGap) * 100;
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1.5 text-[10px] leading-none font-bold tracking-widest uppercase">
                    <Clock size={12} /> Minimum Gap
                </div>
                <span className="text-theme-blue border-theme-blue/10 bg-theme-blue/5 rounded-md border px-2 py-0.5 text-[11px] font-bold">
                    {minGap >= 60 ? `${Math.floor(minGap / 60)}h ${minGap % 60}m` : `${minGap}m`}
                </span>
            </div>
            <div className="group relative flex h-6 w-full touch-none items-center select-none">
                <div className="absolute h-1.5 w-full rounded-full bg-gray-200" />
                <div
                    className="bg-theme-blue absolute h-1.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
                <input
                    type="range"
                    aria-label="Adjust minimum gap"
                    min={0}
                    max={maxGap}
                    step={5}
                    value={minGap}
                    onChange={(e) => setMinGap(Number(e.target.value))}
                    className="absolute h-full w-full scale-x-[1.05] cursor-grab appearance-none bg-transparent opacity-0 active:cursor-grabbing"
                />
                <div
                    className="border-theme-blue pointer-events-none absolute h-4 w-4 -translate-x-1/2 rounded-full border-2 bg-white shadow-md transition-transform group-hover:scale-110"
                    style={{ left: `${percentage}%` }}
                />
            </div>
            <div className="flex gap-1.5">
                {gapPresets.map((gap) => (
                    <button
                        key={gap}
                        onClick={() => setMinGap(gap)}
                        className={clsx(
                            'flex-1 cursor-pointer rounded-md border py-1.5 text-[11px] font-bold transition-all',
                            minGap === gap
                                ? 'bg-theme-blue border-theme-blue text-white'
                                : 'hover:border-theme-blue/40 border-gray-200 bg-gray-100/70 text-gray-400',
                        )}
                    >
                        {gap === 0 ? 'None' : gap < 60 ? `${gap}m` : `${gap / 60}h`}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MinGapSlider;
