import { test, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LandingPage extends BasePage {
    page: Page;
    loginButton: Locator;
    loginPageLink: Locator;

    constructor (page: Page){
        super(page);
        this.page = page;

        this.loginButton = this.getByQAId('login-select');
        this.loginPageLink = this.getByQAId('login-hudl');
    }
    
    async GoToLoginPage(){
        await test.step('Click on the Log in dropdown menu', async () => {
            const loginButton = this.loginButton;
            await expect(loginButton).toBeVisible({ timeout: 2000 });
            await loginButton.click();
        });

        await test.step('Click on the Hudl link', async () => {
            const loginPageLink = this.loginPageLink;
            await expect(loginPageLink).toBeVisible({ timeout: 2000 });
            await loginPageLink.click();

            await expect(this.page).toHaveTitle('Log In', { timeout: 5000 });
        });
    }
}
