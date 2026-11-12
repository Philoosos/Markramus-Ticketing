"use client";

import { useActionState } from "react";
import { initialSetupAction, type FormState } from "@/lib/auth/actions";

const initialState: FormState = {};
export default function InitialSetupForm() {
  const [state, action, pending] = useActionState(initialSetupAction, initialState);
  return <form action={action} className="staff-form setup-form">
    <label>اسم مسؤول النظام<input name="fullName" required maxLength={100} autoComplete="name" /></label>
    <label>اسم المستخدم<input name="username" required minLength={3} maxLength={32} pattern="[A-Za-z0-9._-]+" dir="ltr" autoComplete="username" /></label>
    <label>كلمة المرور<input name="password" type="password" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    <small>12 حرفًا على الأقل، وبها حرف صغير وحرف كبير ورقم.</small>
    <label>تأكيد كلمة المرور<input name="confirmPassword" type="password" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    <button disabled={pending}>{pending ? "جارٍ إعداد الحساب…" : "إنشاء Super Admin"}</button>
  </form>;
}
