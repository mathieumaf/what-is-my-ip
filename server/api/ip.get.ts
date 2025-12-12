interface IPApiResponse {
  status: string
  message?: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export default defineEventHandler(async (event) => {
  try {
    // Get client IP from request headers
    const forwardedFor = getHeader(event, 'x-forwarded-for')
    const realIP = getHeader(event, 'x-real-ip')
    const cfIP = getHeader(event, 'cf-connecting-ip')
    const clientIPHeader = getHeader(event, 'x-client-ip')
    
    // Extract first IP from x-forwarded-for if it contains multiple IPs
    const rawClientIP = forwardedFor?.split(',')[0]?.trim() || 
                        realIP || 
                        cfIP || 
                        clientIPHeader ||
                        event.node.req.socket?.remoteAddress ||
                        event.node.req.connection?.remoteAddress

    const normalizeIP = (ip: string | undefined | null): string | undefined => {
      if (!ip) return undefined
      const trimmed = ip.trim()
      const lower = trimmed.toLowerCase()
      if (lower.startsWith('::ffff:')) {
        return trimmed.slice(7)
      }
      return trimmed
    }

    // Function to check if IP is private/local
    const isPrivateIP = (ip: string | undefined): boolean => {
      const normalized = normalizeIP(ip)
      if (!normalized) return true
      
      const lower = normalized.toLowerCase()

      if (normalized.includes(':')) {
        if (lower === '::1' || lower === '::') return true
        if (lower.startsWith('fc') || lower.startsWith('fd')) return true // Unique local addresses
        if (lower.startsWith('fe80')) return true // Link-local
        return false
      }

      // IPv4 private ranges
      if (normalized === '127.0.0.1') return true
      if (normalized.startsWith('192.168.')) return true
      if (normalized.startsWith('10.')) return true
      if (normalized.startsWith('172.')) {
        const secondOctet = parseInt(normalized.split('.')[1] || '', 10)
        if (!Number.isNaN(secondOctet) && secondOctet >= 16 && secondOctet <= 31) return true
      }
      if (normalized.startsWith('169.254.')) return true // Link-local
      if (normalized.startsWith('224.')) return true // Multicast
      
      return false
    }

    const clientIP = normalizeIP(rawClientIP)

    // Use the detected client IP if it's public, otherwise let ip-api auto-detect the server's public IP
    const useSpecificIP = clientIP && !isPrivateIP(clientIP)
    const apiUrl = useSpecificIP
      ? `http://ip-api.com/json/${clientIP}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`
      : 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query'

    // Fetch IP information from ip-api.com
    const response = await $fetch<IPApiResponse>(apiUrl)
    
    if (response.status === 'success') {
      return {
        success: true,
        data: response,
        detectedIP: clientIP,
        isPrivateIP: !useSpecificIP,
        usedSpecificIP: useSpecificIP
      }
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: response.message || 'Failed to fetch IP information'
      })
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to fetch IP information'
    })
  }
})
