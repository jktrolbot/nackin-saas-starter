import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { UserMenu } from './user-menu'

describe('UserMenu', () => {
  it('renders trigger button', () => {
    render(<UserMenu email="user@example.com" name="Jane Smith" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows user initials from name', () => {
    render(<UserMenu email="user@example.com" name="Jane Smith" />)
    expect(screen.getByText('JS')).toBeInTheDocument()
  })

  it('shows email initials when no name provided', () => {
    render(<UserMenu email="user@example.com" />)
    expect(screen.getByText('US')).toBeInTheDocument()
  })

  it('shows name and email in desktop view', () => {
    render(<UserMenu email="user@example.com" name="Jane Smith" />)
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('user@example.com')).toBeInTheDocument()
  })

  it('falls back to "User" when no name', () => {
    render(<UserMenu email="user@example.com" />)
    expect(screen.getByText('User')).toBeInTheDocument()
  })
})
