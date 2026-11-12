"use client";

import { useActionState } from "react";
import { manageUserAction, type UserFormState } from "@/app/admin/users/actions";

type StaffAccount = { id: string; loginId: string; fullName: string; role: string; isActive: boolean };
const initialState: UserFormState = {};
const roleNames: Record<string, string> = { ADMIN: "Admin", BOOKING_OFFICER: "مسؤول حجز", SCANNER: "ماسح تذاكر", SUPER_ADMIN: "Super Admin" };

function StateMessage({ state }: { state: UserFormState }) {
  if (!state.error && !state.notice) return null;
  return <div className={state.error ? "form-error" : "form-notice"} role="status">
    {state.error ?? state.notice}
    {state.temporaryPassword && <p>كلمة المرور المؤقتة: <code dir="ltr">{state.temporaryPassword}</code></p>}
  </div>;
}

export function UserManagement({ users }: { users: StaffAccount[] }) {
  const [createState, createAction, createPending] = useActionState(manageUserAction, initialState);
  return <div className="staff-grid">
    <section className="staff-card">
      <h2>إنشاء حساب موظف</h2>
      <p>للعملاء حجز ضيف دون حساب. الحسابات هنا للموظفين فقط.</p>
      <form action={createAction} className="staff-form">
        <input type="hidden" name="operation" value="create" />
        <label>الاسم الكامل<input name="fullName" required maxLength={100} /></label>
        <label>اسم المستخدم<input name="loginId" required minLength={3} maxLength={32} pattern="[A-Za-z0-9._-]+" dir="ltr" /></label>
        <label>الدور<select name="role" defaultValue="BOOKING_OFFICER"><option value="ADMIN">Admin</option><option value="BOOKING_OFFICER">مسؤول حجز</option><option value="SCANNER">ماسح تذاكر</option></select></label>
        <button disabled={createPending}>{createPending ? "جارٍ الإنشاء…" : "إنشاء الحساب"}</button>
      </form>
      <StateMessage state={createState} />
    </section>
    <section className="staff-card staff-list">
      <h2>حسابات الموظفين</h2>
      {users.length === 0 && <p>لا توجد حسابات موظفين بعد.</p>}
      {users.map((user) => <StaffUser key={user.id} user={user} />)}
    </section>
  </div>;
}

function StaffUser({ user }: { user: StaffAccount }) {
  const [state, action, pending] = useActionState(manageUserAction, initialState);
  return <article className="staff-account">
    <form action={action} className="staff-form staff-edit-form">
      <input type="hidden" name="operation" value="edit" /><input type="hidden" name="userId" value={user.id} />
      <label>الاسم<input name="fullName" defaultValue={user.fullName} required maxLength={100} /></label>
      <label>اسم المستخدم<input name="loginId" defaultValue={user.loginId} required minLength={3} maxLength={32} pattern="[A-Za-z0-9._-]+" dir="ltr" /></label>
      <label>الدور<select name="role" defaultValue={user.role}><option value="ADMIN">Admin</option><option value="BOOKING_OFFICER">مسؤول حجز</option><option value="SCANNER">ماسح تذاكر</option></select></label>
      <div className="account-meta"><strong>{roleNames[user.role] ?? user.role}</strong><span>{user.isActive ? "نشط" : "معطّل"}</span></div>
      <button disabled={pending}>حفظ التعديلات</button>
    </form>
    <div className="staff-actions">
      <form action={action}><input type="hidden" name="operation" value="reset-password" /><input type="hidden" name="userId" value={user.id} /><button className="button-secondary" disabled={pending}>إصدار كلمة مرور مؤقتة</button></form>
      <form action={action}><input type="hidden" name="operation" value="toggle" /><input type="hidden" name="userId" value={user.id} /><input type="hidden" name="isActive" value={String(!user.isActive)} /><button className="button-secondary" disabled={pending}>{user.isActive ? "تعطيل" : "تفعيل"}</button></form>
    </div>
    <StateMessage state={state} />
  </article>;
}
