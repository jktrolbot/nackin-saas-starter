import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn — class name merger', () => {
  it('merges multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('deduplicates conflicting Tailwind classes', () => {
    // tailwind-merge resolves conflicts — last one wins
    expect(cn('px-4', 'px-8')).toBe('px-8')
  })

  it('handles conditional classes with clsx', () => {
    expect(cn('base', false && 'not-included', 'included')).toBe('base included')
    expect(cn('base', undefined, null, 'end')).toBe('base end')
  })

  it('handles object syntax', () => {
    expect(cn({ active: true, disabled: false })).toBe('active')
  })

  it('handles array syntax', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c')
  })

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('')
  })

  it('handles empty strings', () => {
    expect(cn('', 'foo', '')).toBe('foo')
  })
})
