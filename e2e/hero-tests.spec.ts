import { test, expect } from './fixtures';

test.describe('Hero Tests', () => {
    const baseUrl: string = process.env.BASE_URL!;

    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            sessionStorage.setItem('loggedIn', 'true');
        });
        await page.goto(baseUrl);
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    ['Fighter', 'Sorcerer', 'Cleric', 'Rogue'].forEach((heroName) => {
        test(`User navigates to ${heroName} hero page`,
            { tag: ['@smoke', '@regression'] },
            async ({ navigationPage: landingPage, heroPage }) => {
            // Act
            await landingPage.navigateToHero(heroName);

            // Assert
            await test.step(`verify ${heroName} hero page is displayed`, async () => {
                await expect(heroPage.heroTitle).toHaveText(heroName);
                await expect(heroPage.heroDescription).toBeVisible();
            });
        });
    });
});
