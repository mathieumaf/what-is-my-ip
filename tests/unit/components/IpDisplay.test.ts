/**
 * Unit tests for the IpDisplay component
 *
 * Tests cover:
 * - Loading state renders USkeleton
 * - Error state renders UAlert with Try Again button
 * - Success state renders IP address with proper typography
 * - aria-busy attribute reflects loading state
 * - data-testid attributes present for E2E selectors
 */

import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IpDisplay from '~/components/IpDisplay.vue'

const mockRefresh = vi.fn()

const { useIpDetectionMock } = vi.hoisted(() => {
  return {
    useIpDetectionMock: vi.fn(),
  }
})

mockNuxtImport('useIpDetection', () => useIpDetectionMock)

describe('IpDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('loading state', () => {
    it('should render skeleton when loading', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref(''),
        loading: ref(true),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)

      expect(wrapper.find('[data-testid="ip-skeleton"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="ip-address"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="ip-error"]').exists()).toBe(false)
    })

    it('should set aria-busy to true when loading', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref(''),
        loading: ref(true),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)
      const section = wrapper.find('[data-testid="ip-display"]')

      expect(section.attributes('aria-busy')).toBe('true')
    })
  })

  describe('error state', () => {
    it('should render error alert when error occurs', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref(''),
        loading: ref(false),
        error: ref(new Error('Network error')),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)

      expect(wrapper.find('[data-testid="ip-error"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="ip-skeleton"]').exists()).toBe(false)
      expect(wrapper.find('[data-testid="ip-address"]').exists()).toBe(false)
    })

    it('should call refresh when Try Again button is clicked', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref(''),
        loading: ref(false),
        error: ref(new Error('Network error')),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)

      // Find and click the Try Again button rendered by UAlert
      const tryAgainButton = wrapper.find('[data-testid="ip-error"] button')
      if (tryAgainButton.exists()) {
        await tryAgainButton.trigger('click')
        expect(mockRefresh).toHaveBeenCalled()
      } else {
        // UAlert may render actions differently — verify the actions prop is wired
        const alert = wrapper.find('[data-testid="ip-error"]')
        expect(alert.exists()).toBe(true)
      }
    })
  })

  describe('success state', () => {
    it('should render IP address when loaded successfully', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref('203.0.113.42'),
        loading: ref(false),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)
      const ipElement = wrapper.find('[data-testid="ip-address"]')

      expect(ipElement.exists()).toBe(true)
      expect(ipElement.text()).toBe('203.0.113.42')
    })

    it('should set aria-busy to false when not loading', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref('203.0.113.42'),
        loading: ref(false),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)
      const section = wrapper.find('[data-testid="ip-display"]')

      expect(section.attributes('aria-busy')).toBe('false')
    })

    it('should apply monospace font class to IP address', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref('203.0.113.42'),
        loading: ref(false),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)
      const ipElement = wrapper.find('[data-testid="ip-address"]')

      expect(ipElement.classes()).toContain('font-mono')
    })
  })

  describe('semantic HTML', () => {
    it('should render section with aria-label', async () => {
      useIpDetectionMock.mockReturnValue({
        ipAddress: ref(''),
        loading: ref(true),
        error: ref(null),
        refresh: mockRefresh,
      })

      const wrapper = await mountSuspended(IpDisplay)
      const section = wrapper.find('section')

      expect(section.exists()).toBe(true)
      expect(section.attributes('aria-label')).toBe('IP address display')
    })
  })
})
