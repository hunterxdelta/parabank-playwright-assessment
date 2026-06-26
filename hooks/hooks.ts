import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Status,
} from '@cucumber/cucumber';
import { ITestCaseHookParameter } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from '@playwright/test';
import { CustomWorld } from '../utils/world';
import { captureScreenshot } from '../utils/screenshotHelper';
import { logger } from '../utils/logger';
import { ENV } from '../config/env';

setDefaultTimeout(ENV.DEFAULT_TIMEOUT);

//Suite hoooks

BeforeAll(async function () {
  logger.info('============================');
  logger.info('  TEST SUITE STARTED');
  logger.info(`  ENV: ${ENV.BASE_URL}`);
  logger.info('============================');
});

AfterAll(async function () {
  logger.info('============================');
  logger.info('  TEST SUITE FINISHED');
  logger.info('============================');
});

//Scenario hooks

Before(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  this.testName = scenario.pickle.name;
  logger.info(`▶ SCENARIO: "${this.testName}"`);

  // Launch browser
  const browserEngines = { chromium, firefox, webkit };
  const launchFn = browserEngines[ENV.BROWSER] ?? chromium;

  logger.info(`Launching ${ENV.BROWSER} | headless=${ENV.HEADLESS}`);
  this.browser = await launchFn.launch({
    headless: ENV.HEADLESS,
    slowMo: ENV.SLOW_MO,
    args: ['--start-maximized'],
  });

  this.context = await this.browser.newContext({ viewport: null });
  this.context.setDefaultTimeout(ENV.DEFAULT_TIMEOUT);
  this.context.setDefaultNavigationTimeout(ENV.NAVIGATION_TIMEOUT);
  this.page = await this.context.newPage();

  logger.info('Browser ready');
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
  const status = scenario.result?.status;

  if (status === Status.FAILED) {
    logger.error(`✖ FAILED: "${this.testName}" — ${scenario.result?.message ?? ''}`);

    // Screenshot on failure
    if (this.page) {
      try {
        await captureScreenshot(this.page, `FAIL_${this.testName}`);
        logger.info('Failure screenshot saved');
      } catch (err) {
        logger.error(`Screenshot capture failed: ${err}`);
      }
    }
  } else if (status === Status.PASSED) {
    logger.info(`✔ PASSED: "${this.testName}"`);
  } else {
    logger.warn(`⚠ ${status}: "${this.testName}"`);
  }

  await this.page?.close().catch(() => {});
  await this.context?.close().catch(() => {});
  await this.browser?.close().catch(() => {});
  logger.info('Browser closed');
});
