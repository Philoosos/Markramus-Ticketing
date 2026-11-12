# Conceptual data model

Documentation design only; no Prisma schema or migration is created here. Model must support a single configured Production with multiple fixed Performance records.

## Entities

- `Production`: one play's title/description/venue/publication metadata.
- `Performance`: fixed date/time per occurrence, bookable when Production is published, own independent inventory.
- `Seat`: permanent theatre-wide unique code, Hall/Balcony and physical layout/category metadata.
- `PerformanceSeat` or equivalent: per-Performance ordinary seat availability/hold/sale; photography seats remain visible and never sellable. VIP is not a seat.
- `Booking`: channel Online/Group, owner/organizer contact, private tracking credential, Performance, count, lifecycle, delivery preference, totals, creator and audit timestamps.
- `BookingSeat`: ordinary seat allocation and exact price snapshot.
- `Reservation`: hold status/timestamps and timer policy. Online: 15-minute proof deadline; successful timely proof transitions to no-auto-expiry pending-review state. Group: 25-minute timer, paused by pending discount/comp review, resumes remaining time.
- `PaymentProof`: private proof object reference, submission time, submitter, review state, Admin decision/reason/time. Submitted proof is not payment confirmation.
- `Payment`: method (InstaPay/Cash as allowed by flow), amount, status, received/confirmed time, confirmer, evidence. Full payment only.
- `DiscountRequest`/`DiscountDecision`: tier/value, qualifying total count, requester, Admin decision, reason/time. Track paid-ticket-only discount calculation.
- `TeamMember`: Admin-managed member identity and production-run comp consumption.
- `CompTicket`: type (team/guest), approval or direct Admin issuance, ordinary seat, issued Ticket and consumption state.
- `Actor`: Admin-managed affiliation list; Booking affiliation is Specific Actor/Team/General Audience.
- `IdentityDocument`: private document object, linked only as needed to booking/count and secure submission; exact non-Christian attendee linkage is open.
- `VIPInvitation`: named recipient/contact/delivery, unique QR, active/revoked state, no seat/performance binding, no cap.
- `VIPUse`: invitation, performance, scan time, scanning account; supports reuse across different performances.
- `Ticket`: individual ordinary ticket, one seat and performance, unique canonical token, issued/revoked state and scan history.
- `Refund`: policy entitlement/request, Admin approval, manual processing evidence, returned-confirmed time, then seat release and ticket invalidation.
- `User`, `Role`, `AuditEvent`: individual accounts, role permissions, actor/time/reason and before/after event. Admin exports only; officers read reports but cannot export.

## Relationships and invariants

One Production → many fixed Performances. Each Performance → independent seat allocations and Bookings. Same Seat can sell on distinct Performances, but only one active ordinary allocation per seat/Performance. Booking → multiple seat lines, payments/proofs and tickets. Ordinary Ticket → one canonical unique QR. VIP Invitation → many uses on different Performances.

Use database transactions/constraints for concurrent holds/scans. Expiry worker must inspect current reservation state: no release during online Admin review, no release of confirmed booking, and group pause/resume uses remaining duration. Amounts stored exactly with currency. Preserve history of price/schedule/map changes. Do not mutate prior bookings/tickets automatically after production changes.

## Open schema details

Tracking-token handling/expiry, proof metadata, document-attendee linkage minimization, manual refund evidence, transaction isolation/locking strategy, enums/indexes, privacy/retention, permitted Admin subroles, and whether to materialize `PerformanceSeat` remain technical design items. Bubble reference is not a migration target.
