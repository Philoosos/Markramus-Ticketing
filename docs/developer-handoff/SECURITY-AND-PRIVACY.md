# Security and privacy

- Password hashing, secure sessions, server-side RBAC, individual staff accounts, least privilege and account offboarding are implemented in code but remain unverified against a project database. Current scrypt use is interim pending pre-production algorithm review.
- Store only token hashes for ticket/tracking credentials where feasible. Do not expose secrets in URLs, logs or QR payloads.
- Protect booking tracking with high-entropy revocable links; mobile number alone is not authorization.
- Store payment proofs and any legally approved identity documents privately. No public file URLs, reports, PDFs, or QR may expose ID images. Audit every sensitive view/download.
- The conditional non-Christian attendee ID-document workflow is legally gated. Do not activate or test with real identities until qualified Egypt-specific legal/privacy review approves lawful basis, necessity, notice, minimization, access, retention/deletion, location and processor terms.
- Never use real customer, payment or identity data in development. Demo records and credentials must be explicitly development-only.
- Encrypt and test backups; exact retention, recovery objectives, monitoring and incident response require owner/provider decisions.

See `docs/pre-production/19-security-privacy-and-threat-model.md` for risks and required controls.

