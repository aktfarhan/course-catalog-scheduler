import path from 'path';
import ora from 'ora';
import chalk from 'chalk';
// @ts-ignore
import cliProgress from 'cli-progress';

import { writeJSONToFile } from './utils';
import { runIngest } from './services/ingest/ingest';
import { matchMapInfo } from './services/matchMapInfo';
import { ScrapeData } from './services/scraper/scraper';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import type { Instructor, InstructorInfo, RawDepartment } from './types';

import rawInstructorInfo from '../data/instructorInfo.json';

async function main() {
    try {
        // Step 1: Scraping
        let spinner = ora('Scraping course catalog data...').start();
        let progress = new cliProgress.SingleBar(
            {
                format: '[{bar}] {percentage}%',
                barCompleteChar: '█',
                barIncompleteChar: '░',
                hideCursor: true,
            },
            cliProgress.Presets.shades_classic,
        );
        progress.start(100, 0);

        const rawData: RawDepartment[] = await ScrapeData();
        for (let i = 0; i <= 100; i += 20) {
            progress.update(i);
            await new Promise((res) => setTimeout(res, 50));
        }
        progress.stop();
        spinner.succeed(chalk.green('Scraping complete'));

        // Step 2: Matching
        spinner = ora('Matching instructor info...').start();
        progress = new cliProgress.SingleBar(
            {
                format: '[{bar}] {percentage}%',
                barCompleteChar: '█',
                barIncompleteChar: '░',
                hideCursor: true,
            },
            cliProgress.Presets.shades_classic,
        );
        progress.start(100, 0);
        await matchMapInfo();
        for (let i = 0; i <= 100; i += 25) {
            progress.update(i);
            await new Promise((res) => setTimeout(res, 50));
        }
        progress.stop();
        spinner.succeed(chalk.green('Instructor info matched'));

        // Step 3: Creating instructor map
        spinner = ora('Creating instructor info map...').start();
        progress.start(100, 0);
        const instructorInfoMap: Map<string, InstructorInfo> = new Map(
            (rawInstructorInfo as Instructor[]).map(
                ({ firstName, lastName, title, email, phone }) => [
                    `${firstName} ${lastName}`,
                    { title, email, phone },
                ],
            ),
        );
        for (let i = 0; i <= 100; i += 50) {
            progress.update(i);
            await new Promise((res) => setTimeout(res, 30));
        }
        progress.stop();
        spinner.succeed(chalk.green('Instructor map created'));

        // Step 4: Normalizing
        spinner = ora('Normalizing scraped data...').start();
        progress.start(100, 0);
        const normalizedData = writeNormalizedJSON(rawData as RawDepartment[], instructorInfoMap);
        const normalizedDataPath = path.resolve(__dirname, '../data/normalizedData.json');
        await writeJSONToFile(normalizedDataPath, normalizedData);
        for (let i = 0; i <= 100; i += 50) {
            progress.update(i);
            await new Promise((res) => setTimeout(res, 30));
        }
        progress.stop();
        spinner.succeed(chalk.green('Normalization complete'));

        // Step 5: Ingest
        spinner = ora('Ingesting normalized data into database...').start();
        progress.start(100, 0);
        await runIngest();
        for (let i = 0; i <= 100; i += 50) {
            progress.update(i);
            await new Promise((res) => setTimeout(res, 30));
        }
        progress.stop();
        spinner.succeed(chalk.green('Database ingestion complete'));

        console.log(chalk.bold.green('\n✔ Pipeline completed successfully!\n'));
    } catch (error) {
        console.error(chalk.red('\n✖ Pipeline failed:\n'), error);
        process.exit(1);
    }
}

main();
