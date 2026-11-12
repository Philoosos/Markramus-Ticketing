# Final pre-production readiness review

**Review date:** 2026-11-08  
**Status:** This pre-production snapshot is superseded by design documents 16–21 and the later Master Build Prompt. Local implementation/testing is now authorized. Public identity/about/archive pages are implemented; ticketing, staff roles, database and booking functions remain incomplete. No production deployment or external service is authorized.

## A. Project scope and confirmed business rules

The ticketing system serves one active production per setup; public historical archive entries are informational only. Title, description, venue, approved seat map, ordinary ticket price and fixed performances are entered at setup; publishing makes all fixed performances bookable. It is not a general multi-production ticketing platform. Ordinary price is uniform across Hall/Balcony, all performances and booking times. Hall/Balcony ordinary seats are sale inventory; photography seats are visible but unavailable; VIP invitations are seatless and separate. Supplied map images are approved visual references, while the separate canonical seat list remains to be reconciled.

Online customers have no account, may book 1–9 tickets and may create multiple independent bookings. Booking-owner name/mobile are recorded; email only when email is selected. Delivery choice is WhatsApp, email or both. Non-Christian attendee question/count controls the conditional ID-document flow. A private tracking link supports status/download; lost-link recovery is by Booking Officer and never mobile alone. Later build prompt clarifies four staff roles (SUPER_ADMIN, ADMIN, BOOKING_OFFICER, SCANNER) and guest CUSTOMER.

Online seats are held for 15 minutes to upload InstaPay proof. Timely upload moves to Held/Pending Admin Review without automatic expiry until Admin decision. Only Admin may approve/reject; upload does not confirm payment. Approval marks paid, confirms booking, issues per-ticket QR tickets and combined PDF, and sends through selected channels. Rejection cancels/releases immediately and records reason/actor/time.

Group bookings start at 10 tickets, use named Officer accounts and a 25-minute hold. A pending discretionary discount/comp approval pauses that timer and it resumes with remaining time; InstaPay proof review does not pause it. Full Cash/InstaPay only. Officer confirms own full Cash; InstaPay proof requires Admin approval. Booking Officers view all bookings/reports/financial detail, cannot export or edit another officer's booking without Admin permission. Only Admin exports.

Discounts: automatically apply tiers to qualifying online and group orders using total count including comps; discount only paid tickets; <30 none, 30–59 EGP 10 each, 60–89 EGP 20 each, 90–119 EGP 30 each, no 120+ tier. Discretionary discount/comp requests require Admin approval. Team member comp is one ordinary seat ticket per member for whole production run; Admin-managed roster; issued entitlement consumed even if unused. Admin can directly issue ordinary guest comps. VIP is named, Admin-only, uncapped, seatless, reusable across performances, per-use logged and revocable.

Customer cancellation/refund eligible at least 48 hours before start. Theatre cancellation is full refund; postponement is retain ticket or full refund with Admin-set deadline. Admin approves and manually processes refund. Seats remain unavailable until Admin confirms returned funds; then ticket/QR invalidated and seats released. Ordinary per-ticket QR is unique and single-use. Scanner uses a normal mobile browser with venue internet; no offline mode is required now.

## B. Clear APPROVED list

The decision register in document 13 is the source of detail. Approved items include:

- One production/play per setup; fixed performance schedule; all fixed performances bookable when published.
- Production/Performance separation, independent per-Performance inventory, permanent unique seat codes and L/R/C meanings.
- Uniform ordinary ticket price rule; seat category separation for ordinary, photography and VIP.
- Online 1–9 tickets, repeat bookings, guest access, channel choices, private tracking link and non-Christian attendee ID process.
- 15-minute proof-upload hold; timely upload suspends expiry indefinitely for Admin review; Admin-only decision, approval/rejection consequences.
- Group threshold 10; 25-minute hold paused for pending discount/comp approval; resume remaining time.
- Officer access/limits and Admin-only export; full Cash/InstaPay group payment and proof rules.
- Discount tiers, team comp entitlement, Admin guest comp, and VIP invitation rules including no numerical cap.
- Refund approval/manual processing/seat-release sequencing; prior 48-hour entitlement retained.
- Per-ticket canonical QR, ordinary single admission, VIP cross-performance reuse, online mobile-browser scanning.
- Bubble reference only and no migration without separate approval.

Owner approval of the operational ID flow does not mean legal/privacy approval. Vendor capability, technical detail and cost are not approved by implication.

## C. OPEN list by category

### Owner decisions/information

- Reconcile the owner-approved visual seat maps to the canonical machine-readable seat manifest; production details, fixed dates/times, venue and uniform price amount/currency.
- Production-change process after sales start for date, venue, map or price, including affected booking/ticket remedies.
- Proof-review criteria, notifications, staffing/escalation for indefinite queues; group proof rejection handling detail.
- Lost-link identity-safe recovery, delivery failure/manual fallback, customer-facing notices.
- Team roster verification and Admin workflow details; Actor roster lifecycle; same-performance repeat VIP-use rule.
- Refund evidence/accounting controls and operational roles.
- Admin/MFA/recovery/offboarding, identity-document viewing roles, and additional scanner accounts if desired.

### Legal/privacy review

Qualified Egypt-specific review of lawful basis/necessity for religion and ID documents, data protection requirements, notices/consent, minimization, permissibility, access, storage region, processors, retention/deletion and backups. No legal conclusion is made; owner operational approval does not close this gate.

### Technical verification

Atomic seat allocation and concurrent scan behavior; online proof state that never expires after timely submission; group timer pause/resume; safe release races; secure tracking links; private file upload/access; VIP reuse/revocation; audit integrity; production change impact handling; report calculation and restore testing.

### External service/provider research

Current InstaPay proof/reconciliation mechanism, manual refund workflow, WhatsApp/email delivery options and manual alternatives, private file storage, hosting/database/backup/monitoring options, data location, contractual terms and actual capabilities. No automated integration is assumed and no OTP is to be introduced.

### Costs and hosting

Dated EGP comparison of compute, database, domain, storage, backups, email/WhatsApp, transaction/manual handling, support, taxes and egress is in document 20. The USD 100/year owner target is confirmed but not verified achievable. Service ownership, domain, RPO/RTO and event-day operations remain open. No purchase/connection/deployment without owner authorization.

### Physical seat-map verification

Seat codes/counts, Hall/Balcony layout, coordinates/viewpoint, photography/blocked classifications and physical sign-off. Existing provisional maps/counts are not approval.

## D. Contradictions discovered and reconciliation

| Earlier documentation | Latest owner direction | Reconciliation |
|---|---|---|
| Multiple productions/show management | One specific play per setup | Latest direction supersedes; documents now describe one production with fixed performances. |
| Online required religion, full customer ID image, backup phone, email and WhatsApp/email OTP | Booking-owner name/mobile; email only if email delivery; attendee-level non-Christian count and conditional document process; no OTP | Replaced in PRD, journeys, privacy, data model and UI. Legal review remains open. |
| Online payment must be verified within 15 minutes or release; gateway authorization/capture research | 15 minutes is only the deadline to upload InstaPay proof; proof received in time holds seats indefinitely pending Admin review | Updated lifecycle, payment, dashboard, model and tests. Former expiry-during-review behavior is explicitly superseded. |
| Online customer ID image mandatory; group data/ID assumptions | Conditional proof for non-Christian attendees only; no full attendee profiles | Replaced and limited to privacy review gate. |
| Group discount values unresolved and pending approval timer behavior unresolved | Defined tier schedule; pending discount/comp pauses group timer and resumes remaining time | Recorded as approved; separated from online timer. |
| Officers' report/export access unresolved; Admin-only discounts/free tickets | Officers view all reports/financials but cannot export; Admin alone exports; team/guest comp and VIP rules defined | Added explicit role and entitlement rules. |
| VIP treated as possible seat allocation/ordinary ticket | Seatless, uncapped, named and reusable across performances | Documented as a separate invitation credential; unresolved same-performance repeat rule flagged. |
| Refund provider flow and possible immediate seat release | Manual Admin-approved refunds; retain seat until return confirmed, then invalidate/release | Updated workflow while preserving 48-hour/full-refund entitlements. |
| Potential offline scanning/unknown scanner hardware | Mobile browser, venue internet, no offline mode now | Removed offline mode from current scope; hardware not required. |

No unresolved contradiction should be treated as an approved default. Earlier provider, legal and cost blockers remain open where not superseded.

## E. Missing requirements and implementation blockers

- Visual Hall/Balcony references are owner-approved; reconciling every position/code/category to a canonical seat manifest remains a blocker for interactive seat sale.
- Price amount/currency, production copy, performance schedule, venue and contact details are missing.
- Legal/privacy approval and identity-data retention/access plan block live collection.
- Hosting, storage, delivery and payment-proof services need capability, cost and owner selection.
- Online indefinite review means held inventory has no automatic release while Admin review waits; staffing/SLA/escalation is essential but unspecified.
- Exact proof review/reconciliation, private link recovery, production-change remedies, refund evidence, role/session design and same-performance VIP reuse need specification.

## F. Technical design readiness assessment

**The project has entered technical design, captured in proposed documents 16–21; it is not ready for implementation.** Those documents now propose state transitions, entities, permissions, security, cost options and roadmap, but they deliberately leave concurrency details, private storage, legal review, timer edge semantics, provider costs, physical inventory and owner decisions open. The USD 100/year ceiling currently conflicts with the lowest realistic managed architecture totals. Design proposals require owner review; a final schema and integrations are not approved.

## G. Recommended next-stage plan

1. Owner reviews and approves this consolidated documentation and resolves any remaining business-policy ambiguity.
2. Prepare technical architecture and detailed implementation plan, including state diagrams, permissions, threat model and concurrency strategy.
3. Compare hosting/domain/provider options and total costs, including manual alternatives; present evidence before any service activation.
4. Finalize data model and security design, conditional identity flow, private file handling, audit and retention after qualified Egypt-specific legal review.
5. Prepare implementation milestones, acceptance criteria and test plan.
6. Local application coding/testing is authorized by the later Master Build Prompt; obtain separate approval before paid services, external accounts, production integrations or deployment.

## H. Change boundary

This review changed Markdown documentation under `docs/pre-production/` only. No application code, package/dependency files, database schema/migrations, external services/accounts, deployment or publication were changed. Implementation has **not** started.
