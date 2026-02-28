'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Settings,
  CreditCard,
  Shield,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
  badge?: string
}

const navItems: NavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/billing', icon: CreditCard, label: 'Billing' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside className={cn('flex h-full flex-col border-r bg-card/50', className)}>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Sparkles className="h-5 w-5 text-violet-500" />
          SaaSKit
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive
                  ? 'bg-violet-500/10 text-violet-500'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
              {item.badge && (
                <span className="ml-auto rounded-full bg-secondary px-1.5 py-0.5 text-xs font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-3">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <Shield className="h-4 w-4" />
          Admin
        </Link>
      </div>
    </aside>
  )
}
