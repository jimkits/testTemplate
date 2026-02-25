import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { NavigationPage } from '../page-objects/navigation-page';

const authFile = '.auth/user.json';

setup('authenticate', async ({ page }) => {
    const baseUrl = process.env.BASE_URL!;
    const username = process.env.DND_USERNAME!;
    const password = process.env.DND_PASSWORD!;

    if (!baseUrl || !username || !password) {
        throw new Error('Environment variables must be set. Please check your .env file.');
    }

    await page.goto(baseUrl);

    const loginPage = new LoginPage(page);
    await loginPage.login(username, password);

    const navigationPage = new NavigationPage(page);
    await expect(navigationPage.logoutButton).toBeVisible();

    await page.context().storageState({ path: authFile });
});
