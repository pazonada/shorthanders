-- Shorthanders MVP — Supabase schema (Phase 1: claims, Stripe, invoices, messaging)
--
-- Design: the 5,705 UNCLAIMED CSR records stay static in csr_profiles.js. This
-- database only holds rows that are actually created by users — claimed profiles,
-- their Stripe accounts, invoices, and messages. Run this in the Supabase SQL editor.

create extension if not exists pgcrypto;

-- ─── Reporters (a claimed / enriched profile, keyed by CSR license) ──────────
create table if not exists reporters (
  id                 uuid primary key default gen_random_uuid(),
  csr_license        text unique not null,          -- matches csr_profiles.js csrNumber
  auth_user_id       uuid references auth.users on delete set null,
  name               text,
  city               text,
  county             text,
  email              text,
  -- enriched profile
  bio                text,
  years_exp          int,
  rate               text,
  rush               boolean default false,
  work_types         text[] default '{}',
  specialties        text[] default '{}',
  languages          text[] default '{}',
  coverage           text[] default '{}',
  certifications     text[] default '{}',
  -- Stripe Connect
  stripe_account_id  text unique,
  charges_enabled    boolean default false,
  payouts_enabled    boolean default false,
  details_submitted  boolean default false,
  claimed_at         timestamptz default now(),
  updated_at         timestamptz default now()
);

-- ─── Firms (a firm/buyer account) ───────────────────────────────────────────
create table if not exists firms (
  id                  uuid primary key default gen_random_uuid(),
  auth_user_id        uuid references auth.users on delete cascade,
  name                text,
  subscription_status text default 'inactive',      -- inactive | active | past_due
  stripe_customer_id  text,
  created_at          timestamptz default now()
);

-- ─── Invoices (reporter -> firm) ────────────────────────────────────────────
create table if not exists invoices (
  id                     text primary key,           -- e.g. INV-1045
  reporter_id            uuid references reporters on delete cascade,
  client                 text,
  matter                 text,
  description            text,
  amount_cents           int not null,
  currency               text default 'usd',
  status                 text default 'draft',        -- draft | sent | paid | overdue
  service_date           date,
  due_date               date,
  stripe_payment_link_id text,
  stripe_payment_link_url text,
  paid_at                timestamptz,
  created_at             timestamptz default now()
);

-- ─── Messaging (text + pass-through links only; no file storage) ────────────
create table if not exists conversations (
  id           uuid primary key default gen_random_uuid(),
  firm_id      uuid references firms on delete cascade,
  reporter_id  uuid references reporters on delete cascade,
  created_at   timestamptz default now(),
  unique (firm_id, reporter_id)
);

create table if not exists messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid references conversations on delete cascade,
  sender           text not null,                    -- 'firm' | 'reporter'
  body             text,
  link_url         text,
  link_label       text,
  created_at       timestamptz default now()
);

-- ─── Firm's saved reporters ─────────────────────────────────────────────────
create table if not exists saved_reporters (
  firm_id      uuid references firms on delete cascade,
  csr_license  text not null,
  created_at   timestamptz default now(),
  primary key (firm_id, csr_license)
);

-- ─── Row Level Security ─────────────────────────────────────────────────────
-- The serverless functions use the SERVICE ROLE key, which bypasses RLS. These
-- policies govern the (Phase 2) browser client using the anon key + user auth.
alter table reporters      enable row level security;
alter table firms          enable row level security;
alter table invoices       enable row level security;
alter table conversations  enable row level security;
alter table messages       enable row level security;
alter table saved_reporters enable row level security;

-- Claimed profiles are public — anyone can read them for the directory.
create policy "reporters are publicly readable" on reporters for select using (true);
-- A reporter can update only their own row.
create policy "reporters update own" on reporters for update
  using (auth_user_id = auth.uid());

-- A firm can see/manage only its own row.
create policy "firms manage own" on firms for all
  using (auth_user_id = auth.uid()) with check (auth_user_id = auth.uid());

-- A reporter can read invoices they issued.
create policy "reporters read own invoices" on invoices for select
  using (reporter_id in (select id from reporters where auth_user_id = auth.uid()));

-- Conversation participants can read their messages.
create policy "participants read conversations" on conversations for select
  using (
    firm_id in (select id from firms where auth_user_id = auth.uid())
    or reporter_id in (select id from reporters where auth_user_id = auth.uid())
  );
create policy "participants read messages" on messages for select
  using (conversation_id in (
    select id from conversations where
      firm_id in (select id from firms where auth_user_id = auth.uid())
      or reporter_id in (select id from reporters where auth_user_id = auth.uid())
  ));

-- A firm manages only its own saved reporters.
create policy "firms manage saved" on saved_reporters for all
  using (firm_id in (select id from firms where auth_user_id = auth.uid()))
  with check (firm_id in (select id from firms where auth_user_id = auth.uid()));

-- helpful indexes
create index if not exists idx_invoices_reporter on invoices(reporter_id);
create index if not exists idx_messages_convo on messages(conversation_id);
create index if not exists idx_reporters_stripe on reporters(stripe_account_id);
