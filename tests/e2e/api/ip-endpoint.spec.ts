import { test, expect } from '@playwright/test'

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

  test('should return IP matching IPv4 or IPv6 pattern', async ({ request }) => {
    const response = await request.get('/api/ip')
    const body = await response.json()

    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
    const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/

    const isValidFormat = ipv4Regex.test(body.ip) || ipv6Regex.test(body.ip)
    expect(isValidFormat).toBe(true)
  })

  test('should respond within 100ms', async ({ request }) => {
    const start = Date.now()
    await request.get('/api/ip')
    const duration = Date.now() - start

    expect(duration).toBeLessThan(100)
  })

  test('should return Content-Type application/json', async ({ request }) => {
    const response = await request.get('/api/ip')
    const contentType = response.headers()['content-type']

    expect(contentType).toContain('application/json')
  })
})
