import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const rawNext = url.searchParams.get('next') ?? '/dashboard'

  // Sanitize the redirect target: only allow relative paths starting with a
  // single slash (blocks open-redirect attacks like `?next=//evil.com`).
  const safeNext =
    rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(new URL(safeNext, url.origin))
    }
  }

  return NextResponse.redirect(new URL('/login?error=auth_callback_failed', url.origin))
}
