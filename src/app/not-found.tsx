import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '404 — Page Not Found' }

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />
      <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-12">
        <Sparkles className="h-5 w-5 text-violet-500" />
        SaaSKit
      </Link>

      <p className="text-sm font-medium text-violet-500 uppercase tracking-wider mb-4">404</p>
      <h1 className="text-4xl font-bold sm:text-5xl mb-4">Page not found</h1>
      <p className="text-muted-foreground max-w-sm mb-10">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or deleted.
      </p>

      <div className="flex gap-3">
        <Link href="/">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">Go home</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline">Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
