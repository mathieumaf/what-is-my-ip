import { test, expect } from '@playwright/test'

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
}

test.describe('Responsive Layout', () => {
  test.describe('Mobile viewport (375px)', () => {
    test.use({ viewport: viewports.mobile })

    test('should display IP address without horizontal scroll on mobile viewport', async ({
      page,
    }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
      expect(hasHorizontalScroll).toBe(false)
    })

    test('should render full-width card on mobile viewport', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByTestId('ip-address')).toBeVisible({ timeout: 10000 })

      const cardBox = await page
        .getByTestId('ip-display')
        .locator('[data-slot="root"]')
        .boundingBox()
      expect(cardBox).toBeTruthy()

      // Card should take most of the viewport width (accounting for padding)
      expect(cardBox!.width).toBeGreaterThan(viewports.mobile.width * 0.8)
    })

    test('should use mobile typography scale on mobile viewport', async ({ page }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const fontSize = await ipElement.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).fontSize)
      })

      // text-3xl = 1.875rem = 30px (at 16px base)
      expect(fontSize).toBeGreaterThanOrEqual(28)
      expect(fontSize).toBeLessThanOrEqual(34)
    })

    test('should render Try Again button with minimum touch target size on mobile viewport', async ({
      page,
    }) => {
      await page.route('**/api/ip', route => route.abort())
      await page.goto('/')
      const errorAlert = page.getByTestId('ip-error')
      await expect(errorAlert).toBeVisible({ timeout: 10000 })

      const button = errorAlert.getByRole('button', { name: 'Try Again' })
      await expect(button).toBeVisible()

      const box = await button.boundingBox()
      expect(box).toBeTruthy()
      // AC 10: Touch targets minimum 48px on mobile
      expect(box!.height).toBeGreaterThanOrEqual(48)
    })
  })

  test.describe('Tablet viewport (768px)', () => {
    test.use({ viewport: viewports.tablet })

    test('should display IP address without horizontal scroll on tablet viewport', async ({
      page,
    }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
      expect(hasHorizontalScroll).toBe(false)
    })

    test('should display centered layout on tablet viewport', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByTestId('ip-address')).toBeVisible({ timeout: 10000 })

      const displayBox = await page.getByTestId('ip-display').boundingBox()
      expect(displayBox).toBeTruthy()

      // Content should be centered (left margin roughly equals right margin)
      const leftMargin = displayBox!.x
      const rightMargin = viewports.tablet.width - (displayBox!.x + displayBox!.width)
      expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(20)
    })

    test('should use tablet typography scale on tablet viewport', async ({ page }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const fontSize = await ipElement.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).fontSize)
      })

      // sm:text-5xl = 3rem = 48px (at 16px base)
      expect(fontSize).toBeGreaterThanOrEqual(44)
      expect(fontSize).toBeLessThanOrEqual(52)
    })
  })

  test.describe('Desktop viewport (1280px)', () => {
    test.use({ viewport: viewports.desktop })

    test('should display IP address without horizontal scroll on desktop viewport', async ({
      page,
    }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth
      )
      expect(hasHorizontalScroll).toBe(false)
    })

    test('should display centered layout with max-width on desktop viewport', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByTestId('ip-address')).toBeVisible({ timeout: 10000 })

      const displayBox = await page.getByTestId('ip-display').boundingBox()
      expect(displayBox).toBeTruthy()

      // Content should be centered
      const leftMargin = displayBox!.x
      const rightMargin = viewports.desktop.width - (displayBox!.x + displayBox!.width)
      expect(Math.abs(leftMargin - rightMargin)).toBeLessThan(20)
    })

    test('should use desktop typography scale on desktop viewport', async ({ page }) => {
      await page.goto('/')
      const ipElement = page.getByTestId('ip-address')
      await expect(ipElement).toBeVisible({ timeout: 10000 })

      const fontSize = await ipElement.evaluate(el => {
        return parseFloat(window.getComputedStyle(el).fontSize)
      })

      // lg:text-6xl = 3.75rem = 60px (at 16px base)
      expect(fontSize).toBeGreaterThanOrEqual(56)
      expect(fontSize).toBeLessThanOrEqual(64)
    })
  })

  test.describe('Cross-viewport validation', () => {
    test('should have no layout shift on page load at any viewport (CLS < 0.1)', async ({
      page,
    }) => {
      for (const [name, size] of Object.entries(viewports)) {
        await page.setViewportSize(size)
        await page.goto('/')

        // Wait for IP to load (layout should be stable after)
        await expect(page.getByTestId('ip-address')).toBeVisible({ timeout: 10000 })

        // Measure CLS using PerformanceObserver
        const cls = await page.evaluate(() => {
          return new Promise<number>(resolve => {
            let clsValue = 0
            const observer = new PerformanceObserver(list => {
              for (const entry of list.getEntries()) {
                if (!(entry as PerformanceEntry & { hadRecentInput: boolean }).hadRecentInput) {
                  clsValue += (entry as PerformanceEntry & { value: number }).value
                }
              }
            })
            observer.observe({ type: 'layout-shift', buffered: true })

            // Give time for any shifts to be recorded, then resolve
            setTimeout(() => {
              observer.disconnect()
              resolve(clsValue)
            }, 1000)
          })
        })

        expect(cls, `CLS should be < 0.1 at ${name} viewport`).toBeLessThan(0.1)
      }
    })

    test('should display readable IP address at each viewport size', async ({ page }) => {
      for (const [name, size] of Object.entries(viewports)) {
        await page.setViewportSize(size)
        await page.goto('/')
        const ipElement = page.getByTestId('ip-address')
        await expect(ipElement).toBeVisible({ timeout: 10000 })

        const ipText = await ipElement.textContent()
        expect(ipText!.trim().length, `IP should be readable at ${name} viewport`).toBeGreaterThan(
          0
        )
      }
    })
  })
})
