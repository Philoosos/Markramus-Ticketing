# Roles and permissions

Customers remain guests without staff login accounts. The login and staff account records are never created for customers.

| Role | Implemented access policy |
|---|---|
| SUPER_ADMIN | Initial one-time system owner. Creates, edits, disables, and resets Admin, Booking Officer, and Scanner accounts. Has the broadest operational access. The current UI does not create additional Super Admin accounts. |
| ADMIN | Operational management and the demo-production draft action. Cannot access Super Admin staff-account management or other restricted account functions. |
| BOOKING_OFFICER | Dedicated role-specific dashboard route; group-booking workflow is not implemented yet. |
| SCANNER | Dedicated role-specific admission dashboard route; QR validation is not implemented yet. |
| CUSTOMER | Guest website and intended online booking without a login or password. The booking flow is not open until data and inventory are available. |

All protected pages and server actions check the role on the server. Hiding controls in the UI does not grant authorization. Super Admin temporary credentials are shown only once in the authenticated account action response; delivery to staff is offline and not automated. Password reset revokes active sessions and forces password change at next login.

Open before production: account recovery/ownership transfer, whether Admin may manage Booking Officer or Scanner accounts (currently denied), rate-limit behavior behind the trusted reverse proxy, password hashing algorithm approval, and session expiry policy review.
