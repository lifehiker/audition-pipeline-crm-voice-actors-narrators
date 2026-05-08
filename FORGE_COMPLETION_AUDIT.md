# VoiceLog Completion Audit

Last updated: 2026-05-08

## Foundation
- App shell, global styling, metadata, and brand system
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `src/components/marketing/site-header.tsx`
  - `src/components/marketing/site-footer.tsx`
- Next.js standalone deployment configuration
  - `next.config.ts`
  - `Dockerfile`
  - `.dockerignore`
  - `.env.example`

## Data Model
- Auditions, subscriptions, auth tables, and analytics-supporting fields
  - `prisma/schema.prisma`
- Typed app/domain models and constants
  - `src/lib/types.ts`
  - `src/lib/constants.ts`
- Local-safe persistence fallback with seeded demo state
  - `src/lib/store.ts`
  - `src/lib/demo-data.ts`
- Prisma client helper for live database path
  - `src/lib/prisma.ts`

## Authentication
- Google OAuth-ready NextAuth v5 configuration
  - `src/lib/auth.ts`
  - `src/app/api/auth/[...nextauth]/route.ts`
- Safe demo auth fallback and protected app area
  - `src/app/signin/page.tsx`
  - `src/app/api/demo-login/route.ts`
  - `src/app/api/demo-logout/route.ts`
  - `src/app/app/layout.tsx`

## User-Facing Pages
- Marketing homepage `/`
  - `src/app/page.tsx`
  - `src/components/marketing/homepage.tsx`
- Dashboard `/app`
  - `src/app/app/page.tsx`
  - `src/components/dashboard.tsx`
  - `src/components/charts.tsx`
  - `src/lib/analytics.ts`
- Pipeline board `/app/pipeline`
  - `src/app/app/pipeline/page.tsx`
  - `src/components/pipeline-board.tsx`
- Account and billing `/app/account`
  - `src/app/app/account/page.tsx`
- Sign-in `/signin`
  - `src/app/signin/page.tsx`
- ACX SEO page `/acx-audition-tracker`
  - `src/app/acx-audition-tracker/page.tsx`
- Voice actor CRM SEO page `/voice-actor-crm`
  - `src/app/voice-actor-crm/page.tsx`
- Free calculator `/royalty-share-calculator`
  - `src/app/royalty-share-calculator/page.tsx`
  - `src/components/royalty-calculator.tsx`
- Blog page `/blog/acx-royalty-share-vs-flat-fee`
  - `src/app/blog/acx-royalty-share-vs-flat-fee/page.tsx`

## API / Server Workflows
- List/create auditions
  - `src/app/api/auditions/route.ts`
- Update/delete auditions
  - `src/app/api/auditions/[id]/route.ts`
- Pipeline status mutation
  - `src/app/api/auditions/[id]/status/route.ts`
- Billing checkout + portal
  - `src/app/api/billing/checkout/route.ts`
  - `src/app/api/billing/portal/route.ts`
  - `src/lib/billing.ts`
- CSV export with plan gating
  - `src/app/api/export/route.ts`
- Trial reminder email path
  - `src/app/api/internal/trial-reminders/route.ts`
  - `src/lib/email.ts`

## Core Workflows
- Add/edit/delete audition records with structured compensation fields
  - `src/components/pipeline-board.tsx`
  - `src/app/api/auditions/route.ts`
  - `src/app/api/auditions/[id]/route.ts`
- Move auditions through Submitted / Callback / Offered / Booked / Passed
  - `src/components/pipeline-board.tsx`
  - `src/app/api/auditions/[id]/status/route.ts`
- Dashboard KPIs, platform mix, genre performance, and trend data
  - `src/components/dashboard.tsx`
  - `src/components/charts.tsx`
  - `src/lib/analytics.ts`
- Royalty-share calculator and inline offered/booked royalty analysis
  - `src/components/royalty-calculator.tsx`
  - `src/lib/royalty.ts`
  - `src/components/pipeline-board.tsx`
- CSV export for trial/pro, locked on solo
  - `src/app/api/export/route.ts`

## Billing / Email / Storage Integrations
- Stripe lazy-init scaffold with local fallback
  - `src/lib/billing.ts`
- Resend lazy-init scaffold with local logging fallback
  - `src/lib/email.ts`
- Filesystem-backed fallback storage
  - `src/lib/store.ts`
  - Runtime data path: `.data/`

## Marketing / SEO
- Metadata and environment-aware base URL
  - `src/app/layout.tsx`
  - `src/lib/env.ts`
- Sitemap and robots
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`

## Deployment Fixes Shipped
- Hardened Docker build to use repository copy plus guaranteed `public/` creation before build
  - `Dockerfile`
- Hardened runtime image copies with `--chown`
  - `Dockerfile`
- Fixed chronological ordering for dashboard trend chart data
  - `src/lib/analytics.ts`
- Added mobile app-shell navigation/logout so protected pages remain usable on small screens
  - `src/components/app-shell.tsx`
- Added explicit droppable pipeline columns for clearer drag/drop behavior
  - `src/components/pipeline-board.tsx`

## External Credential Items Intentionally Deferred
- Google OAuth live auth
  - Needs `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`
  - App still runs through demo login fallback
- PostgreSQL persistence
  - Needs `DATABASE_URL`
  - App still runs through local JSON persistence
- Stripe live billing
  - Needs `STRIPE_SECRET_KEY`
  - App still runs through local subscription fallback
- Resend live email delivery
  - Needs `RESEND_API_KEY`
  - App still runs through local email event logging

## Verification
- `npm run build`
  - Passed after final fixes on 2026-05-08
- Dev server
  - Started successfully with `npm run dev -- --hostname 127.0.0.1 --port 3005`
- Standalone production server
  - Started successfully with `PORT=3006 HOSTNAME=127.0.0.1 node .next/standalone/server.js`
- Route smoke tests completed
  - `/`
  - `/signin`
  - `/app` redirect protection
  - `/app`
  - `/app/pipeline`
  - `/app/account`
  - `/acx-audition-tracker`
  - `/voice-actor-crm`
  - `/royalty-share-calculator`
  - `/blog/acx-royalty-share-vs-flat-fee`
- Workflow smoke tests completed
  - Demo login cookie flow
  - Audition create
  - Audition status update
  - Audition delete
  - CSV export success on trial
  - CSV export denial on solo
  - Billing checkout fallback redirect
  - Billing portal fallback redirect
  - Trial reminder guarded route
- Docker
  - `docker build .` was attempted but could not run in this workspace because the Docker CLI cannot access `/var/run/docker.sock`
