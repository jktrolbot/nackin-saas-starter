import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { TrendingUp, Users, DollarSign, TrendingDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin — SaaSKit' }

const mockUsers = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@dataflow.com', plan: 'pro', status: 'active', joined: 'Jan 15, 2026', avatar: 'SC' },
  { id: '2', name: 'Marcus Rodriguez', email: 'marcus@shipfast.io', plan: 'enterprise', status: 'active', joined: 'Dec 3, 2025', avatar: 'MR' },
  { id: '3', name: 'Aisha Patel', email: 'aisha@patellabs.com', plan: 'pro', status: 'active', joined: 'Feb 1, 2026', avatar: 'AP' },
  { id: '4', name: 'Tom Walker', email: 'tom@example.com', plan: 'free', status: 'active', joined: 'Feb 20, 2026', avatar: 'TW' },
  { id: '5', name: 'Lisa Kim', email: 'lisa@techco.com', plan: 'pro', status: 'canceled', joined: 'Nov 10, 2025', avatar: 'LK' },
]

const stats = [
  { label: 'Total Users', value: '2,481', change: '+12% this month', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: 'up' },
  { label: 'Monthly Revenue', value: '$18,430', change: '+8.2% vs last month', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10', trend: 'up' },
  { label: 'Active Subscriptions', value: '847', change: '34% of total users', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-500/10', trend: 'up' },
  { label: 'Churn Rate', value: '3.2%', change: '-0.5% vs last month', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-500/10', trend: 'down' },
]

const planDistribution = [
  { plan: 'Free', count: 1634, total: 2481, color: 'bg-muted' },
  { plan: 'Pro', count: 723, total: 2481, color: 'bg-violet-500' },
  { plan: 'Enterprise', count: 124, total: 2481, color: 'bg-indigo-500' },
]

const planBadgeVariant = (plan: string): 'default' | 'secondary' | 'outline' => {
  if (plan === 'enterprise') return 'default'
  if (plan === 'pro') return 'secondary'
  return 'outline'
}

export default function AdminPage() {
  return (
    <div className="max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Platform overview and user management.
        </p>
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
                <Badge
                  variant="outline"
                  className={`text-xs ${stat.trend === 'up' ? 'text-green-500 border-green-500/30' : 'text-red-500 border-red-500/30'}`}
                >
                  {stat.trend === 'up' ? '↑' : '↓'}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.change}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Plan distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Plan Distribution</CardTitle>
            <CardDescription>Users per subscription tier</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {planDistribution.map((item) => (
              <div key={item.plan} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.plan}</span>
                  <span className="text-muted-foreground">
                    {item.count.toLocaleString()} ({Math.round((item.count / item.total) * 100)}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* MRR breakdown */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-base">Revenue Breakdown</CardTitle>
            <CardDescription>Monthly recurring revenue by plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { plan: 'Pro', users: 723, mrr: 20967, color: 'bg-violet-500' },
              { plan: 'Enterprise', users: 124, mrr: 12276, color: 'bg-indigo-500' },
            ].map((item) => (
              <div key={item.plan} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span>{item.plan}</span>
                    <span className="text-muted-foreground">({item.users} users)</span>
                  </div>
                  <span className="font-medium">${item.mrr.toLocaleString()}/mo</span>
                </div>
                <Progress value={(item.mrr / 35000) * 100} className="h-2" />
              </div>
            ))}
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm font-medium">
                <span>Total MRR</span>
                <span className="text-green-500">$33,243 / mo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users table */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Users</CardTitle>
            <CardDescription>Latest signups and their subscription status</CardDescription>
          </div>
          <Button variant="outline" size="sm">Export CSV</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-violet-500/10 text-violet-500 text-xs">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={planBadgeVariant(user.plan)} className="capitalize text-xs">
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs capitalize ${
                        user.status === 'active' ? 'text-green-500 border-green-500/30' : 'text-muted-foreground'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Plan</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500">Suspend User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
