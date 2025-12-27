/**
 * -------------------------------------
 * Types for Course Scheduling Data
 * -------------------------------------
 *
 * Contains raw scraped data interfaces and
 * normalized processed data interfaces
 */

// Days of the week + placeholder "TBA"
export type Day = 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa' | 'Su' | 'TBA';

// Normalized days can be one or two groups of Day arrays
export type NormalizedDays = Day[][];

// Represents a normalized instructor with optional email.
export interface Instructor {
    firstName: string;
    lastName: string;
    email?: string | null;
}

// Normalized time format (24-hour)
export interface NormalizedTime {
    startTime: string;
    endTime: string;
}

// Raw input interfaces (from scraped data)

export interface RawSection {
    section: string;
    classNumber: string;
    days: string;
    time: string;
    instructor: string;
    location: string;
}

export interface RawSemester {
    semester: string;
    sections: RawSection[];
}

export interface RawCourse {
    courseCode: string;
    courseName: string;
    semesters: RawSemester[];
}

export interface RawDepartment {
    departmentCode: string;
    departmentName: string;
    courses: RawCourse[];
}

// Normalized output interfaces

export interface NormalizedMeeting {
    day: Day;
    startTime: string;
    endTime: string;
    location: string;
}

export interface NormalizedSection {
    sectionNumber: string;
    classNumber: string;
    term: string;
    type: string;
    isAsync: boolean;
    instructors: Instructor[];
    meetings: NormalizedMeeting[];
}

export interface NormalizedCourse {
    courseCode: string;
    courseName: string;
    sections: NormalizedSection[];
}

export interface NormalizedDepartment {
    departmentCode: string;
    departmentName: string;
    courses: NormalizedCourse[];
}
