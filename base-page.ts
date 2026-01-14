import { Locator, Page } from "@playwright/test";

export class BasePage {
    page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }

    public getByQAId(id: string): Locator{
        return this.page.locator(`[data-qa-id="${id}"]`);
    }

    public getById(id: string): Locator{
        return this.page.locator(`[id="${id}"]`);
    }

    public getByClass(id: string): Locator{
        return this.page.locator(`[class="${id}"]`);
    }
}