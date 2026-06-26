import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { registrationData } from '../utils/testData';
import { logger } from '../utils/logger';

export class RegisterPage extends BasePage {
  private readonly firstNameField = '#customer\\.firstName';
  private readonly lastNameField = '#customer\\.lastName';
  private readonly addressField = '#customer\\.address\\.street';
  private readonly cityField = '#customer\\.address\\.city';
  private readonly stateField = '#customer\\.address\\.state';
  private readonly zipCodeField = '#customer\\.address\\.zipCode';
  private readonly phoneField = '#customer\\.phoneNumber';
  private readonly ssnField = '#customer\\.ssn';
  private readonly usernameField = '#customer\\.username';
  private readonly passwordField = '#customer\\.password';
  private readonly confirmPasswordField = '#repeatedPassword';
  private readonly registerButton = 'input[value="Register"]';
  private readonly successHeading = '.title';

  constructor(page: Page) {
    super(page);
  }

  async navigateToRegister(): Promise<void> {
    logger.info('Opening registration page');

    await this.page
      .getByRole('link', { name: 'Register' })
      .waitFor({ state: 'visible', timeout: 10000 });

    await this.page.getByRole('link', { name: 'Register' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async registerUser(username: string, password: string): Promise<void> {
    logger.info(`Registering user: ${username}`);

    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phone,
      ssn,
    } = registrationData;

    await this.fill(this.firstNameField, firstName, 'First Name');
    await this.fill(this.lastNameField, lastName, 'Last Name');
    await this.fill(this.addressField, address, 'Address');
    await this.fill(this.cityField, city, 'City');
    await this.fill(this.stateField, state, 'State');
    await this.fill(this.zipCodeField, zipCode, 'Zip Code');
    await this.fill(this.phoneField, phone, 'Phone');
    await this.fill(this.ssnField, ssn, 'SSN');
    await this.fill(this.usernameField, username, 'Username');
    await this.fill(this.passwordField, password, 'Password');
    await this.fill(this.confirmPasswordField, password, 'Confirm Password');

    await this.click(this.registerButton, 'Register button');
  }

  async isRegistrationSuccessful(): Promise<boolean> {
    try {
      await this.page
        .locator(this.successHeading)
        .waitFor({ state: 'visible', timeout: 30000 });

      const heading = await this.getText(this.successHeading);

      logger.info(`Registration successful: ${heading}`);

      return true;
    } catch {
      return false;
    }
  }
}