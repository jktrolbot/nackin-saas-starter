export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  role: 'user' | 'admin'
  org_id: string
  created_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Subscription {
  id: string
  org_id: string
  user_id: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_end?: string
  created_at: string
}

export interface Project {
  id: string
  org_id: string
  user_id: string
  name: string
  description?: string
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

export interface UsageRecord {
  id: string
  org_id: string
  user_id: string
  event: string
  metadata?: Record<string, unknown>
  created_at: string
}

export interface ApiError {
  message: string
  status?: number
}

export type PlanId = 'free' | 'pro' | 'enterprise'
