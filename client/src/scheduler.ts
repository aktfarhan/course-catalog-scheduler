// 1. Define strict types for your data
export interface Section {
    id: string;
    courseName: string;
    days: string[]; // e.g., ['Mon', 'Wed']
    start: number; // Minutes from midnight
    end: number; // Minutes from midnight
}

export interface Course {
    id: string;
    name: string;
    sections: Section[];
}

export interface SchedulerFilters {
    selectedDays: string[];
    timeRange: { start: number; end: number };
    minGap: number;
}

// 2. The DFS Algorithm
export function generateSchedules(
    courses: Course[],
    filters: SchedulerFilters
) {
    const results: { schedule: Section[]; score: number }[] = [];
    const { selectedDays, timeRange, minGap } = filters;

    function solve(courseIndex: number, currentSchedule: Section[]) {
        if (courseIndex === courses.length) {
            results.push({
                schedule: [...currentSchedule],
                score: calculateScore(currentSchedule),
            });
            return;
        }

        const currentCourse = courses[courseIndex];

        for (const section of currentCourse.sections) {
            // Hard Constraint: Days
            if (!section.days.every((day) => selectedDays.includes(day)))
                continue;

            // Hard Constraint: Time Window
            if (section.start < timeRange.start || section.end > timeRange.end)
                continue;

            // Hard Constraint: Overlap & Min Gap
            const hasConflict = currentSchedule.some((existing) => {
                const isSameDay = section.days.some((d) =>
                    existing.days.includes(d)
                );
                if (!isSameDay) return false;

                const overlap =
                    section.start < existing.end &&
                    section.end > existing.start;
                const tooClose =
                    Math.abs(section.start - existing.end) < minGap ||
                    Math.abs(existing.start - section.end) < minGap;
                return overlap || tooClose;
            });

            if (hasConflict) continue;

            currentSchedule.push(section);
            solve(courseIndex + 1, currentSchedule);
            currentSchedule.pop(); // Backtrack
        }
    }

    solve(0, []);
    return results.sort((a, b) => b.score - a.score);
}

// 3. Scoring Logic
function calculateScore(schedule: Section[]): number {
    let score = 100;
    const activeDays = new Set(schedule.flatMap((s) => s.days));
    score -= activeDays.size * 5; // Preference for fewer days on campus
    return score;
}
