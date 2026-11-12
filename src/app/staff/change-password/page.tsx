import ChangePasswordForm from "@/app/staff/change-password/form";
import { currentStaff } from "@/lib/auth/session";
import { redirect } from "next/navigation";
export const metadata = { title: "تغيير كلمة المرور | فريق مارمرقس للدراما" };
export default async function ChangePasswordPage() {
  const user = await currentStaff();
  if (!user) redirect("/login");
  return <main className="auth-page" dir="rtl"><section className="auth-card">
    <p className="eyebrow"><span /> مطلوب قبل المتابعة</p><h1>غيّر كلمة المرور</h1>
    <p>هذا الحساب يستخدم كلمة مرور مؤقتة أو يتطلب تحديث كلمة المرور. لن تتمكن من متابعة لوحة العمل قبل تغييرها.</p>
    <ChangePasswordForm userId={user.id} />
  </section></main>;
}
