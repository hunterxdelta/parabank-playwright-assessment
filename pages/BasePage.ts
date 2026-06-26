import { Page } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * BasePage — every Page Object extends this.
 * Centralises logging and common interaction helpers.
 */
export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async click(selector: string, description = selector): Promise<void> {
    logger.info(`Clicking: ${description}`);
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string, description = selector): Promise<void> {
    logger.info(`Filling "${description}" with "${value}"`);
    await this.page.locator(selector).fill(value);
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.locator(selector).textContent();
    return text?.trim() || '';
  }

  async waitForSelector(selector: string, timeout = 30000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }
}
