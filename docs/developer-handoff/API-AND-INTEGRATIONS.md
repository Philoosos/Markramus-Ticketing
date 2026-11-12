# API and integrations

## Implemented

Only public server-rendered static pages and local archive data exist. No booking API, authenticated API, external provider adapter, payment, messaging, QR generation, PDF creation, or scanner validation is implemented.

## Required future endpoints/actions

- Guest: list Production/Performances, read seat availability, atomically hold seats, submit proof, read booking through high-entropy private tracking link, download ticket after confirmed state.
- Staff: authenticated role-filtered booking/group operations, proof decision, approved discounts/comps, refunds, cast/credits/archive edits, reports/export, audit review and QR scan validation.
- Enforce authorization and state transitions server-side. Use idempotent/atomic operations for holds, expiry, approvals, ticket issue, refund release, and scan.

## External providers deferred

Do not integrate a live gateway or automated InstaPay: proof review is manual and Admin-controlled. WhatsApp/email automation, object storage, hosting and domain provider are unselected and require owner approval and current price/terms review. Local development operations must be clearly simulated and never claim real payment or message delivery.
