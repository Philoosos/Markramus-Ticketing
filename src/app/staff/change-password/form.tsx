"use client";
import { useActionState } from "react";
import { changePasswordAction, type FormState } from "@/lib/auth/actions";
const initialState: FormState = {};
export default function ChangePasswordForm({ userId }: { userId: string }) {
  const [state, action, pending] = useActionState(changePasswordAction, initialState);
  return <form action={action} className="staff-form">
    <input type="hidden" name="userId" value={userId} />
    <label>كلمة المرور المؤقتة أو الحالية<input type="password" name="oldPassword" required autoComplete="current-password" /></label>
    <label>كلمة المرور الجديدة<input type="password" name="newPassword" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    <label>تأكيد كلمة المرور الجديدة<input type="password" name="confirmPassword" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.notice && <p className="form-notice" role="status">{state.notice} انتقل الآن إلى صفحة الدخول.</p>}
    <button disabled={pending}>{pending ? "جارٍ الحفظ…" : "تغيير كلمة المرور"}</button>
  </form>;
}
