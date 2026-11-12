ALTER TYPE "UserRole" ADD VALUE 'SCANNER';

ALTER TABLE "User"
ADD COLUMN "temporaryPasswordIssuedAt" TIMESTAMP(3);

CREATE TABLE "InitialSetup" (
  "id" TEXT NOT NULL DEFAULT 'initial',
  "superAdminId" TEXT NOT NULL,
  "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InitialSetup_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "InitialSetup_superAdminId_key" ON "InitialSetup"("superAdminId");

ALTER TABLE "InitialSetup"
ADD CONSTRAINT "InitialSetup_superAdminId_fkey"
FOREIGN KEY ("superAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "AuthAttempt" (
  "id" TEXT NOT NULL,
  "loginKey" TEXT NOT NULL,
  "addressKey" TEXT NOT NULL,
  "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AuthAttempt_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AuthAttempt_loginKey_attemptedAt_idx" ON "AuthAttempt"("loginKey", "attemptedAt");
CREATE INDEX "AuthAttempt_addressKey_attemptedAt_idx" ON "AuthAttempt"("addressKey", "attemptedAt");
