/**
 * -------------------------------------
 * Types for Course Scheduling Data
 * -------------------------------------
 *
 * Contains raw scraped data interfaces and
 * normalized processed data interfaces used
 * throughout the course scheduling system.
 */

// Days of the week plus a placeholder for unknown days
export type Day = 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa' | 'Su' | 'TBA';

// Possible section types in a course schedule
export type SectionType = 'LECTURE' | 'DISCUSSION';

// Normalized days representation: an array of one or two arrays,
// each containing day abbreviations (e.g., ['M', 'W'])
export type NormalizedDays = Day[][];

// Instructor's basic name details after normalization
export type InstructorName = {
    firstName: string;
    lastName: string;
};

// Contact and title information for an instructor
export interface InstructorInfo {
    email: string | null;
    title: string | null;
    phone: string | null;
}

// Fully normalized instructor with optional contact info
export interface Instructor {
    firstName: string;
    lastName: string;
    title: string | null;
    email: string | null;
    phone: string | null;
}

// Represents a normalized time range in 24-hour format strings
export interface NormalizedTime {
    startTime: string; // "HH:MM:SS"
    endTime: string; // "HH:MM:SS"
}

// ---------- Input data types for ingestion and processing ----------

// Department data with unique code and title
export interface DepartmentInput {
    code: string;
    title: string;
}

// Course data with code, title, and associated department ID
export interface CourseInput {
    code: string;
    title: string;
    departmentId: number;
}

// Discussion group linked to a course and term
export interface DiscussionGroupInput {
    courseId: number;
    term: string;
}

// Course section data including identifiers, term, type, and discussion group linkage
export interface SectionInput {
    sectionNumber: string;
    classNumber: string;
    term: string;
    isAsync: boolean;
    courseId: number;
    type: SectionType;
    discussionGroupId: number | null;
}

// Meeting data with day, time range, location, and linked section
export interface MeetingInput {
    day: Day;
    startTime: string;
    endTime: string;
    location: string;
    sectionId: number;
}

// ---------- Raw input data from scraped course catalog ----------

// Represents a single section of a course as scraped
export interface RawSection {
    section: string; // Section identifier (e.g., "01")
    classNumber: string; // Unique class number in a term
    days: string; // Raw days string (e.g., "M|W")
    time: string; // Raw time string (e.g., "10:00 - 11:15 am")
    instructor: string; // Raw instructor name(s)
    location: string; // Location string
}

// Represents a semester with multiple sections of a course
export interface RawSemester {
    semester: string; // Semester name/code (e.g., "Fall 2025")
    sections: RawSection[]; // Sections offered that semester
}

// Represents a course with its code, name, and semester data
export interface RawCourse {
    courseCode: string; // Course code (e.g., "101")
    courseName: string; // Course full name
    semesters: RawSemester[]; // Semester offerings
}

// Represents a department with its courses
export interface RawDepartment {
    departmentCode: string; // Department code (e.g., "CS")
    departmentName: string; // Department full name
    courses: RawCourse[]; // Courses offered by this department
}

// ---------- Normalized output data for use in app ----------

// Represents a single meeting time and location after normalization
export interface NormalizedMeeting {
    day: Day; // Day abbreviation (e.g., "M")
    startTime: string; // Start time in 24-hour format "HH:MM:SS"
    endTime: string; // End time in 24-hour format "HH:MM:SS"
    location: string; // Meeting location
}

// Represents a normalized course section with metadata and meetings
export interface NormalizedSection {
    sectionNumber: string; // Section identifier (e.g., "01")
    classNumber: string; // Unique class number in a term
    term: string; // Term or semester code
    type: SectionType; // Section type (LECTURE or DISCUSSION)
    isAsync: boolean; // Whether section is asynchronous
    instructors: Instructor[]; // List of instructors teaching this section
    meetings: NormalizedMeeting[]; // Scheduled meeting times and locations
}

// Represents a normalized course with sections
export interface NormalizedCourse {
    courseCode: string; // Course code (e.g., "101")
    courseName: string; // Course full name
    sections: NormalizedSection[]; // Sections in this course
}

// Represents a normalized department with courses
export interface NormalizedDepartment {
    departmentCode: string; // Department code (e.g., "CS")
    departmentName: string; // Department full name
    courses: NormalizedCourse[]; // Courses offered by this department
}

/**
 * The complete normalized course catalog as an array of departments.
 * Each department contains its courses, and each course contains its sections.
 */
export type NormalizedData = NormalizedDepartment[];

export interface ApiDepartment {
    id: number;
    code: string;
    title: string;
}

export interface ApiDepartmentCourse {
    id: number;
    code: string;
    title: string;
    departmentId: number;
}

export interface ApiDepartmentInfo {
    id: number;
    code: string;
    title: string;
    courses: ApiDepartmentCourse[];
    instructors: ApiInstructor[];
}

export interface ApiCourse {
    id: number;
    code: string;
    title: string;
    departmentId: number;
    department: ApiDepartment;
}

export interface ApiInstructor {
    id: number;
    firstName: string;
    lastName: string;
    title: string | null;
    email: string | null;
    phone: string | null;
}

export interface ApiMeeting {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    location: string;
    sectionId: number;
}

export interface ApiCourseSection {
    id: number;
    sectionNumber: string;
    classNumber: string;
    term: string;
    isAsync: boolean;
    courseId: number;
    discussionGroupId: number | null;
    type: string;
}

export interface ApiSection {
    id: number;
    sectionNumber: string;
    classNumber: string;
    term: string;
    isAsync: boolean;
    courseId: number;
    discussionGroupId: number | null;
    type: string;
    course: ApiCourse;
    instructors: ApiInstructor[];
    meetings: ApiMeeting[];
    discussionGroup: null | any;
}
