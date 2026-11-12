# Database and persistence

## Current schema state

`prisma/schema.prisma` now contains the first persistence model for users, revocable sessions, one-time setup lock, rate-limit attempts, productions, performances, permanent seats, per-performance inventory, bookings, payment records, tickets and scans, private identity-document metadata, and audit events. `Production` and `Performance` are separate; `PerformanceSeat` uniquely binds a physical `Seat` to one performance. Ticket QR credentials are represented by a unique token hash at the individual-ticket level.

The schema was validated with Prisma 7 using a local placeholder `DATABASE_URL`. A read-only connection attempt using the sample password reached the local PostgreSQL service but failed authentication. No SQL query or migration was executed against it. Three SQL migration files are present and Prisma Client was generated locally; no migration was applied and no seed/demo records were added. The canonical seat manifest is still missing; do not seed or invent seats. Do not enter real credentials, customer data, payment records, or ID images.

## Important model rules

- `Seat.seatCode` is permanently unique theatre-wide. Seat rows must come from the owner-approved canonical inventory only.
- `PerformanceSeat` has a unique `(performanceId, seatId)` pair, so the same physical seat can be allocated once for each performance and reused at a later performance.
- Holds are represented on both the booking and allocated performance seats. Application transactions must ensure their expiry rules: 15 minutes for online customers, 25 minutes for Booking Officer group bookings. Expiration must only release rows still held for that booking.
- Ticket `tokenHash` is individual and unique. The raw QR credential should only be disclosed through the ticket issuance path. Atomic server transactions must prevent duplicate admission scans.
- Booking channel, group affiliation, approval status, full-payment fields, staff attribution, identity-document storage metadata, and audit event fields are represented. Provider webhook and authorization/capture workflows are not implemented.
- Identity document `storageKey` and payment proof keys are metadata only. Implement private object storage and access logging before storing real files; do not generate public links.
- Money uses PostgreSQL `Decimal(10,2)`; currency and rounding rules still require explicit implementation review.

## Not yet implemented

- Three migrations exist but have not been applied. No project database connection has been established. Staff-auth runtime queries exist but have not been tested against a project database.
- Discounts/free tickets need a dedicated approval workflow and may need normalized line-item and decision records before those features are implemented.
- Performance cast, archive CMS, team-member entitlements, VIP invitation/use, refunds, delivery attempts, tracking-link tokens, and report export models are still absent or need refinement against the approved data model.
- `verifiedById` and file access need stronger relational/audit integration before payment and identity workflows are built.
- Some fields use strings pending final controlled vocabularies; do not rely on arbitrary client-supplied values.

Use `docs/pre-production/18-data-model-and-permissions.md` as the approved conceptual source, and update this handoff document whenever a migration changes the schema.




