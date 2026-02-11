import { test, expect } from '@playwright/test'
import { isIP } from 'node:net'

test.describe('GET /api/ip', () => {
  test('should return 200 with valid JSON', async ({ request }) => {
    const response = await request.get('/api/ip')
    expect(response.status()).toBe(200)

    const body = await response.json()
    expect(body).toBeDefined()
    expect(typeof body).toBe('object')
  })

  test('should contain ip field with string value', async ({ request }) => {
    const response = await request.get('/api/ip')
    const body = await response.json()

    expect(body).toHaveProperty('ip')
    expect(typeof body.ip).toBe('string')
    expect(body.ip.length).toBeGreaterThan(0)
  })

  test('should return IP matching IPv4 or IPv6 format', async ({ request }) => {
    const response = await request.get('/api/ip')
    const body = await response.json()

    // net.isIP() returns 4 for IPv4, 6 for IPv6, 0 for invalid
    expect(isIP(body.ip)).toBeGreaterThan(0)
  })

  test('should respond within 500ms', async ({ request }) => {
    const start = Date.now()
    await request.get('/api/ip')
    const duration = Date.now() - start

    // NFR-P13: IP detection API endpoint must respond within 500ms
    expect(duration).toBeLessThan(500)
  })

  test('should return Content-Type application/json', async ({ request }) => {
    const response = await request.get('/api/ip')
    const contentType = response.headers()['content-type']

    expect(contentType).toContain('application/json')
  })
})
