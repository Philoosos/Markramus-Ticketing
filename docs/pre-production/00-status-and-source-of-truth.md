# Status and source of truth

## Project scope

- Saint Mark Drama Team in Egypt; one theatre, one specific production/play per project setup, and fixed performances entered at initial setup. This is not a general multi-production platform.
- The ticketing system supports one active Production per setup, entered with approved title, description, venue, seat map, fixed performances, and ordinary ticket price. All fixed performances are made bookable when published. The public website also includes a distinct informational archive of historical productions; archive records are not ticketable productions.
- Next.js, TypeScript, Prisma, PostgreSQL, Arabic-first RTL are the documented technical baseline. Bubble remains a reference only; production data migration is not planned.
- Owner budget target is USD 100/year total for the complete operating solution. This is a constraint, not a verified achievable provider quote; current comparison finds no safe/practical complete option verified at this total.
- Documents 16–21 are the proposed Technical Design and Implementation Planning package. The later Master Build Prompt authorizes local coding/testing; these documents do not select providers or authorize purchases, external account creation, paid connections or deployment.
- Documentation only until the owner approves the next stage. No code, package, migration, service, account, purchase, or deployment changes are authorized by this documentation task.

The owner later explicitly authorized local application implementation and local testing through the Master Build Prompt. That authorization supersedes the earlier documentation-only restriction, but does not permit purchases, external accounts, paid-service connections, live payment/delivery integration, or deployment.

## Latest owner-confirmed requirements

The latest owner-provided consolidation and Master Build Prompt supersede older conflicting requirements. Confirmed operational rules include: 1–9 tickets per online booking and unlimited independent bookings; 10+ tickets as a group booking; ordinary uniform ticket price across seats, areas, performances, and booking times; online InstaPay proof submission under the special 15-minute/review lifecycle; named staff accounts across the five user categories; Admin/Super Admin approval where specified; full group payment; approved quantity discounts and team comp rules; reusable seatless VIP invitations without a numerical cap; manual Admin/Super Admin-approved refunds; and internet-connected browser scanning without offline mode.

### Customer and identity workflow

- Customers have no permanent account. Online booking records the booking owner's name and mobile; email is collected if email delivery is selected. Customer chooses WhatsApp, email, or both for delivery. A secure private tracking link lets the customer check status and download issued tickets; a lost link is recovered through a Booking Officer, never mobile-number-only disclosure.
- Online flow asks whether any attendees are non-Christian. If yes, collect the count and use the secure ID-document process. Do not require full profiles for each attendee. Group booking requires identity proof only for non-Christian attendees; Booking Officer obtains and securely records it.
- No SMS/WhatsApp OTP is to be introduced. Owner rejected paid or complicated OTP verification. This supersedes older proposed OTP requirements.
- Legal basis, necessity, transparency, data minimization, storage/access, retention/deletion, and permissibility of religion/ID workflow remain open for qualified Egypt-specific review; no legal conclusion is made.

### Inventory, booking, payments, tickets

- One theatre with Hall (الصالة) and Balcony (البلكونة). Each Performance has independent inventory; the same physical seat may sell on another Performance.
- VIP invitations are separate, seatless, named, reusable on different performances, and unlimited in number. Photography seats are visible but never ordinary sale inventory. Ordinary complimentary tickets use ordinary seats. VIP and photography categories must be visually distinct.
- Staff roles are Super Admin, Admin, Booking Officer, and Scanner, each on individual accounts. Customers remain guest users without accounts. Super Admin owns system/security administration; Admin handles permitted operations but cannot administer Super Admin accounts or critical ownership/security settings. Scanner access is limited to admission validation.
- Online reservation: selected seats are held for 15 minutes for the customer to upload InstaPay transfer proof. Proof uploaded in time changes the state to Held/Pending Admin Review indefinitely until an Admin or Super Admin decides. The original expiry must not release seats during review. Screenshot/reference is not payment confirmation. Only Admin/Super Admin approves or rejects proof. Approval marks Paid, confirms booking, issues individual QR tickets and combined PDF, and sends via selected channels. Rejection cancels, releases seats immediately, records reason/actor/time, and issues no ticket. No partial payment.
- Group reservation: 25-minute hold. A pending Admin decision on a requested discretionary discount/comp pauses the timer; after decision it resumes with remaining time. InstaPay proof review does not pause the group timer. Group methods are Cash/InstaPay; full payment only. Booking Officer can confirm full Cash receipt personally; InstaPay requires proof and Admin approval. Rejected proof cancels and releases seats.
- Every ordinary ticket has one canonical unique per-ticket QR. Ordinary admissions cannot be used twice. VIP invitation QR may be reused across performances and every use is logged.
- Cancellation/refund: theatre cancellation full refund; postponement gives retain-or-full-refund choice with Admin-set response deadline; customer refund cutoff is at least 48 hours before start. Admin/Super Admin approval required; refunds are processed manually. Seats remain unavailable until Admin/Super Admin confirms funds returned, then tickets/QRs are invalidated and seats released.

## Previously approved decisions still in force

- Production is separate from Performance; inventory is independent per Performance.
- Seat codes are permanent and unique theatre-wide; L/R/C mean Left/Right/Center, with viewing direction stated on approved map.
- Bubble reference only; no planned production-data migration without separate approval.
- Per-ticket unique canonical QR; booking-level token is not an admission credential.
- Customer cancellation/refund cutoff is 48 hours; theatre cancellation full refund; postponement retain-or-full-refund.

## Provisional source material / not to invent

- The owner identifies the supplied Hall and Balcony images as approved visual layout references. A separate canonical, machine-readable seat manifest was not found in this project. Do not invent codes or counts; reconcile each map label to its permanent seat code and category before building a sellable interactive map.
- Official logo and brochure are present under `Markramus-assets-reference/assets-reference/`. Production content, final performance schedule, venue address, and final host/domain/provider decision are not established here.
- Ordinary price is uniform per latest owner instruction, but its EGP amount is not supplied.

## Open external and owner matters

Egyptian legal/privacy review, hosting/domain and service selection, delivery-provider availability and pricing, InstaPay proof/review process, private storage details, refund handling controls, exact venue/map verification, unknown data retention and role scope remain open. The USD 100/year constraint remains owner-confirmed but provider feasibility is not. See [13-open-questions-and-approvals.md](13-open-questions-and-approvals.md), [20-hosting-and-service-cost-comparison.md](20-hosting-and-service-cost-comparison.md) and [15-pre-production-readiness-review.md](15-pre-production-readiness-review.md).

## Technical design document status

- [16 Technical architecture](16-technical-architecture.md): PROPOSED; no provider selected.
- [17 Workflows and state machines](17-workflows-and-state-machines.md): PROPOSED; open timer edges and operational details remain explicitly listed.
- [18 Data model and permissions](18-data-model-and-permissions.md): PROPOSED conceptual design; no Prisma schema/migration created.
- [19 Security, privacy and threat model](19-security-privacy-and-threat-model.md): PROPOSED; sensitive-data collection/use remains legally gated.
- [20 Hosting/service cost comparison](20-hosting-and-service-cost-comparison.md): current public-price comparison checked 2026-11-08; no provider selected; $100/year feasibility not established.
- [21 Implementation roadmap](21-implementation-roadmap.md): PROPOSED sequence; local implementation is authorized by the later Master Build Prompt, while external services and deployment remain unauthorized.

## Local implementation status

- Local implementation is authorized by the latest Master Build Prompt; production deployment and external-service connections remain prohibited.
- The public home, team/about page, historical archive list, and archive detail routes are implemented from the supplied logo and brochure. Booking, internal roles, database persistence, and ticketing workflows are not yet implemented.
- `START-LOCAL.bat`, `STOP-LOCAL.bat`, and local PostgreSQL Compose configuration are prepared. They were not run because npm and Docker are unavailable in this computer environment.
- Seat-map images are approved visual references, but no separate machine-readable canonical manifest was located. Interactive sale inventory remains blocked until visual labels, categories, and permanent seat records are reconciled.

## Precedence

The latest explicit owner instruction takes precedence over older contradictory text. Approved earlier decisions remain unless expressly superseded. Statuses in the approval register identify the source/date; do not infer approval for any unresolved implementation, legal, cost, or provider detail.
