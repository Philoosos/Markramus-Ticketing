# Functional requirements and user journeys

Latest owner-confirmed requirements supersede earlier conflicting versions. Detailed timing and transitions are in document 04.

## Public and online booking

- **FR-01:** Present the one configured production and its fixed performances. Publishing makes all fixed performances bookable.
- **FR-02:** Show verified seat categories and availability per performance. Photography seats are visible/unavailable; VIP invitations are not seats.
- **FR-03:** Customer selects 1–9 seats. Any number of independent bookings is permitted.
- **FR-04:** Collect booking-owner name and mobile. Collect email only if email delivery is selected. Choose WhatsApp/email/both. Ask whether any attendees are non-Christian; if yes, record count and follow secure ID submission requirements after privacy/legal review. Do not capture full attendee profiles.
- **FR-05:** Create a private tracking link to booking state and issued-ticket downloads. Lost link recovery requires Booking Officer support and an identity-safe procedure; mobile number alone must never expose a booking.
- **FR-06:** Hold selected seats for 15 minutes for uploading InstaPay transfer proof. Timely proof submission suspends expiry and remains Held/Pending Admin Review without automatic expiration. Screenshot/reference is not payment confirmation.
- **FR-07:** Only Admin or Super Admin approves/rejects online InstaPay proof. Approval marks Paid/confirmed and triggers tickets/PDF/delivery. Rejection cancels and releases seats immediately with reason and audit. No partial payments.

## Group booking

- **FR-08:** Group flow is for 10 or more tickets through an individually named Booking Officer account.
- **FR-09:** Officers can view all bookings/reports and financial detail, cannot export, and cannot edit another officer's booking without Admin permission.
- **FR-10:** Group seats are held for 25 minutes. A pending requested discount or comp approval pauses countdown; after decision it resumes with remaining time. InstaPay proof review does not pause the timer. Expiry releases unconfirmed seats safely.
- **FR-11:** Cash/InstaPay, full payment only. Officer may confirm full Cash received from their own account. InstaPay requires uploaded proof and Admin/Super Admin approval. Rejection cancels/releases immediately with actor/reason/time.
- **FR-12:** Capture organizer/contact and chosen ticket delivery channel(s); collect affiliation Specific Actor, Team, or General Audience. Actor list is Admin-managed; invent no names.
- **FR-13:** Group ID proof only for non-Christian attendees; officer securely obtains and records it. No full attendee profiles.
- **FR-14:** Post-payment changes require Admin/Super Admin approval and participation. Group booking cancellation requires Admin/Super Admin approval.

## Discounts, comps, VIP

- **FR-15:** Automatically apply approved quantity tiers to qualifying online and group bookings based on total ticket count including comps, discounting paid tickets only. No 120+ tier. Discretionary discounts remain subject to Admin approval.
- **FR-16:** Officers request but do not approve discounts/comps. Admin/Super Admin approval is required; record requester, approver, reason and time. Approval request pauses group timer; resume remaining time after decision.
- **FR-17:** Team member gets one free ordinary seat ticket per production run; Admin manages roster. Approved issuance consumes entitlement even if unused. Admin may directly issue ordinary guest comp tickets. Each comp has ordinary seat and unique ticket QR.
- **FR-18:** Admin or Super Admin issues named VIP invitations with contact/delivery. No seat/performance binding or numerical cap. Same QR may be used on multiple performances, logging each use; Admin/Super Admin may revoke.

## Cancellation, reports, scanning, audit

- **FR-19:** Customer refund eligible at least 48 hours before performance start. Theatre cancellation gives full refund; postponement offers retain or full refund by Admin-set deadline. Admin/Super Admin approves and manually processes refunds. Seats remain unavailable until Admin/Super Admin confirms return, then tickets/QRs are invalidated and seats released.
- **FR-20:** Ordinary tickets are single-use; server checks and updates all devices promptly. Scan result: Valid/admitted, Already used, Cancelled, Invalid. Log scan time/account. VIP reuse rules differ.
- **FR-21:** Reports cover combined and per-performance sales/inventory, pending proof review and wait age, received/refunded amounts, method, comps, VIP invitations/use, attendance/scans, affiliation/actor. Officers may view all reports/financial details but cannot export. Only Admin exports Excel/CSV.
- **FR-22:** Audit booking, holds, proof, payments, approval, edits, cancellation/refund, ticket issue, scan, role changes, ID access and exports with actor, time, action/change and reason where relevant.

## Journeys

### Customer online
Choose performance/seats (1–9) → enter owner name/mobile, optional email if emailing, delivery choice, non-Christian attendee yes/no and count if yes → create private tracking link and 15-minute hold → upload InstaPay proof before expiry → remain held indefinitely pending Admin review → Admin approves: paid/confirmed, individual QR tickets, combined PDF and selected delivery; or rejects: cancel, release, record reason.

### Booking Officer group
Sign in individually → select performance and at least 10 tickets → select seats, organizer/contact, affiliation and delivery → 25-minute hold → request applicable discount/team or guest comp (timer pauses until decision, then resumes remaining time) → receive full Cash or upload InstaPay proof for Admin approval → finalize after full payment and approvals; rejected/expired operation releases seats per document 04.

### VIP entry
Admin issues named invitation with unique QR and selected delivery. Scanner validates invitation and performance, logs each use. Same invitation can admit on another performance; no ordinary duplicate-ticket rejection is applied across performances. Admin can revoke.

### Refund
Customer requests within policy → Admin approves and manually processes → seats remain unavailable until Admin confirms refund returned → invalidate ticket/QR and release seats; full audit. Postponement choice deadline is set per event by Admin.
