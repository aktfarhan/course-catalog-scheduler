import { useState, useEffect } from 'react';

interface DataUpdateTimerProps {
    lastUpdatedAt: string | null;
}

function DataUpdateTimer({ lastUpdatedAt }: DataUpdateTimerProps) {
    const [elapsed, setElapsed] = useState('--:--:--');

    // Compute and tick elapsed time since last pipeline run
    useEffect(() => {
        if (!lastUpdatedAt) return;

        const update = () => {
            // Calculate ms difference between now and the last pipeline timestamp
            const diff = Date.now() - new Date(lastUpdatedAt).getTime();

            // Break into hours, minutes, seconds
            const hours = Math.floor(diff / 3_600_000);
            const minutes = Math.floor((diff % 3_600_000) / 60_000);
            const seconds = Math.floor((diff % 60_000) / 1_000);

            // Format as HH:MM:SS with zero-padding
            setElapsed(
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
            );
        };

        // Run immediately, then tick every second
        update();
        const interval = setInterval(update, 1_000);
        return () => clearInterval(interval);
    }, [lastUpdatedAt]);

    return (
        <div className="mx-auto mt-4 flex w-fit items-center gap-1.5 text-slate-400">
            <span className="font-space text-xs font-bold tracking-wide uppercase">
                Data Update:
            </span>
            <span className="font-space text-sm font-bold tracking-widest tabular-nums">
                {elapsed}
            </span>
            <span className="-ml-0.5 text-xs font-normal text-slate-300">ago</span>
        </div>
    );
}

export default DataUpdateTimer;
