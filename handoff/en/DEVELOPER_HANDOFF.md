# Markramus Ticketing — Developer Handoff

**Document date:** 2026-11-08  
**Project version:** `0.1.0` (`package.json`)  
**Status:** Local development project; production readiness is not established.

## 1. Purpose and product requirements

Build an Arabic-first, responsive online ticketing and entry-management system for فريق مارمرقس للدراما (Saint Mark Drama Team), Egypt. The public site also presents team information and an informational archive. The ticketing model has one active theatrical `Production` and one or more scheduled `Performance` records; archive entries are not bookable productions.

Requirements retained from the owner-approved pre-production set:

- Full Arabic RTL, mobile/desktop support, supplied official logo/visual references, and the requested deep theatrical red, black, warm off-white and restrained antique-gold palette. Do not invent branding or seat labels.
- Hall (`الصالة`) and Balcony (`البلكونة`) are the theatre areas. One physical `Seat` can be sold for different performances, but only once for a given performance. Every performance has independent seat inventory.
- Public booking homepage features one production. Admin manages production/performance schedule, prices, status, availability and staff operations.
- Guests book without customer login. Staff have individual accounts and roles: `SUPER_ADMIN`, `ADMIN`, `BOOKING_OFFICER`, `SCANNER`. Scanner is admission-only; Super Admin owns privileged system/user administration.
- Ordinary online booking is guest checkout for 1–9 tickets (unlimited separate bookings). Capture booking-owner name/mobile; capture email only if email delivery is chosen. Customer chooses WhatsApp, email or both and receives a private tracking/download link. No SMS or WhatsApp OTP. Ask whether any attendee is non-Christian; if yes, record the count and use conditional secure ID-document handling subject to legal clearance. Do not create full attendee profiles or disclose bookings using mobile number alone.
- Group bookings (10+ tickets) are made by an authenticated Booking Officer. Record organizer/contact, seats/count, required `Booking Affiliation` (`SPECIFIC_ACTOR`, `TEAM`, `GENERAL_AUDIENCE`) and actor when applicable. Admin manages the actor list. Group identity proof is for non-Christian attendees only, subject to legal clearance; no full attendee profiles. Post-payment changes and group cancellation require Admin/Super Admin approval.
- The latest approved online lifecycle is a 15-minute deadline to upload InstaPay proof. Timely proof enters `Held/Pending Admin Review` and is not automatically expired while review is pending; Admin/Super Admin approves or rejects. Upload/reference is not payment confirmation. Group hold is 25 minutes; pending discretionary discount/comp approval pauses the timer and resumes with remaining time, while InstaPay review does not pause it. Group payment is full amount only by Cash or InstaPay. Officer may confirm full Cash on their own booking; InstaPay requires Admin/Super Admin verification. Discount/comp requests need Admin/Super Admin approval. Each comp ticket has an ordinary seat and unique QR. This current approved lifecycle supersedes older conflicting 15-minute wording.
- The online InstaPay proof flow is not a verified automated payment gateway. Provider capabilities, settlement, refunds and safe authorization/capture remain unverified. Never treat proof/reference as confirmed funds or issue tickets before authorized approval and secure seat allocation; do not assume InstaPay automation.
- Approved quantity discounts count all tickets including comps and reduce paid tickets only: under 30 none; 30–59 EGP 10 per paid ticket; 60–89 EGP 20; 90–119 EGP 30; no 120+ tier. Team member entitlement is one ordinary free ticket across the production run; Admin-managed roster; issuance consumes it even if unused. Admin/Super Admin may issue ordinary guest comps. VIP is a separate named, seatless, uncapped invitation with unique QR reusable across different performances, revocable, with each use logged; same-performance repeat policy remains open.
- Each ordinary Ticket has exactly one canonical unique QR credential; a booking token is not an admission credential. Authenticated mobile-browser scanning requires venue internet (offline mode is out of scope); the server validates and atomically prevents duplicate ordinary admission. Each scan records time/account. VIP invitations are seatless and reusable across performances; same-performance repeat use is unresolved.
- Customer cancellation/refund policy: request at least 48 hours before performance; no customer-initiated refund inside 48 hours; theatre cancellation means full refund; postponement lets customer retain ticket or request full refund by an Admin-set deadline. Admin/Super Admin approves and manually processes refunds; seats remain unavailable until return is confirmed, then QR is invalidated and seats released. Processing times, fees and provider refund capabilities need verification.
- Reports cover combined/per-performance sales and inventory, pending proof queue age, received/refunded amounts by method, comps, VIP issue/use, attendance/scans and affiliation/actor. Booking Officers may view all bookings/reports, including financial detail, but cannot export/download reports or edit another officer's booking without Admin permission. Only Admin/Super Admin exports Excel/CSV. Admin/Super Admin reporting, audit trail, private identity storage, access logging, retention/deletion, backups and Egypt privacy/legal review are required before launch.
- Bubble is reference only. No production data migration is approved. Do not infer workflows beyond the referenced fields.
- Owner-approved total operating budget target is USD 100/year across hosting, database, domain, storage, backup, messaging, monitoring, taxes and other unavoidable cost. Feasibility is not confirmed; do not purchase/activate services. Hosting/domain/provider are unselected.

For complete approved/proposed/open policy detail, use `docs/pre-production/00-status-and-source-of-truth.md` and its linked documents. Conflicts must be resolved with the owner before implementation.

## 2. Architecture and source inventory

- Next.js `16.4.5` App Router, React `19.2.0`, TypeScript `5.8.3`.
- PostgreSQL 16, Prisma `7.10.1`, `@prisma/adapter-pg`, `pg`; Prisma schema at `prisma/schema.prisma`, datasource URL in `prisma.config.ts`.
- Arabic RTL layout and CSS in `src/app`; local Arabic IBM Plex Sans files and OFL license in `public/fonts`.
- Local-only DB Compose service in `docker-compose.yml`, bound to `127.0.0.1:5433` (container port 5432). Never point this app at HikCentral's PostgreSQL on host port 5432.
- Windows entry points: `START-LOCAL.bat`, `scripts/start-local.ps1`, `STOP-LOCAL.bat`, `scripts/stop-local.ps1`.
- Schema changes: `prisma/migrations/0001_initial`, `0002_initial_setup_and_scanner`, `0003_production_slug`.
- Official/review assets: `public/brand`, `public/archive`, `Markramus-assets-reference/assets-reference` (including Hall/Balcony reference images and brochure archive). Keep these with the source.
- Source routes and libraries are under `src/app`, `src/components`, `src/features`, `src/lib`.

## 3. Implemented scope and evidence

Implemented in the repository: public Arabic home, about page, static archive listing/detail pages; responsive RTL shell and local logo/fonts; initial Prisma data model and three migration files; staff setup/login/session/account-management code and role dashboard routes; draft production creation for `المحلج`; booking landing page that stays closed without performances/approved seat inventory; local Windows scripts and Docker Compose configuration.

Evidence is deliberately limited: prior project checks recorded TypeScript, ESLint, Prisma schema validation/client generation and an isolated production build passing; the local public routes responded successfully in that earlier check. Password hash/verify was checked as a small local unit exercise. The owner reports the site now runs locally. These facts do **not** prove that database migrations, first Super Admin creation/login, staff CRUD, real booking, or payment work end to end. Do not describe those as tested. See `FEATURE_STATUS.md`.

## 4. Incomplete scope, known limitations, and blockers

- No confirmed machine-readable canonical seat manifest; no sellable seat count/map may be inferred from image labels. Interactive seat sale must remain blocked pending reconciliation.
- Booking/reservation transactions, 15/25-minute expiry jobs, payment verification, cancellations/refunds, ticket PDF/QR issuing, scanner redemption, uploads/private storage, audit coverage, exports/reports and operational dashboard workflows are not end-to-end implemented.
- Auth code has not been validated against a project database. Password hashing currently uses Node `scrypt` as an interim choice; review algorithm/parameters and session/security controls before production.
- Current schema is a starting model, not proof all approved workflows or constraints are implemented. See `DATABASE_AND_SEATS.md`.
- No Egyptian gateway, WhatsApp/email delivery provider, storage, hosting, monitoring or backups are connected. No provider capabilities or cost are confirmed; OTP is explicitly not required.
- Legal basis, necessity, notice, access, retention/deletion, processor terms and Egypt personal-data obligations for religion/ID image collection need qualified review before collecting real data.
- Open policy/technical details include VIP same-performance repeat use, staff delegation/recovery, identity-document linkage/legal permissibility, proof rejection/review operations, and payment/refund edge cases. The current approved online 15-minute rule is proof upload; timely proof stays held pending Admin review without automatic expiry, superseding older wording.
- User reports local operation, but this handoff did not independently confirm the active server or database state. Existing local `.env`, Docker volume and generated outputs are not portable source assets.

## 5. Clean-computer setup and database

Prerequisites: Windows 10/11, Node.js `>=20.19.0` with npm, Docker Desktop with Compose, Git (if cloning). No global Prisma install is needed.

1. Copy/clone the entire project source, including `prisma/migrations`, `public`, and `Markramus-assets-reference`. Do not copy `.env`, `node_modules`, `.next`, `.local-run`, or local DB data as source handoff.
2. From project root, install locked dependencies: `npm ci`.
3. Create `.env` from `.env.example` or run `START-LOCAL.bat` (which creates it when absent and generates a local auth secret). Never commit `.env`.
4. Start Docker Desktop. Ensure host port `5433` is available. The script validates the local project URL, starts only Compose service `db`, checks readiness, runs Prisma generate and `prisma migrate deploy`, then starts Next.js. It must not be changed to target port `5432`.
5. Open `http://localhost:3000`. Stop using `STOP-LOCAL.bat`; it stops the app and Compose database while retaining the named Docker volume.

Migration commands: `npm run db:validate`, `npm run db:generate`, `npm run db:migrate` (developer migration workflow), `npm run db:deploy` (apply committed migrations). Before applying to any existing DB, verify the URL and backups. Never reset/drop the DB to troubleshoot. Current migrations are present; their application status on the owner's running instance is unknown and must be confirmed read-only by the receiving developer.

## 6. Environment variables

Defined by `.env.example`:

- `DATABASE_URL`: PostgreSQL URL. Local example is `127.0.0.1:5433/markramus_ticketing`; replace credentials safely for any approved environment.
- `POSTGRES_PASSWORD`: Compose development DB password; local-only default is not a production secret.
- `AUTH_HASH_SECRET`: private random secret (at least 32 bytes per example); generate a new secret per environment and store in secret manager/environment config.
- `NEXT_PUBLIC_SITE_URL`: canonical app origin; public by definition, set correctly per environment.

Do not paste actual values into handoff, documentation, Git, screenshots, logs or tickets. `.env` exists on the inspected workstation and is intentionally neither included nor reproduced here. `.gitignore` excludes it.

## 7. Production security requirements

Before production: TLS; managed secrets; least-privilege roles and server-side checks; secure/rotating session cookies, CSRF and brute-force protections; reviewed password hashing; atomic seat allocation/expiry and atomic QR redemption; verified signed provider webhooks/idempotency and reconciliation; private encrypted identity/payment storage with access audit and retention deletion; PII-minimized exports/logs/tickets; tested encrypted backups and restore; monitoring/incident response; legal review; accessibility/security testing; independent review of migrations, authorization and concurrency. Never store payment card data. Do not use real customer data in development.

## 8. Transfer readiness

**Source transfer:** the project contains application source, lockfile, Prisma migrations, public assets, reference assets and configuration.  
**Git transfer:** not ready as a GitHub handoff unless the owner creates/reviews a private remote and commits/pushes; current project history was documented as an empty local `main` with no remote.  
**Runtime transfer:** requires a new computer to install Node/npm and Docker Desktop, create fresh `.env`, install dependencies and start/apply migrations. The old computer is not required to remain on. A local Docker database volume does not travel with the source folder; separately approved backup/export is needed if existing data must move.  
**Release readiness:** not ready; database/auth end-to-end tests, canonical seats, booking/payment/ticketing functions, legal review and provider decisions remain blockers.

## 9. Authoritative project references

Read `docs/developer-handoff/` for focused engineering notes and `docs/pre-production/` for full policy/source-of-truth decisions. Bubble is only a reference; its workflows/data are not treated as exportable source code. The bilingual handoff documents are `handoff/en/` and `handoff/ar/`.
