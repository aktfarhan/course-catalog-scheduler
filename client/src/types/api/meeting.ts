export type Day = 'M' | 'Tu' | 'W' | 'Th' | 'F' | 'Sa' | 'Su';

export interface ApiMeeting {
    id: number;
    day: Day;
    startTime: string;
    endTime: string;
    location: string;
    sectionId: number;
}
