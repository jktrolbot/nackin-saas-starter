import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { UserMenu } from '@/components/dashboard/user-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, role')
    .eq('id', user.id)
    .single()

  // In production, check role === 'admin'
  // if (profile?.role !== 'admin') redirect('/dashboard')

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden w-64 flex-shrink-0 lg:flex lg:flex-col">
        <Sidebar className="h-full" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Main navigation menu</SheetDescription>
                </SheetHeader>
                <Sidebar className="h-full rounded-none border-0" />
              </SheetContent>
            </Sheet>
            <div className="text-xs font-medium bg-red-500/10 text-red-500 px-2 py-1 rounded">
              Admin Panel
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu
              email={user.email}
              name={profile?.full_name || undefined}
              avatar={profile?.avatar_url || undefined}
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
