# Human Input Needed

The app runs without external credentials by using safe local fallbacks. Provide the items below only when you want to switch those flows to live production services.

## Google OAuth

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `AUTH_SECRET`

Create a Google OAuth client, add the deployed callback URL for `/api/auth/callback/google`, and set these values in Coolify.

## PostgreSQL

- `DATABASE_URL`

Create a production Postgres database in Coolify, then run `npx prisma db push` against it on first deploy.

## Stripe

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- Price or product IDs if you want live plan mapping later

Without these values, the app keeps working and billing routes fall back to local plan changes for testing.

## Resend

- `RESEND_API_KEY`

Without this value, welcome and reminder emails are logged into `.data/email-events.json` instead of being sent.

## App URL

- `NEXT_PUBLIC_APP_URL`

Set this to the production origin so metadata, sitemap, and auth URLs resolve correctly outside localhost.

## Optional Cron Secret

- `CRON_SECRET`

If you want to call the trial reminder cron route securely, set this secret and send it as the `x-cron-secret` header.
