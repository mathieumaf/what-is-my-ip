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
    // Fetch IP information from ip-api.com
    const response = await $fetch<IPApiResponse>('http://ip-api.com/json/?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query')
    
    if (response.status === 'success') {
      return {
        success: true,
        data: response
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
