import { test, expect } from './fixtures';

test.describe('Monster Tests', () => {
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

    ['Small', 'Medium', 'Large'].forEach((size) => {
        test(`User navigates to ${size} monsters page`,
            { tag: ['@smoke', '@regression'] },
            async ({ navigationPage: landingPage, monsterPage }) => {
            // Act
            await landingPage.navigateToMonster(size);

            // Assert
            await test.step(`verify ${size} monsters page is displayed`, async () => {
                await expect(monsterPage.monsterTitle).toHaveText(`${size} Monsters`);
                await expect(monsterPage.monsterList).not.toBeNull();
            });
        });
    });
});
