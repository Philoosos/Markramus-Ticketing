"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";

export type UserFormState = { error?: string; notice?: string; temporaryPassword?: string };
const value = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const creatableRoles = ["ADMIN", "BOOKING_OFFICER", "SCANNER"] as const;
type StaffRole = (typeof creatableRoles)[number];

function parseRole(input: string): StaffRole | null {
  return creatableRoles.includes(input as StaffRole) ? input as StaffRole : null;
}
function validUsername(input: string) { return /^[a-zA-Z0-9._-]{3,32}$/.test(input); }
function temporaryPassword() { return randomBytes(18).toString("base64url"); }

export async function manageUserAction(_state: UserFormState, formData: FormData): Promise<UserFormState> {
  const actor = await requireStaff(["SUPER_ADMIN"]);
  const operation = value(formData, "operation");
  const userId = value(formData, "userId");
  try {
    if (operation === "create") {
      const loginId = value(formData, "loginId").toLowerCase();
      const fullName = value(formData, "fullName");
      const role = parseRole(value(formData, "role"));
      if (!validUsername(loginId) || !fullName || fullName.length > 100 || !role) return { error: "راجع اسم المستخدم والاسم والدور." };
      const temp = temporaryPassword();
      const passwordHash = await hashPassword(temp);
      const created = await db.$transaction(async (tx) => {
        const user = await tx.user.create({ data: { loginId, fullName, role, passwordHash, mustChangePassword: true, temporaryPasswordIssuedAt: new Date() } });
        await tx.auditEvent.create({ data: { actorId: actor.id, action: "STAFF_ACCOUNT_CREATED", entityType: "User", entityId: user.id, afterData: { loginId, fullName, role } } });
        return user;
      });
      revalidatePath("/admin/users");
      return { notice: `تم إنشاء حساب ${created.fullName}. سلّم كلمة المرور المؤقتة له مباشرة. ستظهر مرة واحدة هنا.`, temporaryPassword: temp };
    }

    if (!userId) return { error: "الحساب المطلوب غير محدد." };
    const target = await db.user.findUnique({ where: { id: userId } });
    if (!target || target.role === "SUPER_ADMIN") return { error: "لا يمكن تعديل الحساب المطلوب." };

    if (operation === "edit") {
      const fullName = value(formData, "fullName");
      const loginId = value(formData, "loginId").toLowerCase();
      const role = parseRole(value(formData, "role"));
      if (!validUsername(loginId) || !fullName || fullName.length > 100 || !role) return { error: "راجع بيانات الحساب." };
      await db.$transaction(async (tx) => {
        await tx.user.update({ where: { id: userId }, data: { loginId, fullName, role } });
        await tx.auditEvent.create({ data: { actorId: actor.id, action: "STAFF_ACCOUNT_EDITED", entityType: "User", entityId: userId, beforeData: { loginId: target.loginId, fullName: target.fullName, role: target.role }, afterData: { loginId, fullName, role } } });
        await tx.authSession.deleteMany({ where: { userId } });
      });
      revalidatePath("/admin/users");
      return { notice: "تم تحديث الحساب وإنهاء جلساته الحالية." };
    }

    if (operation === "toggle") {
      const isActive = value(formData, "isActive") === "true";
      await db.$transaction(async (tx) => {
        await tx.user.update({ where: { id: userId }, data: { isActive } });
        if (!isActive) await tx.authSession.deleteMany({ where: { userId } });
        await tx.auditEvent.create({ data: { actorId: actor.id, action: isActive ? "STAFF_ACCOUNT_ENABLED" : "STAFF_ACCOUNT_DISABLED", entityType: "User", entityId: userId, beforeData: { isActive: target.isActive }, afterData: { isActive } } });
      });
      revalidatePath("/admin/users");
      return { notice: isActive ? "تم تفعيل الحساب." : "تم تعطيل الحساب وإنهاء جلساته." };
    }

    if (operation === "reset-password") {
      const temp = temporaryPassword();
      const passwordHash = await hashPassword(temp);
      await db.$transaction(async (tx) => {
        await tx.user.update({ where: { id: userId }, data: { passwordHash, mustChangePassword: true, temporaryPasswordIssuedAt: new Date() } });
        await tx.authSession.deleteMany({ where: { userId } });
        await tx.auditEvent.create({ data: { actorId: actor.id, action: "STAFF_PASSWORD_RESET", entityType: "User", entityId: userId } });
      });
      revalidatePath("/admin/users");
      return { notice: `أُعيد ضبط كلمة مرور ${target.fullName}. سلّم كلمة المرور المؤقتة له مباشرة. ستظهر مرة واحدة هنا.`, temporaryPassword: temp };
    }
    return { error: "الطلب غير معروف." };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") return { error: "اسم المستخدم مستخدم بالفعل." };
    return { error: "تعذر حفظ التغيير. تأكد من الاتصال بقاعدة البيانات." };
  }
}
