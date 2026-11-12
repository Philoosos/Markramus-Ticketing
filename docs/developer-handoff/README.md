# Developer handoff — Markramus Ticketing

**Status:** active local development; public identity/about/archive milestone is implemented, ticketing features remain incomplete. This is not production ready.

This folder summarizes the application and the decisions needed to continue from another computer. The source of truth is the latest owner-approved register in [`docs/pre-production/13-open-questions-and-approvals.md`](../pre-production/13-open-questions-and-approvals.md), interpreted with the later Master Build Prompt. Read this package before changing code. Owner-provided source assets are preserved at `Markramus-assets-reference/assets-reference/`.

## Current implementation

- Next.js App Router, TypeScript, Arabic RTL and responsive CSS.
- Public home, About, archive index and archive detail routes, using the original team logo and brochure facts.
- Historical archive is informational only. The intended ticketing model separates Productions from their scheduled Performances; booking workflows and general Admin content management are not implemented yet.
- Prisma schema now defines initial account, theatre, performance inventory, booking, payment, ticket, identity-document metadata, and audit entities. The schema validates and a first migration plus generated Prisma Client are present, but no database migration or connection has been run. `docker-compose.yml` defines local-only PostgreSQL with persistent development data for a later database milestone.
- Staff authentication, one-time Super Admin setup, role-specific dashboards, and Super Admin staff-account management are implemented in code but are not runtime-verified against a project database. Booking/seat allocation, payment review, PDF, QR scanner, archive CMS, or external integration is not implemented.
- Local Windows start/stop scripts and a persistent local PostgreSQL Compose service are present. Their full workflow is not yet runtime-verified because Docker Desktop is unavailable and the running PostgreSQL service belongs to HikCentral.
- The exact bookable seat inventory is blocked pending reconciliation of the approved images with the canonical permanent seat manifest.

## Continue on a new computer

1. Copy the complete project folder or clone its private Git repository after one is created. Keep the `Markramus-assets-reference` directory.
2. Install Node.js 20.19+ with npm. Docker Desktop is needed for the project database used by staff authentication; static public pages remain viewable without it. No cloud account is needed for local work.
3. Follow [`LOCAL-SETUP.md`](LOCAL-SETUP.md). Do not put real credentials, customer records, or identity documents in development.
4. Read [`KNOWN-LIMITATIONS.md`](KNOWN-LIMITATIONS.md) and the source documents before representing unfinished features as complete.

## Handoff index

- [Local setup](LOCAL-SETUP.md)
- [Architecture](ARCHITECTURE.md)
- [Database](DATABASE.md)
- [Roles and permissions](ROLES-AND-PERMISSIONS.md)
- [Authentication and account management](AUTHENTICATION-AND-ACCOUNT-MANAGEMENT.md)
- [Booking workflows](BOOKING-WORKFLOWS.md)
- [Seat map and inventory](SEAT-MAP.md)
- [Cast and credits](CAST-AND-CREDITS.md)
- [Team archive](TEAM-ARCHIVE.md)
- [API and integrations](API-AND-INTEGRATIONS.md)
- [Security and privacy](SECURITY-AND-PRIVACY.md)
- [Testing and acceptance](TESTING.md)
- [Future production deployment](PRODUCTION-DEPLOYMENT.md)
- [Known limitations](KNOWN-LIMITATIONS.md)

The root [`README.md`](../../README.md) has the current quick summary. Root `.env.example` and this folder's `.env.example` contain variable names and development placeholders only.






