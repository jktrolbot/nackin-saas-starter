'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { PLANS } from '@/lib/stripe'
import { Loader2, Check, Lock, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planId = searchParams.get('plan') || 'pro'
  const plan = PLANS.find((p) => p.id === planId) || PLANS[1]
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error(data.error || 'Failed to create checkout session')
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg space-y-6">
        <div>
          <Link href="/pricing" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to pricing
          </Link>
          <h1 className="text-2xl font-bold">Complete your order</h1>
          <p className="text-muted-foreground text-sm mt-1">
            You&apos;re upgrading to the {plan.name} plan.
          </p>
        </div>

        <Card className="border-violet-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">{plan.name} Plan</CardTitle>
              {plan.highlighted && <Badge className="bg-violet-500 text-white">Most Popular</Badge>}
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-violet-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-medium">Total today</span>
              <div className="text-right">
                <span className="text-2xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              You&apos;ll be billed ${plan.price} every month. Cancel anytime.
            </p>
          </CardContent>
        </Card>

        <Button
          className="w-full bg-violet-600 hover:bg-violet-700 text-white gap-2 h-12 text-base"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Proceed to Secure Checkout
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Secured by Stripe
          </div>
          <div>•</div>
          <div>Cancel anytime</div>
          <div>•</div>
          <div>14-day money back</div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-violet-500" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
