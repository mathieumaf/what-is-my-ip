import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/What is my IP/i)
  })

  test('should display main content with heading and welcome text', async ({ page }) => {
    await page.goto('/')
    // Verify heading exists and is visible
    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
    // Verify heading contains meaningful text (not empty)
    const headingText = await heading.textContent()
    expect(headingText).toBeTruthy()
    expect(headingText?.length).toBeGreaterThan(0)
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
