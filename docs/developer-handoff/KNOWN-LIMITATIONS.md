# Known limitations

- The public home, About, archive listing and archive detail pages are implemented; application behavior beyond that scope is incomplete. Local source checks pass, and the site has been served locally through the project Next.js binary. A production build has not been run against the active development server's `.next` directory.
- `package-lock.json`, Windows start/stop scripts, and PostgreSQL Compose configuration exist. The start script syntax is checked, but the Windows start workflow is not runtime-verified; Docker and npm are not available as commands in PATH. The existing port-5432 PostgreSQL belongs to HikCentral and is excluded.
- A first Prisma application schema validates and has a generated initial migration, but no migration has been applied; database connection, runtime persistence, and seed data are absent.
- Staff login, one-time setup, session validation, role-gated dashboards, Super Admin account UI, temporary password reset/change flows, and audit events are implemented in code but remain unverified against a working project database. Booking/holds, payments, ticket PDF/QR issuance, QR scan validation, archive CMS, reports, private file storage, and backups are not implemented.
- Production title, poster, schedule, venue and ticket price remain editable sample/unresolved content. The public page names the approved demo production “المحلج” and makes clear that booking is not open. Admin can create a draft Production without fabricated performances, prices, or seats.
- Historical archive content is brochure-backed but static; no Admin editing UI exists. Some source details are absent.
- Seat map images are owner-approved visual references. The separate canonical seat manifest was not found; no interactive sale map or seat count was invented.
- No external services, cloud account, payment integration, automated WhatsApp/email, or deployment is connected.
- Conditional religion/identity-document workflow remains gated on qualified Egypt-specific legal/privacy review; do not collect sensitive data in local or production environments before clearance.
- VIP same-Performance duplicate-use rule and some staff account delegation/recovery policies remain open.
- IBM Plex Sans Arabic font files are bundled in `public/fonts/`; their OFL license is included. No remote font service is required.






