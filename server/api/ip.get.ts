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
    let clientIP = forwardedFor?.split(',')[0]?.trim() || 
                   realIP || 
                   cfIP || 
                   clientIPHeader ||
                   event.node.req.socket?.remoteAddress ||
                   event.node.req.connection?.remoteAddress

    // Function to check if IP is private/local
    const isPrivateIP = (ip: string | undefined): boolean => {
      if (!ip) return true
      
      // IPv6 localhost
      if (ip === '::1' || ip === '::ffff:127.0.0.1') return true
      
      // IPv4 private ranges
      if (ip === '127.0.0.1') return true
      if (ip.startsWith('192.168.')) return true
      if (ip.startsWith('10.')) return true
      if (ip.startsWith('172.')) {
        const secondOctet = parseInt(ip.split('.')[1])
        if (secondOctet >= 16 && secondOctet <= 31) return true
      }
      if (ip.startsWith('169.254.')) return true // Link-local
      if (ip.startsWith('224.')) return true // Multicast
      
      return false
    }

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
