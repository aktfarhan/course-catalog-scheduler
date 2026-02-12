"use strict";
/**
 * @fileoverview
 * Re-export bulk upsert functions for course scheduling data ingestion.
 *
 * upsertDepartments - Bulk upsert department records.
 * upsertCourses - Bulk upsert course records.
 * upsertInstructors - Bulk upsert instructor records.
 * upsertSections - Bulk upsert section records.
 * upsertMeetings - Bulk upsert meeting records.
 * upsertDiscussionGroups - Bulk upsert discussion group records.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertInstructorViaLink = exports.upsertInstructorViaEmail = exports.preloadInstructorMap = exports.upsertDiscussionGroup = exports.upsertMeeting = exports.upsertSection = exports.upsertCourse = exports.upsertDepartment = void 0;
var department_1 = require("./department");
Object.defineProperty(exports, "upsertDepartment", { enumerable: true, get: function () { return department_1.upsertDepartment; } });
var course_1 = require("./course");
Object.defineProperty(exports, "upsertCourse", { enumerable: true, get: function () { return course_1.upsertCourse; } });
var section_1 = require("./section");
Object.defineProperty(exports, "upsertSection", { enumerable: true, get: function () { return section_1.upsertSection; } });
var meeting_1 = require("./meeting");
Object.defineProperty(exports, "upsertMeeting", { enumerable: true, get: function () { return meeting_1.upsertMeeting; } });
var discussionGroup_1 = require("./discussionGroup");
Object.defineProperty(exports, "upsertDiscussionGroup", { enumerable: true, get: function () { return discussionGroup_1.upsertDiscussionGroup; } });
var instructor_1 = require("./instructor");
Object.defineProperty(exports, "preloadInstructorMap", { enumerable: true, get: function () { return instructor_1.preloadInstructorMap; } });
Object.defineProperty(exports, "upsertInstructorViaEmail", { enumerable: true, get: function () { return instructor_1.upsertInstructorViaEmail; } });
Object.defineProperty(exports, "upsertInstructorViaLink", { enumerable: true, get: function () { return instructor_1.upsertInstructorViaLink; } });
