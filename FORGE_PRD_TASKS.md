# VoiceLog PRD Task Checklist

Last updated: 2026-05-08

## Foundation
- [x] Read `PRD.md` end-to-end and `BUILD_INSTRUCTIONS.md` end-to-end
- [x] Audit existing app structure, routes, APIs, data layer, and deployment config
- [x] Reproduce current build and deployment issues locally
- [x] Check for relevant local Next.js docs in `node_modules/next/dist/docs/`
  - Result: the expected docs directory is not present in this installed `next` package, so work proceeded from the live build output and framework behavior instead

## Data Model
- [x] Define audition model covering platform, title, role, genre, pay type, structured economics, status, submission date, and notes
- [x] Define subscription model with trial, solo, pro, invoices, renewal, and source metadata
- [x] Include Prisma schema for production database path
- [x] Provide safe local persistence fallback when database credentials are unavailable
- [x] Verify Prisma artifacts and standalone build behavior are compatible with current repo layout

## Auth
- [x] Implement Google OAuth-ready NextAuth route
- [x] Guard auth so missing OAuth credentials do not crash build or runtime
- [x] Provide safe demo/local access path so the app remains usable without external credentials
- [x] Verify sign-in and protected app routing work cleanly in dev/prod

## User-Facing Pages
- [x] Homepage `/`
- [x] Sign-in page `/signin`
- [x] Dashboard `/app`
- [x] Pipeline board `/app/pipeline`
- [x] Account and billing page `/app/account`
- [x] SEO landing page `/acx-audition-tracker`
- [x] SEO landing page `/voice-actor-crm`
- [x] Free tool page `/royalty-share-calculator`
- [x] Educational blog page `/blog/acx-royalty-share-vs-flat-fee`
- [x] Review each page for polish/usability issues through rendered HTML and route smoke tests
  - Follow-up fixes shipped: mobile app navigation and clearer droppable pipeline columns

## API / Server Actions
- [x] Auth handler `/api/auth/[...nextauth]`
- [x] Demo login/logout flows
- [x] Audition list/create API
- [x] Audition update/delete API
- [x] Audition status update API
- [x] Billing checkout API with safe fallback
- [x] Billing portal API with safe fallback
- [x] CSV export API with plan gating
- [x] Trial reminder API with safe fallback email path
- [x] Validate request handling and runtime safety for each route

## Core Workflows
- [x] Add audition form
- [x] Move auditions through submitted/callback/offered/booked/passed workflow
- [x] Dashboard KPI summaries
- [x] Platform breakdown chart
- [x] Genre conversion analysis with Pro gating
- [x] Royalty-share calculator
- [x] Inline royalty calculator on offered/booked royalty-share auditions
- [x] CSV export for trial/pro users
- [x] Smoke-test major interactive flows via HTTP/API session checks

## Secondary Workflows
- [x] Subscription plan switching fallback
- [x] Invoice display
- [x] Welcome email fallback logging
- [x] Trial reminder fallback logging
- [x] Confirm local-safe behavior when Stripe/Resend/Google/Postgres credentials are absent

## Billing / Email / Storage Integrations
- [x] Stripe integration scaffold with guarded lazy init
- [x] Resend integration scaffold with guarded lazy init
- [x] Local filesystem persistence fallback
- [x] Document real credential requirements in `HUMAN_INPUT_NEEDED.md`

## Marketing / SEO
- [x] Metadata base config
- [x] Marketing pages for target keyword cluster
- [x] Blog content and free calculator hook
- [x] `robots.ts`
- [x] `sitemap.ts`
- [x] Confirm metadata/base URL behavior and route coverage after build

## Deployment / Docker
- [x] Set Next.js standalone output in `next.config.ts`
- [x] Fix Dockerfile so it supports standalone runtime with the current repo layout
- [x] Ensure `.dockerignore` is production-safe for the current build strategy
- [x] Test `npm run build`
- [ ] Test production Docker build locally if Docker is available
  - Blocked by workspace Docker socket permissions: `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`

## Verification
- [x] Start dev server and confirm it does not crash
- [x] Smoke-test primary routes
- [x] Smoke-test key buttons, forms, navigation, and gated workflows
- [x] Create `FORGE_COMPLETION_AUDIT.md`
- [x] Create `HUMAN_INPUT_NEEDED.md`
- [x] Re-read relevant PRD sections and update this checklist with final completion state
