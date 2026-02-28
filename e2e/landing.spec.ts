import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows hero headline', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Launch your SaaS')
  })

  test('shows navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Features' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible()
  })

  test('CTA buttons are visible', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Get Started/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /Log in/i })).toBeVisible()
  })

  test('features section exists', async ({ page }) => {
    await page.getByRole('link', { name: 'Features' }).click()
    await expect(page.getByText('Lightning Fast')).toBeVisible()
    await expect(page.getByText('Auth Built In')).toBeVisible()
  })

  test('pricing section shows 3 plans', async ({ page }) => {
    await page.getByRole('link', { name: 'Pricing' }).click()
    await expect(page.getByText('Free')).toBeVisible()
    await expect(page.getByText('Pro')).toBeVisible()
    await expect(page.getByText('Enterprise')).toBeVisible()
  })

  test('testimonials section is visible', async ({ page }) => {
    await expect(page.getByText('Loved by builders')).toBeVisible()
    await expect(page.getByText('Sarah Chen')).toBeVisible()
  })

  test('footer contains legal links', async ({ page }) => {
    await expect(page.getByText('Privacy')).toBeVisible()
    await expect(page.getByText('Terms')).toBeVisible()
  })

  test('theme toggle is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /toggle theme/i })).toBeVisible()
  })
})
