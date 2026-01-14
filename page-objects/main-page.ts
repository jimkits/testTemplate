import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class MainPage extends BasePage {
    page: Page;
    userEmailText: Locator;

    constructor (page: Page){
        super(page);
        this.page = page;

        this.userEmailText = this.getByClass('hui-globaluseritem__email');
    }
}
