# Pre-production package

This folder is the pre-production documentation package for the Saint Mark Drama Team ticketing project. The documents record approved requirements and open blockers; they are not authorization to implement.

## Status language

- **CONFIRMED** — explicitly requested or approved in this conversation.
- **APPROVED** — owner explicitly approved a decision; retain its date/source in document 13.
- **PROVISIONAL** — a recommended design to make implementation concrete; obtain approval where the decision register says so.
- **UNRESOLVED** — source information or an owner decision is missing. Do not guess or silently implement a default.
- **OUT OF SCOPE FOR STAGE 1** — not implemented; documented for later planning.

## Documents

1. [Decision and source-of-truth register](00-status-and-source-of-truth.md)
2. [Product Requirements Document](01-product-requirements.md)
3. [Functional requirements and user journeys](02-functional-requirements-and-journeys.md)
4. [Theatre areas and seat inventory specification](03-theatre-and-seat-inventory.md)
5. [Booking and reservation lifecycle](04-booking-reservation-lifecycle.md)
6. [Egypt payment gateway requirements](05-egypt-payment-requirements.md)
7. [Admin dashboard specification](06-admin-dashboard.md)
8. [Electronic ticket, PDF, and QR validation](07-ticket-pdf-and-qr-validation.md)
9. [Database entities and relationships](08-data-model.md)
10. [Security, privacy, and access control](09-security-privacy-access-control.md)
11. [Pages and Arabic RTL design specification](10-ui-and-arabic-rtl.md)
12. [Hosting and recurring-cost considerations](11-hosting-and-costs.md)
13. [Testing and launch checklist](12-testing-and-launch-checklist.md)
14. [Approval and open-decision register](13-open-questions-and-approvals.md)
15. [Bubble reference comparison](14-bubble-reference-comparison.md)
16. [Pre-production readiness review](15-pre-production-readiness-review.md)
17. [Technical architecture proposal](16-technical-architecture.md)
18. [Workflows and state machines](17-workflows-and-state-machines.md)
19. [Data model and permissions](18-data-model-and-permissions.md)
20. [Security, privacy and threat model](19-security-privacy-and-threat-model.md)
21. [Hosting and service cost comparison](20-hosting-and-service-cost-comparison.md)
22. [Implementation roadmap](21-implementation-roadmap.md)

## Implementation gate

The later Master Build Prompt explicitly authorizes local implementation and local testing. Documents 16–21 remain design proposals and source-of-truth references; local implementation follows the newer explicit prompt where it adds detail. Resolve the listed business, legal and physical-map gates before enabling affected functions. No purchase, external account, paid integration, live payment/delivery connection or deployment is authorized.

## Scope note

The separate canonical seat inventory still needs reconciliation to the owner-approved map images. Official brand assets are present; active production content, schedule, venue details, price amount/currency, and provider capabilities/costs remain unavailable or unverified. This package records those absences rather than filling them in.

## Developer handoff

Implementation notes and portability guidance are maintained in [`docs/developer-handoff`](../developer-handoff/README.md). The handoff describes the current implementation honestly; it is not a production-readiness claim.
