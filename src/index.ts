import { ScrapeData } from './services/scraper/scraper';
import { buildInstructorEmailMap } from './utils';
import { data, instructorEmails } from '../data';
import { writeNormalizedJSON } from './services/writeNormalizedJSON';
import { writeJSONToFile } from './utils';
import path from 'path';

async function main() {
    const emailMap = buildInstructorEmailMap(instructorEmails);
    const normalized = writeNormalizedJSON(data, emailMap);

    const outputNormalizedPath = path.resolve(
        __dirname,
        '../data/normalized.json'
    );
    writeJSONToFile(outputNormalizedPath, normalized);
}

main();
