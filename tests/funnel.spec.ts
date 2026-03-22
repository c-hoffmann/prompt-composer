// tests/funnel.spec.ts
// End-to-end test for the main prompt builder funnel flow.
//
// Tests the critical user path:
// 1. Select project type "Script"
// 2. Select phase "Optimize"
// 3. Skip optional questions
// 4. Verify prompt contains expected XML tags and variables
// 5. Fill in a prompt field
// 6. Copy to clipboard and verify content

import { test, expect } from '@playwright/test';

// Wait for Alpine.js to fully initialize before interacting.
// Alpine emits 'alpine:init' and attaches window.Alpine.
// Research: static waitForTimeout is flaky — waitForFunction is deterministic.
async function waitForAlpine(page) {
  await page.waitForFunction(() => typeof window.Alpine !== 'undefined');
}

test.describe('Prompt Builder Funnel', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/prompt-composer.html');
    await waitForAlpine(page);
  });

  test('completes full funnel: type → phase → configure → copy', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    // Step 1: Home screen shows project types
    await expect(page.locator('.cards')).toBeVisible();

    // Step 2: Select "Script" type (click the card with script emoji/text)
    // Default locale is 'de' — card shows 'Skript' not 'Script'.
    // Use regex to match either language.
    await page.locator('.card', { hasText: /Skript|Script/i }).first().click();

    // Step 3: Select "Optimize" phase
    await page.locator('.card', { hasText: /Optim/i }).first().click();

    // Step 4: Skip questions if present
    const skipBtn = page.locator('button', { hasText: /Skip|Über/i });
    if (await skipBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skipBtn.click();
    }

    // Step 5: Verify prompt output
    const promptOutput = page.locator('#prompt-output');
    await expect(promptOutput).toBeVisible();
    // Built-in script prompts contain <role> XML tags
    await expect(promptOutput).toContainText('<role>', { timeout: 5000 });

    // Step 6: Click copy button
    await page.locator('#btn-copy').click();

    // Step 7: Verify clipboard contains the prompt
    const clipboardText = await page.evaluate(async () => {
      return await navigator.clipboard.readText();
    });
    expect(clipboardText).toContain('<role>');
    expect(clipboardText.length).toBeGreaterThan(50);
  });

  test('prompt fields replace placeholders when filled', async ({ page }) => {
    // Navigate to a route that has prompt fields (e.g. Text > Document > Write)
    await page.locator('.card', { hasText: /Text/i }).first().click();
    // Select first phase
    await page.locator('.card').first().click();

    // Skip questions if present
    const skipBtn = page.locator('button', { hasText: /Skip|Über/i });
    if (await skipBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skipBtn.click();
    }

    // Check if prompt fields section exists
    const fieldsSection = page.locator('input[placeholder]').first();
    if (await fieldsSection.isVisible({ timeout: 2000 }).catch(() => false)) {
      // Fill in the first field
      await fieldsSection.fill('Test Value 12345');

      // Verify the value appears in prompt output
      const promptOutput = page.locator('#prompt-output');
      await expect(promptOutput).toContainText('Test Value 12345', { timeout: 3000 });
    }
  });
});

test.describe('localStorage Persistence', () => {

  test('favorites persist across page reload', async ({ page }) => {
    await page.goto('/prompt-composer.html');
    await waitForAlpine(page);

    // Navigate to any configure step
    await page.locator('.card').first().click();
    await page.locator('.card').first().click();
    const skipBtn = page.locator('button', { hasText: /Skip|Über/i });
    if (await skipBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
      await skipBtn.click();
    }

    // Open save favorite modal
    const favBtn = page.locator('button', { hasText: '⭐' }).first();
    if (await favBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await favBtn.click();
      // Type a name and save
      await page.locator('input[placeholder]').first().fill('Test Favorite');
      await page.locator('button', { hasText: 'Save' }).or(page.locator('button', { hasText: 'Speichern' })).click();
    }

    // Reload
    await page.reload({ waitUntil: 'domcontentloaded' });
    await waitForAlpine(page);

    // Verify favorite still exists
    await expect(page.locator('text=Test Favorite')).toBeVisible({ timeout: 3000 });
  });

  test('app survives blocked localStorage (Safari simulation)', async ({ page }) => {
    // Inject localStorage blocker BEFORE app loads
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: () => null,
          setItem: () => { throw new DOMException('QuotaExceededError'); },
          removeItem: () => {},
          clear: () => {},
          get length() { return 0; },
          key: () => null
        },
        writable: true, configurable: true
      });
    });

    await page.goto('/prompt-composer.html');
    await waitForAlpine(page);

    // App should still render without crashing
    await expect(page.locator('.cards')).toBeVisible();
    // Safari warning banner should appear
    await expect(page.locator('text=localStorage unavailable').or(page.locator('text=persist'))).toBeVisible({ timeout: 3000 });
  });
});
