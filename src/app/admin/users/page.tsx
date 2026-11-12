import Link from "next/link";
import { UserManagement } from "@/app/admin/users/user-management";
import { logoutAction } from "@/lib/auth/actions";
import { requireStaff } from "@/lib/auth/session";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export const metadata = { title: "إدارة حسابات الموظفين | فريق مارمرقس للدراما" };
export default async function StaffAccountsPage() {
  const actor = await requireStaff(["SUPER_ADMIN"]);
  const users = await db.user.findMany({
    where: { role: { in: ["ADMIN", "BOOKING_OFFICER", "SCANNER"] } },
    orderBy: [{ role: "asc" }, { fullName: "asc" }],
    select: { id: true, loginId: true, fullName: true, role: true, isActive: true },
  });
  return <main className="staff-page" dir="rtl"><header className="staff-topbar"><Link href="/admin">لوحة الإدارة</Link><span>{actor.fullName} · Super Admin</span><form action={logoutAction}><button className="button-secondary">تسجيل الخروج</button></form></header>
    <section className="staff-content"><p className="eyebrow"><span /> إدارة الصلاحيات</p><h1>حسابات الموظفين</h1><p>لا يوجد تسجيل موظفين عام. أنشئ لكل شخص حسابًا منفصلًا. الحسابات لا تُستخدم لحجز العملاء.</p>
      <UserManagement users={users} />
    </section>
  </main>;
}
