import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../utils/world';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AccountPage } from '../pages/AccountPage';
import { generateUsername, testPassword } from '../utils/testData';
import { logger } from '../utils/logger';
import { captureScreenshot } from '../utils/screenshotHelper';

let username: string;
let password: string;

Given('user is on the ParaBank homepage', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.navigateToHomepage();
});

When('user navigates to the registration page', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.navigateToRegister();
});

When('user fills in the registration form', async function (this: CustomWorld) {
  username = generateUsername();
  password = testPassword;

  logger.info(`Generated username: ${username}`);

  const registerPage = new RegisterPage(this.page);
  await registerPage.registerUser(username, password);
});

Then('user should be registered and logged in successfully', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);

  const success = await registerPage.isRegistrationSuccessful();

  if (!success) {
    throw new Error('Registration failed');
  }

  logger.info('Registration successful');
});

When('user opens a new bank account', async function (this: CustomWorld) {
  const accountPage = new AccountPage(this.page);
  await accountPage.openNewAccount();
});

When('user clicks on the new account link', async function (this: CustomWorld) {
  const accountPage = new AccountPage(this.page);
  await accountPage.clickNewAccountLink();
});

Then('the account balance should be displayed', async function (this: CustomWorld) {
  const accountPage = new AccountPage(this.page);

  const balance = await accountPage.getBalance();

  logger.info(`Account Balance: ${balance}`);

  if (!balance || balance === 'Balance not found') {
    throw new Error('Account balance not found');
  }

  // Capture screenshot
  await captureScreenshot(this.page, 'Account_Balance');
  logger.info('Balance page screenshot captured');
});

When('user logs out of the application', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.logout();
});

Then('the login page should be displayed', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);

  const visible = await loginPage.isLoggedOut();

  if (!visible) {
    throw new Error('Logout failed');
  }

  logger.info('Logout successful');
});

When('user logs in with valid credentials', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(username, password);
});

Then('user should be logged in successfully', async function (this: CustomWorld) {
  await this.page.waitForSelector('.title', { timeout: 30000 });
  logger.info('Login successful');

  // Print account overview balance post-login
  try {
    await this.page.waitForSelector('#accountTable tbody tr:first-child td:nth-child(3)', { timeout: 10000 });
    const balance = await this.page.$eval(
      '#accountTable tbody tr:first-child td:nth-child(3)',
      el => el.textContent?.trim() ?? 'N/A'
    );
    logger.info(`Account Overview balance post-login: ${balance}`);
    console.log(`[POST-LOGIN BALANCE] ${balance}`);
  } catch {
    logger.warn('Could not retrieve post-login balance from Account Overview');
  }
});
