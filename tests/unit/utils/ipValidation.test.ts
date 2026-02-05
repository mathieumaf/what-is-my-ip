/**
 * Unit tests for IP validation and normalization utilities
 *
 * Tests cover:
 * - IPv4 validation with edge cases
 * - IP normalization (IPv6 prefix stripping)
 * - Private IP detection
 * - Error handling
 */

import { isValidIPv4, normalizeIP, isPrivateIP } from '~/utils/ipValidation'

describe('ipValidation utilities', () => {
  describe('isValidIPv4', () => {
    it('should validate correct IPv4 addresses', () => {
      expect(isValidIPv4('192.168.1.1')).toBe(true)
      expect(isValidIPv4('10.0.0.1')).toBe(true)
      expect(isValidIPv4('172.16.0.1')).toBe(true)
      expect(isValidIPv4('8.8.8.8')).toBe(true)
    })

    it('should reject invalid IPv4 addresses', () => {
      expect(isValidIPv4('256.1.1.1')).toBe(false)
      expect(isValidIPv4('192.168.1')).toBe(false)
      expect(isValidIPv4('not-an-ip')).toBe(false)
      expect(isValidIPv4('192.168.1.1.1')).toBe(false)
    })

    it('should handle edge cases', () => {
      expect(isValidIPv4('0.0.0.0')).toBe(true)
      expect(isValidIPv4('255.255.255.255')).toBe(true)
      expect(isValidIPv4('')).toBe(false)
      expect(isValidIPv4(null)).toBe(false)
      expect(isValidIPv4(undefined)).toBe(false)
    })

    it('should reject IPv6 addresses', () => {
      expect(isValidIPv4('2001:0db8:85a3::8a2e:0370:7334')).toBe(false)
      expect(isValidIPv4('::1')).toBe(false)
      expect(isValidIPv4('::ffff:192.168.1.1')).toBe(false)
    })
  })

  describe('normalizeIP', () => {
    it('should strip ::ffff: prefix from IPv4-mapped IPv6 addresses', () => {
      expect(normalizeIP('::ffff:192.168.1.1')).toBe('192.168.1.1')
      expect(normalizeIP('::ffff:10.0.0.1')).toBe('10.0.0.1')
      expect(normalizeIP('::ffff:8.8.8.8')).toBe('8.8.8.8')
    })

    it('should return IPv4 addresses unchanged', () => {
      expect(normalizeIP('192.168.1.1')).toBe('192.168.1.1')
      expect(normalizeIP('10.0.0.1')).toBe('10.0.0.1')
      expect(normalizeIP('172.16.0.1')).toBe('172.16.0.1')
    })

    it('should return IPv6 addresses unchanged', () => {
      expect(normalizeIP('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(
        '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
      )
      expect(normalizeIP('fe80::1')).toBe('fe80::1')
      expect(normalizeIP('::1')).toBe('::1')
    })

    it('should trim whitespace', () => {
      expect(normalizeIP('  192.168.1.1  ')).toBe('192.168.1.1')
      expect(normalizeIP(' 10.0.0.1 ')).toBe('10.0.0.1')
    })

    it('should throw error for invalid inputs', () => {
      expect(() => normalizeIP('')).toThrow('Invalid IP address')
      expect(() => normalizeIP(null as unknown as string)).toThrow('Invalid IP address')
      expect(() => normalizeIP(undefined as unknown as string)).toThrow('Invalid IP address')
    })
  })

  describe('isPrivateIP', () => {
    describe('IPv4 private ranges', () => {
      it('should detect 10.x.x.x range', () => {
        expect(isPrivateIP('10.0.0.1')).toBe(true)
        expect(isPrivateIP('10.255.255.255')).toBe(true)
      })

      it('should detect 172.16.x.x - 172.31.x.x range', () => {
        expect(isPrivateIP('172.16.0.1')).toBe(true)
        expect(isPrivateIP('172.31.255.255')).toBe(true)
        expect(isPrivateIP('172.15.0.1')).toBe(false) // Outside range
        expect(isPrivateIP('172.32.0.1')).toBe(false) // Outside range
      })

      it('should detect 192.168.x.x range', () => {
        expect(isPrivateIP('192.168.1.1')).toBe(true)
        expect(isPrivateIP('192.168.255.255')).toBe(true)
      })

      it('should detect 127.x.x.x (loopback)', () => {
        expect(isPrivateIP('127.0.0.1')).toBe(true)
        expect(isPrivateIP('127.255.255.255')).toBe(true)
      })

      it('should detect 169.254.x.x (link-local)', () => {
        expect(isPrivateIP('169.254.1.1')).toBe(true)
        expect(isPrivateIP('169.254.255.255')).toBe(true)
      })
    })

    describe('IPv6 private ranges', () => {
      it('should detect fc00::/7 (unique local)', () => {
        expect(isPrivateIP('fc00::1')).toBe(true)
        expect(isPrivateIP('fd00::1')).toBe(true)
      })

      it('should detect fe80::/10 (link-local)', () => {
        expect(isPrivateIP('fe80::1')).toBe(true)
      })

      it('should detect ::1 (loopback)', () => {
        expect(isPrivateIP('::1')).toBe(true)
      })
    })

    describe('public IPs', () => {
      it('should not flag public IPv4 addresses as private', () => {
        expect(isPrivateIP('8.8.8.8')).toBe(false) // Google DNS
        expect(isPrivateIP('1.1.1.1')).toBe(false) // Cloudflare DNS
        expect(isPrivateIP('208.67.222.222')).toBe(false) // OpenDNS
      })

      it('should not flag public IPv6 addresses as private', () => {
        expect(isPrivateIP('2001:4860:4860::8888')).toBe(false) // Google DNS
      })
    })

    describe('IPv4-mapped IPv6 addresses', () => {
      it('should detect private IPs with ::ffff: prefix', () => {
        expect(isPrivateIP('::ffff:192.168.1.1')).toBe(true)
        expect(isPrivateIP('::ffff:10.0.0.1')).toBe(true)
        expect(isPrivateIP('::ffff:127.0.0.1')).toBe(true)
      })

      it('should not flag public IPs with ::ffff: prefix as private', () => {
        expect(isPrivateIP('::ffff:8.8.8.8')).toBe(false)
      })
    })

    describe('edge cases', () => {
      it('should handle invalid inputs gracefully', () => {
        expect(isPrivateIP('')).toBe(false)
        expect(isPrivateIP(null as unknown as string)).toBe(false)
        expect(isPrivateIP(undefined as unknown as string)).toBe(false)
      })
    })
  })
})
