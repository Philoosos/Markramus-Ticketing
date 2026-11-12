# Admin dashboard specification

## Accounts and roles

- Five categories: Super Admin, Admin, Booking Officer, Scanner, and guest Customer. Staff accounts are individual. Super Admin controls system/security settings and ownership accounts. Admin handles operations but cannot create/disable/modify Super Admin accounts or change reserved critical ownership/security settings. Scanner is restricted to admission validation.
- Booking Officers may view all bookings/reports and financial detail; cannot export/download reports. They may not modify another Officer's booking without Admin permission.
- Only Admin exports CSV/Excel, approves/rejects InstaPay proof, approves discount/comp requests, handles refunds, manages actors/team list, issues/revokes VIP invitations, and approves post-payment group changes/cancellations.
- Super Admin can create/edit/disable/reset Admin, Booking Officer, Scanner, and Super Admin accounts under secure ownership controls. Admin may create/manage Booking Officer and Scanner accounts only if that delegation is enabled; until decided, deny this access. Admin may scan and perform operational functions.
- Authentication/MFA/recovery and detailed staff permission controls require technical definition.

## Production setup and changes

Single play per setup; initial entry of title/description, fixed performances/times, venue, approved seat map and ordinary price. Publishing makes all fixed performances bookable. One uniform ordinary price across areas, performances and times; no dynamic date/area pricing (quantity discounts are separate).

Admin may exceptionally change information after sales start. Require reason, actor/time, before/after audit and impact assessment on existing reservations, bookings, issued tickets, QR validity, notices and refunds. Do not propagate changes automatically. Exact action policy remains open.

## Queues and functions

- Overview across performances; pending InstaPay proof queue prioritized by oldest wait, elapsed review time, booking/payment details and alerts.
- Booking search/details, inventory, holds, proof, cancellations/refunds, comp/discount approvals, team roster, actor roster, VIP invitations, tickets, scanner, reports and audit.
- Online proof review: Admin or Super Admin approves/rejects; rejection requires reason; decision records individual identity/time. Pending review holds seats indefinitely and is excluded from expiry worker.
- Group booking: 10+ tickets, 25-minute hold paused only while a requested discount/comp awaits approval; resume remaining time. InstaPay proof review does not pause the timer. Full Cash/InstaPay; officer confirms own Cash; Admin approves InstaPay proof. No partial payment.
- Discounts: automatically apply approved tiers to qualifying online and group bookings, based on total count including comps and discounting paid tickets only. Discretionary Officer requests need Admin decision and pause the group timer pending decision. Record decisions.
- Team comp: Admin-managed team list, one ordinary free ticket/member across production. Officer selects member and requests; approved issuance consumes entitlement even if unused. Admin can directly issue ordinary guest comps.
- VIP: Admin only; named; no seat/performance binding and no cap; WhatsApp/email/both delivery; reusable QR, per-use log and revocation.
- Refunds: Admin approval and manual processing. Do not release seats/QR until Admin confirms refund returned.

## Reports and access

Combined and per-performance reports include sold/available/held seats, ordinary sales, pending proof reviews and wait age, received/refunded amount, Cash/InstaPay, ordinary comps, VIP invite/use, attendance/scans, affiliation/actor. Officers may view all including financials but cannot export; Admin/Super Admin may export Excel/CSV. ID images/proof files never included in ordinary exports. Identity status only where legally approved. Access to sensitive documents remains need-to-know, audited, pending legal/privacy and role review.

## Audit

Record user/account creation, deactivation and permission changes; bookings/edits; hold/pause/resume/expiry/release; proof access/submission/decision; Cash receipt confirmation; discount/comp requests/decisions; ticket issue/revoke; VIP create/revoke/use; refunds; production changes; scans; ID view/download; reports/exports. Include actor/time/action/reason and relevant before/after fields, excluding secrets/document bytes.
