/**
 * Converts a 12-hour time to the number of minutes after midnight.
 *
 * @param hour - The hour (1-12).
 * @param minutes - The minute (0-59).
 * @param meridiem - Either 'am' or 'pm'.
 * @returns Number of minutes after midnight.
 */
export function toMinutes(hour: number, minutes: number, meridiem: string): number {
    if (meridiem === 'am' && hour === 12) hour = 0;
    if (meridiem === 'pm' && hour !== 12) hour += 12;
    return hour * 60 + minutes;
}
