# Architecture

## Current foundation

- Next.js App Router and React server-rendered pages in `src/app`.
- TypeScript, RTL declared as `<html lang="ar" dir="rtl">`, responsive styling in `src/app/globals.css`.
- Reusable shell in `src/components/site-shell.tsx`.
- Historical archive source data in `src/features/archive/data.ts`.
- Local static assets in `public/`; originals remain under `Markramus-assets-reference/`.
- Prisma 7/PostgreSQL packages are configured; the current Prisma schema is only a generator and provider declaration.

## Target application boundary

Use a modular monolith: public content, guest checkout, staff operations, booking/payment state transitions, and scan validation in one Next.js application; PostgreSQL via Prisma is the source of truth. Keep authorization and booking decisions on server routes/actions, never only in the UI. Private upload objects must use private storage and authorized server delivery. External messaging/payment providers stay behind adapters and are not connected in local development.

Use separate entities for the active `Production` and its `Performance` dates. Every Performance receives independent seat inventory. Historical `ArchiveProduction` entries are content only and cannot create ticket inventory. Cast assignment keys include Performance. Ordinary tickets each have one unique opaque QR credential; booking-level IDs are not admission credentials.

See technical proposal 16 and conceptual data model 18 under `docs/pre-production/`. No implementation detail there overrides a newer explicit owner rule.
