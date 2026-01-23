import { test, expect } from './fixtures';
import { Helpers } from '../helpers/helpers';

test.describe('Login Tests', () => {
  const baseUrl: string = process.env.BASE_URL || '';
  const username: string = process.env.HUDL_USERNAME || '';
  const password: string = process.env.HUDL_PASSWORD || '';

  // Ensure credentials are provided before running tests
  test.beforeAll(() => {
    if (!baseUrl || !username || !password) {
      throw new Error('Environment variables must be set. Please check your .env file.');
    }
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test('User successfully logs in',
    { tag: ['@smoke','@regression'] },
    async ({ page, landingPage, loginPage, mainPage }) => {
    // Act
    await page.goto(baseUrl);

    await landingPage.GoToLoginPage();

    await loginPage.typeUsername(username).then(lp => lp.typePassword(password));

    // Assert
    await test.step('verify the user is logged in', async () => {
      // WebKit has issues with innerText, so we use textContent with explicit polling
      await page.waitForLoadState('networkidle');
      
      await expect(async () => {
        const text = await mainPage.userEmailText.textContent();
        expect(text).toBe(username);
      }).toPass({ timeout: 15000 });
    });
  });

  [
    { username: '', error: 'Enter an email address', tags: '@regression' },
    { username: 'username', error: 'Enter a valid email.', tags: '@regression' },
    { username: '" or ""="', error: 'Enter a valid email.', tags: ['@regression', '@security'] } // SQL injection
  ].forEach(({ username, error, tags }) => {
    test(`User gets an error when entering the username "${username}"`,
    { tag: tags },
    async ({ page, landingPage, loginPage }) => {
      // Act
      await page.goto(baseUrl);

      await landingPage.GoToLoginPage();

      await loginPage.typeUsername(username);

      // Assert
      await expect(loginPage.errorMessage).toContainText(error);
    });
  });

  [
    { username: 'randomUser', password: '', error: 'Enter your password.', tags: '@regression' },
    // For the two tests below, the error is different if the username exists in the DB or not.
    { username: 'randomUser', password: password, error: 'Incorrect username or password.', tags: '@regression' },
    { username: username, password: '" or ""="', error: 'Your email or password is incorrect.', tags: ['@regression','@security'] } // SQL injection
  ].forEach(({ username: testUsername, password: testPassword, error, tags }) => {
    test(`User fails to login with the username "${testUsername}" and password "${testPassword}"`,
    { tag: tags },
    async ({ page, landingPage, loginPage }) => {
      // Setup
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
