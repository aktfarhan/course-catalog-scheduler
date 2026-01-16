export type Day = 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa' | 'Su';
export type SectionType = 'LECTURE' | 'DISCUSSION';

export interface SearchFilters {
    departmentCode?: string;
    courseCode?: string;
    text?: string;
    duration?: number; // In minutes
    term?: string;
    days?: Day[];
    timeRange?: { start?: string; end?: string };
    sectionType?: SectionType;
    instructorName?: string;
}

const DAY_MAP: Record<string, Day> = {
    m: 'M',
    tu: 'Tu',
    w: 'W',
    th: 'Th',
    f: 'F',
    sa: 'Sa',
    su: 'Su',
};

const PERIOD_MAP: Record<string, { start: string; end: string }> = {
    morning: { start: '8:00am', end: '11:59am' },
    afternoon: { start: '12:00pm', end: '4:59pm' },
    evening: { start: '5:00pm', end: '7:59pm' },
    night: { start: '8:00pm', end: '11:59pm' },
};

export function parseSearchInput(
    input: string,
    lookupData: {
        departmentMap: Map<string, any>;
        departmentTitleToCode: Map<string, string>;
        courseMap: Map<string, any>;
    }
): { filters: SearchFilters; tokens: any[] } {
    const filters: SearchFilters = {};
    const tokenStatuses: any[] = [];

    if (!input.trim()) return { filters, tokens: [] };

    const segments = input
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

    segments.forEach((seg) => {
        const lower = seg.toLowerCase();
        const upper = seg.toUpperCase();
        const normalized = upper.replace(/\s/g, '');

        // 1. DURATION
        const durationMatch = lower.match(
            /^(\d+)\s*(min|mins|minutes|hr|hrs|hour|hours)$/i
        );
        if (durationMatch) {
            let mins = parseInt(durationMatch[1], 10);
            const unit = durationMatch[2].toLowerCase();
            if (unit.startsWith('hr') || unit.startsWith('hour')) mins *= 60;
            filters.duration = mins;
            tokenStatuses.push({
                text: seg,
                type: 'duration',
                isRecognized: true,
            });
            return;
        }

        // 2. STRICT DAYS
        const dayMatchRegex = /(tu|th|sa|su|m|w|f)/g;
        const dayMatches = lower.match(dayMatchRegex);
        if (dayMatches && dayMatches.join('') === lower.replace(/\s/g, '')) {
            const mappedDays = dayMatches.map(
                (d) => DAY_MAP[d as keyof typeof DAY_MAP]
            );
            filters.days = Array.from(
                new Set([...(filters.days || []), ...mappedDays])
            );
            tokenStatuses.push({ text: seg, type: 'days', isRecognized: true });
            return;
        }

        // 3. TIME PERIODS
        if (PERIOD_MAP[lower]) {
            filters.timeRange = PERIOD_MAP[lower];
            tokenStatuses.push({
                text: seg,
                type: 'timeRange',
                isRecognized: true,
            });
            return;
        }

        // 4. EXACT TIME RANGE
        const timeMatch = seg.match(
            /(\d{1,2}(?::\d{2})?\s*[ap]m)\s*(?:-|to)\s*(\d{1,2}(?::\d{2})?\s*[ap]m)/i
        );
        if (timeMatch) {
            filters.timeRange = {
                start: timeMatch[1].toLowerCase().replace(/\s/g, ''),
                end: timeMatch[2].toLowerCase().replace(/\s/g, ''),
            };
            tokenStatuses.push({
                text: seg,
                type: 'timeRange',
                isRecognized: true,
            });
            return;
        }

        // 5. DEPARTMENT
        const codeFromTitle = lookupData.departmentTitleToCode.get(lower);
        if (lookupData.departmentMap.has(upper) || codeFromTitle) {
            filters.departmentCode = codeFromTitle || upper;
            tokenStatuses.push({
                text: seg,
                type: 'departmentCode',
                isRecognized: true,
            });
            return;
        }

        // 6. COURSE CODE
        if (lookupData.courseMap.has(normalized)) {
            const course = lookupData.courseMap.get(normalized);
            filters.courseCode = normalized;
            filters.departmentCode = course.department.code;
            tokenStatuses.push({
                text: seg,
                type: 'courseCode',
                isRecognized: true,
            });
            return;
        }

        // 8. TERM (Advanced Multi-format Parsing)
        const termRegex =
            /\b(fall|winter|spring|summer)\s*(\d{4})\b|\b(\d{4})\s*(fall|winter|spring|summer)\b/i;
        const termMatch = seg.match(termRegex);
        if (termMatch) {
            // Extract from either [Season, Year] or [Year, Season] groups
            const season = termMatch[1] || termMatch[4];
            const year = termMatch[2] || termMatch[3];

            // Normalize to "YYYY Season" (e.g., "2025 Fall") to match your data format
            const normalizedTerm = `${year} ${
                season.charAt(0).toUpperCase() + season.slice(1).toLowerCase()
            }`;

            filters.term = normalizedTerm;
            tokenStatuses.push({ text: seg, type: 'term', isRecognized: true });
            return;
        }

        // 9. SECTION TYPE
        if (['lecture', 'discussion'].includes(lower)) {
            filters.sectionType = upper as SectionType;
            tokenStatuses.push({
                text: seg,
                type: 'sectionType',
                isRecognized: true,
            });
            return;
        }

        // 10. FALLBACK
        tokenStatuses.push({ text: seg, type: 'unknown', isRecognized: false });
        filters.text = seg;
    });

    return { filters, tokens: tokenStatuses };
}
