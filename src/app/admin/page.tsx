import Link from "next/link";
import { createDemoProductionAction } from "@/app/admin/productions-actions";
import { logoutAction } from "@/lib/auth/actions";
import { requireStaff } from "@/lib/auth/session";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export const metadata = { title: "لوحة الإدارة | فريق مارمرقس للدراما" };
export default async function AdminPage() {
  const user = await requireStaff(["SUPER_ADMIN", "ADMIN"]);
  const demoProduction = await db.production.findUnique({ where: { slug: "al-mahlag-demo" }, select: { id: true, title: true, status: true } });
  return <main className="staff-page" dir="rtl"><header className="staff-topbar"><Link href="/">فريق مارمرقس للدراما</Link><span>{user.fullName} · {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}</span><form action={logoutAction}><button className="button-secondary">تسجيل الخروج</button></form></header>
    <section className="staff-content"><p className="eyebrow"><span /> لوحة الإدارة</p><h1>مرحبًا، {user.fullName}</h1>
      <div className="staff-grid">
        {user.role === "SUPER_ADMIN" && <Link className="staff-card staff-card-link" href="/admin/users"><h2>إدارة حسابات الموظفين</h2><p>إنشاء وتعديل وتعطيل وإعادة ضبط حسابات Admin ومسؤولي الحجز والماسحين.</p></Link>}
        <article className="staff-card"><h2>الإنتاج التجريبي</h2>{demoProduction ? <><p>{demoProduction.title} — مسودة. لا توجد مواعيد أو أسعار أو مقاعد مُضافة.</p><span className="status-pill">{demoProduction.status}</span></> : <><p>إنشاء سجل مسودة باسم «المحلج». لن يضيف مواعيد أو أسعارًا أو مقاعد تلقائيًا، ويبقى منفصلًا عن الأرشيف التاريخي.</p><form action={createDemoProductionAction}><button>إنشاء مسودة المحلج</button></form></>}</article>
        <article className="staff-card"><h2>إدارة المواعيد والحجوزات</h2><p>تحتاج المواعيد والأسعار إلى إدخال معتمد، كما يتطلب تفعيل اختيار المقاعد استعادة القائمة canonical ومطابقتها بالخريطتين.</p></article>
      </div>
    </section>
  </main>;
}
