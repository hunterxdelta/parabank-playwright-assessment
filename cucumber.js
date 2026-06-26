module.exports = {
  default: {
    require: [
      'hooks/**/*.ts',
      'step-definitions/**/*.ts',
    ],

    requireModule: [
      'ts-node/register',
    ],

    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'allure-cucumberjs/reporter',
    ],

    formatOptions: {
      resultsDir: 'allure-results',
    },

    retry: 2,
    retryTagFilter: 'not @no-retry',

    tags: process.env.TAGS || '',

    parallel: 1,
  },
};