-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'BOOKING_OFFICER');

-- CreateEnum
CREATE TYPE "BookingChannel" AS ENUM ('ONLINE', 'GROUP', 'TEAM', 'VIP');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('DRAFT', 'HELD', 'PAYMENT_REVIEW', 'CONFIRMED', 'CANCELLED', 'EXPIRED', 'REFUND_PENDING', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('ONLINE_GATEWAY', 'CASH', 'INSTAPAY', 'FREE', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NOT_PAID', 'PENDING', 'PROOF_SUBMITTED', 'VERIFIED', 'FAILED', 'REFUND_PENDING', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PerformanceSeatStatus" AS ENUM ('AVAILABLE', 'HELD', 'SOLD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ISSUED', 'USED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "GroupAffiliation" AS ENUM ('SPECIFIC_ACTOR', 'TEAM', 'GENERAL_AUDIENCE');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('NOT_REQUESTED', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "loginId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "id" TEXT NOT NULL,
    "productionId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL,
    "seatCode" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "rowLabel" TEXT NOT NULL,
    "side" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceSeat" (
    "id" TEXT NOT NULL,
    "performanceId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "status" "PerformanceSeatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "ticketPrice" DECIMAL(10,2) NOT NULL,
    "holdExpiresAt" TIMESTAMP(3),
    "bookingId" TEXT,

    CONSTRAINT "PerformanceSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "channel" "BookingChannel" NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'DRAFT',
    "performanceId" TEXT NOT NULL,
    "officerId" TEXT,
    "approvedById" TEXT,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "customerBackupPhone" TEXT,
    "customerEmail" TEXT,
    "customerReligion" TEXT,
    "groupContactName" TEXT,
    "groupAffiliation" "GroupAffiliation",
    "actorName" TEXT,
    "identityCheckStatus" TEXT NOT NULL DEFAULT 'NOT_REQUIRED',
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "approvalReason" TEXT,
    "approvedAt" TIMESTAMP(3),
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "amountReceived" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "paymentMethod" "PaymentMethod",
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NOT_PAID',
    "paymentReference" TEXT,
    "holdExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRecord" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "provider" TEXT,
    "providerReference" TEXT,
    "verifiedById" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "proofStorageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "performanceSeatId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'ISSUED',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TicketScan" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "scannedById" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,

    CONSTRAINT "TicketScan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IdentityDocument" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "documentStatus" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAfter" TIMESTAMP(3),

    CONSTRAINT "IdentityDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "beforeData" JSONB,
    "afterData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_loginId_key" ON "User"("loginId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_tokenHash_key" ON "AuthSession"("tokenHash");

-- CreateIndex
CREATE INDEX "AuthSession_userId_expiresAt_idx" ON "AuthSession"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "Performance_productionId_startsAt_idx" ON "Performance"("productionId", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_seatCode_key" ON "Seat"("seatCode");

-- CreateIndex
CREATE INDEX "Seat_area_rowLabel_side_seatNumber_idx" ON "Seat"("area", "rowLabel", "side", "seatNumber");

-- CreateIndex
CREATE INDEX "PerformanceSeat_performanceId_status_idx" ON "PerformanceSeat"("performanceId", "status");

-- CreateIndex
CREATE INDEX "PerformanceSeat_status_holdExpiresAt_idx" ON "PerformanceSeat"("status", "holdExpiresAt");

-- CreateIndex
CREATE INDEX "PerformanceSeat_bookingId_idx" ON "PerformanceSeat"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "PerformanceSeat_performanceId_seatId_key" ON "PerformanceSeat"("performanceId", "seatId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_reference_key" ON "Booking"("reference");

-- CreateIndex
CREATE INDEX "Booking_performanceId_status_idx" ON "Booking"("performanceId", "status");

-- CreateIndex
CREATE INDEX "Booking_officerId_createdAt_idx" ON "Booking"("officerId", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_paymentStatus_createdAt_idx" ON "Booking"("paymentStatus", "createdAt");

-- CreateIndex
CREATE INDEX "Booking_groupAffiliation_actorName_idx" ON "Booking"("groupAffiliation", "actorName");

-- CreateIndex
CREATE INDEX "PaymentRecord_bookingId_status_idx" ON "PaymentRecord"("bookingId", "status");

-- CreateIndex
CREATE INDEX "PaymentRecord_provider_providerReference_idx" ON "PaymentRecord"("provider", "providerReference");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_performanceSeatId_key" ON "Ticket"("performanceSeatId");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_tokenHash_key" ON "Ticket"("tokenHash");

-- CreateIndex
CREATE INDEX "Ticket_bookingId_idx" ON "Ticket"("bookingId");

-- CreateIndex
CREATE INDEX "TicketScan_ticketId_scannedAt_idx" ON "TicketScan"("ticketId", "scannedAt");

-- CreateIndex
CREATE UNIQUE INDEX "IdentityDocument_storageKey_key" ON "IdentityDocument"("storageKey");

-- CreateIndex
CREATE INDEX "IdentityDocument_deleteAfter_idx" ON "IdentityDocument"("deleteAfter");

-- CreateIndex
CREATE INDEX "AuditEvent_entityType_entityId_createdAt_idx" ON "AuditEvent"("entityType", "entityId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_actorId_createdAt_idx" ON "AuditEvent"("actorId", "createdAt");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "Production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceSeat" ADD CONSTRAINT "PerformanceSeat_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceSeat" ADD CONSTRAINT "PerformanceSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceSeat" ADD CONSTRAINT "PerformanceSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_performanceId_fkey" FOREIGN KEY ("performanceId") REFERENCES "Performance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRecord" ADD CONSTRAINT "PaymentRecord_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_performanceSeatId_fkey" FOREIGN KEY ("performanceSeatId") REFERENCES "PerformanceSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketScan" ADD CONSTRAINT "TicketScan_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketScan" ADD CONSTRAINT "TicketScan_scannedById_fkey" FOREIGN KEY ("scannedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IdentityDocument" ADD CONSTRAINT "IdentityDocument_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
