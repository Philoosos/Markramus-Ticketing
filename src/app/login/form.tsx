"use client";

import { useActionState } from "react";
import { loginAction, type FormState } from "@/lib/auth/actions";
const initialState: FormState = {};

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  return <form action={action} className="staff-form">
    <label>اسم المستخدم<input name="username" required autoComplete="username" dir="ltr" /></label>
    <label>كلمة المرور<input name="password" type="password" required autoComplete="current-password" /></label>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    <button disabled={pending}>{pending ? "جارٍ التحقق…" : "تسجيل الدخول"}</button>
  </form>;
}
