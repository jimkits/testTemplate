import { test, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class NavigationPage extends BasePage {
    page: Page;
    sideNavButton: Locator;
    logoutButton: Locator;
    sideNavOpen: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.sideNavButton = this.page.locator('button.btn-nav');
        this.logoutButton = this.page.locator('button.btn-logout');
        this.sideNavOpen = this.page.locator('.nav-sidebar-open');
    }

    async openSideNav(): Promise<this> {
        await test.step('open the side navigation', async () => {
            await expect(this.sideNavButton).toBeEnabled();
            await this.sideNavButton.click();
            await expect(this.sideNavOpen).toBeVisible();
        });

        return this;
    }

    async navigateToHero(heroName: string): Promise<this> {
        await this.openSideNav();

        await test.step(`navigate to ${heroName} hero`, async () => {
            const heroLink = this.sideNavOpen.locator('.nav-link', { hasText: heroName });
            await heroLink.click();
        });

        return this;
    }

    async navigateToMonster(size: string): Promise<this> {
        await this.openSideNav();

        await test.step(`navigate to ${size} monsters`, async () => {
            const monsterLink = this.sideNavOpen.locator('.nav-link', { hasText: size });
            await monsterLink.click();
        });

        return this;
    }

    async logout(): Promise<this> {
        await test.step('click the logout button', async () => {
            await this.logoutButton.click();
        });

        return this;
    }
}
