import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from './logger';

export async function captureScreenshot(
  page: Page,
  name: string
): Promise<Buffer> {
  const screenshotDir = 'screenshots';

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const safeName = name.replace(/[^a-z0-9_-]/gi, '_');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(
    screenshotDir,
    `${safeName}_${timestamp}.png`
  );

  try {
    const buffer = await page.screenshot({
      path: filePath,
      fullPage: true,
    });

    logger.info(`Screenshot saved to ${filePath}`);

    return buffer;
  } catch (error) {
    logger.error(`Failed to capture screenshot: ${error}`);
    return Buffer.alloc(0);
  }
}