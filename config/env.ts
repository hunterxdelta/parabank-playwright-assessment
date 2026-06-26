export const ENV = {
  BASE_URL:
    process.env.BASE_URL ||
    'https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC',

  HEADLESS: process.env.HEADLESS !== 'false',

  BROWSER: (process.env.BROWSER || 'chromium') as
    | 'chromium'
    | 'firefox'
    | 'webkit',

  DEFAULT_TIMEOUT: Number(process.env.DEFAULT_TIMEOUT) || 30000,

  NAVIGATION_TIMEOUT: Number(process.env.NAVIGATION_TIMEOUT) || 60000,

  SCREENSHOT_DIR: process.env.SCREENSHOT_DIR || 'screenshots',

  SLOW_MO: Number(process.env.SLOW_MO) || 0,
  
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};