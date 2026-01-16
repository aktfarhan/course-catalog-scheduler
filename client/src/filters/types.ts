/** Days allowed for filtering */
export type Day = 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa' | 'Su';

/** Section types allowed for filtering */
export type SectionType = 'LECTURE' | 'DISCUSSION';

export interface TimeRange {
    start?: string;
    end?: string;
}

export interface SearchFilters {
    departmentCode?: string;
    courseCode?: string;
    text?: string;
    duration: number;
    term?: string;
    days?: Day[];
    timeRange?: TimeRange;
    sectionType?: SectionType;
    instructorName?: string;
}
