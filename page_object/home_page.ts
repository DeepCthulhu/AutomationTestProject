export let baseUrl = "https://www.sbzend.ssls.com/";

import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homePageTitle: Locator;
    readonly homePageLoginButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.homePageTitle = page.locator("//div/h1[text()='SSL for everyday people']");
        this.homePageLoginButton = page.locator("//div//span[text()='Log in']");
    }

    async getHomePageTitle () {
        return await this.homePageTitle.getByText;
    }
    
    
    
    
    

}