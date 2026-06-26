import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class AccountPage extends BasePage {
  private readonly openNewAccountButton = 'input[value="Open New Account"]';
  private readonly newAccountIdLink = '#newAccountId';
  private readonly balanceSelector =
    '#accountDetails table tr:nth-child(3) td:nth-child(2)';

  constructor(page: Page) {
    super(page);
  }

  async openNewAccount(): Promise<string> {
    logger.info('Opening new bank account');

    await this.page.getByRole('link', { name: 'Open New Account' }).click();
    await this.page.waitForLoadState('networkidle');

    await this.waitForSelector(this.openNewAccountButton, 30000);
    await this.click(this.openNewAccountButton, 'Open New Account button');

    await this.waitForSelector(this.newAccountIdLink, 60000);

    const accountId = await this.getText(this.newAccountIdLink);

    logger.info(`New account created: ${accountId}`);

    return accountId;
  }

  async clickNewAccountLink(): Promise<void> {
    await this.click(this.newAccountIdLink, 'New account link');
    await this.page.waitForLoadState('networkidle');
  }

  async getBalance(): Promise<string> {
    await this.page.waitForLoadState('networkidle');

    const balance = await this.getText(this.balanceSelector);

    logger.info(`Account balance: ${balance}`);

    return balance || 'Balance not found';
  }
}