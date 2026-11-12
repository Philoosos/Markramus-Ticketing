# Approval register and open questions

Latest owner consolidation pasted 2026-11-08 is the source for decisions dated here. Older requirements it contradicts are superseded. This register separates confirmed policy from items still open.

Technical design documents 16–21 remain proposed design references. The later Master Build Prompt explicitly authorizes local implementation and local testing. It does not authorize purchases, external accounts, paid-service connections, live payment/delivery integration or deployment. Cost comparison 20 is based on public provider pages checked on 2026-11-08; provider selection and the USD 100/year feasibility remain OPEN.

## Approved / owner-confirmed

| ID | Decision | Status |
|---|---|---|
| A-01 | One theatre and one specific production/play per setup, not a general multi-production platform; fixed performances entered at setup; all bookable at publication. | APPROVED 2026-11-08 |
| A-02 | Production separate from each Performance; each Performance has independent inventory; same physical seat may sell on another Performance. | APPROVED earlier; reaffirmed 2026-11-08 |
| A-03 | Permanent, unique theatre-wide seat codes; L/R/C mean Left/Right/Center, with viewpoint on approved map. | APPROVED earlier |
| A-04 | Ordinary price identical for all ordinary seats, Hall/Balcony, every performance and booking time; no early-bird/area/time pricing. | APPROVED 2026-11-08; amount/currency open |
| A-05 | Hall/Balcony ordinary inventory; photography seats visible but never ordinary sale; VIP invitations seatless; ordinary comp uses ordinary seats. | APPROVED 2026-11-08 |
| A-06 | Online customer guest flow, 1–9 seats per booking, may create multiple independent bookings; booking-owner details only; private tracking link and recovery through Booking Officer, never mobile-only disclosure. | APPROVED 2026-11-08 |
| A-07 | Customer chooses WhatsApp, email or both; email collected when email delivery selected. No SMS or WhatsApp OTP. | APPROVED 2026-11-08 |
| A-08 | Online asks whether any attendees are non-Christian; if yes, record number and use conditional secure ID-document process, subject to legal/privacy gate. No full attendee profiles. Group ID proof only for non-Christian attendees. | Operational workflow APPROVED 2026-11-08; legal permissibility OPEN |
| A-09 | Online seats held 15 minutes for InstaPay proof upload. Timely proof transitions to Held/Pending Admin Review with no automatic expiry until Admin/Super Admin decision. Admin/Super Admin-only approval/rejection; upload is not payment confirmation; rejection cancels/releases immediately with reason/actor/time; approval marks paid/confirms/issues tickets/PDF/delivery. | APPROVED 2026-11-08; payment/provider feasibility OPEN |
| A-10 | Group bookings start at 10 tickets, handled by individual Officer accounts; 25-minute hold. Pending discount/comp approval pauses timer; after decision timer resumes with remaining time. InstaPay proof review does not pause the timer. | APPROVED 2026-11-08 |
| A-11 | Booking Officers can view all bookings/reports including financial detail; cannot export/download reports or change another officer's booking without Admin permission. Only Admin/Super Admin exports Excel/CSV. | APPROVED 2026-11-08; role scope clarified by A-24 |
| A-12 | Group methods Cash/InstaPay; full payment only. Officer may confirm own full Cash; InstaPay proof requires Admin/Super Admin approval. Rejected proof cancels/releases immediately. | APPROVED 2026-11-08; role scope clarified by A-24 |
| A-13 | Booking affiliation Specific Actor (Admin-managed list), Team, General Audience. Do not invent actor names. Organizer/contact and delivery choice recorded. | APPROVED 2026-11-08 |
| A-14 | Quantity discounts by total ticket count including comps, applied only to paid tickets: <30 none; 30–59 EGP 10 each; 60–89 EGP 20 each; 90–119 EGP 30 each; no 120+ tier. | APPROVED 2026-11-08 |
| A-15 | Officers may request but not apply discount/comp without Admin/Super Admin approval; record requester, approver, reason/time. Team member gets one ordinary free ticket/member for entire production run; Admin-managed list; approved issuance consumes even if unused. Admin/Super Admin may directly issue ordinary guest comps. | APPROVED 2026-11-08; role scope clarified by A-24 |
| A-16 | VIP invitation Admin/Super Admin-only, named, no seat/performance binding, no numerical cap, unique QR reusable across performances, each use logged, revocable. Delivery WhatsApp/email/both. | APPROVED 2026-11-08 |
| A-17 | Customer refund eligibility at least 48 hours before start; theatre cancellation full refund; postponement retain or full refund with Admin-set deadline. Admin/Super Admin approval, manual refund, retain seats until Admin/Super Admin confirms return, then invalidate QR/release seat. | APPROVED 2026-11-08; retains prior entitlement; role scope clarified by A-24 |
| A-18 | Ticket-specific canonical unique ordinary QR; ordinary ticket not admitted twice. Mobile browser scanner, internet available, no offline mode now; server validation; scan time/account; valid/already used/cancelled/invalid feedback. Admin can scan/do all functions. | APPROVED 2026-11-08 |
| A-19 | Individual Admin accounts and audit attribution for sensitive/operational actions. Super Admin ownership and elevated system powers are clarified by A-24. | APPROVED 2026-11-08; supersedes earlier account-owner wording |
| A-20 | Bubble is reference only; no production data migration unless separately approved. | APPROVED earlier; reaffirmed |
| A-21 | Target annual total operating budget is USD 100, including hosting, database, domain, storage, backups, messaging, monitoring, taxes and unavoidable costs. This is a constraint, not evidence of feasibility or a provider quote. | APPROVED as owner budget target 2026-11-08; feasibility OPEN |
| A-22 | The supplied Hall and Balcony images are owner-approved visual layout references. Keep existing permanent seat labels; reconcile them to the canonical inventory before enabling interactive seat sales. | APPROVED by Master Build Prompt 2026-11-08; machine-readable inventory reconciliation OPEN |
| A-23 | Public team history and previous-production archive are informational content records; they do not add multiple active ticketable productions to the one-Production ticketing model. | APPROVED by Master Build Prompt 2026-11-08 |
| A-24 | Staff roles are SUPER_ADMIN, ADMIN, BOOKING_OFFICER, and SCANNER with individual accounts; CUSTOMER has no login. Super Admin owns system/security administration; Admin cannot manage Super Admin accounts or reserved critical ownership/security settings; Scanner is admission-only. | APPROVED by Master Build Prompt 2026-11-08; exact Admin account-management delegation and recovery remain OPEN |

## Open items

### Owner decisions / information

- Reconcile every label/position/category in the approved Hall/Balcony reference images to the canonical permanent seat manifest. The images are approved visual references; the separate machine-readable inventory and unresolved label/category conflicts remain an implementation blocker. Do not invent counts or codes.
- Supply production title/description, fixed performances, venue/address/time zone, ordinary price amount/currency, and support contacts.
- Define customer notice wording and manual fallback for WhatsApp/email delivery; decide how lost tracking-link requests are authenticated and handled.
- Define production-change procedures after sales begin for date/time, venue, seat map and price impacts; no automatic changes to existing bookings/tickets.
- Specify team-member identity/entitlement evidence, roster maintenance and guest-comp authorization details; team entitlement consumption rule itself is approved.
- Clarify whether VIP may be used more than once on the same Performance (cross-performance reuse is approved), plus same-performance duplicate policy.
- Define proof review rejection criteria and staffing/escalation for indefinite pending review; define Admin notification channel.
- Define identity-document count/status workflow and minimum secure document-to-group association without unnecessary attendee profiles.
- Define role-specific document access, Admin account recovery/MFA, scan accounts if any, account offboarding, and private tracking-link expiry/revocation.
- Decide whether Admin accounts may create or manage Booking Officer and Scanner accounts; the Master Build Prompt says “if permitted” but does not settle that delegation.
- Define manual refund evidence/reconciliation and accounting controls; seats remain unavailable until Admin confirms returned funds.

### Legal and privacy review (OPEN; qualified Egypt-specific review)

- Lawful basis and necessity for religion-related information and identity documents; data protection obligations; transparency/consent; minimization; permissibility.
- Storage location, encryption, access/download authority, processor arrangements, retention/deletion including backups, subject rights and incident handling.
- Owner approval of workflow is not legal approval; no legal conclusion is made here.

### Technical verification (OPEN)

- Safe private proof/identity upload and storage, file validation, access logging and deletion.
- Atomic allocation; expiry worker excludes online pending-review; group timer pause/resume; rejection/release races; QR scan updates across devices.
- Private tracking-link token/recovery and ticket-download authorization.
- VIP reusable invitation logic across performances and revocation propagation.
- Audit integrity/retention, report calculations, restore and production-change impact workflow.

### External service/provider research (OPEN)

- InstaPay proof collection/reconciliation, Admin verification steps and proof authenticity limitations; no automation assumed.
- WhatsApp/email delivery in Egypt, automation constraints, manual alternatives, actual pricing and delivery failure handling. No OTP.
- Private storage, data region, current hosting/database/backup/monitoring terms and costs.
- Manual refund workflow, evidence, fees and timelines. No automated refund capability assumed.

### Cost and hosting decisions (OPEN)

- Detailed dated cost comparison is in document 20. Find a safe/practical complete solution within the USD 100/year target or ask owner to revise the target; current reviewed options exceed it.
- Domain, data region, traffic/storage, operator, RPO/RTO, recovery and event-day support remain open.
- Owner approval required before paid service/account activation or deployment.

### Physical map verification (OPEN, implementation blocker)

- Deliver exact owner-approved seat file/diagram with codes, counts, areas, layout/viewpoint, ordinary/photo/blocked classifications and physical verification. Existing map/counts stay provisional.

## Previously approved decisions retained

Production/Performance distinction, per-Performance inventory, permanent seat codes/L-R-C meanings, unique per-Ticket QR, Bubble reference/no migration, and 48-hour cancellation/refund entitlements remain approved. Latest instructions add details without removing these decisions.
