-- ================================================
-- SaaS Starter Kit — Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ================================================

-- Organizations (multi-tenant)
CREATE TABLE IF NOT EXISTS public.organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  org_id      UUID REFERENCES public.organizations(id),
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id                 UUID REFERENCES public.organizations(id),
  user_id                UUID REFERENCES public.profiles(id),
  stripe_customer_id     TEXT,
  stripe_subscription_id TEXT,
  plan                   TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  status                 TEXT DEFAULT 'active',
  current_period_end     TIMESTAMPTZ,
  created_at             TIMESTAMPTZ DEFAULT now()
);

-- Projects (main resource)
CREATE TABLE IF NOT EXISTS public.projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID REFERENCES public.organizations(id),
  user_id     UUID REFERENCES public.profiles(id),
  name        TEXT NOT NULL,
  description TEXT,
  status      TEXT DEFAULT 'active',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Usage tracking
CREATE TABLE IF NOT EXISTS public.usage (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id     UUID REFERENCES public.organizations(id),
  user_id    UUID REFERENCES public.profiles(id),
  event      TEXT NOT NULL,
  metadata   JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── Row-Level Security ────────────────────────

ALTER TABLE public.profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage         ENABLE ROW LEVEL SECURITY;

-- Profiles: users see their own
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Projects: users see their org's projects
CREATE POLICY "projects_org" ON public.projects
  FOR ALL USING (
    org_id IN (SELECT org_id FROM public.profiles WHERE id = auth.uid())
  );

-- Subscriptions: users see their own
CREATE POLICY "subscriptions_own" ON public.subscriptions
  FOR ALL USING (user_id = auth.uid());

-- ── Triggers ─────────────────────────────────

-- Auto-create profile + org on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id UUID;
BEGIN
  INSERT INTO public.organizations (name, slug)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'My Organization'),
    lower(regexp_replace(COALESCE(NEW.raw_user_meta_data->>'full_name', 'org-' || gen_random_uuid()::text), '[^a-z0-9]', '-', 'g'))
  )
  RETURNING id INTO new_org_id;

  INSERT INTO public.profiles (id, org_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    new_org_id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
