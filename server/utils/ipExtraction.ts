import type { H3Event } from 'h3'
import { normalizeIP } from '~/utils/ipValidation'

/**
 * Extracts the client IP address from the request event using a header priority chain.
 *
 * Priority: x-forwarded-for (first IP) > x-real-ip > cf-connecting-ip > getRequestIP()
 *
 * @param event - The H3 event object from the request
 * @returns The normalized client IP address, or null if no IP could be detected
 */
export function extractClientIp(event: H3Event): string | null {
  const xForwardedFor = getHeader(event, 'x-forwarded-for')
  const xRealIp = getHeader(event, 'x-real-ip')
  const cfConnectingIp = getHeader(event, 'cf-connecting-ip')

  let ip: string | undefined

  if (xForwardedFor) {
    // x-forwarded-for may contain multiple IPs: "client, proxy1, proxy2"
    // Take the first IP (original client)
    const firstIp = xForwardedFor.split(',')[0]
    ip = firstIp?.trim()
  } else if (xRealIp) {
    ip = xRealIp
  } else if (cfConnectingIp) {
    ip = cfConnectingIp
  } else {
    ip = getRequestIP(event, { xForwardedFor: true }) ?? undefined
  }

  if (!ip) {
    return null
  }

  return normalizeIP(ip)
}
