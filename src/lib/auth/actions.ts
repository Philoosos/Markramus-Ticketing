"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { clearLoginAttempts, currentStaff, dashboardForRole, endSession, isLoginRateLimited, recordLoginAttempt, startSession } from "@/lib/auth/session";
import { hashPassword, validatePassword, verifyPassword } from "@/lib/auth/password";

export type FormState = { error?: string; notice?: string };

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const usernamePattern = /^[a-zA-Z0-9._-]{3,32}$/;

export async function initialSetupAction(_state: FormState, formData: FormData): Promise<FormState> {
  const username = text(formData, "username").toLowerCase();
  const fullName = text(formData, "fullName");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  if (!usernamePattern.test(username)) return { error: "اسم المستخدم يجب أن يحتوي 3 إلى 32 حرفًا إنجليزيًا أو رقمًا أو . _ -" };
  if (!fullName || fullName.length > 100) return { error: "أدخل الاسم الكامل." };
  const passwordIssue = validatePassword(password);
  if (passwordIssue) return { error: passwordIssue };
  if (password !== confirm) return { error: "كلمتا المرور غير متطابقتين." };
  try {
    if (await isLoginRateLimited("initial-setup")) return { error: "محاولات كثيرة. انتظر قليلًا ثم أعد المحاولة." };
    await recordLoginAttempt("initial-setup", "INITIAL_SETUP_ATTEMPT");
    const passwordHash = await hashPassword(password);
    const user = await db.$transaction(async (tx) => {
      if (await tx.initialSetup.findUnique({ where: { id: "initial" } })) return null;
      if (await tx.user.findFirst({ where: { role: "SUPER_ADMIN" } })) return null;
      const admin = await tx.user.create({ data: { loginId: username, fullName, passwordHash, role: "SUPER_ADMIN" } });
      await tx.initialSetup.create({ data: { id: "initial", superAdminId: admin.id } });
      await tx.auditEvent.create({ data: { actorId: admin.id, action: "INITIAL_SUPER_ADMIN_CREATED", entityType: "User", entityId: admin.id } });
      return admin;
    });
    if (!user) return { error: "اكتمل الإعداد الأول بالفعل. سجّل الدخول." };
    await startSession(user.id);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") return { error: "اكتمل الإعداد الأول بالفعل أو اسم المستخدم مستخدم." };
    return { error: "تعذر الاتصال بقاعدة البيانات أو إتمام الإعداد. تأكد من تشغيل PostgreSQL وتطبيق الترحيلات." };
  }
  revalidatePath("/");
  redirect("/admin/users");
}

export async function loginAction(_state: FormState, formData: FormData): Promise<FormState> {
  const username = text(formData, "username").toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) return { error: "تعذر تسجيل الدخول. راجع البيانات وحاول مرة أخرى." };
  try {
    if (await isLoginRateLimited(username)) return { error: "تعذر تسجيل الدخول مؤقتًا. انتظر قليلًا ثم حاول مرة أخرى." };
    const user = await db.user.findUnique({ where: { loginId: username } });
    if (!user || !user.isActive || !(await verifyPassword(password, user.passwordHash))) {
      await recordLoginAttempt(username);
      return { error: "تعذر تسجيل الدخول. راجع البيانات وحاول مرة أخرى." };
    }
    await clearLoginAttempts(username);
    await startSession(user.id);
    await db.auditEvent.create({ data: { actorId: user.id, action: "STAFF_LOGIN_SUCCEEDED", entityType: "User", entityId: user.id } });
    revalidatePath("/admin");
    redirect(dashboardForRole(user.role));
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    return { error: "تعذر الاتصال بالخادم. تأكد من جاهزية قاعدة البيانات ثم أعد المحاولة." };
  }
}

export async function logoutAction() {
  await endSession();
  redirect("/login");
}

export async function changePasswordAction(_state: FormState, formData: FormData): Promise<FormState> {
  const activeUser = await currentStaff();
  const userId = activeUser?.id;
  if (!userId) return { error: "يجب تسجيل الدخول مرة أخرى." };
  const oldPassword = String(formData.get("oldPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");
  const issue = validatePassword(newPassword);
  if (issue) return { error: issue };
  if (newPassword !== confirm) return { error: "كلمتا المرور غير متطابقتين." };
  try {
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || !(await verifyPassword(oldPassword, user.passwordHash))) return { error: "تعذر تغيير كلمة المرور. راجع كلمة المرور الحالية." };
    const passwordHash = await hashPassword(newPassword);
    await db.$transaction([
      db.user.update({ where: { id: userId }, data: { passwordHash, mustChangePassword: false, temporaryPasswordIssuedAt: null } }),
      db.authSession.deleteMany({ where: { userId } }),
      db.auditEvent.create({ data: { actorId: userId, action: "STAFF_PASSWORD_CHANGED", entityType: "User", entityId: userId } }),
    ]);
  } catch {
    return { error: "تعذر حفظ كلمة المرور. أعد المحاولة." };
  }
  await endSession();
  return { notice: "تم تغيير كلمة المرور. سجّل الدخول بكلمتك الجديدة." };
}





