import clsx from 'clsx';
import BlockPopover from './BlockPopover';
import CalendarBlock from './CalendarBlock';
import { CALENDAR_CONFIG } from '../../constants';
import { formatHour } from '../../utils/formatTime';
import { useWeeklyCalendar } from './useWeeklyCalendar';
import type { ApiSectionWithRelations } from '../../types';

interface WeeklyCalendarProps {
    showWeekend: boolean;
    selectedSections: Set<number>;
    sectionsByCourseId: Map<number, ApiSectionWithRelations[]>;
}

function WeeklyCalendar({
    showWeekend,
    selectedSections,
    sectionsByCourseId,
}: WeeklyCalendarProps) {
    const { START_TIME, END_TIME, TOTAL_MINS } = CALENDAR_CONFIG;
    const { state, data, refs, actions } = useWeeklyCalendar({
        showWeekend,
        selectedSections,
        sectionsByCourseId,
    });

    return (
        <div className="flex h-full w-full flex-col bg-white select-none">
            <div
                className={clsx(
                    'grid border-b border-gray-100 bg-white',
                    showWeekend ? 'grid-cols-7' : 'grid-cols-5',
                )}
            >
                {data.days.map((day) => (
                    <div
                        key={day}
                        className="border-r border-gray-100 bg-gray-50/50 py-4 text-center last:border-r-0"
                    >
                        <span className="text-[11px] font-black tracking-widest text-slate-500 uppercase">
                            {day}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex-1">
                <div
                    ref={refs.gridRef}
                    onClick={actions.handlePopoverClose}
                    className={clsx(
                        'relative grid h-full',
                        showWeekend ? 'grid-cols-7' : 'grid-cols-5',
                    )}
                >
                    {data.days.map((day, dayIndex) => (
                        <div
                            key={day}
                            className={clsx(
                                'relative border-r border-gray-100',
                                dayIndex % 2 === 1 && 'bg-gray-50/60',
                            )}
                        >
                            {Array.from({ length: END_TIME - START_TIME + 1 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="relative border-b border-gray-100/60"
                                    style={{
                                        height: `${100 / (END_TIME - START_TIME + 1)}%`,
                                    }}
                                >
                                    <span className="absolute top-2 left-2 text-[9px] text-slate-400 uppercase">
                                        {formatHour(i + START_TIME)}
                                    </span>
                                </div>
                            ))}
                            {data.activeBlocks[day].map((block) => (
                                <CalendarBlock
                                    key={`${block.courseCode}-${block.sectionNumber}-${block.startMins}`}
                                    top={((block.startMins - START_TIME * 60) / TOTAL_MINS) * 100}
                                    block={block}
                                    color={data.courseColorMap.get(block.courseCode)!}
                                    height={((block.endMins - block.startMins) / TOTAL_MINS) * 100}
                                    isWide={state.isWide}
                                    totalMins={TOTAL_MINS}
                                    gridHeight={refs.gridRef.current?.clientHeight ?? 0}
                                    onClick={actions.handleBlockClick}
                                />
                            ))}
                        </div>
                    ))}
                    {state.popover &&
                        data.popoverPosition &&
                        data.courseColorMap.has(state.popover.courseCode) && (
                            <BlockPopover
                                block={state.popover}
                                color={data.courseColorMap.get(state.popover.courseCode)!}
                                position={data.popoverPosition}
                                onClose={actions.handlePopoverClose}
                            />
                        )}
                </div>
            </div>
        </div>
    );
}

export default WeeklyCalendar;
