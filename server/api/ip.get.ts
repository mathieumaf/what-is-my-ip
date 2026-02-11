import { extractClientIp } from '../utils/ipExtraction'

export default defineEventHandler((event): { ip: string } => {
  try {
    const ip = extractClientIp(event)

    if (!ip) {
      throw createError({
        statusCode: 400,
        message: 'Unable to detect IP address',
      })
    }

    return { ip }
  } catch (error) {
    // Re-throw H3 errors (createError) as-is
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Log unexpected errors server-side for debugging
    console.error('IP detection failed:', error)

    throw createError({
      statusCode: 500,
      message: 'Internal server error',
    })
  }
})
