# VoiceLog PRD Task Checklist

## Phase 1: Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Scaffold Next.js 15 App Router project with TypeScript, Tailwind, ESLint, `src/` layout.
- [x] Configure `next.config.ts` with `output: "standalone"`.
- [x] Install and configure core UI/chart/form dependencies.
- [x] Establish app information architecture, route structure, design tokens, and shared layout.
- [x] Add environment/config helpers with safe runtime guards for missing credentials.

## Phase 2: Data Model
- [x] Define Prisma schema for users, accounts, sessions, subscriptions, auditions, notes/fields needed for analytics, and email/billing metadata.
- [x] Add database access layer with lazy initialization and safe fallback when database credentials are unavailable.
- [x] Seed/demo data path so app remains usable locally without external services.

## Phase 3: Auth
- [x] Implement NextAuth v5 configuration with Google OAuth provider and Prisma adapter path.
- [x] Add guarded auth fallback/demo session flow when OAuth credentials are unavailable.
- [x] Add login, logout, protected app routing, and session-aware navigation.

## Phase 4: Core User-Facing App Pages
- [x] Marketing homepage `/`.
- [x] App dashboard `/app` with KPI cards, platform chart, genre performance, trend stats.
- [x] Auditions pipeline page with Kanban/status management.
- [x] Audition creation/edit flow.
- [x] Royalty-share calculator page/tool.
- [x] Billing/account page.
- [x] Export access path.

## Phase 5: API / Server Actions
- [x] Create audition.
- [x] Update audition.
- [x] Change pipeline status.
- [x] Delete audition if needed for usability.
- [x] Export CSV.
- [x] Billing checkout/portal actions with guarded Stripe fallback.
- [x] Email trigger paths with guarded Resend fallback.

## Phase 6: Core Workflows
- [x] Log a new audition with platform/genre/pay structure/date/notes.
- [x] View submissions in dashboard metrics.
- [x] Move auditions through Submitted -> Callback -> Offered -> Booked -> Passed.
- [x] View royalty-share calculations inline for relevant auditions.
- [x] Gate Pro analytics/export features while preserving trial/demo usability.

## Phase 7: Secondary Workflows
- [x] Trial/pro plan presentation and gating copy.
- [x] Subscription state handling.
- [x] Demo/local-safe email event logging.
- [x] Demo/local-safe billing state management.

## Phase 8: Marketing / SEO
- [x] SEO-ready homepage metadata and structured sections.
- [x] `/acx-audition-tracker`.
- [x] `/voice-actor-crm`.
- [x] `/royalty-share-calculator`.
- [x] `/blog/acx-royalty-share-vs-flat-fee`.
- [x] Sitemap/robots metadata.

## Phase 9: Deployment
- [x] Production-ready Dockerfile for Next.js standalone output.
- [x] Ensure Dockerfile only copies paths that exist.
- [x] Add env example / deployment notes as needed.

## Phase 10: Verification
- [x] Run `npm run build` and fix all errors.
- [x] Start dev server and verify it does not crash.
- [x] Smoke test primary routes.
- [x] Test key interactions: auth entry, forms, navigation, status changes, calculator, export path, billing/account guards.
- [x] Review UI for polish and non-template quality.
- [x] Create `FORGE_COMPLETION_AUDIT.md`.
- [x] Create `HUMAN_INPUT_NEEDED.md` only for genuine external credential requirements.

## Final Re-Verification Notes
- [x] Re-read the PRD sections covering auth fallback, pipeline workflow, analytics gating, billing/email fallbacks, SEO pages, and deployment expectations after implementation.
- [x] Confirmed `next.config.ts` uses `output: "standalone"` for production deployment.
- [x] Rebuilt successfully on 2026-05-08 with `npm run build`.
- [x] Restarted the dev server from a clean `.next` directory and re-verified `/`, `/signin`, `/app`, `/app/pipeline`, `/app/account`, `/acx-audition-tracker`, `/voice-actor-crm`, and `/royalty-share-calculator`.
- [x] Re-verified demo login, audition create/status update/delete, billing fallback redirect, and CSV export gating.
- [x] Confirmed the Dockerfile only copies paths that exist in the repository.
- [x] Attempted `docker build .`; Docker CLI exists, but this environment cannot access `/var/run/docker.sock`, so image execution could not be completed here.
