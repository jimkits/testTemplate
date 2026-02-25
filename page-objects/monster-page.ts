import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class MonsterPage extends BasePage {
    page: Page;
    monsterTitle: Locator;
    monsterList: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.monsterTitle = this.page.locator('.monster-list h1');
        this.monsterList = this.page.locator('.monster-list');
    }
}
