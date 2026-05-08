# Human Input Needed

The app runs locally without external credentials by using guarded fallbacks. For production-grade live integrations, provide:

## Authentication
- `AUTH_SECRET`
  - Generate a strong random secret for NextAuth session signing.
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
  - Create OAuth credentials in Google Cloud Console.
  - Add your deployed callback URL:
    - `https://your-domain.com/api/auth/callback/google`

## Database
- `DATABASE_URL`
  - PostgreSQL connection string for production persistence.
  - After setting it, run Prisma migrations or `prisma db push` as part of deploy.

## Billing
- `STRIPE_SECRET_KEY`
  - Required to replace the local-safe billing fallback with live Stripe checkout/portal behavior.
  - The current UI and routes are already in place; without this key, plan changes stay local for demo/testing.

## Email
- `RESEND_API_KEY`
  - Required for live welcome emails and trial reminders.
  - Without it, email events are logged locally in `.data/email-events.json`.
