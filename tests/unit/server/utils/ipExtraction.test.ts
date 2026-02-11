/**
 * Unit tests for server-side IP extraction utility
 *
 * Tests cover:
 * - Header priority chain (x-forwarded-for > x-real-ip > cf-connecting-ip > getRequestIP)
 * - Multiple IPs in x-forwarded-for (takes first)
 * - IPv6 normalization (::ffff: prefix stripping)
 * - Missing IP handling (returns null)
 * - Private IP detection in server context
 */

import type { H3Event } from 'h3'
import { extractClientIp } from '../../../../server/utils/ipExtraction'
import { isPrivateIP } from '~/utils/ipValidation'

// Mock H3 utilities that are auto-imported in server context
const mockGetHeader = vi.fn<(event: H3Event, name: string) => string | undefined>()
const mockGetRequestIP =
  vi.fn<(event: H3Event, opts?: { xForwardedFor?: boolean }) => string | undefined>()

vi.stubGlobal('getHeader', mockGetHeader)
vi.stubGlobal('getRequestIP', mockGetRequestIP)

function createMockEvent(): H3Event {
  return {} as H3Event
}

describe('extractClientIp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockGetHeader.mockReturnValue(undefined)
    mockGetRequestIP.mockReturnValue(undefined)
  })

  describe('header priority chain', () => {
    it('should prioritize x-forwarded-for over other headers', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '203.0.113.42'
        if (name === 'x-real-ip') return '198.51.100.1'
        if (name === 'cf-connecting-ip') return '192.0.2.1'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('203.0.113.42')
    })

    it('should use x-real-ip when x-forwarded-for is absent', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return undefined
        if (name === 'x-real-ip') return '198.51.100.1'
        if (name === 'cf-connecting-ip') return '192.0.2.1'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('198.51.100.1')
    })

    it('should use cf-connecting-ip when x-forwarded-for and x-real-ip are absent', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return undefined
        if (name === 'x-real-ip') return undefined
        if (name === 'cf-connecting-ip') return '192.0.2.1'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('192.0.2.1')
    })

    it('should fall back to getRequestIP when no headers are present', () => {
      mockGetHeader.mockReturnValue(undefined)
      mockGetRequestIP.mockReturnValue('172.217.14.206')

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('172.217.14.206')
      expect(mockGetRequestIP).toHaveBeenCalledWith(expect.anything(), { xForwardedFor: true })
    })
  })

  describe('x-forwarded-for handling', () => {
    it('should extract first IP from x-forwarded-for with multiple IPs', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '203.0.113.42, 70.41.3.18, 150.172.238.178'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('203.0.113.42')
    })

    it('should trim whitespace from x-forwarded-for IP', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '  203.0.113.42  , 70.41.3.18'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('203.0.113.42')
    })

    it('should handle single IP in x-forwarded-for', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '203.0.113.42'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('203.0.113.42')
    })
  })

  describe('IPv6 normalization', () => {
    it('should normalize ::ffff: prefixed IPs', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '::ffff:203.0.113.42'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('203.0.113.42')
    })

    it('should return pure IPv6 addresses unchanged', () => {
      mockGetHeader.mockImplementation((_event, name) => {
        if (name === 'x-forwarded-for') return '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
        return undefined
      })

      const result = extractClientIp(createMockEvent())
      expect(result).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334')
    })
  })

  describe('missing IP handling', () => {
    it('should return null when no IP can be detected from any source', () => {
      mockGetHeader.mockReturnValue(undefined)
      mockGetRequestIP.mockReturnValue(undefined)

      const result = extractClientIp(createMockEvent())
      expect(result).toBeNull()
    })
  })
})

describe('isPrivateIP in server context', () => {
  it('should detect private IPv4 addresses', () => {
    expect(isPrivateIP('192.168.1.1')).toBe(true)
    expect(isPrivateIP('10.0.0.1')).toBe(true)
    expect(isPrivateIP('127.0.0.1')).toBe(true)
  })

  it('should not flag public IPv4 addresses', () => {
    expect(isPrivateIP('203.0.113.42')).toBe(false)
    expect(isPrivateIP('8.8.8.8')).toBe(false)
  })

  it('should detect private IPv6 addresses', () => {
    expect(isPrivateIP('::1')).toBe(true)
    expect(isPrivateIP('fe80::1')).toBe(true)
    expect(isPrivateIP('fc00::1')).toBe(true)
  })
})
