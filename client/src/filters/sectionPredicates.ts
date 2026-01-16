import type { ApiSectionWithRelations } from '../types';
import type { Day } from './parseSearchInput';

export const sectionMatchesTerm = (
    section: ApiSectionWithRelations,
    term?: string
) => {
    if (!term) return true;

    return section.term.toLowerCase() === term.toLowerCase();
};

export const sectionMatchesInstructor = (
    section: ApiSectionWithRelations,
    name?: string
) => {
    if (!name) return true;
    const search = name.toLowerCase();
    return section.instructors.some((inst) =>
        `${inst.firstName} ${inst.lastName}`.toLowerCase().includes(search)
    );
};

export const sectionMatchesDays = (
    section: ApiSectionWithRelations,
    filterDays?: Day[]
) => {
    if (!filterDays || filterDays.length === 0) return true;
    const sectionDays = section.meetings.map((m) => m.day);
    // Section matches if it meets on ALL the days requested (e.g., must have M AND W)
    return filterDays.every((d) => sectionDays.includes(d));
};

export const sectionMatchesDuration = (
    section: ApiSectionWithRelations,
    duration?: number
) => {
    if (!duration) return true;
    return section.meetings.some((m) => {
        const start = new Date(m.startTime).getTime();
        const end = new Date(m.endTime).getTime();
        const diffMinutes = (end - start) / (1000 * 60);
        return Math.abs(diffMinutes - duration) < 2; // Allow small rounding diff
    });
};
