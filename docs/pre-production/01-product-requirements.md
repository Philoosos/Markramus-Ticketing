# Product Requirements Document

## Scope and goals

Build an Arabic-first responsive public website and ticket booking/entry system for Saint Mark Drama Team in Egypt. The ticketing system supports one active Production per setup; the public website also presents team history and an informational previous-productions archive. Historical records are not ticketable productions. The active Production has fixed performances, venue, approved seat map, and one ordinary ticket price; all performances become bookable when published.

Baseline: Next.js, TypeScript, Prisma, PostgreSQL, portable configuration and secrets via environment variables. Branding is Arabic-first RTL with deep theatrical red, black, warm off-white and restrained antique gold; use only owner-supplied logo assets. Local implementation/testing is now authorized by the Master Build Prompt; production use remains gated.

## User types

- **Customer:** guest checkout, no account, 1–9 tickets per online booking; may create multiple independent bookings. Supplies booking-owner name and mobile. Email is collected when email delivery is selected. Chooses WhatsApp, email, or both. Receives a private tracking link for status and issued-ticket downloads; lost link recovery is through a Booking Officer, never disclosure based on mobile alone.
- **Booking Officer:** named individual account; group booking starts at 10 tickets. Can view all bookings/reports and financial details, cannot export, and cannot modify another officer's booking without Admin permission. Can confirm full Cash receipt for own group booking. All actions audited.
- **Super Admin:** full system ownership/control, including system/security settings and management of Admin, Booking Officer, Scanner, and Super Admin accounts under secure controls.
- **Admin:** operational administration, including exports, proof review, refunds, seats, production details, cast/credits, and VIP invitations as permitted. Cannot manage Super Admin accounts or critical reserved ownership/security settings. Admin alone (with Super Admin) approves/rejects proof and discount/comp requests.
- **Booking Officer:** individual account; approved group booking workflow and permissions, without exports or another Officer's booking edits absent Admin permission.
- **Scanner:** individual account limited to admission scanning and minimum necessary admission details; no management, payment, proof, or export access.
- **Customer:** guest flow only; no login, permanent account, password, or OTP.

## Core confirmed requirements

1. One theatre, Hall (الصالة) and Balcony (البلكونة); owner-approved visual references are supplied. Reconcile the permanent seat manifest/counts/categories to those images before enabling sales.
2. Fixed performances, all bookable at publish. Each has independent seat availability. Same physical seat can be sold at another performance.
3. Ordinary bookable seats share one ticket price across Hall/Balcony, every performance, and booking time. No early-bird/time/area pricing. Price amount/currency still to be supplied.
4. Hall/Balcony ordinary seats can be sold; photography seats appear but cannot be sold; VIP invitations are invitation-only, seatless, and separate. Ordinary free tickets use ordinary seats.
5. Public archive contains informational historical productions, cast/source/credits where provided; it remains separate from active ticket inventory. Credits and cast are distinct. Active cast assignment is performance-specific.
6. Online reservation and InstaPay-proof flow follows document 04. Group flow is distinct and starts at 10 tickets, with 25-minute hold and full Cash/InstaPay payment.
7. Quantity discount tiers apply to total ticket count including comp tickets, but discount only paid tickets: <30 none; 30–59 EGP 10 off each paid ticket; 60–89 EGP 20 off; 90–119 EGP 30 off; no 120+ tier required.
8. Team member comp: one free ordinary seat ticket per individual team member across the entire production run, not per performance; Admin maintains member list. Once approved and issued, consumed even if unused. Admin may directly issue ordinary guest comp tickets.
9. VIP invitations: named, seatless, no numerical cap, reusable across performances; every use logged; Admin can revoke. Separate from ordinary comp.
10. Refund/cancellation policy is in document 04: Admin approval, manual processing, seats retained until refund return confirmed.
11. Individual ordinary tickets have canonical unique QR; server validates each scan; normal mobile browser, venue internet, no offline mode now. Reusable VIP invitations have distinct repeat-use logic.

## Privacy

Online customer gives booking-owner contact details only and answers whether any attendees are non-Christian. If yes, record count and use secure ID-document process. Group ID proof applies only to non-Christian attendees. No full attendee profile. No SMS/WhatsApp OTP. Legal necessity, lawful basis, notice, minimization, security, access, retention, deletion, and permissibility remain OPEN for qualified Egypt-specific review.

## Success and acceptance

No duplicate ordinary admission or per-performance seat sale; payment proof never auto-confirms; tickets issue only after Admin or Super Admin approves InstaPay or an expressly allowed full Cash receipt/comp condition is satisfied; timer and review hold behavior correct; no photo/VIP seat allocation; VIP use logged per performance; officer restrictions and Admin/Super Admin-only export enforced; all relevant actions auditable; privacy review and costs/hosting approved before launch.

## Exclusions

Multiple productions in one installation, customer accounts, OTP, partial payments, offline scanning, time/area pricing, VIP seat assignment/cap, invented inventory, Bubble migration, paid services without cost review/owner authorization, and implementation during this pre-production task.
