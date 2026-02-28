import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { rateLimit } from './rate-limit'

describe('rateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows first request', () => {
    const result = rateLimit('test-key-1', 5, 60_000)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(4)
    expect(result.limit).toBe(5)
  })

  it('tracks remaining requests', () => {
    const id = 'test-key-2'
    rateLimit(id, 5, 60_000)
    rateLimit(id, 5, 60_000)
    const result = rateLimit(id, 5, 60_000)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('blocks requests over the limit', () => {
    const id = 'test-key-3'
    for (let i = 0; i < 3; i++) {
      rateLimit(id, 3, 60_000)
    }
    const result = rateLimit(id, 3, 60_000)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('resets after window expires', () => {
    const id = 'test-key-4'
    for (let i = 0; i < 3; i++) {
      rateLimit(id, 3, 60_000)
    }
    // Blocked
    expect(rateLimit(id, 3, 60_000).success).toBe(false)

    // Advance time past the window
    vi.advanceTimersByTime(61_000)

    // Should be allowed again
    expect(rateLimit(id, 3, 60_000).success).toBe(true)
  })

  it('uses default limit of 60 if none specified', () => {
    const result = rateLimit('test-key-default')
    expect(result.limit).toBe(60)
    expect(result.remaining).toBe(59)
  })

  it('resets timestamp is in the future', () => {
    const now = Date.now()
    const result = rateLimit('test-key-reset', 5, 10_000)
    expect(result.reset).toBeGreaterThan(now)
  })
})
