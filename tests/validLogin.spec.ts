import { test, expect } from '@playwright/test';
import { exec } from 'child_process';
import { AuthorizePage, baseUrl } from '../page_object/login_page';


test('Valid Login', async ({ page }) => {
  await page.goto(baseUrl);
  let email = "ssls.automation+666@gmail.com";
  let password = "123456";

  let titleLocator = page.locator("#certs > div.ssls-heading > h1");

  // Home page success loaded
  await expect(titleLocator).toHaveText(/SSL for everyday people/);

  let loginButton = page.locator("#app > div > header > div > div > button:nth-child(2)");

  await expect(loginButton).toBeVisible();
  
  await loginButton.click();

  await page.waitForURL(baseUrl + "authorize");

  let authorizationText = page.locator("body > div.container > div > ui-view > div > div > h1");

  await expect(authorizationText).toHaveText("Authorization");

  let authorizePage = new AuthorizePage(page);

  await authorizePage.login(email, password);
  

  let emailButton = page.locator("#app > div > header > div > div > div.ssls-dropdown.ssls-header-user.ssls-header-dropdown > button > span");
  await expect(emailButton).toHaveText(email);




  

});

