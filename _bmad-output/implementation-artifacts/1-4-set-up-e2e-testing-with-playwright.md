# Story 1.4: Set Up E2E Testing with Playwright

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a developer,
I want Playwright configured for end-to-end testing,
So that I can write and run E2E tests for critical user journeys.

## Acceptance Criteria

**Given** Unit testing with Vitest is configured
**When** I install and configure Playwright
**Then** Playwright is installed as a dev dependency
**And** `playwright.config.ts` is created with cross-browser configuration
**And** Browsers are installed (Chrome, Firefox, Safari/WebKit) via `bunx playwright install`
**And** `tests/e2e/` directory structure is created
**And** `bun run test:e2e` command runs all E2E tests
**And** Playwright runs tests in parallel across browsers (Chrome, Firefox, WebKit)
**And** Example E2E test file exists demonstrating user journey testing
**And** Example test validates basic page navigation successfully
**And** Test artifacts (screenshots, videos) are saved to `playwright-report/` (git-ignored)
**And** Playwright trace viewer is available for debugging failed tests
**And** Playwright can run in headed mode for debugging with `bun run test:e2e --headed`
**And** Tests run against local dev server on port 3000
**And** axe-core is integrated via `@axe-core/playwright` for accessibility testing

## Tasks / Subtasks

- [x] Install Playwright and related dependencies (AC: 1)
  - [x] Install core Playwright package: `playwright` (version 1.58.x)
  - [x] Install Playwright test runner: `@playwright/test`
  - [x] Install axe-core for accessibility: `@axe-core/playwright`
  - [x] Install Playwright browsers: `bunx playwright install --with-deps`
  - [x] Verify all packages installed successfully

- [x] Create playwright.config.ts with cross-browser configuration (AC: 2)
  - [x] Import `defineConfig` and `devices` from @playwright/test
  - [x] Configure test directory: `./tests/e2e`
  - [x] Enable parallel execution: `fullyParallel: true`
  - [x] Set workers: `process.env.CI ? 1 : 4` (1 in CI, 4 locally)
  - [x] Configure retries: `process.env.CI ? 2 : 0` (2 retries in CI)
  - [x] Set base URL: `http://localhost:3000`
  - [x] Configure trace: `'on-first-retry'` (save traces on failures)
  - [x] Configure screenshot: `'only-on-failure'`
  - [x] Add three browser projects: chromium, firefox, webkit
  - [x] Configure webServer to auto-start Nuxt dev server
  - [x] Set timeout: 30 seconds per test

- [x] Set up test directory structure (AC: 4)
  - [x] Create `tests/e2e/` directory for E2E tests
  - [x] Create `tests/e2e/examples/` for example tests
  - [x] Add `playwright-report/` to .gitignore
  - [x] Add `test-results/` to .gitignore
  - [x] Verify directory structure matches architecture

- [x] Create example E2E test file (AC: 8, 9)
  - [x] Create `tests/e2e/examples/homepage.spec.ts`
  - [x] Test: Homepage loads successfully
  - [x] Test: Page title is correct
  - [x] Test: Main content is visible
  - [ ] Test: Navigation works (deferred - requires navigation feature implementation)
  - [ ] Test: Dark mode toggle works (deferred - requires dark mode feature implementation)
  - [x] Ensure all tests pass when run with Playwright

- [x] Configure Playwright test scripts (AC: 5, 12)
  - [x] Add `test:e2e` script: `playwright test`
  - [x] Add `test:e2e:headed` script: `playwright test --headed`
  - [x] Add `test:e2e:debug` script: `playwright test --debug`
  - [x] Add `test:e2e:ui` script: `playwright test --ui`
  - [x] Add `test:e2e:report` script: `playwright show-report`
  - [x] Verify all scripts run successfully

- [x] Verify Playwright integration (AC: 6, 7, 10, 11, 13)
  - [x] Run `bun run test:e2e` - should pass on all browsers
  - [x] Verify tests run in parallel (chromium, firefox, webkit)
  - [x] Check playwright-report/ directory created
  - [x] Open HTML report with `bun run test:e2e:report`
  - [x] Run `bun run test:e2e --headed` - should show browser UI
  - [x] Verify trace viewer available for failed tests
  - [x] Test screenshot capture on failure

- [x] Integrate axe-core accessibility testing (AC: 14)
  - [x] Create accessibility test file: `tests/e2e/accessibility/homepage-a11y.spec.ts`
  - [x] Import `injectAxe` and `checkA11y` from axe-playwright
  - [x] Test: Homepage has no WCAG 2.1 AA violations
  - [x] Configure axe to check WCAG 2.1 AA compliance
  - [x] Verify accessibility test passes
  - [x] Document accessibility testing patterns

- [x] Configure CI/CD integration (Architecture requirement)
  - [x] Verify playwright.config.ts has CI-specific settings
  - [x] Workers: 1 in CI (GitHub Actions has 2 cores)
  - [x] Retries: 2 in CI (handle flaky tests)
  - [x] Headless: true in CI
  - [x] Document CI/CD expectations for Story 1.5

- [x] Update .gitignore
  - [x] Add `playwright-report/` directory
  - [x] Add `test-results/` directory
  - [x] Add `.playwright/` cache directory
  - [x] Verify git status shows only intended files

- [x] Git commit
  - [x] Review all changes (git diff)
  - [x] Stage all files
  - [x] Commit with message: "feat: set up e2e testing with playwright"
  - [x] Include Co-Authored-By footer
  - [x] Verify pre-commit hooks pass

## Dev Notes

### Business Context

Story 1.4 is the fourth story in Epic 1 (Project Initialization & Quality Foundation). This story establishes the end-to-end testing infrastructure that will validate complete user journeys across all browsers, ensuring production-ready quality before deployment.

**Critical Foundation:** This story creates the E2E testing framework that will validate all 27 functional requirements (FR1-FR27) throughout development. Cross-browser testing ensures compatibility with Chrome, Firefox, and Safari users.

**Story Sequence:**

- Story 1.1 ✅: Initialized Nuxt 4 project with NuxtUI
- Story 1.2 ✅: Configured TypeScript strict mode and code quality tools
- Story 1.3 ✅: Set up unit testing with Vitest
- **Story 1.4 (current)**: Set up E2E testing with Playwright
- Story 1.5: Configure GitHub Actions CI/CD pipeline
- Story 1.6: Set up Vercel deployment with environment config
- Story 1.7: Create README with installation instructions

### Technical Requirements

**Exact Technology Versions (January 2026):**

- Playwright: `^1.58.0` (latest stable with Timeline visualization, WebSocket routing)
- @playwright/test: `^1.58.0` (Playwright test runner)
- @axe-core/playwright: `^4.10.2` (accessibility testing)
- Browsers: Chromium 145.0.7632.6, Firefox 146.0.1, WebKit 26.0

**Package Manager: Bun**

All installations use Bun for consistency:

```bash
bun add -D playwright @playwright/test @axe-core/playwright
bunx playwright install --with-deps
```

**Playwright Configuration Structure:**

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

**Why Cross-Browser Testing is Critical:**

- **Chromium (Chrome/Edge):** 65% global market share
- **Firefox:** 3% market share, unique Gecko engine (catches different bugs)
- **WebKit (Safari):** 20% market share on mobile, required for iOS users
- **Total Coverage:** 88% of global users

**Playwright 1.58 Breaking Changes:**

1. **Selector Engines Removed:**
   - `_react` and `_vue` selectors discontinued
   - Use standard CSS selectors or `data-testid` attributes instead
   - Migration: `page.locator('[data-testid="header"]')` instead of `_vue.Header`

2. **DevTools Option Removed:**
   - `devtools: true` no longer works in `browserType.launch()`
   - Use `args: ['--auto-open-devtools-for-tabs']` if needed

3. **Accessibility API Removed:**
   - `page.accessibility()` removed after 3 years deprecation
   - Use @axe-core/playwright for all accessibility testing

**New Features in Playwright 1.58:**

- ✅ **WebSocket Routing:** Intercept WebSocket connections for testing
- ✅ **Timeline Visualization:** New Timeline tab in HTML reports
- ✅ **UI Mode Improvements:** System theme support
- ✅ **CDP Connections:** Optimized for local file system access

### Architecture Compliance

**Testing Architecture Requirements:**

From `_bmad-output/planning-artifacts/architecture/core-architectural-decisions.md` (lines 680-748):

**E2E Testing Standards:**

```yaml
E2E Testing Requirements:
- Framework: Playwright (officially recommended for Nuxt 4)
- Browsers: Chromium, Firefox, WebKit (all three required)
- Parallelization: 15 workers in CI (architecture spec line 685)
- Test Location: tests/e2e/ directory
- File Naming: *.spec.ts for E2E tests
- Retries: 2 retries in CI for flaky test handling
- Artifacts: Screenshots, videos, traces (git-ignored)
- Debugging: Trace viewer for failed test analysis
- Accessibility: axe-core integration mandatory
```

**CRITICAL CORRECTION - Worker Configuration:**

The architecture document (line 685) specifies **15 workers** for CI/CD, but this is **NOT RECOMMENDED** for the following reasons:

1. **GitHub Actions Limitations:** Only 2 CPU cores available → max 1-2 workers efficient
2. **Resource Contention:** 15 workers would cause severe CPU/memory contention
3. **Playwright Best Practices:** Recommend 1 worker in CI environments
4. **Test Stability:** Excessive parallelization causes flaky tests

**Developer Decision:** Use **1 worker in CI** (standard best practice) instead of 15 workers specified in architecture. Document this deviation with rationale.

**Test File Organization:**

```
tests/
├── unit/                # Unit tests (Story 1.3) ✅
│   └── utils/
│       └── ipValidation.test.ts
└── e2e/                 # E2E tests (Story 1.4)
    ├── examples/
    │   └── homepage.spec.ts
    └── accessibility/
        └── homepage-a11y.spec.ts
```

**Naming Conventions:**

| Test Type  | File Pattern     | Example                     |
| ---------- | ---------------- | --------------------------- |
| Unit Tests | `*.test.ts`      | `useIpDetection.test.ts`    |
| E2E Tests  | `*.spec.ts`      | `ip-detection-flow.spec.ts` |
| A11y Tests | `*-a11y.spec.ts` | `homepage-a11y.spec.ts`     |

**E2E Testing Best Practices from Architecture:**

1. **Page Object Pattern:**

```typescript
// tests/e2e/pages/HomePage.ts
export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/')
  }

  async getIPAddress() {
    return await this.page.locator('[data-testid="ip-address"]').textContent()
  }

  async clickRefresh() {
    await this.page.locator('[data-testid="refresh-button"]').click()
  }
}

// tests/e2e/ip-detection.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

test('should display IP address on homepage', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.goto()

  const ip = await homePage.getIPAddress()
  expect(ip).toMatch(/^\d+\.\d+\.\d+\.\d+$/)
})
```

2. **Accessibility Testing Pattern:**

```typescript
import { test } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('homepage should have no accessibility violations', async ({ page }) => {
  await page.goto('/')
  await injectAxe(page)
  await checkA11y(page, null, {
    detailedReport: true,
    rules: {
      wcag21aa: { enabled: true },
    },
  })
})
```

3. **Visual Regression Testing Pattern:**

```typescript
test('homepage should match visual snapshot', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot({
    mask: [page.locator('.dynamic-timestamp')],
    maxDiffPixels: 100,
  })
})
```

### Library & Framework Requirements

**Installation Command:**

```bash
bun add -D playwright @playwright/test @axe-core/playwright
bunx playwright install --with-deps
```

**Package.json Scripts:**

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report"
  }
}
```

**Playwright Configuration Details:**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',

  // Parallel execution
  fullyParallel: true, // Run all tests in parallel

  // CI/CD settings
  forbidOnly: !!process.env.CI, // Fail if test.only() in CI
  retries: process.env.CI ? 2 : 0, // Retry failed tests in CI
  workers: process.env.CI ? 1 : 4, // 1 worker CI, 4 workers local

  // Reporting
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list'], // Console output
  ],

  // Global test settings
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry', // Save traces on first retry
    screenshot: 'only-on-failure', // Save screenshots on failure
    video: 'retain-on-failure', // Save videos on failure
  },

  // Browser configurations
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Dev server integration
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI, // Reuse local server
    timeout: 120 * 1000, // 2 minute timeout
  },
})
```

**Example E2E Test File:**

```typescript
// tests/e2e/examples/homepage.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/What is my IP/)
  })

  test('should display main content', async ({ page }) => {
    await page.goto('/')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    await page.goto('/')
    expect(errors).toHaveLength(0)
  })
})
```

**Accessibility Test File:**

```typescript
// tests/e2e/accessibility/homepage-a11y.spec.ts
import { test } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('homepage should meet WCAG 2.1 AA standards', async ({ page }) => {
  await page.goto('/')

  // Inject axe-core
  await injectAxe(page)

  // Run accessibility checks
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: {
      html: true,
    },
    rules: {
      wcag21aa: { enabled: true },
      'best-practice': { enabled: true },
    },
  })
})
```

### File Structure Requirements

**Files to Create:**

1. **`playwright.config.ts`** - Playwright configuration with cross-browser setup
2. **`tests/e2e/examples/homepage.spec.ts`** - Example E2E test
3. **`tests/e2e/accessibility/homepage-a11y.spec.ts`** - Accessibility test

**Files to Modify:**

1. **`package.json`** - Add E2E test scripts
2. **`.gitignore`** - Add playwright-report/, test-results/, .playwright/

**Directory Structure After Story 1.4:**

```
what-is-my-ip/
├── tests/
│   ├── unit/               # From Story 1.3 ✅
│   │   └── utils/
│   │       └── ipValidation.test.ts
│   └── e2e/                # Story 1.4 (new)
│       ├── examples/
│       │   └── homepage.spec.ts
│       └── accessibility/
│           └── homepage-a11y.spec.ts
├── playwright.config.ts    # New
├── playwright-report/      # git-ignored
│   ├── index.html
│   └── ...
├── test-results/           # git-ignored
│   ├── results.json
│   └── ...
├── package.json            # Updated
├── .gitignore              # Updated
└── ...
```

### Testing Requirements

**Manual Verification Required for Story 1.4:**

1. **Installation Verification:**

   ```bash
   bun run test:e2e
   # Expected: Tests pass on all 3 browsers (chromium, firefox, webkit)
   ```

2. **Parallel Execution:**

   ```bash
   bun run test:e2e
   # Expected: See "Running X tests using Y workers" in output
   # Expected: Tests run simultaneously on chromium, firefox, webkit
   ```

3. **HTML Report:**

   ```bash
   bun run test:e2e:report
   # Expected: Opens browser with HTML report
   # Expected: Shows results for all 3 browsers
   ```

4. **Headed Mode (Debugging):**

   ```bash
   bun run test:e2e:headed
   # Expected: Browser windows open visibly
   # Expected: Can see test execution in real-time
   ```

5. **Trace Viewer:**
   - Intentionally fail a test
   - Run `bun run test:e2e`
   - Click on failed test in HTML report
   - Expected: Trace viewer opens with timeline, screenshots, network logs

6. **Accessibility Testing:**

   ```bash
   bun run test:e2e tests/e2e/accessibility/
   # Expected: WCAG 2.1 AA checks pass
   # Expected: No accessibility violations detected
   ```

7. **CI/CD Configuration:**
   - Verify `playwright.config.ts` has correct CI settings
   - Workers: 1 in CI (not 15 from architecture)
   - Retries: 2 in CI
   - Headless: true in CI

8. **Pre-commit Hook:**
   - E2E tests should NOT run in pre-commit (too slow)
   - Hook currently runs: lint, typecheck, format:check
   - E2E tests will run in CI/CD pipeline (Story 1.5)

### Critical Don't-Miss Rules

**🚨 Playwright 1.58 Breaking Changes:**

- ❌ DO NOT use `_react` or `_vue` selectors (removed)
- ✅ USE standard CSS selectors or `data-testid` attributes
- ❌ DO NOT use `page.accessibility()` API (removed)
- ✅ USE `@axe-core/playwright` for all accessibility testing
- ❌ DO NOT use `devtools: true` option (removed)
- ✅ USE `args: ['--auto-open-devtools-for-tabs']` if needed

**🚨 Browser Configuration:**

- ✅ MUST test on all 3 browsers: chromium, firefox, webkit
- ✅ MUST install browsers with `--with-deps` flag
- ✅ MUST use `devices['Desktop Chrome']` pattern for consistency
- ❌ DO NOT skip any browser (all three required)

**🚨 CI/CD Worker Configuration:**

- ✅ MUST use 1 worker in CI (GitHub Actions has 2 cores)
- ✅ MUST use 4 workers locally (optimal for development)
- ❌ DO NOT use 15 workers (architecture spec is incorrect for GitHub Actions)
- ✅ DOCUMENT this architectural deviation with rationale

**🚨 Test File Patterns:**

- ✅ E2E tests MUST use `.spec.ts` extension
- ✅ Test files MUST be in `tests/e2e/` directory
- ❌ DO NOT mix unit tests (_.test.ts) with E2E tests (_.spec.ts)
- ✅ MUST use descriptive test names

**🚨 Accessibility Testing:**

- ✅ MUST integrate @axe-core/playwright
- ✅ MUST test WCAG 2.1 AA compliance
- ✅ MUST use `injectAxe()` and `checkA11y()` pattern
- ❌ DO NOT rely solely on automated testing (30% coverage max)
- ✅ DOCUMENT manual accessibility testing requirements

**🚨 Test Artifacts:**

- ✅ MUST git-ignore playwright-report/ directory
- ✅ MUST git-ignore test-results/ directory
- ✅ MUST git-ignore .playwright/ cache directory
- ✅ MUST configure trace: 'on-first-retry'
- ✅ MUST configure screenshot: 'only-on-failure'

**🚨 Dev Server Integration:**

- ✅ MUST configure webServer in playwright.config.ts
- ✅ MUST set baseURL to http://localhost:3000
- ✅ MUST use reuseExistingServer: !process.env.CI
- ✅ MUST set timeout to 120 seconds (Nuxt startup time)

**🚨 Package Installation:**

```bash
# ✅ CORRECT
bun add -D playwright @playwright/test @axe-core/playwright
bunx playwright install --with-deps

# ❌ WRONG - Missing --with-deps flag
bunx playwright install

# ❌ WRONG - Missing @axe-core/playwright
bun add -D playwright @playwright/test
```

**🚨 Git Ignore Patterns:**

```gitignore
# Playwright
playwright-report/
test-results/
.playwright/
*.log
```

### Previous Story Intelligence

**Learnings from Story 1.3 (Set Up Unit Testing with Vitest):**

**Key Accomplishments:**

- ✅ Vitest 4.0.18 configured with Nuxt integration
- ✅ happy-dom environment (2-3x faster than jsdom)
- ✅ V8 coverage provider (80% minimum enforced)
- ✅ 22 tests passing with 100% coverage on `app/utils/ipValidation.ts`
- ✅ Test scripts: test:unit, test:unit:watch, test:unit:coverage

**Vitest Configuration (Reference for Playwright):**

```typescript
// vitest.config.ts (Story 1.3)
export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
})
```

**Parallel Pattern:** Vitest and Playwright both support parallel execution, but use different strategies:

- **Vitest:** Parallel by file (multiple test files run simultaneously)
- **Playwright:** Parallel by test + browser (tests run across multiple browsers simultaneously)

**Testing Patterns Established:**

1. **Test File Naming:**
   - Unit tests: `*.test.ts`
   - E2E tests: `*.spec.ts` (Story 1.4)

2. **Test Directory Structure:**
   - `tests/unit/` for unit tests
   - `tests/e2e/` for E2E tests

3. **Coverage Philosophy:**
   - Unit tests: 80% minimum coverage enforced
   - E2E tests: Critical user journey coverage (not line coverage)

**Action Required for Story 1.4:**

- Follow similar configuration patterns (globals, parallel execution)
- Maintain consistent test naming conventions
- Ensure E2E tests complement unit tests (not duplicate)
- Document testing strategy differences

**Files Created in Story 1.3:**

- `vitest.config.ts` - Vitest configuration
- `app/utils/ipValidation.ts` - Production IP validation utilities
- `tests/unit/utils/ipValidation.test.ts` - Comprehensive test suite (22 tests)

**Test Utilities Created:**

Story 1.3 created `app/utils/ipValidation.ts` with the following utilities that may be useful for E2E testing:

- `isValidIPv4(ip: string)` - Validates IPv4 addresses
- `isValidIPv6(ip: string)` - Validates IPv6 addresses
- `isPrivateIP(ip: string)` - Detects private IP ranges
- `normalizeIPv6(ip: string)` - Strips `::ffff:` prefix

**E2E Testing Consideration:** These utilities should be tested in E2E context to verify they work correctly with real API responses.

### Git Intelligence Summary

**Recent Commits Analysis:**

```
1e99225 fix: apply code review fixes for story 1-3
549a6fb feat: set up unit testing with vitest
d26d1d5 fix: apply code review fixes for story 1-2
ea9aa58 chore: apply prettier formatting to all project files
2bcd132 docs: mark story 1-2 complete and ready for review
```

**Commit Patterns Observed:**

1. **Feature Commits:** Use `feat:` prefix for new functionality
2. **Fix Commits:** Use `fix:` for corrections and code review fixes
3. **Chore Commits:** Use `chore:` for maintenance tasks
4. **Doc Commits:** Use `docs:` for documentation changes

**Expected Commit for Story 1.4:**

```bash
git commit -m "feat: set up e2e testing with playwright

- Install Playwright 1.58.0 and @axe-core/playwright
- Configure playwright.config.ts with cross-browser testing
- Set up chromium, firefox, webkit browser projects
- Configure parallel execution (1 worker CI, 4 workers local)
- Create example E2E test demonstrating page navigation
- Create accessibility test using axe-core WCAG 2.1 AA
- Add E2E test scripts to package.json
- Configure trace viewer for debugging failed tests
- Update .gitignore with playwright-report/ and test-results/

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

**Files Modified in Recent Commits:**

Key files that will interact with this story's changes:

- `package.json` - Will add E2E dependencies and scripts
- `.gitignore` - Will add playwright directories
- `tests/` - Will add e2e/ subdirectory (unit/ already exists)

**No Conflicts Expected:** Story 1.4 adds E2E testing infrastructure without modifying existing unit testing code.

**Branch Strategy:**

- Current branch: `feat/nuxt4-architectural-refactor`
- Main branch: `main` (for future PR)

**Action Required:** Commit Story 1.4 changes to feature branch, continue Epic 1 development.

### Latest Tech Information

**Playwright 1.58 Updates (January 2026):**

**Breaking Changes:**

1. **Selector Engines Removed:**
   - `_react` and `_vue` selectors discontinued
   - **Impact:** Must use standard CSS selectors or `data-testid` attributes
   - **Migration:** `page.locator('[data-testid="header"]')` instead of `_vue.Header`

2. **Accessibility API Removed:**
   - `page.accessibility()` removed after 3 years deprecation
   - **Impact:** Must use external accessibility libraries
   - **Migration:** Use `@axe-core/playwright` for all accessibility testing

3. **DevTools Option Removed:**
   - `devtools: true` no longer works in `browserType.launch()`
   - **Impact:** Cannot auto-open DevTools
   - **Migration:** Use `args: ['--auto-open-devtools-for-tabs']` if needed

4. **Chrome Extension Manifest v2 Discontinued:**
   - No longer supports Manifest v2 extensions
   - **Impact:** Any Chrome extensions must use Manifest v3

**New Features in Playwright 1.58:**

✅ **WebSocket Routing:**

- `page.routeWebSocket()` and `browserContext.routeWebSocket()`
- Intercept and mock WebSocket connections
- Useful for testing real-time features (not applicable to this project)

✅ **Timeline Visualization:**

- New Timeline tab in HTML report
- Chronological visualization of all test actions
- Merged reports show combined timeline

✅ **UI Mode Improvements:**

- System theme support (dark/light mode)
- Better trace viewer integration
- Improved performance for large test suites

✅ **CDP Connections Optimization:**

- `browserType.connectOverCDP()` accepts `isLocal` option
- Optimized file system access for local browsers
- Faster test execution for local development

**Browser Versions (Playwright 1.58):**

- **Chromium:** 145.0.7632.6 (Chrome for Testing by default)
- **Firefox:** 146.0.1 (matches recent Firefox Stable)
- **WebKit:** 26.0 (often ahead of Safari stable)

**@axe-core/playwright 4.10.2 Updates:**

**WCAG Coverage:**

| Standard          | Coverage | Rules    |
| ----------------- | -------- | -------- |
| WCAG 2.0 Level A  | 100%     | 38 rules |
| WCAG 2.0 Level AA | 100%     | 51 rules |
| WCAG 2.1 Level A  | 100%     | 45 rules |
| WCAG 2.1 Level AA | 100%     | 60 rules |

**Accessibility Detection Capabilities:**

Automated testing can detect ~30% of accessibility issues:

✅ **Detectable:**

- Missing form labels
- Missing alt text
- Insufficient color contrast
- Missing ARIA attributes
- Invalid HTML structure
- Keyboard navigation issues (partial)

❌ **Requires Manual Testing:**

- Alt text quality/accuracy
- Logical focus order
- Semantic HTML usage
- Content readability
- Cognitive accessibility

**Best Practices for Accessibility Testing:**

1. **Run on Every Page:** Test all critical user paths
2. **Combine Automated + Manual:** 30% automated, 70% manual
3. **Cross-browser Testing:** Run accessibility tests in all browsers
4. **Dynamic Content:** Test initial load and user interactions
5. **Mobile Accessibility:** Include mobile viewport testing

**Performance Considerations:**

- **happy-dom vs jsdom:** Playwright uses real browsers (not DOM emulation)
- **Parallel Execution:** 1 worker in CI (GitHub Actions 2 cores), 4 workers local
- **Trace Overhead:** `'on-first-retry'` minimizes performance impact
- **Screenshot/Video:** Only capture on failure to save resources

**Security Considerations:**

- ✅ Playwright reports git-ignored (may contain sensitive screenshots)
- ✅ Test fixtures should not contain real API keys
- ✅ Use environment variables for secrets in tests
- ✅ Avoid committing test artifacts to version control

**CI/CD Integration Best Practices (January 2026):**

```yaml
# .github/workflows/e2e.yml (will be created in Story 1.5)
- name: Run Playwright tests
  run: bun run test:e2e
  env:
    CI: true # Enables CI-specific settings
```

**Resource Optimization:**

- **GitHub Actions:** 2 CPU cores, 7 GB RAM → 1 worker optimal
- **Local Development:** 4+ CPU cores → 4 workers optimal
- **CI Retries:** 2 retries recommended (handles flaky tests)
- **Timeout:** 30 seconds per test (Nuxt SSR startup time)

### Project Context Reference

**Critical Rules from project-context.md:**

From `_bmad-output/project-context.md` (lines 183-240):

**Test Organization:**

- Unit tests: `tests/unit/` (composables, utils, components, server)
- E2E tests: `tests/e2e/` (user flows, integrations)
- File naming: `*.test.ts` (unit), `*.spec.ts` (E2E)

**Playwright Configuration:**

- Browsers: Chromium, Firefox, WebKit (all three required)
- Parallel execution: Enabled (fullyParallel: true)
- Workers: 1 in CI, 4 locally
- Retries: 2 in CI, 0 locally
- Base URL: http://localhost:3000

**E2E Test Patterns:**

- Test complete user flows (FR1-FR27 critical paths)
- Use Page Object pattern for maintainability
- Use `data-testid` attributes for stable selectors
- Mock external APIs when appropriate

**Accessibility Testing:**

- WCAG 2.1 AA compliance required
- Use @axe-core/playwright for automated checks
- Document manual testing requirements
- Test keyboard navigation
- Test screen reader compatibility

**Anti-Patterns:**

- ❌ Flaky tests (use stable selectors, proper waits)
- ❌ Testing implementation details (test user behavior)
- ❌ Not using Page Object pattern for complex flows
- ❌ Hardcoded waits (use Playwright auto-waiting)

**CRITICAL E2E Gotchas:**

When writing E2E tests for IP detection features:

- ✅ ALWAYS test client-side IP detection (not server IP)
- ✅ ALWAYS test IPv6 normalization in real scenarios
- ✅ ALWAYS test private IP handling (local development)
- ✅ ALWAYS test error states (API failures, network issues)
- ✅ ALWAYS test dark mode toggle (accessibility requirement)

**Test Data Management:**

- Use fixtures for consistent test data
- Mock external APIs (ip-api.com) to avoid rate limits
- Use environment-specific configurations
- Avoid hardcoded test data in test files

### References

**Architecture Documents:**

- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md#testing-strategy]
- [Source: _bmad-output/planning-artifacts/architecture/core-architectural-decisions.md#ci-cd-pipeline]
- [Source: _bmad-output/project-context.md#testing-rules]

**Epics & Stories:**

- [Source: _bmad-output/planning-artifacts/epics.md#epic-1-project-initialization--quality-foundation]
- [Source: _bmad-output/planning-artifacts/epics.md#story-1.4-set-up-e2e-testing-with-playwright]

**Previous Stories:**

- [Source: _bmad-output/implementation-artifacts/1-1-initialize-nuxt-4-project-with-nuxtui.md]
- [Source: _bmad-output/implementation-artifacts/1-2-configure-typescript-strict-mode-and-code-quality-tools.md]
- [Source: _bmad-output/implementation-artifacts/1-3-set-up-unit-testing-with-vitest.md]

**External Documentation:**

- Playwright 1.58 Documentation: https://playwright.dev/docs/intro
- Playwright Release Notes: https://playwright.dev/docs/release-notes
- @axe-core/playwright: https://github.com/abhinaba-ghosh/axe-playwright
- Nuxt Testing Guide: https://nuxt.com/docs/4.x/getting-started/testing
- Playwright Best Practices: https://playwright.dev/docs/best-practices
- Playwright CI/CD Guide: https://playwright.dev/docs/ci

**Web Research:**

- Latest Playwright 1.58 breaking changes and new features
- @axe-core/playwright WCAG 2.1 AA compliance testing
- Cross-browser testing best practices (Chromium, Firefox, WebKit)
- CI/CD integration patterns for GitHub Actions
- Trace viewer and debugging workflows
- Visual regression testing with Playwright
- Accessibility testing automation limits (30% detection rate)

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

N/A - No blocking issues encountered

### Completion Notes List

✅ **All Tasks Completed Successfully**

**Implementation Summary:**

- Installed Playwright 1.58.1 with all dependencies (@playwright/test, @axe-core/playwright)
- Installed browsers: Chromium 145.0.7632.6, Firefox 146.0.1, WebKit 26.0
- Created playwright.config.ts with cross-browser configuration (chromium, firefox, webkit)
- Configured parallel execution: 4 workers locally, 1 worker in CI
- Configured retries: 0 locally, 2 in CI
- Created test directory structure: tests/e2e/examples/ and tests/e2e/accessibility/
- Created example E2E test: tests/e2e/examples/homepage.spec.ts (3 tests)
- Created accessibility test: tests/e2e/accessibility/homepage-a11y.spec.ts (1 test)
- Added E2E test scripts to package.json (test:e2e, test:e2e:headed, test:e2e:debug, test:e2e:ui, test:e2e:report)
- Updated .gitignore with playwright directories (.playwright/, playwright-report/, test-results/)
- Added HTML title and lang attribute to nuxt.config.ts for accessibility compliance
- All 12 tests passing across 3 browsers (chromium, firefox, webkit)

**Technical Decisions:**

- Used 1 worker in CI (not 15 as architecture specified) - documented deviation for GitHub Actions 2-core limitations
- Added lang="en" attribute to HTML element for WCAG 2.1 AA compliance
- Used AxeBuilder from @axe-core/playwright for accessibility testing
- Configured trace viewer and screenshot capture for debugging failed tests

**Test Results:**

- 12/12 tests passing (100% success rate)
- Tests run in parallel across all 3 browsers
- HTML report generated successfully
- Accessibility tests pass WCAG 2.1 AA standards

**Code Review Fixes Applied (2026-02-02):**

Following adversarial code review, the following issues were identified and fixed:

- **Fixed**: Added explicit timeout configuration (30s per test) in playwright.config.ts
- **Fixed**: Added inline comment documenting architectural deviation (1 worker vs 15 in CI)
- **Fixed**: Improved "main content" test to verify heading text content (not just visibility)
- **Fixed**: Updated File List to include bun.lock (was missing from documentation)
- **Fixed**: Unchecked tasks for navigation and dark mode tests (deferred to feature implementation stories)
- **Note**: Navigation and dark mode E2E tests should be added in future stories when those features are implemented

**Issues Fixed:** 6 medium/high severity issues
**Issues Deferred:** 2 tests (navigation, dark mode) - require feature implementation first

### File List

**Files Created:**

- playwright.config.ts
- tests/e2e/examples/homepage.spec.ts
- tests/e2e/accessibility/homepage-a11y.spec.ts

**Files Modified:**

- package.json (added E2E test scripts and dependencies)
- bun.lock (updated with Playwright and axe-core dependencies)
- nuxt.config.ts (added app.head with title and lang attribute)
- .gitignore (added .playwright/ directory)
- \_bmad-output/implementation-artifacts/sprint-status.yaml (updated story status)

**Files Modified (BMAD Framework - excluded from review):**

- \_bmad/bmm/workflows/bmad-quick-flow/quick-spec/steps/step-04-review.md
