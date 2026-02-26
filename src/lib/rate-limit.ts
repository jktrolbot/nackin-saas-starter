const requests = new Map<string, { count: number; resetAt: number }>()

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

export function rateLimit(
  identifier: string,
  limit = 60,
  windowMs = 60_000
): RateLimitResult {
  const now = Date.now()
  const record = requests.get(identifier)

  if (!record || record.resetAt < now) {
    requests.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, limit, remaining: limit - 1, reset: now + windowMs }
  }

  if (record.count >= limit) {
    return { success: false, limit, remaining: 0, reset: record.resetAt }
  }

  record.count++
  return { success: true, limit, remaining: limit - record.count, reset: record.resetAt }
}

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, value] of requests.entries()) {
      if (value.resetAt < now) requests.delete(key)
    }
  }, 5 * 60_000)
}
