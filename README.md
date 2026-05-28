# VidyaConnect AI

Production-ready MVP scaffold for a mobile-first Next.js 14 PWA: Pan-India hyperlocal tuition discovery with AI teacher matching, free demo booking, parent reports, payments, and Supabase backend.

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/onboarding`.

## Included

- Next.js 14 App Router with strict TypeScript
- Tailwind design system using saffron, navy, ink, and cream tokens
- Student flow: onboarding, home, map, AI match, teacher profile, booking, dashboard, bookings
- Teacher flow: `/teacher/dashboard`, schedule, students, earnings
- Parent flow: `/parent/dashboard`, report, teachers, payments
- API routes for AI, OTP auth, payments, webhooks, teachers, notifications, and cron
- Supabase migration with PostGIS, RLS policies, indexes, seed data
- PWA manifest and next-pwa config
- GitHub Actions CI scaffold

## Environment

Fill `.env.local` with Supabase, Anthropic, Google Maps, Razorpay, Twilio, Firebase, Resend, Sentry, and PostHog keys. Public browser variables use `NEXT_PUBLIC_`.

## Supabase

```bash
npx supabase init
npx supabase db push
npx supabase db seed
```

The main migration lives at `supabase/migrations/001_initial_schema.sql`.

## Deployment

Deploy to Vercel in the Mumbai region using `vercel.json`. Add all environment variables in the Vercel dashboard before production deploy.

## Notes

This scaffold uses local mock data for first-run UX. Replace `src/data/mock.ts` reads with Supabase queries as keys and project credentials are added.

## License

MIT
