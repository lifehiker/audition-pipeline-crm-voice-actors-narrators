# VoiceLog PRD Task Ledger

## Foundation

- [x] Read `PRD.md` and `BUILD_INSTRUCTIONS.md` end to end.
- [x] Verify Next.js deployment config uses `output: "standalone"` in [next.config.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/next.config.ts).
- [x] Review Docker packaging and confirm it only copies directories created during the build when `public/` is absent.
- [x] Re-run `npm run build` after code review and deployment fixes.

## Data Model And Storage

- [x] Define Prisma schema for users, auth tables, subscriptions, and auditions in [schema.prisma](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/prisma/schema.prisma).
- [x] Implement safe local storage fallback for app state and email events in [store.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/lib/store.ts).
- [x] Seed realistic demo audition and subscription data in [demo-data.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/lib/demo-data.ts).

## Auth

- [x] Wire NextAuth Google provider with guarded env checks in [auth.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/lib/auth.ts).
- [x] Expose auth route handler in [route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/auth/[...nextauth]/route.ts).
- [x] Provide credential-free demo sign-in and sign-out flows in [demo-login route](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/demo-login/route.ts) and [demo-logout route](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/demo-logout/route.ts).
- [x] Protect in-app routes through the cookie gate in [app layout](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/app/layout.tsx).

## User-Facing Pages

- [x] Marketing homepage at [src/app/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/page.tsx).
- [x] Sign-in page at [signin/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/signin/page.tsx).
- [x] Dashboard page at [app/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/app/page.tsx).
- [x] Pipeline page at [app/pipeline/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/app/pipeline/page.tsx).
- [x] Auditions table/editor page at [app/auditions/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/app/auditions/page.tsx).
- [x] Account and billing page at [app/account/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/app/account/page.tsx).
- [x] Pricing page at [pricing/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/pricing/page.tsx).
- [x] SEO landing pages at [acx-audition-tracker/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/acx-audition-tracker/page.tsx), [voice-actor-crm/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/voice-actor-crm/page.tsx), [royalty-share-calculator/page.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/royalty-share-calculator/page.tsx), and [blog page](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/blog/acx-royalty-share-vs-flat-fee/page.tsx).

## API And Server Actions

- [x] Audition list/create route in [api/auditions/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/auditions/route.ts).
- [x] Audition update/delete route in [api/auditions/[id]/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/auditions/[id]/route.ts).
- [x] Audition status update route in [api/auditions/[id]/status/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/auditions/[id]/status/route.ts).
- [x] Billing checkout and portal fallbacks in [billing routes](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/billing/checkout/route.ts).
- [x] CSV export route in [api/export/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/export/route.ts).
- [x] Trial reminder routes in [api/internal/trial-reminders/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/internal/trial-reminders/route.ts) and [api/cron/trial-expiry/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/cron/trial-expiry/route.ts).
- [x] Guarded Stripe webhook endpoint in [api/webhooks/stripe/route.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/api/webhooks/stripe/route.ts).

## Core Workflows

- [x] Add auditions from the pipeline form in [pipeline-board.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/components/pipeline-board.tsx).
- [x] Move auditions through submitted, callback, offered, booked, and passed via drag-and-drop and dropdown status controls.
- [x] Edit and delete auditions from the table editor in [auditions-table.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/components/auditions-table.tsx).
- [x] View dashboard metrics, platform mix, trend data, and genre performance in [dashboard.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/components/dashboard.tsx).
- [x] Use the royalty-share calculator both as a standalone page and inline in royalty-share offers/bookings.

## Billing, Email, And External Integrations

- [x] Guard Stripe client creation and fall back to local plan mutation in [billing.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/lib/billing.ts).
- [x] Guard Resend client creation and fall back to local event logs in [email.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/lib/email.ts).
- [x] Document required live credentials in `HUMAN_INPUT_NEEDED.md`.

## Marketing, SEO, And Deploy

- [x] Set metadata, `robots`, and `sitemap` entries in [layout.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/layout.tsx), [robots.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/robots.ts), and [sitemap.ts](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/app/sitemap.ts).
- [x] Ensure the main navigation surfaces pricing and in-app audition management in [site-header.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/components/marketing/site-header.tsx) and [app-shell.tsx](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/src/components/app-shell.tsx).
- [x] Review Docker packaging in [Dockerfile](/opt/forge-builds/audition-pipeline-crm-voice-actors-narrators/Dockerfile) and `.dockerignore`.

## Verification

- [x] `npm run build` passes locally.
- [x] `npm run dev` starts and primary pages respond.
- [ ] Docker image build executed locally.
  Blocked by inaccessible Docker daemon socket in this environment.
