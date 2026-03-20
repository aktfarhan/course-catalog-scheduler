import clsx from 'clsx';
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Block } from '../../types';
import type { CourseColor } from '../../constants';

interface CalendarBlockProps {
    top: number;
    block: Block;
    color: CourseColor;
    height: number;
    isWide: boolean;
    totalMins: number;
    gridHeight: number;
}

function CalendarBlock({
    top,
    block,
    color,
    height,
    isWide,
    totalMins,
    gridHeight,
}: CalendarBlockProps) {
    // Convert block duration to pixel height, then count how many text lines fit
    const durationMins = block.endMins - block.startMins;
    const blockPx = gridHeight > 0 ? (durationMins / totalMins) * gridHeight : 0;
    const lines = Math.floor((blockPx - 24) / 18);

    // Wide columns show course code + time on one line, narrow stacks them
    const combinedLine = isWide;

    // Only show extra content if the block is tall enough to fit them
    const showTime = isWide || lines >= 2;
    const showInstructor = isWide ? lines >= 2 : lines >= 3;
    const showLocation = isWide ? lines >= 3 : lines >= 4;

    return (
        <div
            style={{ top: `${top}%`, height: `${height}%` }}
            className={clsx(
                'absolute right-1.5 left-1.5 overflow-hidden rounded-xl border-2 border-l-6 p-2.5 shadow-md transition-all',
                block.hasConflict
                    ? 'animate-pulse border-red-500 bg-red-50 ring-2 shadow-red-100 ring-red-500'
                    : `${color.border} ${color.bg} ${color.hoverBg}`,
            )}
        >
            <div className="flex h-full flex-col justify-between overflow-hidden">
                <div>
                    <div className="flex items-start justify-between">
                        {combinedLine ? (
                            <p className="truncate text-[11px]">
                                <span
                                    className={clsx(
                                        'font-bold',
                                        block.hasConflict ? 'text-red-600' : color.text,
                                    )}
                                >
                                    {block.courseCode}
                                </span>
                                <span className="font-medium text-gray-500">
                                    {' · '}
                                    {block.timeRange}
                                </span>
                            </p>
                        ) : (
                            <p
                                className={clsx(
                                    'truncate text-[11px] font-bold',
                                    block.hasConflict ? 'text-red-600' : color.text,
                                )}
                            >
                                {block.courseCode}
                            </p>
                        )}
                        {block.hasConflict && (
                            <AlertTriangle size={12} className="shrink-0 text-red-600" />
                        )}
                    </div>
                    {!combinedLine && showTime && (
                        <p className="truncate text-[10px] font-medium text-gray-700">
                            {block.timeRange}
                        </p>
                    )}
                    {showInstructor && (
                        <p className="truncate text-[10px] text-gray-500">{block.instructors}</p>
                    )}
                </div>
                {showLocation && (
                    <p className="truncate text-[10px] font-medium text-gray-600">
                        {block.location || 'TBA'}
                    </p>
                )}
            </div>
        </div>
    );
}

export default React.memo(CalendarBlock);
