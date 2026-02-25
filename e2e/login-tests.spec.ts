import { test, expect } from './fixtures';

test.describe('Login Tests', () => {
    // We want these tests to start unauthenticated
    test.use({ storageState: { cookies: [], origins: [] } });

    const baseUrl: string = process.env.BASE_URL!;
    const username: string = process.env.DND_USERNAME!;
    const password: string = process.env.DND_PASSWORD!;

    // Ensure credentials are provided before running tests
    test.beforeAll(() => {
        if (!baseUrl || !username || !password) {
            throw new Error('Environment variables must be set. Please check your .env file.');
        }
    });

    test.afterEach(async ({ page }) => {
        page.close();
    });

    test('User is redirected to the login page when not authenticated',
        { tag: ['@smoke', '@regression'] },
        async ({ page }) => {
        // Act
        await page.goto(baseUrl);

        // Assert
        await test.step('verify the user is on the login page', async () => {
            await expect(page).toHaveURL('/login');
        });
    });

    test('User successfully logs in',
        { tag: ['@smoke', '@regression'] },
        async ({ page, loginPage, mainPage, navigationPage }) => {
        // Act
        await page.goto(baseUrl);

        await loginPage.login(username, password);

        // Assert
        await test.step('verify the user is on the home page', async () => {
            await expect(mainPage.pageTitle).toBeVisible();
            await expect(navigationPage.logoutButton).toBeVisible();
        });
    });

    test('User can logout after logging in',
        { tag: ['@regression'] },
        async ({ page, loginPage, navigationPage }) => {
        // Setup
        await page.goto(baseUrl);

        await loginPage.login(username, password);

        // Act
        await navigationPage.logout();

        // Assert
        await test.step('verify the user is redirected to the login page', async () => {
            await expect(page).toHaveURL('/login');
        });
    });

    [
        { username: 'wronguser', password: 'wrongpass', tags: ['@regression'] },
        { username: 'admin', password: 'wrongpass', tags: ['@regression'] },
    ].forEach(({ username: testUsername, password: testPassword, tags }) => {
        test(`User fails to login with username "${testUsername}" and password "${testPassword}"`,
            { tag: tags },
            async ({ page, loginPage }) => {
            // Act
            await page.goto(baseUrl);

            await loginPage.login(testUsername, testPassword);

            // Assert
            await expect(loginPage.errorMessage).toContainText('Invalid username or password');
        });
    });
});
