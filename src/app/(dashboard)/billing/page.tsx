import { createClient } from '@/lib/supabase/server'
import { PLANS } from '@/lib/stripe'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Billing' }

const mockInvoices = [
  { id: 'INV-001', date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  { id: 'INV-002', date: 'Jan 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  { id: 'INV-003', date: 'Dec 1, 2025', amount: '$0.00', status: 'Free', plan: 'Free' },
]

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status, current_period_end')
    .eq('user_id', user!.id)
    .single()

  const currentPlan = subscription?.plan || 'free'

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your subscription and payment details.</p>
      </div>

      {/* Current plan */}
      <Card className="border-violet-500/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your active subscription</CardDescription>
          </div>
          <Badge variant="secondary" className="capitalize text-sm px-3 py-1">
            {currentPlan}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {currentPlan === 'free'
                  ? 'Free plan — upgrade to unlock more features'
                  : `Next billing date: ${subscription?.current_period_end ? new Date(subscription.current_period_end).toLocaleDateString() : 'N/A'}`}
              </p>
            </div>
            {currentPlan !== 'free' && (
              <form action="/api/stripe/portal" method="POST">
                <Button variant="outline" size="sm" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Manage Subscription
                </Button>
              </form>
            )}
          </div>

          {/* Usage */}
          <div className="space-y-3 pt-2">
            {[
              { label: 'API Calls', used: 84200, limit: currentPlan === 'free' ? 10000 : 100000 },
              { label: 'Storage', used: 45, limit: currentPlan === 'free' ? 10 : 100, suffix: 'GB' },
              { label: 'Projects', used: 12, limit: currentPlan === 'free' ? 5 : 999 },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.used.toLocaleString()} / {item.limit >= 999 ? '∞' : item.limit.toLocaleString()} {item.suffix || ''}
                  </span>
                </div>
                <Progress value={Math.min((item.used / item.limit) * 100, 100)} className="h-1.5" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan comparison */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {PLANS.map((plan) => {
            const isCurrent = plan.id === currentPlan
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${isCurrent ? 'border-violet-500' : 'border-border/50'}`}
              >
                {isCurrent && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-violet-500 text-white">Current Plan</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <div>
                    <span className="text-3xl font-bold">${plan.price}</span>
                    {plan.price > 0 && <span className="text-muted-foreground text-sm">/mo</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3">
                  <ul className="space-y-1.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-violet-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {isCurrent ? (
                    <Button variant="outline" disabled className="w-full text-xs">
                      Current Plan
                    </Button>
                  ) : (
                    <Link href={plan.id === 'free' ? '#' : `/checkout?plan=${plan.id}`}>
                      <Button
                        className={`w-full text-xs ${plan.highlighted ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''}`}
                        variant={plan.highlighted ? 'default' : 'outline'}
                      >
                        {plan.price > (PLANS.find((p) => p.id === currentPlan)?.price || 0) ? 'Upgrade' : 'Switch'} to {plan.name}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Invoice history */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
          <CardDescription>Your past invoices and payment receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium text-sm">{inv.id}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                  <TableCell className="text-sm">{inv.plan}</TableCell>
                  <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === 'Paid' ? 'secondary' : 'outline'} className="text-xs">
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                      <ExternalLink className="h-3 w-3" />
                      PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
