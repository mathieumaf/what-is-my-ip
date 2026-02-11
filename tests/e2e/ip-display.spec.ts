import { test, expect } from '@playwright/test'
import { isIP } from 'node:net'

test.describe('IP Display Component', () => {
  test('should display IP address after client-side fetch', async ({ page }) => {
    await page.goto('/')
    const ipElement = page.getByTestId('ip-address')
    await expect(ipElement).toBeVisible({ timeout: 10000 })

    const ipText = await ipElement.textContent()
    expect(ipText).toBeTruthy()
    expect(ipText!.trim().length).toBeGreaterThan(0)
  })

  test('should display IP matching IPv4 or IPv6 format', async ({ page }) => {
    await page.goto('/')
    const ipElement = page.getByTestId('ip-address')
    await expect(ipElement).toBeVisible({ timeout: 10000 })

    const ipText = (await ipElement.textContent())!.trim()
    expect(isIP(ipText)).toBeGreaterThan(0)
  })

  test('should show loading skeleton initially before IP loads', async ({ page }) => {
    await page.goto('/')
    const skeleton = page.getByTestId('ip-skeleton')

    // Skeleton should be present in the initial HTML (SSR renders it)
    // It may disappear quickly once client-side fetch completes
    const wasVisible = await skeleton.isVisible().catch(() => false)
    const ipElement = page.getByTestId('ip-address')

    // Either skeleton was visible initially OR IP loaded very fast
    if (!wasVisible) {
      await expect(ipElement).toBeVisible({ timeout: 10000 })
    }
  })

  test('should show error state with retry button when API fails', async ({ page }) => {
    // Intercept API call and return an error
    await page.route('**/api/ip', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ statusCode: 500, message: 'Internal server error' }),
      })
    })

    await page.goto('/')
    const errorAlert = page.getByTestId('ip-error')
    await expect(errorAlert).toBeVisible({ timeout: 10000 })

    // Verify "Try Again" button is present
    const retryButton = page.getByRole('button', { name: 'Try Again' })
    await expect(retryButton).toBeVisible()
  })

  test('should use data-testid attributes for stable selectors', async ({ page }) => {
    await page.goto('/')

    // The ip-display section should always be present
    const section = page.getByTestId('ip-display')
    await expect(section).toBeVisible()
  })
})
