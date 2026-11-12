# Security, privacy and access control

## Account and authorization baseline

- Customers have no permanent account. Private tracking links must use high-entropy credentials, limited/revocable access and safe recovery; mobile number alone cannot expose a booking/ticket.
- Staff roles are SUPER_ADMIN, ADMIN, BOOKING_OFFICER, and SCANNER, with individual accounts; shared accounts prohibited. CUSTOMER has no login. Super Admin has full system ownership/security controls and manages staff roles. Admin has operational permissions but cannot modify Super Admin accounts or reserved critical ownership/security settings. Scanner is admission-only.
- Booking Officers may view all bookings/reports and financial details but cannot export or modify another Officer's booking without Admin permission. Super Admin/Admin can review payment proofs, approve discounts/comps as permitted, manage refunds/operations, and export reports. Admin management of Officer/Scanner accounts is OPEN and denied by default.
- Enforce permissions server-side on each record/action. Record account creation, deactivation and permission changes. Admin and Super Admin can scan and perform operational functions.
- Authentication provider, secure session/password implementation, MFA, recovery, offboarding and reset procedures remain technical/open decisions.

## Payment and QR controls

Separate proof uploaded from confirmed payment; Admin/Super Admin-only proof decision; never issue prior to confirmation. Keep proof in private storage; audit upload/view/decision. Only full payments. Ordinary QR has unique token and atomic one-time admission; VIP QR is reusable across performances, revocable, each use logged. Internet assumed at venue; no offline acceptance.

## Sensitive identity data and legal review

Online customer provides owner name/mobile, optional email per chosen channel, non-Christian-attendee yes/no and count when applicable; identity documents follow the conditional process for non-Christian attendees. Group Officer obtains and securely records proof for non-Christian attendees. Do not create unnecessary attendee profiles.

**OPEN launch gate:** qualified Egypt-specific review of lawful basis and necessity for religion-related information and identity documents; personal-data protection requirements; transparency/consent; minimization; legal permissibility; storage/encryption/region; access and download rights; retention/deletion and backups. No legal conclusion is made, and consent alone is not assumed sufficient.

Until approved, treat identity files as highly restricted: private storage, no public links, no ticket/QR/report embedding, least-privilege access, logging of every access, no image bytes in audit, secure deletion rules to be decided. Who may view/download is OPEN.

## Data security

TLS in transit, encryption at rest where available, secret manager/environment credentials, file type/size scanning and upload protections, CSRF/session/rate controls, safe error messages, backup access restrictions, and incident response are technical design requirements. Do not log passwords, tracking secrets, raw QR tokens, ID images or payment proof content. Define retention for audit/payment documents before launch.
