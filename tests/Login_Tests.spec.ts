import { test, expect} from '@playwright/test';
import { AuthorizePage} from '../page_object/authorize_page';
import { HomePage, baseUrl } from '../page_object/home_page';

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto(baseUrl); 
  await expect(homePage.homePageTitle).toContainText(/SSL for everyday people/);   
  await expect(homePage.homePageLoginButton).toBeVisible();
  await homePage.homePageLoginButton.click();
  await page.waitForURL(baseUrl + "authorize");  
});


test('Check valid login', async ({ page }) => {

  const homePage = new HomePage(page);
  const authorizePage = new AuthorizePage(page);
  
  let email = "ssls.automation+666@gmail.com";
  let password = "123456";    

  await expect(authorizePage.authorizationText).toHaveText("Authorization");   

  await authorizePage.fillFields(email, password);

  await authorizePage.eyeButton.click(); 

  await expect(authorizePage.passwordField).toHaveAttribute('type', 'text');
   
  const passwordFieldValue = await authorizePage.passwordField.inputValue();
  await expect(passwordFieldValue).toBe(password);

  await authorizePage.login();

  await page.waitForURL(baseUrl + "user/bundles");  

  let emailButton = page.locator("//button[contains(span[@class='ssls-toolbar__btn-text'], 'ssls.automation+666@gmail.com')]");
  await expect(emailButton).toHaveText(email);  

});


test('Check not registered user', async ({ page }) => {

  const homePage = new HomePage(page);
  const authorizePage = new AuthorizePage(page);
  
  let email = "test@mail.com";
  let password = "password";     

  await expect(authorizePage.authorizationText).toHaveText("Authorization");   

  await authorizePage.fillFields(email, password);

  await authorizePage.eyeButton.click(); 

  await expect(authorizePage.passwordField).toHaveAttribute('type', 'text');
   
  const passwordFieldValue = await authorizePage.passwordField.inputValue();
  await expect(passwordFieldValue).toBe(password);

  await authorizePage.login();

  await expect(authorizePage.errorMessage).toHaveText("Uh oh! Email or password is incorrect");     

});

test('Check invalid email', async ({ page }) => {

  const homePage = new HomePage(page);
  const authorizePage = new AuthorizePage(page);
  
  let email = "test@@mail.com";
  let password = "password";      

  await expect(authorizePage.authorizationText).toHaveText("Authorization");   

  await authorizePage.fillFields(email, password);

  await authorizePage.eyeButton.click(); 

  await expect(authorizePage.passwordField).toHaveAttribute('type', 'text');
   
  const passwordFieldValue = await authorizePage.passwordField.inputValue();
  await expect(passwordFieldValue).toBe(password);  

  await expect(await authorizePage.getTooltipText()).toMatch(/Uh oh! This[\s\S]*isn’t an email/);     

});


