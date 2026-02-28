import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'

describe('Sidebar', () => {
  it('renders the SaaSKit brand', () => {
    render(<Sidebar />)
    expect(screen.getByText('SaaSKit')).toBeInTheDocument()
  })

  it('renders all nav items', () => {
    render(<Sidebar />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Billing')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders the Admin link', () => {
    render(<Sidebar />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('highlights the active route', () => {
    render(<Sidebar />)
    // usePathname returns '/dashboard' from our mock
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveClass('text-violet-500')
  })

  it('accepts a custom className', () => {
    const { container } = render(<Sidebar className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
