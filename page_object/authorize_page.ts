
import { expect, type Locator, type Page } from '@playwright/test';

export class AuthorizePage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly authorizeLoginButton: Locator;
    readonly authorizationText: Locator;
    readonly eyeButton: Locator;
    readonly errorMessage: Locator;
    readonly tooltipEmailText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator("//div/input[@type='email']");
        this.passwordField = page.locator("//div/input[@name='password']");
        this.authorizeLoginButton = page.locator("//button[text()='Login']");
        this.authorizationText = page.locator("//div/h1[text()='Authorization']");
        this.eyeButton = page.locator("//button[@class='btn-input btn-input-block']");
        this.errorMessage = page.locator("//ul//div[text()='Uh oh! Email or password is incorrect']");
        this.tooltipEmailText = page.locator("//span[@class='tooltip-text'][contains(., 'Uh oh! This') and contains(., 'isn’t an email')]")         
    }

    async fillFields(email: string, password: string) {
        
        await this.emailField.pressSequentially(email);
        await this.passwordField.pressSequentially(password);    

    }

    async login() {
        await this.authorizeLoginButton.click();        
    }

    async getTooltipText(): Promise<string> {
        const text = await this.tooltipEmailText.textContent();
        return text ?? '';
    }

}




