# 🚀 SaaS Starter Kit

> **Launch your SaaS in days, not months.**

Production-ready Next.js 15 + Supabase + Stripe boilerplate. Auth, billing, dashboard, admin — all wired up.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=flat-square)](https://nackin-saas-starter.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> ⚠️ **Demo Version** — Based on a production system built for a real client. Sensitive data and proprietary business logic have been removed.

---

![App Screenshot](./public/screenshot.png)

---

## ✨ What's Included

| Feature | Status |
|---------|--------|
| 🔐 Auth (email/password + Google OAuth) | ✅ |
| 💳 Stripe Billing (3 tiers) | ✅ |
| 📊 Dashboard with sidebar nav | ✅ |
| 🏢 Multi-tenant architecture | ✅ |
| 👑 Admin panel | ✅ |
| 🌙 Dark mode | ✅ |
| 📱 Mobile-first responsive | ✅ |
| 🔒 Row-level security (Supabase) | ✅ |
| ⚡ Rate limiting | ✅ |
| 🔔 Toast notifications | ✅ |
| 🎨 shadcn/ui components | ✅ |
| 🔍 SEO metadata | ✅ |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Auth + DB** | Supabase |
| **Billing** | Stripe |
| **State** | Zustand + React Query |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/nackin-io/nackin-saas-starter.git my-saas
cd my-saas
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 3. Supabase Setup

```bash
# Run in the Supabase SQL Editor:
cat src/lib/database.sql
```

Enable Google OAuth in Supabase Auth → Providers.

### 4. Stripe Setup

1. Create two products: **Pro** ($29/mo) and **Enterprise** ($99/mo)
2. Copy Price IDs to `.env.local`
3. `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### 5. Run

```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, signup, OAuth callback
│   ├── (dashboard)/         # Dashboard, settings, billing
│   ├── (admin)/             # Admin panel
│   ├── api/                 # API routes (stripe, projects, auth)
│   ├── pricing/             # Pricing page
│   └── page.tsx             # Landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard/           # Sidebar, user menu
│   └── landing/             # Navbar, pricing card
├── lib/
│   ├── supabase/            # Client + server Supabase clients
│   ├── stripe.ts            # Stripe client + plans
│   ├── rate-limit.ts        # In-memory rate limiter
│   └── database.sql         # DB schema + RLS policies
└── types/
```

---

## 💳 Pricing Plans

| | Free | Pro ($29/mo) | Enterprise ($99/mo) |
|-|------|-------------|---------------------|
| Projects | 5 | Unlimited | Unlimited |
| Storage | 10 GB | 100 GB | Unlimited |
| API calls/mo | 1k | 100k | Unlimited |
| Custom domains | ❌ | ✅ | ✅ |
| Priority support | ❌ | ✅ | ✅ |
| SLA | ❌ | ❌ | ✅ |
| White-labeling | ❌ | ❌ | ✅ |
| SSO / SAML | ❌ | ❌ | ✅ |

---

## 🛡 Security

- Supabase Row-Level Security on all tables
- Auth protected via Next.js middleware
- Rate limiting on all API routes
- Input validation with Zod
- Server-side user verification on every route

---

## 📖 API Reference

```
GET/POST   /api/projects          # List / create projects
GET/PUT/DELETE /api/projects/:id  # Individual project ops
GET        /api/auth              # Current user + profile
POST       /api/stripe/checkout   # Create checkout session
POST       /api/stripe/webhook    # Stripe webhook handler
POST       /api/stripe/portal     # Customer portal session
```

---

## 📄 License

MIT — free for personal and commercial use.

---

> Built by [**Nackin**](https://nackin.io) — AI Engineering & Full-Stack Development Studio
