import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SaaS Starter Kit — Launch in days, not months',
    template: '%s | SaaS Starter Kit',
  },
  description:
    'Production-ready Next.js 15 + Supabase + Stripe boilerplate. Auth, billing, dashboard, admin — all wired up. Ship your SaaS fast.',
  keywords: ['SaaS', 'Next.js', 'Supabase', 'Stripe', 'boilerplate', 'starter kit'],
  authors: [{ name: 'Nackin', url: 'https://github.com/jktrolbot' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'SaaS Starter Kit',
    title: 'SaaS Starter Kit — Launch in days, not months',
    description: 'Production-ready Next.js 15 boilerplate with auth, billing & dashboard.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Starter Kit',
    description: 'Launch your SaaS in days, not months.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
