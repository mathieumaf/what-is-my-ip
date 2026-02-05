/**
 * Example unit test demonstrating Vitest patterns with Nuxt integration
 *
 * This test file shows:
 * - Basic test structure with describe/it blocks
 * - Multiple assertion patterns
 * - Edge case coverage
 * - TypeScript strict mode compliance
 */

/**
 * Example utility function: Format IP address for display
 * Handles IPv4 and IPv6 normalization
 */
function formatIP(ip: string): string {
  if (!ip || typeof ip !== 'string') {
    throw new Error('Invalid IP address')
  }

  // Normalize IPv6 addresses with ::ffff: prefix (IPv4-mapped)
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '')
  }

  return ip.trim()
}

describe('formatIP utility', () => {
  describe('valid inputs', () => {
    it('should return IPv4 addresses unchanged', () => {
      expect(formatIP('192.168.1.1')).toBe('192.168.1.1')
      expect(formatIP('10.0.0.1')).toBe('10.0.0.1')
      expect(formatIP('172.16.0.1')).toBe('172.16.0.1')
    })

    it('should strip ::ffff: prefix from IPv4-mapped IPv6 addresses', () => {
      expect(formatIP('::ffff:192.168.1.1')).toBe('192.168.1.1')
      expect(formatIP('::ffff:10.0.0.1')).toBe('10.0.0.1')
    })

    it('should return IPv6 addresses unchanged', () => {
      expect(formatIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
      )
      expect(formatIP('fe80::1')).toBe('fe80::1')
    })

    it('should trim whitespace from IP addresses', () => {
      expect(formatIP('  192.168.1.1  ')).toBe('192.168.1.1')
      expect(formatIP(' 10.0.0.1 ')).toBe('10.0.0.1')
    })
  })

  describe('edge cases', () => {
    it('should handle localhost addresses', () => {
      expect(formatIP('127.0.0.1')).toBe('127.0.0.1')
      expect(formatIP('::1')).toBe('::1')
    })

    it('should handle boundary IP addresses', () => {
      expect(formatIP('0.0.0.0')).toBe('0.0.0.0')
      expect(formatIP('255.255.255.255')).toBe('255.255.255.255')
    })
  })

  describe('error handling', () => {
    it('should throw error for empty string', () => {
      expect(() => formatIP('')).toThrow('Invalid IP address')
    })

    it('should throw error for null input', () => {
      expect(() => formatIP(null as unknown as string)).toThrow('Invalid IP address')
    })

    it('should throw error for undefined input', () => {
      expect(() => formatIP(undefined as unknown as string)).toThrow('Invalid IP address')
    })

    it('should throw error for non-string input', () => {
      expect(() => formatIP(123 as unknown as string)).toThrow('Invalid IP address')
    })
  })
})
