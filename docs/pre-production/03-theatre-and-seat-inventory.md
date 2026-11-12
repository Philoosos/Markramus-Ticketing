# Theatre areas and seat inventory specification

## Scope

One theatre with Hall (الصالة) and Balcony (البلكونة). The owner has designated the supplied Hall and Balcony images as approved visual layout references. A separate canonical, machine-readable seat manifest has not been located in this project. The approved images visibly print labels in compact row/side/number form (for example `AL1` and `AR1`); the Balcony image also prints `TOTAL U:172`. These are map observations, not a reconciled sale inventory or confirmed sellable count. The compact labels conflict with the proposed `H-...` / `B-...` forms in the Master Build Prompt. Green marks obscure some Hall labels and row J appears to repeat `JL4`. Do not invent or renumber; obtain the authoritative manifest/code format and reconcile every label, position, category and non-seat area before enabling sale.

## Inventory categories

- **Ordinary Hall/Balcony:** sellable subject to availability per Performance; ordinary comp tickets use these seats.
- **Photography:** visible on the map but never available for ordinary sale; distinguish visually and accessibly.
- **VIP:** invitation-only, not linked to seats. VIP invitations have no numerical cap, may be used across performances, and do not consume seat inventory.
- Blocked/retired physical seats remain unavailable. Photography category and permanent block are distinct meanings.

## Approved identity and reuse rules

- Each physical seat code is unique and permanent theatre-wide; never reassign/reuse it.
- `side`: L=Left, R=Right, C=Center; approved map must state viewpoint.
- Every Performance has independent seat availability. The same physical seat may sell on another date/performance.
- Per-performance allocation uniqueness must be enforced transactionally/database-side.

## Canonical inventory reconciliation needed

Provide or transcribe the authoritative seat data: exact approved code, area, row/side/number, position/order, category (ordinary/photography/blocked/other approved), and whether offered for sale. Compare against every label in the approved visual maps and report omissions, duplicate labels, illegible labels, and discrepancies for owner resolution. Do not infer a code/category or silently fix a discrepancy. Keep the reconciled manifest versioned and auditable.

## Pricing and layout

One ordinary ticket price applies identically to all ordinary bookable seats in both areas and all performances/times. No early-bird, area- or time-based pricing. The price amount/currency is not supplied. VIP invitation is seatless. Coordinates and display metadata are not seat identity.

## Map behavior

Show category/status labels, distinguish by shape/text in addition to color, and keep photography seats visible but disabled. Explain VIP separately from seats. Show exact codes. Mobile/touch, keyboard, screen-reader/list equivalent and Arabic RTL support are required. Never disclose another booking/customer name.

## Changes after sales start

Admin may exceptionally change production details with reason, actor, timestamp and impact assessment for existing bookings/tickets. Do not automatically rewrite tickets, reservations or entitlements when date, venue, map or price changes. Preserve prior versions and route affected bookings to explicit Admin review/customer notice. Exact treatment by change type remains OPEN.

