import { describe, it, expect } from 'vitest'
import { PLANS } from './stripe'

describe('PLANS', () => {
  it('contains exactly 3 plans', () => {
    expect(PLANS).toHaveLength(3)
  })

  it('has free, pro, enterprise plans', () => {
    const ids = PLANS.map((p) => p.id)
    expect(ids).toContain('free')
    expect(ids).toContain('pro')
    expect(ids).toContain('enterprise')
  })

  it('free plan has price 0', () => {
    const free = PLANS.find((p) => p.id === 'free')
    expect(free?.price).toBe(0)
    expect(free?.priceId).toBeNull()
  })

  it('pro plan is highlighted', () => {
    const pro = PLANS.find((p) => p.id === 'pro')
    expect(pro?.highlighted).toBe(true)
  })

  it('paid plans have priceId strings', () => {
    const paid = PLANS.filter((p) => p.price > 0)
    for (const plan of paid) {
      expect(typeof plan.priceId).toBe('string')
      expect(plan.priceId).not.toBe('')
    }
  })

  it('each plan has required fields', () => {
    for (const plan of PLANS) {
      expect(plan.id).toBeTruthy()
      expect(plan.name).toBeTruthy()
      expect(typeof plan.price).toBe('number')
      expect(Array.isArray(plan.features)).toBe(true)
      expect(plan.features.length).toBeGreaterThan(0)
      expect(plan.cta).toBeTruthy()
      expect(plan.description).toBeTruthy()
    }
  })

  it('prices increase from free to enterprise', () => {
    const free = PLANS.find((p) => p.id === 'free')!
    const pro = PLANS.find((p) => p.id === 'pro')!
    const enterprise = PLANS.find((p) => p.id === 'enterprise')!
    expect(free.price).toBeLessThan(pro.price)
    expect(pro.price).toBeLessThan(enterprise.price)
  })
})
