import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Point Turbopack root to this project (avoids multi-lockfile warning)
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Strict mode for better React dev experience
  reactStrictMode: true,

  // Optimize images
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
