# Local setup (Windows)

## Prerequisites

- Windows 10/11, Node.js 20.19 or newer with npm.
- Docker Desktop with Docker Compose is required for the current database-backed staff authentication. The project DB maps to localhost port 5433 to avoid the unrelated service already occupying port 5432.
- Git is optional for a copied folder and needed for repository-based continuation.

No production cloud, paid service, or external account is used for local development. Node.js and project-local binaries are present; npm and Docker commands are absent from PATH. A PostgreSQL Windows service exists but belongs to HikCentral and rejected the sample password, so it is not used as this application database. TypeScript, ESLint, and an isolated production build pass; the Windows start script remains unverified.

## First run

1. Copy the project folder to the computer and preserve `Markramus-assets-reference/`.
2. Install Node.js 20.19+ with npm and Docker Desktop. Static public pages do not need the database, but staff authentication does.
3. Double-click `START-LOCAL.bat`. It requires Docker Desktop for the project PostgreSQL container on host port 5433. It creates `.env` if needed, generates a local `AUTH_HASH_SECRET`, waits for the project DB health check, then applies committed migrations with `prisma migrate deploy` before starting the site. It does not target the unrelated PostgreSQL service on port 5432.
4. Open `http://localhost:3000` manually if the browser did not open. Double-click `STOP-LOCAL.bat` to stop the local site.

The Prisma schema and three migration files exist; they have not been applied. Staff auth screens and server-side code exist but have not been verified against a project database. Do not use real customer or identity data. The Windows startup script has only been syntax-checked, not executed end-to-end because Docker Desktop is unavailable.

## Transfer to another computer

Copy the complete folder, including `Markramus-assets-reference`. Reinstall dependencies from the committed lock file on the new computer; `node_modules`, `.next`, `.env`, and local database volumes are machine-local and should not be copied or committed. Create a fresh local database and apply migrations/seeds when that milestone exists. The project folder contains source and references and does not depend on the original computer remaining online.






