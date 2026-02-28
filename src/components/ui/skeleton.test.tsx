import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Skeleton } from './skeleton'

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })

  it('applies custom className', () => {
    const { container } = render(<Skeleton className="h-4 w-32" />)
    expect(container.firstChild).toHaveClass('h-4', 'w-32')
  })

  it('passes through HTML attributes', () => {
    const { container } = render(<Skeleton data-testid="skel" aria-label="loading" />)
    const el = container.firstChild as HTMLElement
    expect(el.dataset.testid).toBe('skel')
    expect(el.getAttribute('aria-label')).toBe('loading')
  })
})
