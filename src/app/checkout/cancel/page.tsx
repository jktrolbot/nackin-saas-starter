import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Checkout Canceled' }

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <XCircle className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">No worries!</h1>
          <p className="mt-3 text-muted-foreground">
            Your checkout was canceled and you haven&apos;t been charged. Your free plan is still active.
          </p>
        </div>

        <Card className="text-left border-border/50">
          <CardContent className="pt-6 space-y-3">
            <h3 className="font-semibold">Still interested? Here&apos;s what you&apos;re missing:</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>• Unlimited projects (vs 5 on Free)</li>
              <li>• 100GB storage (vs 10GB on Free)</li>
              <li>• Priority support response &lt; 4h</li>
              <li>• Custom domains and API access (100k calls/mo)</li>
            </ul>
            <p className="text-xs text-muted-foreground pt-2">
              14-day free trial · No credit card required · Cancel anytime
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/pricing">
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto">
              See Pricing Again
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          Questions?{' '}
          <Link href="mailto:support@saaskit.app" className="text-violet-500 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
