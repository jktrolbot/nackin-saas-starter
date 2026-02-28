import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type Stripe from 'stripe'

// Supabase Admin client (service role)
async function getAdminClient() {
  const { createClient } = await import('@supabase/supabase-js')
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await getAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id
      const planId = session.metadata?.plan_id

      if (userId && planId) {
        await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan: planId,
          status: 'active',
        }, { onConflict: 'user_id' })
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription & {
        // Field exists at runtime but was removed from types in newer API versions
        current_period_end?: number
      }
      const updateData: Record<string, string> = { status: sub.status }
      if (sub.current_period_end) {
        updateData.current_period_end = new Date(sub.current_period_end * 1000).toISOString()
      } else if (sub.billing_cycle_anchor) {
        // Fallback: use billing_cycle_anchor as period reference
        updateData.current_period_end = new Date(sub.billing_cycle_anchor * 1000).toISOString()
      }
      await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('stripe_subscription_id', sub.id)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('subscriptions')
        .update({ plan: 'free', status: 'canceled' })
        .eq('stripe_subscription_id', sub.id)
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
