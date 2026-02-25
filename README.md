## Overview

This project contains end-to-end tests for the Dungeons & Dragons UI, including:
- Authentication: login, logout, and redirect behaviour
- Hero navigation: Fighter, Sorcerer, Cleric, Rogue
- Monster navigation: Small, Medium, Large

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- The DnD UI running on `http://localhost:3000`
- The DnD API running on `http://localhost:5071`

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dnd-ui-tests
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install chromium
```

### 4. Configure Credentials

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file with the DnD credentials:

```env
BASE_URL=http://localhost:3000
DND_USERNAME=admin
DND_PASSWORD=admin
```

**Important:** Never commit the `.env` file to version control. It's already included in `.gitignore`.

## Running Tests

### Run All Tests (Headless)

```bash
npx playwright test
```

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Run Tests with UI Mode

```bash
npx playwright test --ui
```

### Run a Single Project

```bash
npx playwright test --project=chromium
```

### View Test Report

```bash
npx playwright show-report
```

## Configuration

### Playwright Configuration (`playwright.config.ts`)

Key settings:
- **Timeout:** 30 seconds per test
- **Browser:** Chromium only
- **Parallel execution:** Enabled for faster test runs
- **Retries:** 2 retries on CI, 0 locally
- **Reporters:** HTML, List, and JSON

### Projects

Two projects are defined:

| Project | Purpose |
|---------|---------|
| `setup` | Runs `auth.setup.ts` first — logs in and verifies the logout button is visible |
| `chromium` | Runs all tests after `setup` completes |

The `chromium` project declares `dependencies: ['setup']`, so Playwright always validates the login flow before running the main test suite.

## Authentication Strategy

### Why `addInitScript` is used instead of `storageState`

The DnD app stores its authenticated state in the browser's `sessionStorage`:

```ts
sessionStorage.setItem('loggedIn', 'true');
```

Playwright's built-in `storageState` mechanism only captures **cookies** and **localStorage** — it does not capture `sessionStorage`. As a result, saving and restoring the auth state via `storageState` alone has no effect for this app.

To work around this, the hero and monster tests inject the session value directly before the page loads using `page.addInitScript`:

```ts
await page.addInitScript(() => {
    sessionStorage.setItem('loggedIn', 'true');
});
await page.goto(baseUrl);
```

`addInitScript` runs before any page script executes, so React reads `loggedIn: "true"` from `sessionStorage` on mount and renders the authenticated layout without going through the login form.

### Login tests

Login tests need to start from an unauthenticated state. They override the project-level `storageState` to an empty value and do not call `addInitScript`, ensuring the app redirects to `/login` as expected:

```ts
test.use({ storageState: { cookies: [], origins: [] } });
```

## Test Tagging

Tests are tagged for selective execution:

### Run Smoke Tests Only
```bash
npx playwright test --grep=smoke
```

### Run Regression Tests Only
```bash
npx playwright test --grep=regression
```

### Available Tags
- `@smoke` - Critical path tests
- `@regression` - Full regression suite

## Troubleshooting

### "Environment variables must be set"
- Ensure you've created a `.env` file based on `.env.example`
- Check that `DND_USERNAME` and `DND_PASSWORD` are set

### "Browser not found"
- Run `npx playwright install chromium`

### Hero/monster tests fail immediately after the setup test
- The DnD UI or API may not be running — start both services before running tests
- Verify `BASE_URL` in `.env` matches where the UI is actually served
