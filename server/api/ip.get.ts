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

    // For development, always let ip-api auto-detect since we're behind localhost
    const apiUrl = 'http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query'

    // Fetch IP information from ip-api.com
    const response = await $fetch<IPApiResponse>(apiUrl)
    
    if (response.status === 'success') {
      return {
        success: true,
        data: response,
        detectedIP: clientIP
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
