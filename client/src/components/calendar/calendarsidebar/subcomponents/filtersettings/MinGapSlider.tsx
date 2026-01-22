import { Timer } from 'lucide-react';
import clsx from 'clsx';

const PRESETS = [0, 15, 60, 120];
const MAX = 300;

export default function MinGapSlider({ minGap, setMinGap }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Timer size={12} /> Minimum Gap
                </label>
                <span className="text-[11px] font-bold text-theme-blue bg-theme-blue/5 px-2 py-0.5 rounded-md border border-theme-blue/10">
                    {minGap >= 60 ? `${Math.floor(minGap / 60)}h ${minGap % 60}m` : `${minGap}m`}
                </span>
            </div>

            <div className="relative h-6 w-full flex items-center select-none touch-none">
                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
                <div
                    className="absolute h-1.5 bg-theme-blue rounded-full"
                    style={{ width: `${(minGap / MAX) * 100}%` }}
                />
                <input
                    type="range"
                    min={0}
                    max={MAX}
                    step={5}
                    value={minGap}
                    onChange={(e) => setMinGap(parseInt(e.target.value))}
                    className="absolute w-full h-full appearance-none bg-transparent cursor-pointer z-30 opacity-0"
                />
                <div
                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md pointer-events-none -translate-x-1/2"
                    style={{ left: `${(minGap / MAX) * 100}%` }}
                />
            </div>

            <div className="flex gap-1.5">
                {PRESETS.map((val) => (
                    <button
                        key={val}
                        onClick={() => setMinGap(val)}
                        className={clsx(
                            'flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all',
                            minGap === val
                                ? 'bg-theme-blue border-theme-blue text-white'
                                : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200',
                        )}
                    >
                        {val === 0 ? 'None' : val < 60 ? `${val}m` : `${val / 60}h`}
                    </button>
                ))}
            </div>
        </div>
    );
}
