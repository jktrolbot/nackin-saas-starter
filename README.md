# 🚀 SaaS Starter Kit

> **Launch your SaaS in days, not months.**

Production-ready Next.js 15 + Supabase + Stripe boilerplate. Every SaaS needs auth, billing, a dashboard, and an admin panel — they're all here, wired up and ready to go.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jktrolbot/nackin-saas-starter)
[![GitHub Stars](https://img.shields.io/github/stars/jktrolbot/nackin-saas-starter?style=flat)](https://github.com/jktrolbot/nackin-saas-starter/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
| 📧 Email transactional (mock) | ✅ |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Components** | shadcn/ui |
| **Auth + DB** | Supabase |
| **Billing** | Stripe |
| **State** | Zustand + React Query |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/jktrolbot/nackin-saas-starter.git my-saas
cd my-saas
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in your values (see [Environment Variables](#environment-variables) below).

### 3. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run the database schema:
   ```bash
   # In the Supabase SQL Editor, run:
   cat src/lib/database.sql
   ```
4. Enable Google OAuth in Supabase Auth → Providers

### 4. Set Up Stripe

1. Get API keys from [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create two products in Stripe Dashboard:
   - **Pro** — $29/month
   - **Enterprise** — $99/month
3. Copy the Price IDs to your `.env.local`
4. Set up webhook: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### 5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Login, signup, OAuth callback
│   ├── (dashboard)/         # Dashboard, settings, billing
│   ├── (admin)/             # Admin panel
│   ├── api/                 # API routes
│   │   ├── stripe/          # Checkout, webhook, portal
│   │   ├── projects/        # CRUD API
│   │   └── auth/            # Current user
│   ├── pricing/             # Pricing page
│   ├── checkout/            # Checkout + success/cancel
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
└── types/                   # TypeScript types
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

## 🌍 Environment Variables

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

---

## 🚢 Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or use the one-click button at the top ☝️

Don't forget to add all environment variables in Vercel's dashboard!

---

## 📖 API Reference

### Projects

```
GET    /api/projects          # List user's projects
POST   /api/projects          # Create a project
GET    /api/projects/:id      # Get a project
PUT    /api/projects/:id      # Update a project
DELETE /api/projects/:id      # Delete a project
```

### Auth

```
GET    /api/auth              # Get current user + profile
```

### Stripe

```
POST   /api/stripe/checkout   # Create checkout session
POST   /api/stripe/webhook    # Stripe webhook handler
POST   /api/stripe/portal     # Create customer portal session
```

---

## 🛡 Security

- Supabase Row-Level Security on all tables
- Auth protected via Next.js middleware
- Rate limiting on all API routes
- Input validation with Zod
- Server-side user verification on every route

---

## 🧩 Customization

**Add a new plan:** Edit `src/lib/stripe.ts` → `PLANS` array  
**Add a nav item:** Edit `src/components/dashboard/sidebar.tsx`  
**Change colors:** Edit `src/app/globals.css` CSS variables  
**Add a new page:** Create in `src/app/(dashboard)/your-page/page.tsx`

---

## 📄 License

MIT — free for personal and commercial use.

---

Built with ❤️ by **[Nackin](https://www.upwork.com/freelancers/~nackin)** — Full-stack SaaS developer.  
*Need a custom SaaS built? [Let's talk](https://www.upwork.com/freelancers/~nackin).*
