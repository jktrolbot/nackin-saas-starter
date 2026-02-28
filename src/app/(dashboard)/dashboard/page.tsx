import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import {
  FolderPlus,
  TrendingUp,
  Users,
  Zap,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

const mockActivity = [
  { icon: CheckCircle2, text: 'Project "API Gateway" deployed successfully', time: '2m ago', color: 'text-green-500' },
  { icon: Users, text: 'New team member Sarah joined', time: '1h ago', color: 'text-blue-500' },
  { icon: AlertCircle, text: 'Rate limit warning on /api/projects', time: '3h ago', color: 'text-yellow-500' },
  { icon: CheckCircle2, text: 'Stripe webhook processed — invoice paid', time: '5h ago', color: 'text-green-500' },
  { icon: Clock, text: 'Scheduled backup completed', time: '1d ago', color: 'text-muted-foreground' },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from('profiles')
        .select('full_name, org_id')
        .eq('id', user.id)
        .single()
    : { data: null }

  // Mock stats (would come from DB in production)
  const stats = [
    { label: 'Total Projects', value: '12', change: '+2 this month', icon: FolderPlus, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: 'Monthly Revenue', value: '$2,840', change: '+12.5%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Active Users', value: '148', change: '+23 this week', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'API Calls', value: '84.2k', change: '68% of limit', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ]

  const name = profile?.full_name?.split(' ')[0] || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{greeting}, {name} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s what&apos;s happening with your SaaS today.
          </p>
        </div>
        <Link href="/projects/new">
          <Button className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
            <FolderPlus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-green-500 mt-1">{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Usage */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Usage Overview</CardTitle>
            <CardDescription>Current billing period</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'API Calls', used: 84200, limit: 100000, unit: 'calls' },
              { label: 'Storage', used: 45, limit: 100, unit: 'GB' },
              { label: 'Projects', used: 12, limit: 20, unit: 'projects' },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="text-muted-foreground">
                    {item.used.toLocaleString()} / {item.limit.toLocaleString()} {item.unit}
                  </span>
                </div>
                <Progress value={(item.used / item.limit) * 100} className="h-2" />
              </div>
            ))}
            <Link href="/billing">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Upgrade Plan
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <CardDescription>Latest events in your account</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockActivity.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${item.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects/new">
              <Button variant="outline" size="sm" className="gap-2">
                <FolderPlus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
            <Link href="/billing">
              <Button variant="outline" size="sm" className="gap-2">
                Upgrade Plan
                <Badge variant="secondary" className="ml-1">Pro</Badge>
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="sm">
                Team Settings
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              View API Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
