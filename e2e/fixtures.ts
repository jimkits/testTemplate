import { test as base } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation-page';
import { LoginPage } from '../page-objects/login-page';
import { MainPage } from '../page-objects/main-page';
import { HeroPage } from '../page-objects/hero-page';
import { MonsterPage } from '../page-objects/monster-page';

type PageObjects = {
    navigationPage: NavigationPage;
    loginPage: LoginPage;
    mainPage: MainPage;
    heroPage: HeroPage;
    monsterPage: MonsterPage;
};

export const test = base.extend<PageObjects>({
    navigationPage: async ({ page }, use) => {
        const navigationPage = new NavigationPage(page);
        await use(navigationPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);
        await use(mainPage);
    },

    heroPage: async ({ page }, use) => {
        const heroPage = new HeroPage(page);
        await use(heroPage);
    },

    monsterPage: async ({ page }, use) => {
        const monsterPage = new MonsterPage(page);
        await use(monsterPage);
    },
});

export { expect } from '@playwright/test';
