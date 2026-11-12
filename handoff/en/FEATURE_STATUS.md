# Feature Status

**Document date:** 2026-11-08 · **Project version:** `0.1.0`  
Status means repository implementation and available verification evidence, not an estimate.

| Requested feature | Status | Evidence / limitation |
|---|---|---|
| Arabic-first public site, RTL and responsive shell | Implemented and tested | Prior local route checks returned success; source has `lang=ar`, RTL layout and responsive CSS. |
| Official team identity, logo and Arabic fonts | Implemented and tested | Local assets are bundled; no external font service. |
| Team About page and historical archive | Implemented and tested | Static source data and pages exist; no CMS editing. |
| One public featured ticketable production | Partially implemented | Public demo “المحلج” and draft creation exist; real published schedule/details are not populated. |
| `Production` separate from `Performance` | Partially implemented | Schema relationship exists; management and schedule workflow incomplete. |
| Hall/Balcony seat inventory and exact interactive map | Not implemented | Reference images exist; canonical machine-readable manifest and code reconciliation are unresolved. |
| Availability independent per performance; prevent duplicate sale | Partially implemented | `PerformanceSeat` unique `(performanceId, seatId)` constraint exists; allocation logic/concurrency not implemented/tested. |
| One-time initial Super Admin setup | Implemented but not tested | Route/action and singleton DB model/migration exist; no verified migrated DB/E2E test. |
| Username/password staff login, password hashes and sessions | Implemented but not tested | Code exists; local scrypt hash/verify was checked, but login/session E2E was not. |
| Super Admin create/edit/disable/reset staff accounts | Implemented but not tested | UI/actions exist for Admin, Booking Officer, Scanner; DB authorization/runtime not verified. |
| Server-side role dashboards/access control | Partially implemented | Role routes/checks exist; full permission matrix and denial tests not run. |
| Guest customer booking without customer account | Partially implemented | Booking page states booking unavailable; customer accountless booking workflow is not implemented. |
| Demo production “المحلج” | Partially implemented | Public placeholder and draft creation exist; no dates, price or seats are fabricated. |
| Guest online booking (1–9 tickets), delivery choice, tracking link and conditional ID workflow | Not implemented | No booking form, private tracking link, delivery or secure upload. No OTP is required. Legal review is open. |
| Group booking, 25-minute hold and officer collection | Not implemented | Schema fields/policy docs exist; workflow/timer/payment collection absent. |
| Online 15-minute InstaPay proof deadline and pending-review hold | Not implemented | Policy documented: timely proof remains held pending Admin/Super Admin review without automatic expiry; no hold transaction/review queue/worker. This supersedes older conflicting 15-minute wording. |
| Approved quantity discounts, team/guest comps and Admin approval | Not implemented | Policy/schema fields exist; approval, entitlement enforcement and reporting absent. |
| Full Cash/InstaPay group payment and online InstaPay proof review | Not implemented | Data fields/enums only. No proof workflow or receipt verification. No automated provider/gateway integration. |
| Cancellation/refund and postponement policies | Not implemented | Policies documented; no operational workflow or provider refund capability. |
| Individual ticket PDF and unique QR issue | Not implemented | Schema model exists; token generation, PDF, delivery and issuance flow absent. |
| QR scanner and duplicate-use prevention | Not implemented | Scanner page/role exists; camera scan, server redemption and race-safe validation absent. |
| Admin operations and reports; Officer report access | Partially implemented | Admin landing and staff account UI exist; operational booking/finance/seating/report tools and Officer report access do not. |
| Admin/Super Admin CSV/Excel export and filters | Not implemented | No export implementation; Officers are not authorized to export. |
| Audit log | Partially implemented | Schema and account-action logging code exist; completeness, DB persistence and sensitive-file access audit unverified. |
| Private identity storage, access audit, retention/deletion | Not implemented | `IdentityDocument` metadata model only; no storage/access workflow. Legal clearance required. |
| Database schema and migrations | Implemented and tested | Prisma schema validation/client generation passed previously; three migrations exist. Migration application/runtime state unverified. |
| Local project PostgreSQL startup | Implemented but not tested | Compose/script target port 5433; startup script parser checked in PowerShell 5.1/7.6.9, not end-to-end on this handoff. |
| Production hosting, cloud DB/storage, monitoring, backups | Not implemented | No service connected or deployment performed. |
| Automated test suite | Not implemented | No project test script/suite found in `package.json`. |

## Evidence boundary

Previously recorded checks: TypeScript no-emit, ESLint, Prisma validation/generation, isolated Next production build, and selected public route HTTP checks passed. Current user reports local site operation. None of those checks prove staff auth against a migrated project DB, complete booking or payment. The former startup workflow was not runtime-tested; do not claim otherwise.
