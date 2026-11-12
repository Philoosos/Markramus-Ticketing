import { createHash, createHmac, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { UserRole } from "@/generated/prisma/client";

const COOKIE_NAME = "markramus_staff_session";
const SESSION_HOURS = 8;
const ATTEMPT_WINDOW_MINUTES = 15;
const MAX_ATTEMPTS = 8;

function hashSession(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function keyed(value: string) {
  const secret = process.env.AUTH_HASH_SECRET;
  if (!secret || secret.includes("replace-this")) throw new Error("AUTH_HASH_SECRET must be set to a private value.");
  return createHmac("sha256", secret).update(value).digest("hex");
}

async function currentAddressKey() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  return keyed(forwarded || "local");
}

export async function isLoginRateLimited(loginId: string) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - ATTEMPT_WINDOW_MINUTES * 60_000);
  const loginKey = keyed(loginId.trim().toLowerCase());
  const addressKey = await currentAddressKey();
  await db.authAttempt.deleteMany({ where: { attemptedAt: { lt: new Date(now.getTime() - 48 * 60 * 60_000) } } });
  const [byLogin, byAddress] = await Promise.all([
    db.authAttempt.count({ where: { loginKey, attemptedAt: { gte: cutoff } } }),
    db.authAttempt.count({ where: { addressKey, attemptedAt: { gte: cutoff } } }),
  ]);
  return byLogin >= MAX_ATTEMPTS || byAddress >= MAX_ATTEMPTS;
}

export async function recordLoginAttempt(loginId: string, action = "STAFF_LOGIN_FAILED") {
  const loginKey = keyed(loginId.trim().toLowerCase());
  await db.$transaction([
    db.authAttempt.create({ data: { loginKey, addressKey: await currentAddressKey() } }),
    db.auditEvent.create({ data: { action, entityType: "AuthAttempt", entityId: loginKey } }),
  ]);
}

export async function clearLoginAttempts(loginId: string) {
  await db.authAttempt.deleteMany({ where: { loginKey: keyed(loginId.trim().toLowerCase()) } });
}

export async function startSession(userId: string) {
  const cookieStore = await cookies();
  const priorToken = cookieStore.get(COOKIE_NAME)?.value;
  if (priorToken) await db.authSession.deleteMany({ where: { tokenHash: hashSession(priorToken) } });
  const rawToken = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_HOURS * 60 * 60_000);
  await db.authSession.create({ data: { userId, tokenHash: hashSession(rawToken), expiresAt } });
  cookieStore.set(COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function endSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  try { if (token) {
    const session = await db.authSession.findUnique({ where: { tokenHash: hashSession(token) }, select: { userId: true } });
    await db.$transaction(async (tx) => {
      await tx.authSession.deleteMany({ where: { tokenHash: hashSession(token) } });
      if (session) await tx.auditEvent.create({ data: { actorId: session.userId, action: "STAFF_LOGOUT", entityType: "User", entityId: session.userId } });
    });
  } }
  finally { cookieStore.delete(COOKIE_NAME); }
}

export async function currentStaff() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await db.authSession.findFirst({
    where: { tokenHash: hashSession(token), expiresAt: { gt: new Date() }, user: { isActive: true } },
    select: { user: { select: { id: true, loginId: true, fullName: true, role: true, mustChangePassword: true } } },
  });
  return session?.user ?? null;
}

export async function requireStaff(allowedRoles?: UserRole[]) {
  const user = await currentStaff();
  if (!user) redirect("/login");
  if (user.mustChangePassword) redirect("/staff/change-password");
  if (allowedRoles && !allowedRoles.includes(user.role)) redirect(dashboardForRole(user.role));
  return user;
}

export function dashboardForRole(role: UserRole) {
  if (role === "SUPER_ADMIN" || role === "ADMIN") return "/admin";
  if (role === "SCANNER") return "/scanner";
  return "/staff";
}




