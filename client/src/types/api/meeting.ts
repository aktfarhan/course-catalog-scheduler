export interface ApiMeeting {
    id: number;
    day: string;
    startTime: string; // ISO time string
    endTime: string; // ISO time string
    location: string;
    sectionId: number;
}
