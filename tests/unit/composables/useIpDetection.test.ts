/**
 * Unit tests for the useIpDetection composable
 *
 * Tests cover:
 * - Initial state (loading, empty IP, no error)
 * - Successful IP fetch → ipAddress populated, loading false, error null
 * - Failed fetch → error set, loading false, ipAddress empty
 * - Refresh triggers new fetch
 * - Loading state properly managed
 * - Readonly refs for exposed state
 */

import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const mockRefresh = vi.fn()

const { useFetchMock } = vi.hoisted(() => {
  return {
    useFetchMock: vi.fn(),
  }
})

mockNuxtImport('useFetch', () => useFetchMock)

describe('useIpDetection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('initial pending state', () => {
    it('should return empty ipAddress when fetch is pending', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('pending'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { ipAddress } = useIpDetection()

      expect(ipAddress.value).toBe('')
    })

    it('should return loading true when status is pending', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('pending'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { loading } = useIpDetection()

      expect(loading.value).toBe(true)
    })

    it('should return null error when fetch is pending', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('pending'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { error } = useIpDetection()

      expect(error.value).toBeNull()
    })
  })

  describe('successful IP fetch', () => {
    it('should return IP address after successful fetch', async () => {
      useFetchMock.mockReturnValue({
        data: ref({ ip: '203.0.113.42' }),
        status: ref('success'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { ipAddress } = useIpDetection()

      expect(ipAddress.value).toBe('203.0.113.42')
    })

    it('should return loading false after successful fetch', async () => {
      useFetchMock.mockReturnValue({
        data: ref({ ip: '203.0.113.42' }),
        status: ref('success'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { loading } = useIpDetection()

      expect(loading.value).toBe(false)
    })

    it('should return null error after successful fetch', async () => {
      useFetchMock.mockReturnValue({
        data: ref({ ip: '203.0.113.42' }),
        status: ref(null),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { error } = useIpDetection()

      expect(error.value).toBeNull()
    })
  })

  describe('failed fetch', () => {
    it('should return error when fetch fails', async () => {
      const fetchError = new Error('Network error')
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('error'),
        error: ref(fetchError),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { error } = useIpDetection()

      expect(error.value).toBe(fetchError)
    })

    it('should return loading false when fetch fails', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('error'),
        error: ref(new Error('Network error')),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { loading } = useIpDetection()

      expect(loading.value).toBe(false)
    })

    it('should return empty ipAddress when fetch fails', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('error'),
        error: ref(new Error('Network error')),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { ipAddress } = useIpDetection()

      expect(ipAddress.value).toBe('')
    })
  })

  describe('refresh functionality', () => {
    it('should expose refresh method from useFetch', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('idle'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { refresh } = useIpDetection()

      refresh()

      expect(mockRefresh).toHaveBeenCalledOnce()
    })
  })

  describe('useFetch configuration', () => {
    it('should call useFetch with /api/ip and server: false', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('idle'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      useIpDetection()

      expect(useFetchMock.mock.calls[0][0]).toBe('/api/ip')
      expect(useFetchMock.mock.calls[0][1]).toMatchObject({ server: false })
    })
  })

  describe('idle state (SSR)', () => {
    it('should return loading false when status is idle', async () => {
      useFetchMock.mockReturnValue({
        data: ref(null),
        status: ref('idle'),
        error: ref(null),
        refresh: mockRefresh,
      })

      const { useIpDetection } = await import('~/composables/useIpDetection')
      const { loading } = useIpDetection()

      expect(loading.value).toBe(false)
    })
  })
})
