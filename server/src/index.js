"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const ingest_1 = require("./services/ingest/ingest");
const matchMapInfo_1 = require("./services/matchMapInfo");
const scraper_1 = require("./services/scraper/scraper");
const writeNormalizedJSON_1 = require("./services/writeNormalizedJSON");
const instructorInfo_json_1 = __importDefault(require("../data/instructorInfo.json"));
async function main() {
    try {
        console.log('Step 1: Scraping course catalog data...');
        const rawData = await (0, scraper_1.ScrapeData)();
        console.log('Step 2: Matching instructor info...');
        await (0, matchMapInfo_1.matchMapInfo)();
        console.log('Step 3: Creating instructor info map...');
        // rawInstructorInfo is an array of Instructor (with firstName, lastName, etc)
        const instructorInfoMap = new Map(instructorInfo_json_1.default.map(({ firstName, lastName, title, email, phone }) => [
            `${firstName} ${lastName}`,
            { title, email, phone },
        ]));
        console.log('Step 4: Normalizing scraped data...');
        const normalizedData = (0, writeNormalizedJSON_1.writeNormalizedJSON)(rawData, instructorInfoMap);
        // Write normalized data to file
        const normalizedDataPath = path_1.default.resolve(__dirname, '../data/normalizedData.json');
        await (0, utils_1.writeJSONToFile)(normalizedDataPath, normalizedData);
        console.log('Step 5: Ingesting normalized data into the database...');
        await (0, ingest_1.runIngest)();
        console.log('Pipeline completed successfully!');
    }
    catch (error) {
        console.error('Pipeline error:', error);
        process.exit(1);
    }
}
main();
