import { CalendarRange } from 'lucide-react';
import { formatTimeLabel } from '../../../../../utils/formatTime';
import type { RefObject } from 'react';
import type { TimeRange } from '../../../../../types';

interface TimeRangeSliderProps {
    min: number;
    max: number;
    timeRange: TimeRange;
    sliderRef: RefObject<HTMLDivElement | null>;
    onPointerDown: (thumb: 'start' | 'end') => (e: React.PointerEvent<Element>) => void;
}

function TimeRangeSlider({ min, max, timeRange, sliderRef, onPointerDown }: TimeRangeSliderProps) {
    const startPercent = ((timeRange.start - min) / (max - min)) * 100;
    const endPercent = ((timeRange.end - min) / (max - min)) * 100;
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase">
                    <CalendarRange size={12} /> Preferred Time
                </div>
                <span className="text-theme-blue border-theme-blue/10 bg-theme-blue/5 rounded-md border px-2 py-0.5 text-[11px] font-bold">
                    {formatTimeLabel(timeRange.start)} - {formatTimeLabel(timeRange.end)}
                </span>
            </div>
            <div
                ref={sliderRef}
                className="relative flex h-6 w-full touch-none items-center select-none"
            >
                <div className="absolute h-1.5 w-full rounded-full bg-gray-200" />
                <div
                    className="bg-theme-blue absolute h-1.5 rounded-full"
                    style={{
                        left: `${startPercent}%`,
                        width: `${endPercent - startPercent}%`,
                    }}
                />
                <div
                    onPointerDown={onPointerDown('start')}
                    className="border-theme-blue absolute z-20 h-4 w-4 -translate-x-1/2 cursor-grab rounded-full border-2 bg-white shadow-md transition-transform hover:scale-110 active:cursor-grabbing"
                    style={{ left: `${startPercent}%` }}
                />
                <div
                    onPointerDown={onPointerDown('end')}
                    className="border-theme-blue absolute z-20 h-4 w-4 -translate-x-1/2 cursor-grab rounded-full border-2 bg-white shadow-md transition-transform hover:scale-110 active:cursor-grabbing"
                    style={{ left: `${endPercent}%` }}
                />
            </div>
        </div>
    );
}

export default TimeRangeSlider;
