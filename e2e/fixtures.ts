import { test as base } from '@playwright/test';
import { LandingPage } from '../page-objects/landing-page';
import { LoginPage } from '../page-objects/login-page';
import { MainPage } from '../page-objects/main-page';

// Define custom fixture types
type PageObjects = {
    landingPage: LandingPage;
    loginPage: LoginPage;
    mainPage: MainPage;
};

// Extend base test with custom fixtures
export const test = base.extend<PageObjects>({
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },
});

export { expect } from '@playwright/test';
