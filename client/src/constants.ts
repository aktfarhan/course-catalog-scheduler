import type { Day } from '../../src/types';

// Calendar and Time
export const CALENDAR_CONFIG = {
    START_TIME: 8,
    END_TIME: 23,
    TOTAL_MINS: (23 - 8) * 60,
    DAYS: ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'] as Day[],
} as const;

// Academic Term and Ordering constants
export const ACADEMIC_TERMS = {
    ORDER: {
        Fall: 1,
        Winter: 2,
        Spring: 3,
        Summer: 4,
    } as Record<string, number>,
    TERMS: ['2025 Fall', '2026 Winter', '2026 Spring', '2026 Summer'],
} as const;

// Filter Categories for Search/Sidebar
export const FILTER_CATEGORIES = {
    DAYS: new Set(['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']),
    TERMS: new Set(['2025 Fall', '2026 Winter', '2026 Spring', '2026 Summer']),
    TYPES: new Set(['Lecture', 'Discussion']),
    TIMES: new Set(['Morning', 'Afternoon', 'Evening']),
} as const;

// Data Mapping and Conversions
export const DATA_MAPS = {
    DAY_MAP: {
        m: 'M',
        tu: 'Tu',
        w: 'W',
        th: 'Th',
        f: 'F',
        sa: 'Sa',
        su: 'Su',
    } as Record<string, Day>,
    PERIOD_MAP: {
        morning: { start: '8:00am', end: '11:59am' },
        afternoon: { start: '12:00pm', end: '4:59pm' },
        evening: { start: '5:00pm', end: '7:59pm' },
        night: { start: '8:00pm', end: '11:59pm' },
    } as Record<string, { start: string; end: string }>,
} as const;

// General Pagination and UI Limits
export const UI_LIMITS = {
    PAGE_SIZE: 50,
    PRESETS: [0, 15, 60, 120],
    MAX_GAP: 300,
} as const;

export type DayLiteral = (typeof CALENDAR_CONFIG.DAYS)[number];
export type AcademicTerm = (typeof ACADEMIC_TERMS.TERMS)[number];
