import { chromium } from 'playwright-chromium';
import * as fs from 'fs/promises';


export async function scrapeEmails() {
    const raw = await fs.readFile('data.json', 'utf-8');
    const catalog = JSON.parse(raw);

    const instructors = new Map<
        string,
        { firstName: string; lastName: string; email: string | null }
    >();

    for (const department of catalog) {
        for (const course of department.courses) {
            for (const semester of course.semesters) {
                for (const section of semester.sections) {
                    const instructorRaw = section.instructor?.trim();
                    if (!instructorRaw || instructorRaw === ',') continue;

                    // Skip numeric or invalid names
                    if (/^\d+$/.test(instructorRaw)) continue;

                    // Handle multiple instructors separated by '|'
                    const names = instructorRaw
                        .split('|')
                        .map((n: string) => n.trim());

                    for (const singleName of names) {
                        if (!singleName.includes(',')) continue; // Expect "Last,First" format

                        const normalized = normalizeInstructorName(singleName);
                        if (!normalized) continue;

                        const key = `${normalized.firstName.toLowerCase()}|${normalized.lastName.toLowerCase()}`;
                        if (!instructors.has(key)) {
                            instructors.set(key, {
                                ...normalized,
                                email: null,
                            });
                        }
                    }
                }
            }
        }
    }

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Iterate over instructors, search and scrape email
    for (const inst of instructors.values()) {
        const fullName = `${inst.firstName} ${inst.lastName}`;
        await page.goto('https://www.umb.edu/directory/');

        // Fill the search box and press Enter
        await page.fill('input#search', fullName);
        await page.keyboard.press('Enter');

        // Wait for the results container
        await page
            .waitForSelector('.staff-directory', { timeout: 5000 })
            .catch(() => {});

        // Grab all staff cards
        const staffCards = await page.$$('.staff-directory .staff-card');

        inst.email = null;

        for (const card of staffCards) {
            // Get the name inside the card
            const nameHandle = await card.$(
                'a > span.button-cta.card-heading-name'
            );
            const nameText = (await nameHandle?.textContent())?.trim();

            if (nameText?.toLowerCase() === fullName.toLowerCase()) {
                // Get the email from the p tag inside the card-email div
                const emailHandle = await card.$('.card-email p');
                if (emailHandle) {
                    inst.email =
                        (await emailHandle.textContent())?.trim() || null;
                    emailHandle.dispose();
                }
                break;
            }
        }

        // Small delay to be polite to the server
        await page.waitForTimeout(300);
    }

    await browser.close();

    // Write the results to JSON
    await fs.writeFile(
        './instructor_emails.json',
        JSON.stringify(Array.from(instructors.values()), null, 2)
    );

    console.log('Done scraping emails.');
}
