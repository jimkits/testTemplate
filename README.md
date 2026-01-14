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

Chromium
```bash
npx playwright install chromium
```

Or to download all browsers:
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

### View Test Report

After running tests, view the HTML report:

```bash
npm run report
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Timeout:** 30 seconds per test
- **Browser:** Chromium (Chrome)
- **Parallel execution:** Enabled for faster test runs
- **Retries:** 2 retries on CI, 0 locally
- **Reporters:** HTML, List, and JSON

To run tests in other browsers (Firefox, Safari), uncomment the respective sections in `playwright.config.ts`.

## Troubleshooting

### "Environment variables must be set"
- Ensure you've created a `.env` file with your credentials
- Check that the `.env` file is in the project root directory
- Make sure you're using `HUDL_USERNAME` and `HUDL_PASSWORD`, not `USERNAME` and `PASSWORD`

### "Browser not found"
- Refer to the appropriate section in README
