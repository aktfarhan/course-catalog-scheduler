import { logger } from '../../utils/logger';
import { withRetry } from '../../utils';
import { removeAccents } from '../../utils/';
import { chromium, Page, Locator } from 'playwright-chromium';
import type { InstructorInfo } from '../../types';

const CONCURRENCY = 5;

/**
 * Scrapes the entire directory using parallel browser contexts,
 * iterating through all pages and collecting instructor information.
 *
 * @returns {Promise<Map<string, InstructorInfo>>} A Map of instructor names to their info.
 */
export async function scrapeInstructorInfo(): Promise<Map<string, InstructorInfo>> {
    const instructorMap = new Map<string, InstructorInfo>();

    // Launch the browser and determine total page count
    const browser = await chromium.launch({ headless: true });
    const scoutPage = await browser.newPage();

    await scoutPage.goto('https://www.umb.edu/directory/?page=1', { timeout: 30000 });
    await scoutPage.waitForSelector('nav.pagination.c-pagination', { timeout: 15000 });

    // Get last page number from pagination links
    const lastPageNumber = await scoutPage
        .locator('nav.pagination.c-pagination a')
        .filter({ hasText: /^[0-9]+$/ })
        .last()
        .textContent()
        .then((text) => parseInt(text ?? '1', 10));

    await scoutPage.close();

    // Build a queue of page numbers for workers to pull from
    const pageQueue: number[] = [];
    for (let i = 1; i <= lastPageNumber; i++) pageQueue.push(i);

    logger.startTask(lastPageNumber, 'Scraping Directory');
    let completed = 0;

    // Worker function: each worker gets its own browser context and page
    async function worker() {
        const context = await browser.newContext();
        const page = await context.newPage();

        while (pageQueue.length > 0) {
            const pageNumber = pageQueue.shift()!;

            try {
                await withRetry(async () => {
                    await page.goto(`https://www.umb.edu/directory/?page=${pageNumber}`, {
                        timeout: 30000,
                    });
                    await page.waitForSelector('.staff-directory .staff-card', { timeout: 15000 });
                    await extractStaffFromPage(page, instructorMap);
                });
            } catch (error) {
                console.error(`Failed to scrape directory page ${pageNumber}:`, error);
            }

            completed++;
            logger.updateTask(completed);
        }

        await context.close();
    }

    // Run workers in parallel
    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

    await browser.close();
    logger.completeTask();

    return instructorMap;
}

/**
 * Extracts instructor information (name, title, email, phone)
 * from all staff cards on the current page.
 *
 * @param page - Current Playwright Page instance.
 * @param instructorMap - Map to populate with instructor info.
 */
async function extractStaffFromPage(page: Page, instructorMap: Map<string, InstructorInfo>) {
    // Find all the cards on the page
    const cards = page.locator('.staff-directory .staff-card');
    const count = await cards.count();

    // Iterate through all cards
    for (let i = 0; i < count; i++) {
        const card = cards.nth(i);

        // Get the name and remove accents
        const name = removeAccents(
            (await card.locator('a > span.button-cta.card-heading-name').textContent())?.trim() ??
                '',
        );
        // If no name found or already in InstructorMap
        if (!name) continue;
        if (instructorMap.has(name)) continue;

        // Gets the title, email, and phone number if available
        const title = await textOrNull(card.locator('.card-role p').first()); // Take first paragraph as title
        const email = await textOrNull(card.locator('.card-email p'));
        const phone = await textOrNull(card.locator('.card-phone p').first());

        // Creates a new entry for this instructor
        instructorMap.set(name, {
            email,
            title,
            phone,
        });
    }
}

/**
 * Helper function that extracts trimmed text content from a Playwright Locator.
 *
 * @param locator - Playwright Locator that may match zero or more elements.
 * @returns Trimmed text content if present, or null if no element exists.
 */
async function textOrNull(locator: Locator): Promise<string | null> {
    if ((await locator.count()) === 0) return null;
    return (await locator.textContent())?.trim() ?? null;
}
