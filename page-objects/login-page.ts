import { test, Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    page: Page;
    usernameField: Locator;
    passwordField: Locator;
    loginButton: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.usernameField = this.page.locator('input[placeholder="Username"]');
        this.passwordField = this.page.locator('input[placeholder="Password"]');
        this.loginButton = this.page.locator('button.login-button');
        this.errorMessage = this.page.locator('.login-error');
    }

    async typeUsername(username: string): Promise<this> {
        await test.step('type in the username', async () => {
            await this.usernameField.fill(username);
        });

        return this;
    }

    async typePassword(password: string): Promise<this> {
        await test.step('type in the password', async () => {
            await this.passwordField.fill(password);
        });

        return this;
    }

    async clickLogin(): Promise<this> {
        await test.step('click the login button', async () => {
            await this.loginButton.click();
        });

        return this;
    }

    async login(username: string, password: string): Promise<this> {
        await this.typeUsername(username);
        await this.typePassword(password);
        await this.clickLogin();

        return this;
    }
}
