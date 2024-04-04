import { type Locator, type Page } from "@playwright/test";

export class ProfilePage {
  readonly page: Page;
  readonly profileTitle: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly phoneField: Locator;
  readonly addressField: Locator;
  readonly suportPinField: Locator;
  readonly newsletterField: Locator;
  readonly toggleButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileTitle = page.locator("//h1[contains(text(),' Profile')]");
    this.nameField = page.locator(
      "//div[@class='item' and .//span[text()='Name']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.emailField = page.locator(
      "//div[@class='item' and .//span[text()='Email']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.passwordField = page.locator(
      "//div[@class='item' and .//span[text()='Password']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.phoneField = page.locator(
      "//div[@class='item' and .//span[text()='Phone']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.addressField = page.locator(
      "//div[@class='item' and .//span[text()='Address']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.suportPinField = page.locator(
      "//div[@class='item' and .//span[text()='Support pin']]/div[@class='description']/span[@class='text ng-binding']",
    );
    this.newsletterField = page.locator(
      "//div[@class='item' and .//span[text()='Newsletter']]",
    );
    this.toggleButton = page.locator(
      "//div[@class='item' and .//span[text()='Newsletter']]//button[@class='toggle-btn']",
    );
  }

  async getProfileFields(): Promise<{
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    supportPin: string;
  }> {
    const name = await this.getFieldText(this.nameField);
    const email = await this.getFieldText(this.emailField);
    const password = await this.getFieldText(this.passwordField);
    const phone = await this.getFieldText(this.phoneField);
    const address = await this.getFieldText(this.addressField);
    const supportPin = await this.getFieldText(this.suportPinField);

    return { name, email, password, phone, address, supportPin };
  }

  private async getFieldText(field: Locator): Promise<string> {
    return await field.innerText();
  }
}
