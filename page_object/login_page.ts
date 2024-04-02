export let baseUrl = "https://www.sbzend.ssls.com/";

import { expect, type Locator, type Page } from '@playwright/test';

export class AuthorizePage {
    readonly page: Page;
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly authorizeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginField = page.locator("body > div.container > div > ui-view > div > ng-include > div > div > form > div:nth-child(2) > div > input");
        this.passwordField = page.locator("body > div.container > div > ui-view > div > ng-include > div > div > form > div:nth-child(3) > div > div.input-group > div.input-box.password > input");
        this.authorizeButton = page.locator("body > div.container > div > ui-view > div > ng-include > div > div > form > div.btn-box > button");          
    }

    async login(email: string, password: string) {
        
        await this.loginField.pressSequentially(email);
        await this.passwordField.pressSequentially(password);
        await this.authorizeButton.click();
        await this.page.waitForURL(baseUrl + "user/bundles");

    }

}


