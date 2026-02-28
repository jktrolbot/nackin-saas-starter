import Link from 'next/link'
import { Sparkles } from 'lucide-react'

// Force dynamic rendering so auth pages are never statically prerendered at
// build time. This prevents the Supabase client from throwing when NEXT_PUBLIC_*
// env vars are absent during `next build`.
export const dynamic = 'force-dynamic'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5" />
      <div className="absolute -top-40 -right-32 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-5 w-5 text-violet-500" />
            SaaSKit
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
