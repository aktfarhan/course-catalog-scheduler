import { Clock } from 'lucide-react';

export default function TimeRangeSlider({
    timeRange,
    formatTimeLabel,
    sliderRef,
    min,
    max,
    onPointerDown,
}: any) {
    const startPercent = ((timeRange.start - min) / (max - min)) * 100;
    const endPercent = ((timeRange.end - min) / (max - min)) * 100;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={12} /> Preferred Window
                </label>
                <span className="text-[11px] font-bold text-theme-blue bg-theme-blue/5 px-2 py-0.5 rounded-md border border-theme-blue/10">
                    {formatTimeLabel(timeRange.start)} - {formatTimeLabel(timeRange.end)}
                </span>
            </div>

            <div
                ref={sliderRef}
                className="relative h-6 w-full select-none touch-none flex items-center"
            >
                <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
                <div
                    className="absolute h-1.5 bg-theme-blue rounded-full"
                    style={{
                        left: `${startPercent}%`,
                        width: `${endPercent - startPercent}%`,
                    }}
                />
                <div
                    onPointerDown={onPointerDown('start')}
                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform -translate-x-1/2"
                    style={{ left: `${startPercent}%` }}
                />
                <div
                    onPointerDown={onPointerDown('end')}
                    className="absolute z-20 w-4 h-4 bg-white border-2 border-theme-blue rounded-full shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform -translate-x-1/2"
                    style={{ left: `${endPercent}%` }}
                />
            </div>
        </div>
    );
}
