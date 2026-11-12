# Database and Seat Inventory

**Document date:** 2026-11-08 · **Project version:** `0.1.0`

## Current schema

Source of truth for implemented columns/relations is `prisma/schema.prisma`; migrations are `prisma/migrations/0001_initial`, `0002_initial_setup_and_scanner`, and `0003_production_slug`. This is an initial implementation model, not a claim that every approved workflow is operational. Migration application on the current running machine is unknown.

| Model | Current purpose and key relations |
|---|---|
| `User` | Staff login ID, name, password hash, role, active/forced-password-change flags; relations to sessions, bookings, scans and audit events. No customer account model. |
| `InitialSetup` | Singleton setup-completion marker linked uniquely to the initial Super Admin. |
| `AuthAttempt` | Login/address keyed attempts and timestamps for throttling support. |
| `AuthSession` | Unique session-token hash, user, expiry and creation time. |
| `Production` | Unique slug, title, description/status; has many performances. |
| `Performance` | Scheduled occurrence under one production; has performance seats/bookings. |
| `Seat` | Permanent unique `seatCode`, area, row, side, number and active flag. No canonical seat rows are supplied. |
| `PerformanceSeat` | Seat allocation/pricing/status for one performance; unique `(performanceId, seatId)`, optional hold expiry and booking. One ticket relation. |
| `Booking` | Channel/status, performance, optional officer/approver, customer/group fields, affiliation, amounts/payment state, hold and lifecycle timestamps. |
| `PaymentRecord` | Method/status/amount/provider references, verification/receipt details and optional proof storage key. No provider integration. |
| `Ticket` | Booking plus unique performance-seat, hashed token, status and issue timestamp. No PDF/QR issue implementation. |
| `TicketScan` | Ticket, scanner user, time and result. No scanner redemption implementation. |
| `IdentityDocument` | Booking, private-storage key, status/upload/delete timestamps. No file storage/access logic. |
| `AuditEvent` | Actor/action/entity, before/after JSON and timestamp. Audit completeness is not verified. |

Enums include `UserRole`, `BookingChannel`, `BookingStatus`, `PaymentMethod`, `PaymentStatus`, `PerformanceSeatStatus`, `TicketStatus`, `GroupAffiliation`, and `ApprovalStatus`. Some status fields such as production/performance status and identity status remain strings rather than strict enums.

### Relationship and integrity coverage

The schema supports one `Production` to many `Performance` records. A physical `Seat` may be related to distinct performances; `@@unique([performanceId, seatId])` prevents duplicate inventory rows for the same seat/performance. Unique ticket token hashes and unique performance-seat assignment support the intended model. These constraints alone do not implement safe holds, expiry, payment verification, atomic sale, cancellation/refund, or duplicate scan prevention; transaction logic and tests are still needed. A booking-level QR is not modeled as the admission credential.

## Canonical seats: unresolved; do not fabricate

The owner-approved Hall and Balcony image files are present:

- `Markramus-assets-reference/assets-reference/seat-maps/hall-approved-reference.jpg`
- `Markramus-assets-reference/assets-reference/seat-maps/balcony-approved-reference.jpg`

No canonical spreadsheet/CSV/JSON or authoritative per-seat manifest was found in the inspected project. The images are visual references, not a safe import list. Read `docs/developer-handoff/SEAT-MAP.md` and `docs/pre-production/03-theatre-and-seat-inventory.md` for the recorded inspection details.

Missing/unresolved: authoritative seat-code list and code format/crosswalk; exact row/side/number for every seat; Hall labels obscured by marks and a visually repeated `JL4` label need owner reconciliation; confirmation of the printed Balcony `TOTAL U:172` as actual sellable inventory (it is not accepted as a verified count); exact interpretation of L/R/C from the audience/stage viewpoint; sellable, blocked, photography, and other category flags; confirmation of inactive seats and permanent-code handling. Never derive counts or codes by guessing from the pictures or changing labels.

Approved decisions: seat codes are unique and permanent; seat-side meanings must be documented; each `Performance` has independent inventory; same physical seat may sell on another performance; Bubble is reference only and no production migration is approved. The project schema contains no imported canonical seat rows.

## Database operation and safe transfer

The local Compose database uses PostgreSQL 16 and host `127.0.0.1:5433`, database `markramus_ticketing`, volume `markramus-postgres-data`. Container port 5432 is internal to Compose. Do not connect this project to HikCentral PostgreSQL on host port 5432. Never run reset/drop commands as troubleshooting.

On a new machine: install Node.js `>=20.19.0` + npm and Docker Desktop; `npm ci`; create a new local `.env` based on `.env.example` with a new `AUTH_HASH_SECRET`; start via `START-LOCAL.bat`. That script starts only Compose `db`, checks its health, generates Prisma Client and applies committed migrations before launching Next. Run `npm run db:validate` for schema validation. For development schema changes, use `npm run db:migrate` and commit the generated migration. Confirm the connection target and take a backup before any migration against an existing DB.

Source copy/Git does not include named Docker volume data, `.env`, `node_modules`, `.next`, `.local-run`, or generated Prisma client. If current local records must be handed off, owner-approved, encrypted backup/restore is a separate required operation; do not export secrets or private customer/identity data into this documentation package.
