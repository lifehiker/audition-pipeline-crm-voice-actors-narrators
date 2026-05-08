# VoiceLog Completion Audit

## Product Foundation
- Branding, layout, metadata, and polished visual system
  - `src/app/layout.tsx`
  - `src/app/globals.css`
  - `src/components/marketing/site-header.tsx`
  - `src/components/marketing/site-footer.tsx`
- Standalone Next.js deployment config
  - `next.config.ts`
  - `Dockerfile`
  - `.dockerignore`
  - `.env.example`
  - Container hardening includes standalone runtime, `HOSTNAME=0.0.0.0`, telemetry disablement, and non-root execution

## Data Model
- Prisma schema for users, accounts, sessions, verification tokens, subscriptions, and auditions
  - `prisma/schema.prisma`
- Lazy runtime database/client path
  - `src/lib/prisma.ts`
  - `src/lib/auth.ts`
- Safe local persistence fallback with demo seed data
  - `src/lib/store.ts`
  - `src/lib/demo-data.ts`
  - `src/lib/types.ts`

## Authentication
- NextAuth v5 route with Google provider and Prisma adapter path
  - `src/lib/auth.ts`
  - `src/app/api/auth/[...nextauth]/route.ts`
- Local-safe demo auth fallback, sign-in screen, login/logout flow, protected app layout
  - `src/app/signin/page.tsx`
  - `src/app/api/demo-login/route.ts`
  - `src/app/api/demo-logout/route.ts`
  - `src/app/app/layout.tsx`

## Core App Pages
- Marketing homepage
  - Route: `/`
  - Files: `src/app/page.tsx`, `src/components/marketing/homepage.tsx`
- Dashboard with KPI cards, platform chart, genre performance, and trend stats
  - Route: `/app`
  - Files: `src/app/app/page.tsx`, `src/components/dashboard.tsx`, `src/components/charts.tsx`, `src/lib/analytics.ts`
- Pipeline kanban with drag/drop, status dropdown, create/delete, inline royalty calculations
  - Route: `/app/pipeline`
  - Files: `src/app/app/pipeline/page.tsx`, `src/components/pipeline-board.tsx`, `src/components/royalty-calculator.tsx`
- Billing/account and invoice/export view
  - Route: `/app/account`
  - Files: `src/app/app/account/page.tsx`
- Free royalty-share calculator landing page
  - Route: `/royalty-share-calculator`
  - Files: `src/app/royalty-share-calculator/page.tsx`, `src/components/royalty-calculator.tsx`

## SEO / Marketing Pages
- ACX landing page
  - Route: `/acx-audition-tracker`
  - File: `src/app/acx-audition-tracker/page.tsx`
- Voice actor CRM landing page
  - Route: `/voice-actor-crm`
  - File: `src/app/voice-actor-crm/page.tsx`
- Educational blog post with embedded calculator
  - Route: `/blog/acx-royalty-share-vs-flat-fee`
  - File: `src/app/blog/acx-royalty-share-vs-flat-fee/page.tsx`
- Sitemap and robots
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`

## API / Server Workflows
- List and create auditions
  - Route: `/api/auditions`
  - File: `src/app/api/auditions/route.ts`
- Update and delete audition records
  - Route: `/api/auditions/[id]`
  - File: `src/app/api/auditions/[id]/route.ts`
- Change pipeline status
  - Route: `/api/auditions/[id]/status`
  - File: `src/app/api/auditions/[id]/status/route.ts`
- CSV export with Pro/trial gating
  - Route: `/api/export`
  - File: `src/app/api/export/route.ts`
- Billing checkout / portal fallbacks
  - Routes: `/api/billing/checkout`, `/api/billing/portal`
  - Files: `src/app/api/billing/checkout/route.ts`, `src/app/api/billing/portal/route.ts`, `src/lib/billing.ts`
- Welcome email and trial reminder fallback paths
  - Files: `src/lib/email.ts`, `src/app/api/demo-login/route.ts`, `src/app/api/internal/trial-reminders/route.ts`

## Business Logic
- Platform, genre, pay type, plan, and status definitions
  - `src/lib/constants.ts`
- KPI and analytics calculations
  - `src/lib/analytics.ts`
- Royalty-share scenario calculations
  - `src/lib/royalty.ts`

## Guarded External Integrations / Safe Fallbacks
- Google OAuth
  - Live dependency: `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`
  - Fallback: demo login path keeps the app usable without external auth
- PostgreSQL / Prisma persistence
  - Live dependency: `DATABASE_URL`
  - Fallback: `.data/voicelog-state.json` local persistence keeps CRUD working
- Stripe billing
  - Live dependency: `STRIPE_SECRET_KEY`
  - Fallback: local subscription mutation and invoice simulation in `src/lib/billing.ts`
- Resend email
  - Live dependency: `RESEND_API_KEY`
  - Fallback: email event logging to `.data/email-events.json`

## Verification Summary
- `npm run build`
  - Passed on 2026-05-08 after final patches
- `npm run dev`
  - Restarted cleanly on `http://127.0.0.1:3000`
- Smoke-tested routes
  - `/`, `/signin`, `/app` redirect protection, `/app`, `/app/pipeline`, `/app/account`, `/acx-audition-tracker`, `/voice-actor-crm`, `/royalty-share-calculator`
- Smoke-tested interactions
  - Demo login/logout
  - Create audition
  - Update audition status
  - Delete audition
  - CSV export success on trial
  - CSV export denial on Solo
  - Billing fallback redirect
  - Trial reminder guarded route
- Final runtime hardening patches
  - `src/app/layout.tsx`: `metadataBase` now derives from environment-aware base URL instead of hard-coded localhost
  - `src/app/signin/page.tsx`: corrected missing-credentials fallback copy
  - `src/app/api/export/route.ts`: CSV export now safely handles blank notes
- Docker
  - `docker build .` could not be executed successfully because the environment lacks permission to access `/var/run/docker.sock`
  - `Dockerfile` was re-hardened on 2026-05-08 for production runtime safety
