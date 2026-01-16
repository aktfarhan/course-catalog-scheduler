import type { ApiMeeting } from '../../../src/types';

export function formatTime(meeting: ApiMeeting) {
    if (!meeting) return 'TBA';

    const startTime = meeting.startTime.split('T')[1].split('.')[0];
    const endTime = meeting.endTime.split('T')[1].split('.')[0];

    const standardStartTime = toStandardTime(startTime);
    const standardEndTime = toStandardTime(endTime);

    return `${standardStartTime} – ${standardEndTime}`;
}

function toStandardTime(time: string) {
    const [hours24, minutes] = time.split(':');
    const hours = parseInt(hours24, 10);

    // Calculating am/pm and convert hour 0 or 13-23
    const meridiem = hours >= 12 ? 'pm' : 'am';
    const hours12 = ((hours + 11) % 12) + 1;

    return `${hours12}:${minutes}${meridiem}`;
}
