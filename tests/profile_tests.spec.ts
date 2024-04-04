import { test, expect } from "@playwright/test";
import { AuthorizePage } from "../page_object/authorize_page";
import { HomePage, baseUrl } from "../page_object/home_page";
import { ProfilePage } from "../page_object/profile_page";

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const authorizePage = new AuthorizePage(page);
  const email = "ssls.automation+666@gmail.com";
  const password = "123456";

  await page.goto(baseUrl);
  await expect(homePage.homePageTitle).toContainText("SSL for everyday people");
  await expect(homePage.homePageLoginButton).toBeVisible();
  await homePage.homePageLoginButton.click();
  await page.waitForURL(baseUrl + "authorize");
  await authorizePage.fillFields(email, password);
  await authorizePage.login();
  await page.waitForURL(baseUrl + "user/bundles");
});

test("Check client data", async ({ page }) => {
  const profilePage = new ProfilePage(page);
  const emailButton = page.locator(
    "//button[contains(span[@class='ssls-toolbar__btn-text'], 'ssls.automation+666@gmail.com')]",
  );
  const profileButton = page.locator("//a[text()=' Profile']");

  await emailButton.click();
  await profileButton.click();

  const profileFields = await profilePage.getProfileFields();
  await expect(profilePage.profileTitle).toHaveText("Profile");
  await expect(profileFields.name).toBe("Tom Ford");
  await expect(profileFields.email).toBe("ssls.automation+666@gmail.com");
  await expect(profileFields.password).toBeTruthy();
  await expect(profileFields.phone).toBe("+380 12312312");
  await expect(profileFields.address).toBe(
    "Diagon alley 21, Misto, Uryupinsk 612120, Ukraine",
  );
  await expect(profileFields.supportPin).toBe("Q5HV");

  const isToggled = await profilePage.toggleButton.getAttribute("checked");
  const newsletterText = await profilePage.newsletterField.innerText();
  await expect(isToggled).toBeFalsy();
  await expect(newsletterText).toContain("Include in mailing list");
});
