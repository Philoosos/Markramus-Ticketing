# Testing and launch checklist (planning only)

This is a future checklist, not a command to implement or run tests during this documentation task.

## Scope and inventory

- [ ] One production setup; all fixed performances open at publish.
- [ ] Reconcile canonical seat manifest/counts/codes/categories against the owner-approved visual references and report discrepancies for approval.
- [ ] Hall/Balcony ordinary inventory; photography visible but never sellable; VIP has no seat allocation.
- [ ] Same seat may sell on distinct performances; concurrent same-performance booking cannot double-allocate.
- [ ] Uniform ordinary price across areas, dates and times; discounts tested separately.

## Online flow

- [ ] 1–9 seats per booking; multiple independent bookings possible.
- [ ] Required owner name/mobile, conditional email by delivery choice, WhatsApp/email/both choice, non-Christian attendee question/count and approved secure ID process.
- [ ] No account, SMS or WhatsApp OTP. Tracking link is private; mobile alone cannot reveal booking.
- [ ] No proof by 15-minute deadline expires and releases seats.
- [ ] Proof uploaded before deadline holds seats indefinitely pending Admin; old expiry job cannot release them after days.
- [ ] Upload alone never marks Paid; only Admin/Super Admin approval confirms, creates individual QR tickets and combined PDF. Rejection cancels/releases immediately, logs reason/actor/time.

## Group, discounts, comps

- [ ] Group starts at 10, individual Officer account, 25-minute hold.
- [ ] Pending discount/comp decision pauses timer and resumes remaining time on approval/rejection; InstaPay proof review does not pause it.
- [ ] Full payment only; Officer may confirm own full Cash; InstaPay proof requires Admin approval; rejection cancels/releases.
- [ ] Officer sees all reports/financials but cannot export or edit another officer's booking without Admin permission.
- [ ] Approved quantity tiers (<30 none; 30–59 EGP 10; 60–89 EGP 20; 90–119 EGP 30) count comp tickets but reduce paid tickets only; no 120+ tier.
- [ ] Team member one free ordinary seat ticket per production run; issuance consumes even unused. Admin guest comp; all comps individually seated/QR.
- [ ] Actor affiliation works from Admin-managed list with no invented names.

## VIP, refunds, entry

- [ ] Admin/Super Admin-only named seatless VIP invitation, no numerical cap, reusable across performances, revoke works, every use logs performance/time/scanner.
- [ ] Admin-approved manual refunds; seat stays unavailable until Admin confirms return, then QR invalidated and seat released.
- [ ] 48-hour cutoff, theatre cancellation full refund, postponement retain-or-refund by Admin deadline.
- [ ] Mobile browser scanner and venue internet; server validation; ordinary QR atomic single-use updates other devices; VIP use rules distinct; results and feedback accessible.

## Security, legal and launch gates

- [ ] Identity and payment proof are private, access-limited, audited; no document/image in tickets/QR or default exports.
- [ ] Egypt legal/privacy review and retention/deletion schedule completed before collecting religion or ID documents.
- [ ] Role matrix, audit integrity/retention, private tracking link recovery and account security reviewed.
- [ ] Hosting/domain/service comparison and actual costs approved; backups/restore, security, support and event connectivity verified.
- [ ] Manual InstaPay proof/reconciliation, WhatsApp/email delivery and fallback procedures documented; no service assumed available/free.
- [ ] Refund returned evidence, recordkeeping and financial reconciliation process approved.
- [ ] Local implementation is authorized by the Master Build Prompt; obtain separate owner approval for paid services, external accounts, production connections and deployment.
