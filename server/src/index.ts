import path from 'path';
import colors from 'ansi-colors';
import { logger } from './utils/logger';
import { writeJSONToFile } from './utils';
import { runIngest } from './services/ingest/ingest';
import { matchMapInfo } from './services/matchMapInfo';
import { ScrapeData } from './services/scraper/scraper';
import rawInstructorInfo from '../data/instructorInfo.json';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import type { Instructor, InstructorInfo, RawDepartment } from './types';

async function main() {
    const startTime = Date.now();
    try {
        // console.log(colors.bold.white('\nSTARTING UPDATE\n'));

        // console.log(colors.bold.cyan('➤ Phase 1: Scraping Course Catalog'));
        // const rawData: RawDepartment[] = await ScrapeData();

        // console.log(colors.bold.cyan('➤ Phase 2: Instructor Matching'));
        // await matchMapInfo();

        // console.log(colors.bold.cyan('➤ Phase 3: Creating Instructor Map'));
        // logger.startTask(1, 'Indexing Instructors');
        // const instructorInfoMap: Map<string, InstructorInfo> = new Map(
        //     (rawInstructorInfo as Instructor[]).map(
        //         ({ firstName, lastName, title, email, phone }) => [
        //             `${firstName} ${lastName}`,
        //             { title, email, phone },
        //         ],
        //     ),
        // );
        // logger.updateTask(1);
        // logger.completeTask();

        // console.log(colors.bold.cyan('➤ Phase 4: Normalizing Scraped Data'));
        // logger.startTask(1, 'Normalizing Data');
        // const normalizedData = writeNormalizedJSON(rawData as RawDepartment[], instructorInfoMap);
        // const normalizedDataPath = path.resolve(__dirname, '../data/normalizedData.json');
        // await writeJSONToFile(normalizedDataPath, normalizedData);
        // logger.updateTask(1);
        // logger.completeTask();

        console.log(colors.bold.cyan('➤ Phase 5: Database Ingestion'));
        await runIngest();

        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(colors.bold.green(`\n✨ Pipeline completed successfully in ${duration}s!\n`));
    } catch (error) {
        logger.stop();
        console.error(colors.bold.red('\n❌ Pipeline error:'), error);
        process.exit(1);
    }
}

main();
