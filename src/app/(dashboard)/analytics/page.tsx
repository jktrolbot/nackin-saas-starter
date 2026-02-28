import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Analytics' }

const metrics = [
  {
    label: 'Page Views',
    value: '48,293',
    change: '+18.2%',
    trend: 'up',
    icon: BarChart3,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    label: 'Unique Visitors',
    value: '12,847',
    change: '+11.5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    label: 'Conversion Rate',
    value: '3.4%',
    change: '-0.3%',
    trend: 'down',
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    label: 'API Calls',
    value: '84.2k',
    change: '+24.1%',
    trend: 'up',
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
]

const topPages = [
  { path: '/dashboard', views: 14829, pct: 100 },
  { path: '/billing', views: 8293, pct: 56 },
  { path: '/settings', views: 6104, pct: 41 },
  { path: '/projects', views: 4821, pct: 32 },
  { path: '/admin', views: 2104, pct: 14 },
]

const topCountries = [
  { country: 'United States', users: 4823, pct: 100 },
  { country: 'United Kingdom', users: 2104, pct: 44 },
  { country: 'Germany', users: 1842, pct: 38 },
  { country: 'Canada', users: 1293, pct: 27 },
  { country: 'France', users: 984, pct: 20 },
]

export default function AnalyticsPage() {
  return (
    <div className="max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Last 30 days · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Badge variant="outline" className="text-violet-500 border-violet-500/30">
          Live
        </Badge>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${m.bg}`}>
                  <m.icon className={`h-5 w-5 ${m.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    m.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {m.trend === 'up' ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {m.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{m.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{m.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart placeholder */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Traffic Overview</CardTitle>
          <CardDescription>Page views over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Visual chart mock using CSS bars */}
          <div className="flex items-end gap-1 h-40">
            {Array.from({ length: 30 }).map((_, i) => {
              const height = 20 + Math.abs(Math.sin(i * 0.8) * 60 + Math.cos(i * 0.3) * 20)
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-violet-500/20 hover:bg-violet-500/40 transition-colors"
                  style={{ height: `${height}%` }}
                />
              )
            })}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>30 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top pages */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Top Pages</CardTitle>
            <CardDescription>Most visited pages this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPages.map((page) => (
              <div key={page.path} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-xs">{page.path}</span>
                  <span className="text-muted-foreground">{page.views.toLocaleString()}</span>
                </div>
                <Progress value={page.pct} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top countries */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Top Countries</CardTitle>
            <CardDescription>Users by country this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCountries.map((c) => (
              <div key={c.country} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span>{c.country}</span>
                  <span className="text-muted-foreground">{c.users.toLocaleString()}</span>
                </div>
                <Progress value={c.pct} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
