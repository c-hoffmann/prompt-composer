// playwright.config.ts
// E2E test configuration for the single-file prompt builder tool.
//
// SETUP:
//   npm install -D @playwright/test
//   npx playwright install chromium
//
// RUN:
//   npx playwright test              # all tests
//   npx playwright test --headed     # watch in browser
//   npx playwright test --update-snapshots  # update visual baselines
//
// Architecture: Uses a local Python HTTP server instead of file://
// because file:// has broken CORS, localStorage (Safari), and
// Clipboard API across browsers. Research confirmed: "file:// is a
// massive anti-pattern for E2E testing" — every test framework
// recommends localhost.

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  use: {
    baseURL: 'http://localhost:3000',
    // Clipboard API requires these permissions in headless Chromium
    permissions: ['clipboard-read', 'clipboard-write'],
    // Screenshots for visual regression
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    // WebKit for Safari-like behavior (localStorage restrictions)
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],

  // Local HTTP server — starts before tests, stops after.
  // python3 -m http.server is available on all CI runners.
  // Serves from dist/ where the built HTML lives.
  webServer: {
    command: 'python3 -m http.server 3000 --directory dist',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  // Visual regression config
  expect: {
    toHaveScreenshot: {
      // 0.5% pixel diff tolerance — accounts for anti-aliasing and
      // font rendering differences between local dev and CI.
      maxDiffPixelRatio: 0.005,
      // Animations auto-disabled by Playwright
    },
  },
});
