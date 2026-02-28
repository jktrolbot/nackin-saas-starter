import { test, expect } from '@playwright/test'

test.describe('Auth Pages', () => {
  test('login page shows form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible()
  })

  test('login page has Google OAuth button', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('button', { name: /Continue with Google/i })).toBeVisible()
  })

  test('login page has forgot password link', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('link', { name: /Forgot password/i })).toBeVisible()
  })

  test('login page links to signup', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByRole('link', { name: /Sign up/i })).toBeVisible()
  })

  test('signup page shows form', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible()
    await expect(page.getByLabel('Full name')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible()
  })

  test('signup shows password validation', async ({ page }) => {
    await page.goto('/signup')
    await page.fill('[id="name"]', 'Test User')
    await page.fill('[id="email"]', 'test@example.com')
    await page.fill('[id="password"]', '123')
    await page.click('[type="submit"]')
    // Short password should show toast error
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible({ timeout: 5000 })
  })

  test('forgot password page renders', async ({ page }) => {
    await page.goto('/forgot-password')
    await expect(page.getByRole('heading', { name: /Forgot password/i })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByRole('button', { name: /Send Reset Link/i })).toBeVisible()
  })

  test('pricing page renders', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByRole('heading', { name: 'Simple, transparent pricing' })).toBeVisible()
    await expect(page.getByText('Full comparison')).toBeVisible()
    await expect(page.getByText('Frequently asked questions')).toBeVisible()
  })
})
