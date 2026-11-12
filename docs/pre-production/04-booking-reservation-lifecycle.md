# Booking and reservation lifecycle

## Terms

One Production/play is configured per installation. A Performance is a fixed scheduled occurrence and owns independent inventory. Booking channel is Online or Group. Ordinary Ticket is seat-specific and single-use. VIP Invitation is separate, seatless and reusable per performance.

## Online reservation: 15 minutes, then Admin review

1. On successful atomic allocation, selected seats become Held and the 15-minute timer starts. The timer deadline is for uploading InstaPay transfer proof, not for Admin decision.
2. If proof upload is not completed by expiry, reservation expires and all held seats return to Available. Customer starts a new booking.
3. If proof is uploaded before deadline, transition to Held / Pending Admin Review. Suspend expiry: seats remain held indefinitely until Admin approves or rejects, even for several days. The original timer must never release seats during review.
4. Upload/screenshot/reference is not payment confirmation. Only Admin can approve/reject.
5. Approval: mark payment Paid, confirm booking, issue individual unique-QR tickets, create combined PDF and individual downloads, send by selected channels.
6. Rejection: cancel booking, immediately release all associated seats, record reason, Admin identity and timestamp, issue no tickets.
7. No partial payment or ticket before full payment confirmation. State transitions are atomic; expiry cannot release review-pending or confirmed seats.

## Group booking: 25 minutes with approval pause

- Group booking begins at 10 tickets and is created by an individually authenticated Booking Officer.
- Seat selection creates a 25-minute hold. Pause only while an Admin decision on a requested discount/complimentary ticket is pending; after approval or rejection, resume with remaining time. InstaPay proof review does not pause the group timer; if remaining time expires before booking completion, release seats.
- Group payment Cash or InstaPay, full amount only. Officer can confirm own full Cash receipt. InstaPay requires proof upload and Admin approval. Rejected proof cancels group booking immediately, releases seats, and records rejection details.
- Post-payment changes require Admin approval and participation. Group cancellation requires Admin approval.
- Do not confuse group 25-minute/approval-pause logic with online 15-minute-proof/indefinite-review logic.

## Discounts and ordinary comps

Apply the approved quantity tier automatically to an eligible online or group booking using total ticket count including comps, while reducing paid tickets only: under 30 no discount; 30–59 EGP 10 each paid ticket; 60–89 EGP 20; 90–119 EGP 30; no 120+ tier. A discretionary Officer-requested discount or complimentary ticket requires Admin approval and pauses the group timer; resume remaining time after decision. Team entitlement is one ordinary free ticket per member across the entire production run; approved and issued consumes it even if unused. Admin may directly issue ordinary guest comp tickets. Comp has ordinary seat and individual QR.

## Refund, cancellation, postponement

- Customer cancellation/refund request eligible at least 48 hours before scheduled start; less than 48 hours is ineligible for customer refund.
- Theatre cancellation: full refund. Postponement: customer may retain ticket for rescheduled performance or request full refund; Admin sets response deadline.
- Admin approval required; refund processed manually. Keep seats unavailable until Admin confirms money returned. Then invalidate associated ticket/QR and release seats. Record decisions, reasons, actors, timestamps and payment details.
- Never change historical schedule or price silently. For date, venue, map or price changes, Admin assesses impacts on holds/bookings/tickets and uses controlled review; exact treatment remains open.

## VIP invitation lifecycle

Admin creates named, seatless invitation, no numerical cap. It has one unique QR that may be used on multiple performances. Every use is recorded with performance/date/time/scanning account. Admin may revoke. VIP repeat-use rules do not follow ordinary-ticket duplicate rejection.

## Concurrency and invariants

- Server/database is authoritative; atomic transaction or equivalent lock prevents duplicate active ordinary seat allocation per Performance.
- Idempotent expiry and proof decision; verify current state before release.
- Ordinary QR redemption is atomic single-use. VIP use is repeatable across performances and logged.
- Refund/seat release only on Admin confirmation of returned funds.
- Record actor, time, reason and state changes for sensitive operations.

## Open lifecycle cases

Proof review staffing/escalation and notifications; proof acceptance/rejection criteria; denied/duplicate proof handling; production changes affecting existing orders; refund evidence/accounting controls; exact customer notice; seat-map changes; delivery failure; lost private link; scan corrections; future cancellation requests without refund. Admin and Super Admin may review proof. See register.
