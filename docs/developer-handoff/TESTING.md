# Testing and acceptance

No application test suite or executed build/lint verification is currently available in this environment: npm and Docker are not installed/available. Do not claim this milestone passes tests. First set up Node/npm, install project dependencies, then run the available lint/build commands and correct issues.

Required future automated and manual cases:

- Public Arabic RTL pages, responsive keyboard/mobile navigation, archive routes and missing slugs.
- Authentication and denial for every role; Scanner cannot read financial/proof/admin endpoints; Officer cannot export or edit another Officer's booking.
- Concurrent reservation of the same seat on one Performance (one succeeds); same seat may sell on another Performance.
- 15-minute online upload deadline, timely proof racing expiry, indefinite pending review, approve/reject and ticket issuance gating.
- 25-minute group clock, pause/resume only for pending discount/comp decision, InstaPay review does not pause, and expiry/confirmation race.
- Discount boundaries 29/30/59/60/89/90/119/120; comp entitlement single-use; admin approval audit.
- Ordinary QR concurrent duplicate scan; wrong-performance/cancelled/refunded tokens; VIP reuse across performances, revocation, same-performance policy after owner decision.
- Refund seats remain held until returned funds confirmed; theatre cancellation, postponement, 48-hour eligibility.
- Upload validation, private files, access audit, no sensitive data in exports/tickets/logs, backup/restore rehearsal.

See pre-production document 21 for the complete testing strategy and acceptance gates.
