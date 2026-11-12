# Developer TODO — Prioritized

**Document date:** 2026-11-08 · **Project version:** `0.1.0`  
Keep work inside approved scope. No production deployment, paid service, or real-data collection without owner approval.

## P0 — Secure handoff and establish a verified baseline

1. Confirm private GitHub repository/ownership and push reviewed source; current tree has no documented Git remote/commit. Verify `.env`, local DB data, logs and generated files are excluded. Do not publish the workstation `.env`.
2. On a clean development computer install Node.js `>=20.19.0`, npm and Docker Desktop; run `npm ci`, inspect the local-only `.env` without sharing it, verify Compose binds only `127.0.0.1:5433`, then run `START-LOCAL.bat` and record whether migrations/auth setup actually work. Never target port 5432 or reset/drop a DB.
3. Inspect migration state read-only and back up any needed local data before applying migrations. Confirm which DB the owner’s running app uses; previous migration runtime state is unknown.
4. Add automated tests and verify first Super Admin setup is single-use, secure login/session behavior, staff CRUD/disable/reset, forced password change and server-side role denial against an isolated project DB.
5. Review interim `scrypt` password hashing, cookie flags, session invalidation/expiry, CSRF, brute-force/rate limiting, auth secret handling, audit logging and secure production configuration.

## P1 — Resolve blocking product inputs before ticket sales

1. Obtain and reconcile owner-approved canonical Hall/Balcony seat manifest against reference images. Resolve obscured/repeated Hall labels, printed Balcony total meaning, code format, L/R/C viewpoint and sellability/category flags. Do not create seat records until signed off.
2. Implement the latest approved online lifecycle: 15 minutes to submit InstaPay proof; timely proof remains held pending Admin/Super Admin review without automatic expiry. This supersedes older conflicting 15-minute wording. Verify proof handling and ensure upload/reference is not treated as payment confirmation; provider/payment feasibility remains open.
3. Confirm production title/content, performances/date/time/venue, prices, on-sale statuses, contact/support details and ticket language. Existing “المحلج” entry is demo/draft, not a sale-ready event.
4. Specify account recovery/delegation, VIP same-performance reuse, discretionary discount/comp exception criteria and any exception flow; approved automatic quantity tiers are already defined in `docs/pre-production/13-open-questions-and-approvals.md`.
5. Complete qualified Egypt legal/privacy review before collecting religion or ID images; settle lawful basis, necessity, notice, access, retention/deletion, processors and incident response.

## P2 — Implement reservation, payment and admission safely

1. Implement performance seat inventory import only from approved manifest; atomic/concurrent allocation, online 15-minute proof deadline with no automatic expiry after timely submission, and 25-minute group timer with approved pause/resume rules. Test expiry and confirmation races.
2. Implement separate guest-online and staff group booking workflows, customer validation/upload policy, group affiliation and Admin approvals; enforce full payment for group bookings and auditable Cash/InstaPay verification.
3. Research Egyptian gateway/provider capabilities, fees, settlement, refunds, authorization/capture, webhook signatures/idempotency, supported business/entity onboarding and test mode. Do not assume InstaPay automation. Obtain owner approval before connecting.
4. Implement cancellation/refund/postponement states with 48-hour policy, manual/provider reconciliation, seat release only after confirmed returned funds, audit and notifications.
5. Issue individual ticket PDFs and opaque unique QR tokens only after verified payment and committed seat allocation. Implement authenticated online scanner, atomic ordinary-ticket redemption, race tests and role-limited scanner UI.
6. Implement Admin bookings/seating/payments/discount approvals/VIP/reports/CSV-export tools, private file service and sensitive-view audit.

## P3 — Production readiness

1. Choose owner-approved cloud host, managed PostgreSQL, private object storage, WhatsApp/email delivery provider, domain, backups and monitoring. Verify the approved USD 100/year total budget target against current quotes and data location before purchase or connection; feasibility remains open.
2. Add end-to-end, integration, accessibility, security and load tests; backup/restore and incident exercises; Cairo-timezone/scheduling and operational runbook.
3. Obtain final owner acceptance of policies, seat manifest, prices/show schedule and privacy notices; then prepare a reviewed deployment plan. Deployment remains unapproved.

Detailed requirements and approval states: `docs/pre-production/` and `handoff/en/FEATURE_STATUS.md`.
