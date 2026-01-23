import { test, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    page: Page;
    usernameField: Locator;
    continueButton: Locator;
    passwordField: Locator;
    errorMessage: Locator;

    constructor (page: Page){
        super(page);
        this.page = page;

        this.usernameField = this.getById('username');
        this.continueButton = this.page.getByText('Continue', { exact: true });
        this.passwordField = this.getById('password');
        // Username page uses .ulp-error-info.ulp-validator-error
        // Password page uses .ulp-input-error-message
        this.errorMessage = this.page.locator('.ulp-error-info.ulp-validator-error, .ulp-input-error-message').first();
    }

    async typeUsername(username: string): Promise<this> {
        await test.step('type in the username', async () => {
            const usernameField = this.usernameField;

            await expect(usernameField).toBeEditable({ timeout: 2000 });
            await usernameField.fill(username);
            await this.continueButton.click();
        });

        return this;
    }

    async typePassword(password: string): Promise<this> {
        await test.step('type in the password', async () => {
            const passwordField = this.passwordField;

            await expect(passwordField).toBeEditable({ timeout: 2000 });
            await passwordField.fill(password);
            await this.continueButton.click();
        });

        return this;
    }
}
