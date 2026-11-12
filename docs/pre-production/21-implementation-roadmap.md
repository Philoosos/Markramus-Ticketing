# Implementation roadmap

The later Master Build Prompt authorizes local implementation and local testing using this roadmap. It does not authorize purchases, external service/accounts, live payment/delivery connections or deployment. Phase-level privacy, physical inventory, provider, and production gates continue to block affected functions until resolved.

## Phase 1 — Final owner decisions and legal/privacy gates

**Inputs:** Review of documents 16–21; physical seat map/counts; production/performance/venue/price details; legal counsel review of conditional religion/ID workflow; staff roles and delivery process.

**Deliverables:** Updated approved decision register; accepted privacy notice/data-minimization approach; retention/access policy; proof-review, tracking-link recovery, VIP same-performance, production-change, and refund evidence rules.

**Dependencies:** Qualified Egypt-specific legal/privacy review; owner supplies operational source material.

**Acceptance:** No business rule needed for core implementation remains ambiguous; sensitive-data collection is explicitly cleared for use or replaced with an approved less intrusive method.

**Risks:** Legal review may reject or narrow identity collection; absent physical map blocks seat UI; indefinite pending review needs Admin staffing.

**Approval before proceeding:** Owner accepts final scope, policy choices and privacy/legal gate outcome.

## Phase 2 — Hosting and service selection

**Inputs:** Confirmed annual budget or revised budget, volume/traffic estimates, document retention, delivery channel choice, data-location/privacy requirements, cost comparison 20.

**Deliverables:** Selected app host, PostgreSQL, domain, private storage, email/WhatsApp or manual fallback, backups/monitoring; vendor terms, exact recurring/usage costs, data region and account owner recorded.

**Dependencies:** Budget decision and legal/region requirements.

**Acceptance:** All components fit approved total cost or owner explicitly revises budget; restore/security/availability requirements met; no unexplained usage cost.

**Risks:** $100/year target not achieved by current realistic options; low-cost VM entails significant operations; messaging and taxes unknown.

**Approval before proceeding:** Explicit owner approves provider list, costs and account/service creation.

## Phase 3 — Database and security foundation

**Inputs:** Approved model and permissions (18), threat model (19), auth provider/session decision, retention/access rules, recovery targets.

**Deliverables:** Final relational schema/migration plan, individual Admin/Officer login, server permission middleware, audit, private object storage boundary, secrets/deployment configuration and backup/restore design.

**Dependencies:** Phase 1–2.

**Acceptance:** Unauthorized cross-role access denied; audit attributable; database constraints/transactions proven under concurrent operation; backups restored in rehearsal; sensitive fields/objects protected.

**Risks:** Insecure custom auth, overbroad Admin power, cross-border sensitive data, unsafe backup retention.

**Approval before proceeding:** Local foundation coding is already authorized by the Master Build Prompt. Owner review of design remains useful; legal clearance is mandatory before sensitive-data activation.

## Phase 4 — Seat inventory and performance management

**Inputs:** Verified map, seat manifest, performance schedule, venue and ordinary price; category assignments.

**Deliverables:** Admin manages single Production and fixed Performances; import/reconcile seat master; ordinary/photo categories; per-performance inventory and price snapshots.

**Dependencies:** Phase 3 and verified physical inventory.

**Acceptance:** Counts/codes match owner-signed manifest; photography seats cannot sell; same ordinary seat can sell on different performance; simultaneous allocation on one performance cannot double sell; all performances open on publish.

**Risks:** Map corrections after sales; seat positions/codes not verified; global pricing altered accidentally.

**Approval before proceeding:** Owner signs off rendered map, categories, fixed schedule and price.

## Phase 5 — Online booking and payment-proof review

**Inputs:** Booking owner contact/channel rules, secure tracking-link process, proof upload instructions, Admin queue staffing and decision criteria.

**Deliverables:** 1–9 seat online checkout; 15-minute proof deadline; secure upload; Held/Pending Admin Review indefinite state; Admin review/approval/rejection; ticket issuance trigger.

**Dependencies:** Phases 1–4; secure private file service; chosen public delivery/tracking channel.

**Acceptance:** Expiry releases only when proof is not timely; timely upload survives any delayed expiry task; proof is never payment confirmation; only Admin/Super Admin approval issues tickets; rejection releases all seats and records reasons.

**Risks:** Pending review blocks inventory indefinitely; fake/replayed proof; provider/service outage; exact deadline boundary needs approved technical semantics.

**Approval before proceeding:** Owner approves proof instructions/review procedure and operational staffing; no InstaPay integration assumed.

## Phase 6 — Group booking, discounts and payment

**Inputs:** Officer users, affiliation/actor list, organizer delivery process, Cash receipt controls, InstaPay proof review, approved discount tiers.

**Deliverables:** Group booking threshold 10; 25-minute timer; timer pause/resume for pending discretionary discount/comp only; full Cash/InstaPay; officer view permissions; approval request flow.

**Dependencies:** Phases 3–5 and Admin/Officer account setup.

**Acceptance:** Own full Cash can be confirmed by Officer; InstaPay proof by Admin; no partial amount; group holds cannot be double allocated; timer remaining duration correct through pause/resume/expiry; officers cannot export or modify another booking.

**Risks:** Group proof review exceeds timer; timer pause accounting race; discretionary exception overlaps automatic quantity tier.

**Approval before proceeding:** Owner approves group form, exception workflow and report visibility.

## Phase 7 — Complimentary tickets and VIP invitations

**Inputs:** Admin-managed team roster, guest comp authority, VIP recipient/contact process, same-performance VIP rule.

**Deliverables:** One team comp per member for whole production run; guest comp issuance; named uncapped seatless VIP invitation with reusable cross-performance QR and usage log.

**Dependencies:** Phases 3, 4 and 6.

**Acceptance:** Team entitlement cannot be consumed twice; issue consumes entitlement even if unused; ordinary comps require ordinary seats and individual QR; VIP has no seat/no cap, can be revoked, and every allowed use logs performance/time/scanner.

**Risks:** Duplicate identities/team roster disputes; unclear repeated VIP admission on same performance.

**Approval before proceeding:** Owner confirms roster identity and same-performance VIP behavior.

## Phase 8 — Ticket PDFs and QR scanning

**Inputs:** Approved ticket content/brand, scanner devices, venue connectivity, result wording and support process.

**Deliverables:** Combined PDF and individual downloads, protected tracking route, mobile browser scanner, atomic server admission and VIP-use logging.

**Dependencies:** Ticket eligibility, data/security, delivery services and network plan.

**Acceptance:** No premature ticket; unique ordinary QR admitted once under concurrent scans; devices show updated state immediately; cancelled/refunded ticket denied; VIP behaves per policy; color/sound/vibration and accessible text feedback work.

**Risks:** Camera/device compatibility; internet or DB outage; forwarded tokens; privacy leakage through tracking URL.

**Approval before proceeding:** Owner signs ticket layout and door-entry procedures. Offline scanning remains out of scope.

## Phase 9 — Reports, refunds and audit

**Inputs:** Metric definitions, Admin/Super Admin-only export scope, manual refund evidence, event-audit retention and privacy clearance.

**Deliverables:** Combined and per-performance reports; financial and payment-review queues; CSV/XLSX Admin export; manual refund workflow and seat release; audit review tools.

**Dependencies:** Complete booking/payment/ticket states and legal role matrix.

**Acceptance:** Totals reconcile; comp and VIP distinguished from paid sales; Officers can view but cannot export; ID files absent from exports; refund seats release only after returned funds confirmed; every sensitive action has actor/time/reason.

**Risks:** Report exposure, inaccurate accounting, incomplete manual refund evidence, long-term log retention.

**Approval before proceeding:** Owner/finance approves report definitions and refund reconciliation; legal approves retention.

## Phase 10 — Testing, deployment and launch

**Inputs:** All approved policies, provider agreements, production data, support roster, cost approval, incident and recovery runbooks.

**Deliverables:** Staged release, load/security/recovery test evidence, production backups, monitoring, trained Admins/Officers, deployment/rollback procedure and launch sign-off.

**Dependencies:** Phases 1–9 complete; deployment still requires separate explicit owner authorization.

**Acceptance:** Test strategy below passes; restore/rollback is rehearsed; actual domain/DNS/security and service bills reviewed; user acceptance of Arabic RTL flows complete; no unapproved sensitive-data use.

**Risks:** Event-day burst and network, stale/inaccurate map, staff review backlog, budget overrun, legal/vendor restrictions.

**Approval before proceeding:** Separate explicit owner authorization to deploy and open ticket sales.

## Testing strategy

- **Concurrency:** many customers/officers attempt same seat on one Performance; only one hold wins. Same seat can be held on different performances.
- **Online timing/proof:** no-proof expiry at deadline; timely upload racing worker; pending-review persists across days; duplicate/out-of-order Admin actions; rejection releases immediately; approval issues exactly one ticket per eligible seat.
- **Group timing:** 25-minute wall clock, repeated pause/resume preserves remaining seconds; Admin decision exactly at expiry race; InstaPay review does not pause; expired booking never revived; own Cash only/full amount.
- **Discount/comp:** each threshold 29/30/59/60/89/90/119/120; count includes comp, amount discounts only paid items; team comp one per member per run; rejection doesn't consume entitlement; issued comp does.
- **QR/entry:** forged, wrong-performance, revoked, refunded, duplicate and concurrent scans; same QR on different devices; VIP cross-performance use, revocation and unresolved same-performance behavior after policy decision.
- **Refund/changes:** eligible exactly 48-hour policy boundary; under-cutoff; theatre cancellation; postponement choice deadline; seats remain unavailable until manual returned-funds confirmation; price/date/map change does not silently rewrite old tickets.
- **Files/privacy:** unauthorized access denied, short-lived link expires, malicious/oversized file rejected, no ID/proof images in exports, ticket or logs; retention deletion with backup lifecycle.
- **Backups:** encrypted backup, DB and object restore, integrity/reconciliation, recovery-time measurement and credential compromise scenario.
- **Load/operations:** simultaneous event-entry scans, queue wait age alerts, storage/email failure, database outage, deployment rollback, restore to alternate environment.

No tests are run in this documentation task.
