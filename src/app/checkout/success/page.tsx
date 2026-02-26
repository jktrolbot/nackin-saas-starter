import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, ArrowRight, LayoutDashboard, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Payment Successful' }

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white text-lg">
              🎉
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">Payment successful!</h1>
          <p className="mt-3 text-muted-foreground">
            Welcome to the Pro plan. Your account has been upgraded and you now have access to all features.
          </p>
        </div>

        <Card className="border-green-500/20 bg-green-500/5 text-left">
          <CardContent className="pt-6 space-y-3">
            <h3 className="font-semibold">What&apos;s next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Check your email for your receipt
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Your API limits have been increased
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Priority support is now available
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Custom domains are enabled
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/dashboard">
            <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto">
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <BookOpen className="h-4 w-4" />
              Read the Docs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
