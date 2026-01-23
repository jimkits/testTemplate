## Overview

This project contains end-to-end tests for the Hudl login flow, including:
- Successful login with valid credentials
- Username validation (empty, invalid format, SQL injection)
- Password validation (empty, incorrect credentials, SQL injection)
- Rate limiting handling for repeated failed login attempts

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A valid Hudl account with username and password

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hudl
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

Download all browsers:
```bash
npm run install:browsers
```

### 4. Configure Credentials

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file with your Hudl credentials:

**Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

## Running Tests

### Run All Tests (Headless)

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests with UI Mode

```bash
npm run test:ui
```

### Run Tests for a single project

```bash
npx playwright test --project=chromium
```

### View Test Report

After running tests, view the HTML report:

```bash
npm run report
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Timeout:** 30 seconds per test
- **Browser:** Chromium (Chrome), Firefox, Webkit (Safari)
- **Parallel execution:** Enabled for faster test runs
- **Retries:** 2 retries on CI, 0 locally
- **Reporters:** HTML, List, and JSON

## Test Tagging

Tests are tagged for selective execution:

### Run Smoke Tests Only
```bash
npx playwright test --grep @smoke
```

### Run Regression Tests Only
```bash
npx playwright test --grep @regression
```

### Run All Tests Except Smoke
```bash
npx playwright test --grep-invert @smoke
```

### Available Tags
- `@smoke` - Critical path tests (login success)
- `@regression` - Full regression suite (validation tests)
- `@security` - Security-focused tests (SQL injection)

## Troubleshooting

### "Environment variables must be set"
- Ensure you've created a `.env` file with your credentials
- Check that the `.env` file is in the project root directory
- Make sure you're using `HUDL_USERNAME` and `HUDL_PASSWORD`, not `USERNAME` and `PASSWORD`

### "Browser not found"
- Refer to the appropriate section in README

## Future Improvements

The following enhancements are planned for future iterations:

### CI/CD Pipeline
- Add GitHub Actions workflow for automated test execution
- Configure test runs on pull requests and merges to main
- Add test result reporting and artifact storage
- Set up scheduled nightly regression runs

### Extended Test Coverage
- Add logout functionality tests
- Add "Forgot Password" flow tests
- Add session persistence/timeout tests
- Add "Remember Me" functionality tests
