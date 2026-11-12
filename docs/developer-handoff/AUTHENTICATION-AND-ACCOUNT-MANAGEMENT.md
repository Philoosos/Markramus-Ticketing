# Authentication and account management

**Status:** required by the Master Build Prompt; not implemented. This document describes the target behavior and must be read with the current role and security requirements in `docs/pre-production/`.

## Account types and access

- Customers book without creating a permanent account. Their contact details belong to a booking and do not grant access to staff tools.
- Every Booking Officer has an individual staff account. Shared officer logins and public staff registration are prohibited.
- Admin accounts use role-based permissions. Super Admin is the initial privileged role and can manage staff accounts and roles.
- Login is by staff credentials; the login page must not expose a public role selector or let a visitor choose elevated access.
- Every privileged operation is checked on the server. Hiding a button in the browser is not authorization.

## First-run setup

- Provide a one-time `/initial-setup` flow to create the first Super Admin.
- Setup must be available only while no Super Admin exists. Enforce this condition atomically in the database so concurrent requests cannot create multiple first administrators.
- Do not ship a default account or hard-coded password. Never print passwords or recovery secrets to logs.
- The initial administrator must set a password through the setup flow; after setup completes, the route must be permanently disabled unless an explicitly documented secure recovery process is approved and implemented.

## Login and sessions

- Provide `/login` for staff. Use secure server-managed sessions with unpredictable session identifiers, HttpOnly and SameSite cookies, and Secure cookies in production.
- Rotate the session after authentication and privilege changes. Support logout and server-side session revocation when an account is disabled or its password changes.
- Apply rate limiting and generic failure messages to login and setup endpoints. Record successful and failed privileged authentication events without storing passwords or raw session secrets.
- Force a Booking Officer with a temporary password to change it before using any other staff feature. Temporary credentials must be single-use and expire according to a policy approved before production.
- Never store plaintext or reversibly encrypted passwords. Argon2id remains the preferred production algorithm. Current local implementation uses Node built-in scrypt due the no-install constraint; review the algorithm and parameters and obtain owner approval before production if retaining scrypt.

## Staff account lifecycle

- Super Admin creates, edits, disables, and re-enables staff accounts; no self-service signup exists.
- Each account has a unique login identity, role, active/disabled status, creation and update timestamps, and audit history. Store only the minimum personal data needed to identify the staff member.
- Disabling an account must revoke active sessions. Preserve historical attribution in audit records and bookings; do not delete staff identities referenced by records.
- Password reset/recovery flow, temporary-password delivery channel, and account recovery authorization remain OPEN for owner and security review.
- Role changes and account lifecycle actions must be written to the audit log with actor, timestamp, target, and change details.

## Pages and dashboards

- `/initial-setup`: guarded one-time first Super Admin creation.
- `/login`: staff login.
- Booking Officer dashboard: only permitted group-booking and booking-history functions.
- Admin dashboard: account and role management plus other explicitly authorized operational functions.
- Unauthorized access must return a safe denial or redirect without revealing protected records.

## Required acceptance checks

1. A customer can complete the online customer journey without a staff account.
2. Staff routes and server actions reject unauthenticated requests.
3. A Booking Officer cannot access Admin-only account, approval, or configuration actions, including by direct URL or crafted request.
4. Two simultaneous first-run requests cannot create two Super Admin accounts.
5. Initial setup is inaccessible after the first Super Admin is created.
6. Temporary credentials require password change before any other staff action.
7. Disabled accounts cannot authenticate; disabling an already signed-in account revokes its sessions.
8. Logout and password change invalidate the relevant sessions.
9. Passwords and session secrets never appear in database-readable audit data or application logs.

## Unresolved implementation decisions

- Final session storage and expiry durations.
- Account recovery and temporary password delivery process.
- Staff login identifier (email, phone, or owner-approved username).
- Whether additional roles beyond Booking Officer, Admin, and Super Admin are needed.
- Security review of Argon2id parameters and operational secret handling before production.
## Current authentication implementation note

The current local code uses Node's built-in `scrypt` password hashing (N=32768, r=8, p=1, 64-byte result, random 16-byte salt) because the project has no Argon2 package installed and installation was deferred until a usable database service is available. Session secrets are random 256-bit values; only SHA-256 hashes are stored in `AuthSession`. Staff sessions use HttpOnly, SameSite=Lax cookies and Secure cookies in production. Login/setup attempts are rate-limited in the database and log only a keyed username/address digest, not the raw values.

This implementation is type-checked and included in a successful production build, but has not been exercised against PostgreSQL. Review the password-hashing choice and parameters before production. The previously preferred Argon2id option remains the target if a vetted dependency is approved and installed. The `x-forwarded-for` header must be overwritten by a trusted reverse proxy before relying on address-based limits outside localhost.

