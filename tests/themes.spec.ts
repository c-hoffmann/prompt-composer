// tests/themes.spec.ts
// Visual regression tests for all 4 CSS themes.
//
// Captures screenshots of the home screen in each theme and compares
// against baseline images. Detects unintended color/layout changes
// when CSS is modified.
//
// UPDATE BASELINES:
//   npx playwright test tests/themes.spec.ts --update-snapshots
//
// Research: maxDiffPixelRatio 0.005 (0.5%) handles anti-aliasing
// and font rendering differences between local dev and CI (Ubuntu).

import { test, expect } from '@playwright/test';

const THEMES = ['light', 'dark', 'neon', 'high-contrast'];

async function waitForAlpine(page) {
  await page.waitForFunction(() => typeof window.Alpine !== 'undefined');
}

test.describe('Theme Visual Regression', () => {

  for (const theme of THEMES) {
    test(`home screen renders correctly in ${theme} theme`, async ({ page }) => {
      await page.goto('/prompt-composer.html');
      await waitForAlpine(page);

      // Switch theme by setting the data-theme attribute directly
      await page.evaluate((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, theme);

      // Allow repaint
      await page.waitForTimeout(200);

      // Hide dynamic content that varies between runs
      await page.addStyleTag({
        content: `
          .text-faint[x-text*="APP_VERSION"] { visibility: hidden !important; }
          [aria-live] { visibility: hidden !important; }
        `
      });

      // Screenshot the full page
      await expect(page).toHaveScreenshot(`home-${theme}.png`, {
        fullPage: false,
        maxDiffPixelRatio: 0.005,
      });
    });
  }
});
