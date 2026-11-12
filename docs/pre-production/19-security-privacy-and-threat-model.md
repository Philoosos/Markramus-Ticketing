# Security, privacy and threat model

**Status:** design only. Legal collection/production use of religion-related answers and conditional ID images is blocked until qualified Egypt-specific review. Operational approval is not legal approval. No service or live collection is enabled by this document.

## Identity and sessions

- Customer has no account. A private tracking link is a bearer secret: generate high-entropy random value, store only a hash, scope to one booking, rate-limit attempts, use HTTPS, avoid third-party analytics/referrer leakage, support revocation/rotation, and reveal no other booking. Mobile alone is not an authentication factor.
- Booking Officers and Admins have separate individual accounts; no shared credentials. Enforce role and record ownership server-side on every endpoint/object access, not just by hiding UI controls.
- Auth provider is OPEN. Prefer managed authentication to reduce operator burden, but compare annual cost, data location, recovery, MFA and session protections before selection.
- MFA options: WebAuthn/passkey or TOTP for Admin; recovery codes protected offline; verified recovery process. Requiring MFA is a security recommendation, not yet an owner-approved policy. Disable deactivated accounts and revoke sessions promptly.
- Cookies should be Secure, HttpOnly, SameSite, short-lived with renewal; CSRF controls for state-changing actions; re-authenticate sensitive Admin operations as design choice.

## Roles and export controls

Booking Officer may view all bookings/reports and financial data, but cannot export/download reports or modify another Officer's booking without Admin permission. Officer can confirm full Cash for own booking. Admin and Super Admin approve/reject InstaPay proof, approve requested discounts/comps, handle refunds and export reports. Super Admin owns staff-role and critical security administration. Admin's authority to manage Officer/Scanner accounts remains open and denied by default. All actions are attributed to the individual actor.

ID/document view/download access remains OPEN pending legal review and business role decision. Deny by default; need-to-know policy, just-in-time access, audit every view/download and never put images in exports. Report export authorization must be enforced on server endpoints. Log exporter, filters, time, result and file hash/reference.

## Uploads and sensitive files

- Store proof and identity documents in private storage, not application public directories. Use generated object keys, bucket/container public access disabled, TLS, at-rest encryption, malware/type/size validation, content-disposition attachment and short-lived authorized read links.
- Do not trust browser file extension/MIME; validate actual file format and reject active content. Limit size/count after owner/technical decision. Prevent path traversal, decompression bombs and SVG/script execution.
- Keep database metadata separate from object bytes. Do not include ID images/payment proofs in PDF, QR, ordinary export, analytics or logs.
- Restrict storage credentials to required prefix/object operations. Separate backup credentials and keys; test restoring privately.
- Retention/deletion (including backups, payment proof and ID docs) is OPEN and must be agreed after legal review. Avoid collecting any religion/ID data or putting it into production before approval gate is complete.

## Threats and mitigations

| Threat | Risk | Controls/design response |
|---|---|---|
| Seat race/double booking | Two customers/officers receive same seat on one Performance | DB transaction/unique active allocation; server computes state; idempotent holds and conditional expiry. |
| Proof spoof/replay | Screenshot/reference marks unpaid booking paid | Admin review only, private proof, decision audit, no duplicate/replayed association, compare actual receipt; do not automate payment assumption. |
| Stale job releases seats in review | Customer loses seats after timely proof | Online review state leaves expiry queue; expiry job checks state in same transaction. |
| Timer exploit | Client manipulates deadline or paused group time | Server clock only; store remaining duration/pause state in DB; conditional state transition. |
| Tracking-link leak | Unauthorized ticket/status access | High entropy + hashed token, one-booking scope, revocation, rate limits, no mobile-only lookup, referrer/log hygiene. |
| QR forgery/guessing | Fraudulent admission or enumeration | Opaque cryptographic token, unique per ordinary ticket, server-side lookup/current-state check, rate-limits, no PII in QR. |
| Duplicate scan race | Two doors admit same ordinary ticket | Atomic one-time redemption transaction; immediate shared server state; log every scan attempt. |
| VIP token copied | Repeated use beyond intended scope | Revocation, per-performance logging, same-performance policy OPEN; staff can inspect prior uses. |
| Malicious upload | Malware, script execution, storage abuse | Type/size validation, malware scan, private isolated storage, attachment download, signed short-lived access. |
| Insider/export misuse | Contact/finance/document exposure | Admin/Super Admin-only exports; officer/scanner exports disabled; field minimization, audit logs, legal role matrix for document access. |
| Admin compromise | Global data and payment/seat manipulation | Individual accounts, MFA recommendation, secure recovery, least privilege not possible for Admin (all rights), re-authentication/audit/alerts. |
| Event rush/outage | Queue and scan latency cause entry disruption | Capacity/load testing, monitor service and DB, camera/browser checks, runbook and trained Admin; no offline acceptance, fail closed and escalate if server unavailable. |
| Backup compromise or restore error | PII exposure/data loss | Encrypt/restrict backups, separate keys, retention schedule, restore rehearsal and access audit. |

## Encryption, audit and operational protection

HTTPS/TLS for all public/admin routes. Encrypt database, object storage and backups at rest where supported; manage keys/secrets outside Git. Rotate credentials. Logs must exclude passwords, session/tracking/QR secrets, document contents and unnecessary PII. Audit event records actor, action, target, timestamp, reason, and safe before/after delta; protect from ordinary editing and define retention.

Apply rate limits to public booking, tracking-link lookup, file uploads, login, proof submissions and scanner endpoints; use CSRF protection, output encoding, SQL-safe ORM parameters, content security policy and dependency security updates. Add abuse monitoring without collecting excessive user data.

## Data minimization and legal/privacy gate

Current operational workflow asks whether any attendees are non-Christian and a count; ID proof is conditional. It does not require full attendee records. Evaluate less intrusive alternatives with qualified legal counsel and the theatre (e.g. no religion question, alternate eligibility check, visual verification without stored copy) before launch. The owner must decide operational feasibility after legal advice; do not unilaterally bypass the approved process or deploy sensitive collection before approval.

OPEN: lawful basis/necessity, Egyptian privacy obligations, notices, consent, data-subject requests, storage region/cross-border processing, who may view/download, retention/deletion, processor contracts, and breach response.

## Backup and recovery

Encrypt full and logical backups, store offsite with restricted access, separate DB and file backups, retain according to approved schedule, alert on failure, and rehearse point-in-time/recovery to a clean environment. Set RPO/RTO only after owner approves. Do not claim restore capability solely from provider marketing. Document recovery for lost DB, object files, domain/DNS and compromised keys.
