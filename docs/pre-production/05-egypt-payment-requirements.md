# Egypt payment and settlement requirements

## Status and boundaries

No payment provider/account is selected, researched in this task, connected or paid. Current costs and capabilities remain OPEN. InstaPay automated integration is not assumed.

## Online customer payment: proof then Admin review

- Online method specified here is InstaPay transfer with proof upload. Selected seats are held for 15 minutes for proof submission. Proof uploaded before deadline keeps seats Held/Pending Admin Review indefinitely until Admin decision; no auto-expiry in review state.
- Screenshot/reference is not confirmation. Admin or Super Admin reviews and approves/rejects proof.
- Approval marks Paid, confirms booking, issues tickets and combined PDF, and sends via chosen channel(s). Rejection cancels, releases seats immediately and records reason/actor/time. No partial payment.
- This owner-confirmed manual review lifecycle supersedes the former proposed online gateway authorization/capture flow. Whether provider/integration is used for InstaPay proof or reconciliation remains OPEN. An upload does not verify transfer.

## Group collection

- Cash and InstaPay only; full amount only.
- Booking Officer may confirm full Cash received from their own account; record actor, amount and date/time.
- InstaPay requires proof upload and Admin approval. Rejection cancels group booking/releases seats immediately. Reference alone is not proof.
- Discounts/comps follow approval and timer pause rules in document 04. No partial payments.

## Refunds

Refunds are Admin-approved and processed manually. Theatre cancellation and accepted postponement refund choice entitle full refund; customer request at least 48 hours before performance is eligible. Keep seats unavailable until Admin confirms returned funds, then invalidate tickets and release. Gateway fees, manual verification evidence, refund timing and accounting controls require external research/design. Do not mark refund completed before return confirmation.

## Research required before service decision

Compare practical InstaPay proof collection/reconciliation, secure upload/private storage, WhatsApp/email ticket delivery, hosting/database/storage and backups. Verify actual Egypt availability, terms, data location, retention, security, pricing, operational burden, manual alternatives and support. Provide current evidence and total recurring/transaction costs before activation. Do not assume automated WhatsApp/InstaPay API, free service, or provider eligibility.

## Safeguards (design requirements only)

Keep proof private and access controlled; separate proof submitted from payment confirmed; record Admin decision, reason, time and evidence reference; make transitions idempotent; issue no ticket before approval; audit proof access/decisions; never include identity images/payment proof in reports or tickets. No card data is in scope unless separately approved.
