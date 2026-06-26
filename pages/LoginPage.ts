import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { ENV } from '../config/env';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  private readonly usernameField = 'input[name="username"]';
  private readonly passwordField = 'input[name="password"]';
  private readonly loginButton = 'input[value="Log In"]';
  private readonly logoutLink = 'a[href*="logout"]';
  private readonly errorMessage = '.error';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHomepage(): Promise<void> {
    await this.navigateTo(ENV.BASE_URL);
    logger.info('Home page loaded');
  }

  async login(username: string, password: string): Promise<void> {
    logger.info(`Logging in with user: ${username}`);

    await this.fill(this.usernameField, username, 'Username');
    await this.fill(this.passwordField, password, 'Password');
    await this.click(this.loginButton, 'Login button');

    await this.page.waitForLoadState('networkidle');
  }

  async logout(): Promise<void> {
    logger.info('Logging out');

    await this.click(this.logoutLink, 'Logout link');
    await this.page.waitForLoadState('networkidle');
  }

  async isLoggedOut(): Promise<boolean> {
    return this.isVisible(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }
}