import { formatTime, formatTimeToMinutes } from './utils/formatTime';
import type { DayLiteral, AcademicTerm } from './constants';
import type { ApiSectionWithRelations, TimeRange } from './types';

/** Converts a decimal hour (e.g., 14.5) to total minutes from midnight (e.g., 870) */
const decimalToMins = (hour: number) => Math.floor(hour * 60);

/** Internal type for pre-calculated meeting times to avoid string parsing in loops */
type ParsedMeeting = { day: DayLiteral; start: number; end: number };

/** Extends the base section type to include our pre-parsed numeric times */
type ParsedSection = ApiSectionWithRelations & {
    parsedMeetings: ParsedMeeting[];
};

/**
 * Validates if a section fits into the current schedule without conflicts.
 *
 * @param section - The section we are currently testing.
 * @param currentSchedule - The sections already placed in the "current branch" of the search.
 * @param minGap - Required buffer time between classes in minutes.
 * @param startLimit - Earliest allowed start time in minutes.
 * @param endLimit - Latest allowed end time in minutes.
 * @param selectedDays - The days the user is willing to attend class.
 */
function isSectionCompatible(
    section: ParsedSection,
    currentSchedule: ParsedSection[],
    minGap: number,
    startLimit: number,
    endLimit: number,
    selectedDays: DayLiteral[],
): boolean {
    // Loop through every meeting (e.g., Mon/Wed/Fri) of the NEW section
    for (const meeting of section.parsedMeetings) {
        // --- Check if meeting is within the selected days ---
        if (!selectedDays.includes(meeting.day)) return false;

        // --- Check if meeting is within the selected time range ---
        if (meeting.start < startLimit || meeting.end > endLimit) return false;

        // --- Compare this meeting against already selected meetings ---
        for (const scheduledSection of currentSchedule) {
            for (const sMeeting of scheduledSection.parsedMeetings) {
                // If the classes are on different days, they can't conflict
                if (meeting.day !== sMeeting.day) continue;

                // Check if there is a time conflict between meetings
                if (meeting.start < sMeeting.end && meeting.end > sMeeting.start) return false;

                // Find the distance between the end of the earlier class and the start of the next one
                const gap =
                    meeting.start >= sMeeting.end
                        ? meeting.start - sMeeting.end
                        : sMeeting.start - meeting.end;

                // If the gap is smaller than the user's preference, it's a conflict.
                if (gap < minGap) return false;
            }
        }
    }
    return true;
}

/**
 * Generates all valid class schedules using a Depth-First Search (Backtracking) algorithm.
 *
 * @param courses - The list of courses the student wants to take.
 * @param filters - The user's preferences for days, times, and gaps.
 */
export function generateSchedulesDFS(
    courses: { id: number; sections: ApiSectionWithRelations[] }[],
    filters: {
        selectedDays: DayLiteral[];
        selectedTerm: AcademicTerm;
        minimumGap: number;
        timeRange: TimeRange;
    },
): ApiSectionWithRelations[][] {
    const { selectedTerm, minimumGap, selectedDays, timeRange } = filters;

    // Convert global time to minutes after midnight
    const startLimit = decimalToMins(timeRange.start);
    const endLimit = decimalToMins(timeRange.end);

    // Pre-process courses into a numeric format
    const processedCourses = courses.map((course) => ({
        ...course,
        sections: course.sections
            // Only keep sections for the right semester that have meeting times
            .filter((section) => section.term === selectedTerm && section.meetings.length > 0)
            .map((section) => {
                const parsedMeetings: ParsedMeeting[] = [];
                for (const meeting of section.meetings) {
                    // Extract time and skip TBA sections
                    const range = formatTime(meeting);
                    if (range === 'TBA') continue;

                    // Convert time strings to numeric start/end minutes
                    const parsed = formatTimeToMinutes(range);
                    if (parsed && meeting.day) {
                        parsedMeetings.push({
                            day: meeting.day,
                            start: parsed.startMins,
                            end: parsed.endMins,
                        });
                    }
                }
                // Attach the parsed numeric meetings to the section object
                return { ...section, parsedMeetings };
            })

            // Remove sections that are invalid (violate filters)
            .filter((section) =>
                section.parsedMeetings.every(
                    (meeting) =>
                        selectedDays.includes(meeting.day) &&
                        meeting.start >= startLimit &&
                        meeting.end <= endLimit,
                ),
            ),
    }));

    const allResults: ApiSectionWithRelations[][] = [];
    const currentPath: ParsedSection[] = [];

    // Recursive function that explores course combinations
    function backtrack(courseIdx: number) {
        //  Base case: save result if a section was picked for every course
        if (courseIdx === processedCourses.length) {
            allResults.push([...currentPath]);
            return;
        }

        const currentCourse = processedCourses[courseIdx];

        // Group sections by suffix to handle lectures and secondaries (labs and discussions)
        const labs = currentCourse.sections.filter((s) => s.sectionNumber.endsWith('L'));
        const discs = currentCourse.sections.filter((s) => s.sectionNumber.endsWith('D'));
        const lectures = currentCourse.sections.filter(
            (s) => !s.sectionNumber.endsWith('D') && !s.sectionNumber.endsWith('L'),
        );

        // Combine labs and discussions into one pool for the course
        const secondarySections = [...labs, ...discs];

        if (secondarySections.length > 0) {
            // Case when course requires a lecture paired with one secondary section
            for (const lecture of lectures) {
                // Check lecture compatibility in the schedule
                if (
                    !isSectionCompatible(
                        lecture,
                        currentPath,
                        minimumGap,
                        startLimit,
                        endLimit,
                        selectedDays,
                    )
                )
                    continue;

                // Temporarily add lecture to the schedule path
                currentPath.push(lecture);

                for (const secondary of secondarySections) {
                    // Check secondary compatibility with the lecture and schedule
                    if (
                        !isSectionCompatible(
                            secondary,
                            currentPath,
                            minimumGap,
                            startLimit,
                            endLimit,
                            selectedDays,
                        )
                    )
                        continue;

                    // Add secondary and move to the next course in the list
                    currentPath.push(secondary);
                    backtrack(courseIdx + 1);

                    // Remove secondary to try the next combination
                    currentPath.pop();
                }

                // Remove lecture to try the next lecture combination
                currentPath.pop();
            }
        } else {
            // Case for standard courses with only one section component
            for (const section of currentCourse.sections) {
                // Check compatibility before adding the section
                if (
                    isSectionCompatible(
                        section,
                        currentPath,
                        minimumGap,
                        startLimit,
                        endLimit,
                        selectedDays,
                    )
                ) {
                    currentPath.push(section);
                    backtrack(courseIdx + 1);

                    // Backtrack by removing the section
                    currentPath.pop();
                }
            }
        }
    }

    // Start the search at the first course index
    backtrack(0);

    return allResults;
}
