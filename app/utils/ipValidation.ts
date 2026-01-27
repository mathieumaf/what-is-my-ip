/**
 * IP address validation and normalization utilities
 *
 * These utilities handle common IP address operations needed throughout the application:
 * - IPv4/IPv6 validation
 * - IPv6 normalization (stripping ::ffff: prefix)
 * - Private IP detection
 */

/**
 * Validates if a string is a valid IPv4 address
 *
 * @param ip - The IP address string to validate
 * @returns True if valid IPv4, false otherwise
 *
 * @example
 * isValidIPv4('192.168.1.1') // true
 * isValidIPv4('256.1.1.1') // false
 */
export function isValidIPv4(ip: string | null | undefined): boolean {
  if (!ip || typeof ip !== 'string') {
    return false
  }

  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
  const match = ip.match(ipv4Regex)

  if (!match) {
    return false
  }

  // Check each octet is 0-255
  return match.slice(1, 5).every(octet => {
    const num = parseInt(octet, 10)
    return num >= 0 && num <= 255
  })
}

/**
 * Normalizes an IP address by removing IPv6 ::ffff: prefix
 *
 * IPv4-mapped IPv6 addresses use ::ffff: prefix which should be stripped
 * for display and API calls
 *
 * @param ip - The IP address to normalize
 * @returns Normalized IP address
 *
 * @example
 * normalizeIP('::ffff:192.168.1.1') // '192.168.1.1'
 * normalizeIP('192.168.1.1') // '192.168.1.1'
 */
export function normalizeIP(ip: string): string {
  if (!ip || typeof ip !== 'string') {
    throw new Error('Invalid IP address')
  }

  // Strip IPv6 ::ffff: prefix for IPv4-mapped addresses
  if (ip.startsWith('::ffff:')) {
    return ip.replace('::ffff:', '')
  }

  return ip.trim()
}

/**
 * Detects if an IP address is private/internal
 *
 * Private IP ranges should not be sent to external geolocation APIs
 *
 * @param ip - The IP address to check
 * @returns True if private IP, false otherwise
 *
 * @example
 * isPrivateIP('192.168.1.1') // true
 * isPrivateIP('8.8.8.8') // false
 */
export function isPrivateIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false
  }

  // Normalize first
  const normalizedIP = ip.startsWith('::ffff:') ? ip.replace('::ffff:', '') : ip

  // IPv4 private ranges
  const privateIPv4Patterns = [
    /^10\./, // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
    /^192\.168\./, // 192.168.0.0/16
    /^127\./, // 127.0.0.0/8 (loopback)
    /^169\.254\./, // 169.254.0.0/16 (link-local)
  ]

  // IPv6 private ranges
  const privateIPv6Patterns = [
    /^fc00:/i, // fc00::/7 (unique local)
    /^fd00:/i, // fd00::/8 (unique local)
    /^fe80:/i, // fe80::/10 (link-local)
    /^::1$/, // ::1 (loopback)
  ]

  return (
    privateIPv4Patterns.some(pattern => pattern.test(normalizedIP)) ||
    privateIPv6Patterns.some(pattern => pattern.test(normalizedIP))
  )
}
