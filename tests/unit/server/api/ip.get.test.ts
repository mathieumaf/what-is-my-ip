/**
 * Unit tests for the IP detection API endpoint
 *
 * Tests cover:
 * - Successful IP extraction and response format { ip: "x.x.x.x" }
 * - 400 error when no IP detected
 * - 500 error on internal failure
 * - Integration with extractClientIp utility
 */

import type { H3Event } from 'h3'

// Set up H3 auto-imports before module loads
const mockExtractClientIp = vi.fn<(event: H3Event) => string | null>()

vi.hoisted(() => {
  globalThis.defineEventHandler = ((handler: unknown) =>
    handler) as typeof globalThis.defineEventHandler
  globalThis.createError = ((opts: { statusCode: number; message: string }) => {
    const error = new Error(opts.message) as Error & { statusCode: number }
    error.statusCode = opts.statusCode
    return error
  }) as typeof globalThis.createError
})

vi.mock('../../../../server/utils/ipExtraction', () => ({
  extractClientIp: (...args: unknown[]) => mockExtractClientIp(...(args as [H3Event])),
}))

const { default: handler } = await import('../../../../server/api/ip.get')

function createMockEvent(): H3Event {
  return {} as H3Event
}

describe('GET /api/ip', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('successful IP extraction', () => {
    it('should return IP from extractClientIp as response body', () => {
      mockExtractClientIp.mockReturnValue('203.0.113.42')

      const result = handler(createMockEvent())
      expect(result).toEqual({ ip: '203.0.113.42' })
    })

    it('should return response in { ip: string } format', () => {
      mockExtractClientIp.mockReturnValue('8.8.8.8')

      const result = handler(createMockEvent())
      expect(result).toHaveProperty('ip')
      expect(typeof result.ip).toBe('string')
    })

    it('should delegate IP extraction to extractClientIp with event', () => {
      mockExtractClientIp.mockReturnValue('8.8.8.8')
      const event = createMockEvent()

      handler(event)
      expect(mockExtractClientIp).toHaveBeenCalledWith(event)
    })
  })

  describe('error handling', () => {
    it('should throw 400 error when no IP detected', () => {
      mockExtractClientIp.mockReturnValue(null)

      try {
        handler(createMockEvent())
        expect.unreachable('Should have thrown')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error & { statusCode: number }).statusCode).toBe(400)
        expect((error as Error).message).toBe('Unable to detect IP address')
      }
    })

    it('should throw 500 error on internal failure', () => {
      mockExtractClientIp.mockImplementation(() => {
        throw new Error('Unexpected internal error')
      })

      try {
        handler(createMockEvent())
        expect.unreachable('Should have thrown')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error & { statusCode: number }).statusCode).toBe(500)
        expect((error as Error).message).toBe('Internal server error')
      }
    })

    it('should log error on internal failure', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const internalError = new Error('Unexpected internal error')
      mockExtractClientIp.mockImplementation(() => {
        throw internalError
      })

      try {
        handler(createMockEvent())
      } catch {
        // Expected to throw
      }

      expect(consoleSpy).toHaveBeenCalledWith('IP detection failed:', internalError)
      consoleSpy.mockRestore()
    })
  })
})
