import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Homepage Accessibility Tests', () => {
  test('homepage should meet WCAG 2.1 AA standards', async ({ page }) => {
    await page.goto('/')

    // Run accessibility checks using axe-core
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    // Assert no violations found
    expect(accessibilityScanResults.violations).toEqual([])
  })
})
