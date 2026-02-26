import Link from 'next/link'
import { PLANS } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Sparkles } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing. Start free, upgrade when ready.',
}

const comparison = [
  { feature: 'Projects', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Storage', free: '10 GB', pro: '100 GB', enterprise: 'Unlimited' },
  { feature: 'API calls / month', free: '1,000', pro: '100,000', enterprise: 'Unlimited' },
  { feature: 'Team members', free: '1', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Custom domains', free: false, pro: true, enterprise: true },
  { feature: 'Analytics', free: 'Basic', pro: 'Advanced', enterprise: 'Advanced + Export' },
  { feature: 'Priority support', free: false, pro: true, enterprise: true },
  { feature: 'SLA', free: false, pro: false, enterprise: true },
  { feature: 'White-labeling', free: false, pro: false, enterprise: true },
  { feature: 'SSO / SAML', free: false, pro: false, enterprise: true },
  { feature: 'Audit logs', free: false, pro: false, enterprise: true },
]

const faqs = [
  { q: 'Can I change plans at any time?', a: 'Yes! You can upgrade, downgrade, or cancel your plan at any time from the billing settings. Changes take effect immediately.' },
  { q: 'What happens when I hit my API limit?', a: 'You\'ll receive an email warning at 80% usage. At 100%, API calls are rate-limited. Upgrade at any time to increase your limits.' },
  { q: 'Do you offer a free trial?', a: 'The Free plan is free forever. Pro and Enterprise plans come with a 14-day free trial — no credit card required.' },
  { q: 'Is there a setup fee?', a: 'No setup fees, ever. You only pay the monthly or annual subscription price.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex) and bank transfers for Enterprise plans.' },
]

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value
      ? <Check className="h-4 w-4 text-violet-500 mx-auto" />
      : <X className="h-4 w-4 text-muted-foreground mx-auto" />
  }
  return <span className="text-sm text-center block">{value}</span>
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5 text-violet-500" />
            SaaSKit
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link href="/signup">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl font-bold sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. No credit card required. Upgrade when you&apos;re ready to scale.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-20">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col ${plan.highlighted ? 'border-violet-500 shadow-xl shadow-violet-500/10' : 'border-border/50'}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-violet-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-violet-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.id === 'free' ? '/signup' : `/checkout?plan=${plan.id}`}>
                  <Button
                    className={`w-full ${plan.highlighted ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison table */}
        <div className="max-w-5xl mx-auto mb-20">
          <h2 className="text-2xl font-bold text-center mb-8">Full comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground w-1/2">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="p-4 text-sm font-semibold text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-muted/20' : ''}>
                    <td className="p-4 text-sm">{row.feature}</td>
                    <td className="p-4"><Cell value={row.free} /></td>
                    <td className="p-4"><Cell value={row.pro} /></td>
                    <td className="p-4"><Cell value={row.enterprise} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b pb-6">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
