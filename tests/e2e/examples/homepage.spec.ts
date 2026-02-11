import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/What is my IP/i)
  })

  test('should display main content with IP display component', async ({ page }) => {
    await page.goto('/')
    // Verify the IP display section is visible
    const ipDisplay = page.getByTestId('ip-display')
    await expect(ipDisplay).toBeVisible()
    // Verify IP address loads (wait for client-side fetch)
    const ipAddress = page.getByTestId('ip-address')
    await expect(ipAddress).toBeVisible({ timeout: 10000 })
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
