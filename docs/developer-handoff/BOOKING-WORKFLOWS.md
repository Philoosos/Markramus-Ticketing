# Booking workflows

## Online customer

Guest selects 1–9 seats on one Performance. Booking owner name and mobile are required; email is required only if email delivery is selected. Customer chooses WhatsApp/email/both. A server-atomic hold lasts 15 minutes to submit InstaPay transfer proof. If no proof is committed in time, the reservation expires and seats release. Timely proof moves to Held / Pending Admin Review indefinitely; no expiry worker may release it. Upload/reference is not confirmation. Admin/Super Admin approves or rejects with reason and audit. Approval confirms full payment and only then issues tickets/PDF; rejection cancels/releases without ticket. No OTP or automatic InstaPay integration.

## Booking Officer group

Starts at 10 seats, individual Officer login. Atomic seat hold is 25 minutes. A pending Admin decision for a discretionary discount/comp pauses the group timer and resumes the remaining duration after decision. InstaPay proof review does not pause the timer. Cash or InstaPay and full payment only. Officer may confirm full Cash for own booking; InstaPay requires proof plus Admin/Super Admin approval. No ticket before all payment/approval rules pass.

## Discounts, comps and VIP

Quantity tiers: under 30 none; 30–59 EGP 10 off each paid ticket; 60–89 EGP 20; 90–119 EGP 30; no 120+ tier. Qualifying count includes comps, but discount applies only to paid tickets. One ordinary team comp/member for entire production run; approved issue consumes it even if unused. Guest comps use ordinary seats. Officer requests but cannot approve their own discount/comp. VIP is a named seatless invitation, uncapped, reusable across different performances and every use is logged; same-Performance repeat use remains OPEN.

## Refund and entry

Customer requests at least 48 hours before Performance start. Theatre cancellation gives full refund; postponement offers keeping the ticket or full refund by an Admin-set deadline. Refund processing is manual. Seat remains unavailable until Admin confirms return of funds, then invalidate ticket/QR and release it. Ordinary QR is unique per Ticket and single-use; server scan must prevent concurrent duplicate admission. Scanner is online only.
