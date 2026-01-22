import FilterHeader from './FilterHeader';
import TermSelector from './TermSelector';
import ActiveDaysSelector from './ActiveDaysSelector';
import TimeRangeSlider from './TimeRangeSlider';
import MinGapSlider from './MinGapSlider';
export default function FilterSettings({
    isFilterOpen,
    setIsFilterOpen,
    selectedTerm,
    handleTermChange,
    selectedDays,
    days,
    toggleDay,
    minGap,
    setMinGap,
    timeRange,
    formatTimeLabel,
    sliderRef,
    SLIDER_MIN,
    SLIDER_MAX,
    onPointerDown,
}: any) {
    return (
        <div className="border-b border-gray-100 bg-gray-50/50">
            <FilterHeader
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                selectedTerm={selectedTerm}
            />

            {isFilterOpen && (
                <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                    <TermSelector selectedTerm={selectedTerm} onChange={handleTermChange} />

                    <div className="px-6">
                        <div className="border-t border-gray-200" />
                    </div>

                    <ActiveDaysSelector
                        days={days}
                        selectedDays={selectedDays}
                        toggleDay={toggleDay}
                    />

                    <div className="px-6">
                        <div className="border-t border-gray-200" />
                    </div>

                    <TimeRangeSlider
                        timeRange={timeRange}
                        formatTimeLabel={formatTimeLabel}
                        sliderRef={sliderRef}
                        min={SLIDER_MIN}
                        max={SLIDER_MAX}
                        onPointerDown={onPointerDown}
                    />

                    <MinGapSlider minGap={minGap} setMinGap={setMinGap} />
                </div>
            )}
        </div>
    );
}
