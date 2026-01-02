import { chromium, Page, Locator } from 'playwright-chromium';
import { removeAccents } from '../../utils/';
import { InstructorInfo } from '../../types';

/**
 * Scrapes the entire directory, iterating through all pages
 * and collecting instructor information into a map.
 *
 * @returns {Promise<Map<string, InstructorInfo>>} A Map of instructor names to their info.
 */
export async function scrapeInstructorInfo(): Promise<
    Map<string, InstructorInfo>
> {
    // Map of all instructor info
    const instructorMap = new Map<string, InstructorInfo>();

    // Launch the browser and open a page
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the first page of the directory
    await page.goto('https://www.umb.edu/directory/?page=1');
    await page.waitForSelector('nav.pagination.c-pagination');

    // Get last page number
    const lastPageNumber = await page
        .locator('nav.pagination.c-pagination a')
        .filter({ hasText: /^[0-9]+$/ })
        .last()
        .textContent()
        .then((text) => parseInt(text ?? '1', 10));

    // Iterate through all pages
    for (let pageNumber = 1; pageNumber <= lastPageNumber; pageNumber++) {
        const url = `https://www.umb.edu/directory/?page=${pageNumber}`;
        console.log(`Scraping page ${pageNumber}/${lastPageNumber}`);

        // Go to the page, and wait for the staff cards to load
        await page.goto(url);
        await page.waitForSelector('.staff-directory .staff-card');

        // Extract all info from staff cards
        await extractStaffFromPage(page, instructorMap);
    }

    // Close the browser
    await browser.close();

    // Return the Map for matching
    return instructorMap;
}

/**
 * Extracts instructor information (name, title, email, phone)
 * from all staff cards on the current page.
 *
 * @param page - Current Playwright Page instance.
 */
async function extractStaffFromPage(
    page: Page,
    instructorMap: Map<string, InstructorInfo>
) {
    // Find all the cards on the page
    const cards = page.locator('.staff-directory .staff-card');
    const count = await cards.count();

    // Iterate through all cards
    for (let i = 0; i < count; i++) {
        const card = cards.nth(i);

        // Get the name and remove accents
        const name = removeAccents(
            (
                await card
                    .locator('a > span.button-cta.card-heading-name')
                    .textContent()
            )?.trim() ?? ''
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
