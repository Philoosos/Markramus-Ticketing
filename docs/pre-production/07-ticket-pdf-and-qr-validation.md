# Ticket, PDF, QR and entry validation

## Ordinary tickets

- Issue only after Admin approves online or group InstaPay proof, or after approved full Cash is confirmed by the booking's own Booking Officer, or after applicable comp approval. Never issue on screenshot upload alone.
- Each ordinary ticket is one seat-specific admission for one Performance and has one canonical, unique, opaque QR token. Booking token is not admission credential. Ordinary ticket is single-use.
- Confirmed online booking produces individual ticket downloads and a combined PDF. PDF and delivery channels are confirmed requirements; exact technology/provider remains open.
- Ticket includes approved production/performance, venue, area/seat code, Arabic instructions, and support details when supplied. Never put ID images, proof images or unnecessary sensitive identity data in ticket or QR.

## VIP invitation credential

Separate from ordinary seat ticket. Named, seatless, no performance binding and no numerical cap. One unique QR may be reused across different performances. Each use records invitation, performance, date/time and scanning account. Admin can revoke. Do not apply ordinary-ticket duplicate-scan logic globally to this reusable invitation. Same-performance repeat-use details remain open.

## Delivery and tracking

Customer chooses WhatsApp, email, or both; email is needed only if selected. Group Officer chooses organizer delivery channel(s); VIP supports WhatsApp/email/both. Automated services and costs are not assumed. Private secure tracking link allows status/download. Lost link is handled through Booking Officer; mobile alone never grants access. Manual fallback must be researched and documented.

## Scan flow

Mobile browser scanner; venue internet available; no offline mode required at this stage. Authenticated scanner sends QR to server over TLS. Server validates credential, booking/payment/comp state, revocation, performance and prior scan. Ordinary ticket redemption is atomic and updates all devices immediately. Results: Valid/admitted, Already used, Cancelled, Invalid. Log scan time and scanning account. Provide clear color, sound and vibration feedback, with text/icon equivalents. VIP logic supports logged use on multiple performances. Admin can scan and perform all functions.

Scanner screen should provide clear color, sound and vibration feedback, with text/icon equivalent and accessible manual camera permission handling. No dedicated hardware is required.

## PDF and privacy

Generate combined PDF and individual downloads after approval/confirmation. Arabic shaping, RTL, QR scan quality, print/screen layout, official assets, secure private access and revocation behavior require design review. No public permanent ticket links; tracking link must be private and revocable/rotatable. Store only necessary token representation securely.
