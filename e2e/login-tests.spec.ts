import { test, expect } from '@playwright/test';
import { LandingPage } from '../page-objects/landing-page';
import { LoginPage } from '../page-objects/login-page';
import { MainPage } from '../page-objects/main-page';
import { Helpers } from '../helpers/helpers';

test.describe('Login Tests', () => {
  const baseUrl: string = process.env.BASE_URL || '';
  const username: string = process.env.HUDL_USERNAME || '';
  const password: string = process.env.HUDL_PASSWORD || '';

  // Validate that credentials are provided before running tests
  test.beforeAll(() => {
    if (!baseUrl || !username || !password) {
      throw new Error('Environment variables must be set. Please check your .env file.');
    }
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test('User successfully logs in', async ({ page }) => {
    // Setup
    const landingPage = new LandingPage(page);
    const loginPage = new LoginPage(page);
    const mainPage = new MainPage(page);

    // Act
    await page.goto(baseUrl);

    await landingPage.GoToLoginPage();

    await loginPage.typeUsername(username);

    await loginPage.typePassword(password);

    // Assert
    await test.step('verify the user is logged in', async () => {
      await expect(mainPage.userEmailText).toHaveText(username, { timeout: 10000, useInnerText: true });
    });
  });

  [
    { username: '', error: 'Enter an email address' },
    { username: 'username', error: 'Enter a valid email.' },
    { username: '" or ""="', error: 'Enter a valid email.' } // SQL injection
  ].forEach(({ username, error }) => {
    test(`User gets an error when entering the username "${username}"`, async ({ page }) => {
      // Setup
      const landingPage = new LandingPage(page);
      const loginPage = new LoginPage(page);

      // Act
      await page.goto(baseUrl);

      await landingPage.GoToLoginPage();

      await loginPage.typeUsername(username);

      // Assert
      await expect(loginPage.errorMessage).toContainText(error);
    });
  });

  [
    { username: 'randomUser', password: '', error: 'Enter your password.' },
    // For the two tests below, the error is different if the username exists in the DB or not.
    { username: 'randomUser', password: password, error: 'Incorrect username or password.' },
    { username: username, password: '" or ""="', error: 'Your email or password is incorrect.' } // SQL injection
  ].forEach(({ username: testUsername, password: testPassword, error }) => {
    test(`User fails to login with the username "${testUsername}" and password "${testPassword}"`, async ({ page }) => {
      // Setup
      const landingPage = new LandingPage(page);
      const loginPage = new LoginPage(page);
      const helpers = new Helpers();

      // The system blocks a username if it fails to login too many times.
      // Use a random email to avoid rate limiting
      let finalUsername = !testUsername.includes('randomUser') ? testUsername : helpers.getRandomUsername();

      // Act
      await page.goto(baseUrl);

      await landingPage.GoToLoginPage();

      await loginPage.typeUsername(finalUsername);

      await loginPage.typePassword(testPassword);

      // Assert
      await expect(loginPage.errorMessage).toContainText(error);
    });
  });
});
