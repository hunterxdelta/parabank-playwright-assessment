# ParaBank Playwright Automation Framework

## Quick Start

Clone the repository and install the dependencies:

```bash
npm install
npx playwright install
```

### Run Tests (Headless)

```bash
npm test
```

### Run Tests (Headed)

```bash
npm run test:headed
```

### Generate & Open Allure Report

```bash
npm run test:allure
```

### Run Smoke Tests Only

```bash
TAGS=@smoke npm test
```

---

## Overview

This project automates the ParaBank user registration and login flow using **Playwright**, **TypeScript**, **Cucumber (BDD)** and the **Page Object Model (POM)**.

The framework was developed as part of the **Incubyte QA Automation Assessment**.

---

## Tech Stack

* Playwright
* TypeScript
* Cucumber (BDD)
* Page Object Model (POM)
* Winston Logger
* Allure Reports

---

## Project Structure

```
.
├── config/
├── features/
├── hooks/
├── pages/
├── step-definitions/
├── utils/
├── reports/
├── screenshots/
├── package.json
├── cucumber.js
└── tsconfig.json
```

---

## Features Implemented

* Page Object Model (POM)
* Behavior Driven Development (BDD)
* Environment Configuration
* Custom Hooks
* Retry Logic
* Winston Logging
* HTML Report
* Allure Report
* Automatic screenshot capture after successful account creation
* Screenshot capture on test failure
* Dynamic username generation

---

## Test Scenarios

### Scenario 1

* Register a new user
* Verify successful registration
* Open a new bank account
* Print the account balance
* Capture a screenshot of the account balance page

### Scenario 2

* Register a new user
* Logout
* Login using the newly created credentials
* Verify successful login

---

## Reports

The framework generates:

* HTML Report
* Allure Report
* Execution Logs

---

## Screenshots

After successfully opening a new account and displaying the account balance, the framework automatically captures a screenshot.

Screenshots are saved in:

```
screenshots/
```

Example:

```
screenshots/
└── Account_Balance_2026-06-26T16-45-10.png
```

Screenshots are also captured automatically if a test fails.

---

## Screen Recording

A complete execution recording of the automation framework is available below.

**Execution Recording:**

https://drive.google.com/file/d/1yC_K6wan3RhQVK58n33JRJBWdybekf39/view?usp=drive_link


---

## Logging

Execution logs are generated using Winston and stored in:

```
logs/
```

---

## Author

**Himanshu Dhore**
