import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PLANS } from '@/lib/stripe'
import {
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
  Code2,
  Check,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built on Next.js 15 with App Router. Edge-ready, optimized, and blazingly fast out of the box.',
  },
  {
    icon: Shield,
    title: 'Auth Built In',
    description: 'Supabase Auth with email/password and Google OAuth. Row-level security keeps your data safe.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track MRR, churn, active users, and API usage. Everything you need to grow your SaaS.',
  },
  {
    icon: Users,
    title: 'Multi-Tenant Ready',
    description: 'Organization model baked in from day one. Scale from solo to enterprise without refactoring.',
  },
  {
    icon: Globe,
    title: 'Global & Responsive',
    description: 'Mobile-first design that looks great on any device. Dark mode included.',
  },
  {
    icon: Code2,
    title: 'TypeScript First',
    description: 'Fully typed end-to-end. Catch bugs at compile time, not in production.',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'DataFlow',
    avatar: 'SC',
    text: 'We went from idea to paying customers in 2 weeks. This starter kit handled all the boring infrastructure so we could focus on our product.',
    stars: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO',
    company: 'ShipFast',
    avatar: 'MR',
    text: 'The Stripe integration alone saved us 3 days of work. The code is clean, typed, and production-ready. Highly recommend.',
    stars: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Indie Hacker',
    company: 'Patel Labs',
    avatar: 'AP',
    text: 'Finally, a boilerplate that doesn\'t feel like a boilerplate. The design is beautiful and the DX is exceptional.',
    stars: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5 text-violet-500" />
            SaaSKit
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />
        <div className="absolute -top-40 -right-32 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-6 border-violet-500/30 text-violet-500">
            🚀 Production-ready from day one
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Launch your SaaS in{' '}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              days, not months
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Everything you need to ship a production SaaS — auth, billing, dashboard, admin panel, and more. Built with Next.js 15, Supabase, and Stripe.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8">
                Start Building Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="https://github.com/nackin-io/nackin-saas-starter" target="_blank">
              <Button size="lg" variant="outline" className="gap-2 px-8">
                <Code2 className="h-4 w-4" />
                View Source
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2">5.0 rating</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <span>500+ developers using it</span>
            <div className="h-4 w-px bg-border" />
            <span>Ship in &lt; 2 weeks</span>
          </div>

          {/* Hero visual */}
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-muted-foreground">dashboard.saaskit.app</span>
            </div>
            <div className="grid grid-cols-4 gap-4 p-6">
              <div className="col-span-1 space-y-2">
                <div className="h-8 rounded bg-violet-500/10" />
                <div className="h-6 rounded bg-muted" />
                <div className="h-6 rounded bg-muted" />
                <div className="h-6 rounded bg-muted" />
                <div className="h-6 rounded bg-muted" />
              </div>
              <div className="col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {['Total Revenue', 'Active Users', 'MRR Growth'].map((label) => (
                    <div key={label} className="rounded-lg border bg-muted/30 p-3">
                      <div className="text-xs text-muted-foreground">{label}</div>
                      <div className="mt-1 h-5 rounded bg-violet-500/20" />
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-lg border bg-muted/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="mt-4 text-muted-foreground">
              We&apos;ve made every hard decision so you don&apos;t have to.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group border-border/50 transition-all hover:border-violet-500/50 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 transition-colors group-hover:bg-violet-500/20">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-muted-foreground">
              Start free. Upgrade when you&apos;re ready.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.highlighted
                    ? 'border-violet-500 shadow-lg shadow-violet-500/10'
                    : 'border-border/50'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge className="bg-violet-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    {plan.price > 0 && <span className="text-muted-foreground">/mo</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-4">
                  <ul className="space-y-2 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 flex-shrink-0 text-violet-500" />
                        {feature}
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold sm:text-4xl">Loved by builders</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.role} @ {t.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-violet-500/10 via-transparent to-indigo-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-5xl">
            Ready to ship your SaaS?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join 500+ developers who stopped reinventing the wheel.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 bg-violet-600 hover:bg-violet-700 text-white px-10 text-base">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Free plan forever.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold">
                <Sparkles className="h-4 w-4 text-violet-500" />
                SaaSKit
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                The fastest way to ship a production SaaS.
              </p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Resources', links: ['Documentation', 'Blog', 'GitHub', 'Support'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold">{col.title}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SaaSKit. Built with ❤️ by{' '}
            <Link href="https://nackin.io" className="hover:text-foreground transition-colors">
              Nackin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
