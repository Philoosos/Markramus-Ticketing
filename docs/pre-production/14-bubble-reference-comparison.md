# Bubble reference comparison

This compares the Bubble **data types and fields supplied by the owner** with the conceptual relational design in [08-data-model.md](08-data-model.md) and the project requirements. It is a schema reference only. It does not claim Bubble workflows, privacy rules, API behavior, plugin configuration, or a live database were reviewed here, and it does not assume Bubble workflows or database configuration can be exported as application source code.

## Status

- **CONFIRMED reference:** the five Bubble data types and fields listed below are accepted as the previously reviewed schema reference supplied in this conversation.
- **UNRESOLVED:** exact seat inventory records and map geometry/orientation, Bubble status transition meanings (if migration is later approved), payment-provider behavior, and workflow implementation details.
- The owner explicitly said not to repeat the prior Bubble review or request its screenshots. This comparison uses the supplied field list and does not request those materials again.

## Owner-approved design decisions

The owner approved these five design decisions on 2026-11-05:

- Separate `Production` (the theatrical work) from `Performance` (one specific date and time), allowing reusable production details and separately scheduled occurrences.
- Each Performance has its own seat inventory and booking availability. A seat can be reused for a different Performance while duplicate allocation within one Performance is prohibited.
- Each individual Ticket owns one canonical unique QR token; a Booking-level token is never an admission credential.
- Seat codes are theatre-wide unique, permanent, and never reassigned. L/R/C mean Left/Right/Center; the map/manifest must state the viewpoint used for those directions.
- Bubble remains reference only; production data migration is not planned unless separately approved later.

Remaining unrelated blockers are maintained in [13-open-questions-and-approvals.md](13-open-questions-and-approvals.md). These five decisions are no longer pending approval.

## Field-by-field mapping

### `Seat`

| Bubble field | Relational mapping | Assessment / follow-up |
| --- | --- | --- |
| `seat_code` (text) | `Seat.seatCode` | Direct match to the durable theatre seat identifier. Approved rule: codes are theatre-wide unique, permanent, and never reassigned. Preserve the supplied code verbatim; validate duplicate exact codes on import. |
| `area` (text: Hall/Balcony) | `SeatingArea` foreign key, initialized with Hall (الصالة) and Balcony (البلكونة) | Same concept; prefer a relation or controlled value over arbitrary text to prevent spelling variants. Preserve the supplied English labels as reference values; Arabic display labels are confirmed elsewhere. |
| `row_label` (text) | `Seat.rowLabel` | Direct map/layout metadata. Exact values are in the authoritative inventory, not in this field list. |
| `side` (text: L/R/C) | `Seat.side` or section/layout metadata | Approved meanings are L=Left, R=Right, C=Center. The map must state the viewing reference; do not infer orientation from RTL or an image. It is not a substitute for coordinates or a map. |
| `seat_number` (number) | `Seat.seatNumber` | Direct mapping. Formatting/display rules and relationship to `seat_code` remain unresolved; do not regenerate seat codes from this number. |
| `is_active` (yes/no) | `Seat.isActive` (master-inventory enabled state) | Direct mapping. Keep distinct from per-performance `Blocked`. Define whether deactivation is allowed after historical bookings exist; do not delete referenced seats. |

### `Show`

| Bubble field | Relational mapping | Assessment / follow-up |
| --- | --- | --- |
| `show_title` (text) | `Production.title` and/or a historical `Performance.titleSnapshot` | Production title maps directly. Snapshotting displayed titles on historical tickets/bookings is a design choice for preserving past records. |
| `show_datetime` (date) | `Performance.startsAt` | This is the scheduled occurrence time. Approved design separates reusable Production title/description from each Performance date/time; map the Bubble datetime to a specific Performance. |
| `show_description` (text) | `Production.description` | Direct mapping. Language/localization and approved content policy are not specified. |
| `show_status` (text: Draft/Published/Cancelled) | Controlled production publication state plus separate performance cancellation/sale state | Do not assume one status describes both content publication and an occurrence. Preserve the listed values as a migration reference; map each only after status meaning/transitions are confirmed. A published production may have one cancelled occurrence. |

### `ShowSeat`

| Bubble field | Relational mapping | Assessment / follow-up |
| --- | --- | --- |
| `seat` (Seat) | Foreign key `PerformanceSeat.seatId` or `BookingSeat.seatId` | Identifies the physical seat. Use stable IDs and database foreign keys. |
| `show` (Show) | Foreign key `PerformanceSeat.performanceId` | Identifies the occurrence whose inventory is sold. If Bubble `Show` is a reusable production, this must target a separate `Performance`. |
| `seat_status` (text: Available/Held/Sold/Blocked) | Controlled per-performance inventory/ownership state | Directly models independent status for a seat on an occurrence. Prefer constrained transitions or derive some states from active holds/bookings; avoid contradictory copies of availability. `Available` may be derived rather than stored. |
| `ticket_price` (number) | Exact-money price rule/snapshot for the performance-seat and `BookingSeat` | Direct match to per-seat/per-show pricing. Use integer minor units or exact decimal plus currency. The Bubble field has no currency shown, so currency/rounding/fee policy is unresolved. |
| `hold_expires_at` (date) | Reservation proof deadline/hold state, separate from review state | The latest policy uses 15 minutes to upload InstaPay proof. Timely proof suspends expiry while held for Admin review indefinitely. A single timestamp alone cannot express this transition or ensure atomic release. |
| `booking` (Booking) | Nullable relationship to owning booking on held/sold inventory | Direct ownership relationship. Define when it is set and cleared on expiry/cancellation. Database transaction and uniqueness constraints remain required. |

### `Booking`

| Bubble field | Relational mapping | Assessment / follow-up |
| --- | --- | --- |
| `show` (Show) | `Booking.performanceId` (or production plus explicit performance) | Booking must identify one specific occurrence for inventory and ticket display. |
| `customer_name` (text) | `Customer.fullName` or booking-time snapshot | Directly satisfies full name. Decide shared customer record vs per-booking snapshot; guest checkout remains possible. |
| `customer_phone` (text) | `Customer.phone` or booking-time snapshot | Directly satisfies mobile number. Country/format normalization and verification are unresolved. |
| `customer_email` (text) | `Customer.email` or booking-time snapshot | Directly satisfies email. Verification and delivery purpose are unresolved. |
| `booking_status` | Controlled `Booking.status` | Field is present but the Bubble value set was not supplied. Keep distinct from payment, reservation, and ticket states. Exact transitions need approval. |
| `booking_date` | `Booking.createdAt` (plus separate confirmed/paid timestamps if needed) | Direct concept. Store server timestamps in UTC; do not conflate creation and payment time. |
| `total_amount` (number) | Exact `Booking.totalAmount` plus currency and line-level price snapshot | Direct concept. Calculate server-side with the approved uniform price and quantity discount tiers. Price amount/currency, taxes/fees and refund accounting remain open. |
| `payment_method` | `Payment.method` / verified provider-method classification | Direct concept. Do not infer which methods Bubble supported. |
| `payment_status` | `Payment.status` (one or more attempts per booking) | Direct concept; separate from booking status. Controlled provider-mapped transitions are needed. |
| `payment_reference` | `Payment.providerReference` plus internal idempotency references | Direct concept. A reference string is not proof of payment; verify provider status, amount, and currency server-side. Keep event history for retries/reconciliation. |
| `ticket_token` | Prefer opaque per-ticket token/hash, not booking-level token | A booking can contain several seats and should produce individual tickets. The Ticket-level token is the approved canonical admission credential; a Booking-level token must never grant admission. |

### `Ticket`

| Bubble field | Relational mapping | Assessment / follow-up |
| --- | --- | --- |
| `booking` (Booking) | Foreign key `Ticket.bookingId` | Direct relationship. |
| `show_seat` (ShowSeat) | Foreign key to the booking seat line or performance-seat allocation | Directly binds an individual ticket to a seat allocation and occurrence. Limit active tickets per allocation unless approved reissue history requires old revoked records. |
| `ticket_token` | Unique opaque per-ticket token; store hash where practical | Direct QR lookup capability. Must be unpredictable, non-sequential, contain no PII, and support revocation/reissue. |
| `ticket_status` | Controlled `Ticket.status` (e.g. issued/revoked/redeemed) | Direct concept. Values/transitions were not supplied; do not infer Bubble option values. |
| `used_at` (date) | `Ticket.redeemedAt` | Directly captures first successful use. Set atomically; a timestamp alone does not guard concurrent scans. |
| `scanned_by` | Foreign key to authenticated admin/scanner actor, optionally with device reference | Direct concept, but field type is unspecified. Prefer stable actor identity over free text; scanner account/device policy needs approval. |
| `ticket_file` | Optional private/generated PDF artifact reference or regenerate-on-demand | Direct file association. Storage, access lifetime, retention, and whether a file is needed are unresolved. Avoid permanent public URLs that grant ticket access. |
| `issued_at` (date) | `Ticket.issuedAt` | Direct mapping; set only when ticket issuance conditions are met, normally after server-verified payment for paid bookings. Comp/guest conditions need an approved rule. |

## Requirement coverage

| Capability | Coverage in supplied schema | Conditions / improvement needed |
| --- | --- | --- |
| One production, multiple performances | **Conceptually supported.** `Show` can represent the single play; `ShowSeat.show` can represent its occurrences only if modeled as Performance. | This project is one play per setup, not a general multi-production platform. Separate Production from fixed Performance records; all become bookable when published. |
| Independent inventory per show | **Supported conceptually.** `ShowSeat` joins seat to show with status/price/hold/booking. | Enforce unique active `(performance, seat)` allocation with database constraints and transactions. The same physical seat must remain usable on a different performance. |
| Temporary seat holds | **Represented incompletely.** `Held` and `hold_expires_at` capture a deadline. | Latest approved rule: online deadline is for proof upload only. Timely proof changes to non-expiring pending Admin review. Group flow uses separate 25-minute timer with approval pause. Schema needs explicit states/timer accounting and atomic expiry guards. |
| Payment confirmation | **Partially represented.** Booking has payment status/method/reference. | Latest online InstaPay flow requires private proof upload and Admin approval; a screenshot/reference is not payment confirmation. Group InstaPay proof also needs Admin approval; Cash receipt can be confirmed by own Booking Officer. Fields do not define evidence, review decisions or audit. |
| 48-hour cancellation and theatre cancellation/postponement refunds | **Partially represented.** `show_status` includes Cancelled; Booking has a status, and Payment has a reference/status. | Owner-approved policy is documented in the product/lifecycle specs. The supplied fields do not model cancellation actor/time, original and rescheduled schedule history, customer choice after postponement, refund entitlement vs provider processing, or ticket disposition. Add auditable performance-change and refund-entitlement records; verify provider refund/void capabilities, timing, and fee treatment externally. |
| Individual tickets per seat | **Structurally supported.** Ticket points to Booking and ShowSeat. | Create one ticket per sold seat line with a unique canonical token on Ticket; Booking-level tokens are never admission credentials (approved). Define reissue/revocation history. |
| QR validation and duplicate prevention | **Partially represented.** Token/status/used time/scanner fields are useful. | Use opaque QR payload, current server-side payment/performance/ticket checks, atomic one-time redemption, and scan/audit history. `used_at` alone is insufficient for concurrent scans or a complete audit. |

## Later owner requirements not represented by the supplied Bubble fields

The owner has since specified additional customer and Booking Officer requirements. The listed Bubble schema does **not** show fields or workflows for current guest/no-account booking-owner contact and delivery choice, private tracking link, conditional non-Christian attendee/document workflow, named Booking Officer accounts, separate 25-minute group holds, Booking Affiliation/Actor roster, full Cash/InstaPay collection evidence, discount/comp approvals, VIP invitations, group identity-document status, or specified audit/export controls. These are requirements for the new system; do not infer Bubble supports them or that omitted fields/workflows exist. Bubble remains a reference only and production data migration is not planned unless separately approved.

The latest owner consolidation further supersedes earlier assumptions: one play per setup; uniform ordinary ticket price; 15-minute online proof-upload deadline followed by indefinite held Admin review; conditional ID proof only for non-Christian attendees; VIP invitations are seatless/reusable and uncapped; refunds are manually processed and seats release only after return is confirmed. None of these later workflows can be inferred from the supplied Bubble fields.

## Recommended relational adjustments

1. **Separate production from occurrence (APPROVED).** `Production` stores the single configured play title/description and publication state. `Performance` stores each fixed date/time occurrence. All fixed performances become bookable when the play is published. Do not design a general multi-production catalogue for this project. Inventory/bookings attach to `Performance`.
2. **Model seat allocations explicitly.** Keep `Seat` as reusable master inventory. Represent each performance's offered seat/price/status in `PerformanceSeat`, or derive it from durable reservation/booking lines. Choose one source of truth.
3. **Enforce uniqueness in the database.** At most one active hold/confirmed sale per performance and physical seat; a different performance may reuse that seat. Use transactions/locking plus a database uniqueness strategy, not an availability read alone.
4. **Keep booking, hold, payment, and ticket lifecycles separate.** Add durable reservation/hold and payment attempt/event history as needed; do not overload free-text status fields.
5. **Make money exact and contextual.** Store amount and currency together, line-level historical price, and fee/tax/refund records after policy approval.
6. **Make tickets individual and redemption atomic.** One ticket per seat allocation, unique opaque token, current-state verification, one-time atomic redemption, and scan/audit event history.
7. **Retain history.** Use timestamps and controlled archive/cancel/revoke states. Avoid destructive deletion of referenced seats, bookings, payments, tickets, or scans.

## Bubble portability boundary

The supplied names and relationships are a reference for a new relational design. They do **not** establish that Bubble workflows, page logic, privacy rules, option sets, plugins, API credentials, payment callbacks, scheduled jobs, or database constraints are exportable as source code. Reimplement and independently verify business rules in the new server-side application. Production data migration is not planned; if requested later, it requires explicit approval, an authorized data export, owner-reviewed mapping, reconciliation, and a dry-run. This comparison does not authorize Bubble access or migration.

## Remaining verification and approval items

- Implement `Show.show_datetime` as a specific `Performance` occurrence, separate from reusable Production data, as approved.
- Apply the approved theatre-wide permanent seat-code rule and L/R/C meanings. The actual seat records, map geometry, viewing reference, `row_label`, and `seat_number` values still need to come from the authoritative inventory; do not invent them.
- Confirm Bubble `booking_status` and `ticket_status` value sets and historical transition behavior if records are to be migrated.
- The 15-minute proof-upload deadline and indefinite pending-review hold are approved. Verify secure proof submission and Admin reconciliation; do not infer payment proof from Bubble fields.
- Uniform ordinary price rule is approved; amount/currency remain to be supplied. Cancellation/refund entitlements and manual processing sequence are approved; external refund costs/evidence remain open.
- Verify any payment reference against an approved Egyptian provider; the Bubble fields do not demonstrate provider capability or secure verification.
- Confirm technical ticket/PDF private delivery and scan correction controls. Offline entry is not required at this stage. Same-performance VIP repeat-use rule remains open.
- If migration is in scope, approve export source, data access, field mapping, data-cleaning rules, privacy/retention, and reconciliation owner.
