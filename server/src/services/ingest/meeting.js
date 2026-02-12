"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertMeeting = upsertMeeting;
exports.upsertMeetings = upsertMeetings;
const prismaClient_1 = __importDefault(require("../../../prismaClient"));
/**
 * Helper to build create/update data for meetings.
 *
 * @param meeting - Meeting input object
 * @returns The data object for Prisma upsert
 */
function buildMeetingData(meeting) {
    return {
        day: meeting.day,
        startTime: meeting.startTime,
        endTime: meeting.endTime,
        location: meeting.location,
        sectionId: meeting.sectionId,
    };
}
/**
 * Upserts a single meeting by its unique combination of sectionId, day, startTime, and endTime.
 * If a matching meeting exists, updates the location.
 * Otherwise, creates a new meeting.
 *
 * @param meeting - Meeting input object containing day, times, location, and sectionId
 * @returns The created or updated meeting record
 */
async function upsertMeeting(meeting) {
    return prismaClient_1.default.meeting.upsert({
        // Unique constraint on sectionId, day, startTime, and endTime
        where: {
            sectionId_day_startTime_endTime: {
                sectionId: meeting.sectionId,
                day: meeting.day,
                startTime: meeting.startTime,
                endTime: meeting.endTime,
            },
        },
        update: { location: meeting.location },
        create: buildMeetingData(meeting),
    });
}
/**
 * Bulk upsert many meetings inside a single transaction.
 * Rolls back all changes if any insertion or update fails.
 *
 * @param meetings - Array of meeting input objects
 * @returns An array of created or updated meeting records
 */
async function upsertMeetings(meetings) {
    return prismaClient_1.default.$transaction(meetings.map((meeting) => prismaClient_1.default.meeting.upsert({
        // Unique constraint on sectionId, day, startTime, and endTime
        where: {
            sectionId_day_startTime_endTime: {
                sectionId: meeting.sectionId,
                day: meeting.day,
                startTime: meeting.startTime,
                endTime: meeting.endTime,
            },
        },
        update: { location: meeting.location },
        create: buildMeetingData(meeting),
    })));
}
