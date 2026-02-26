import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

export interface Plan {
  id: string
  name: string
  price: number
  priceId: string | null
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    description: 'Perfect for trying out our platform',
    features: [
      '5 projects',
      '10GB storage',
      'Basic analytics',
      'Community support',
      'API access (1k calls/mo)',
    ],
    cta: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_placeholder',
    description: 'For professionals and growing teams',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'Custom domains',
      'API access (100k calls/mo)',
      'Webhooks',
    ],
    highlighted: true,
    cta: 'Start Pro Trial',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_placeholder',
    description: 'For large organizations with advanced needs',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'White-labeling',
      'Dedicated support',
      'SLA guarantee (99.9%)',
      'Custom integrations',
      'SSO / SAML',
      'Audit logs',
    ],
    cta: 'Contact Sales',
  },
]
