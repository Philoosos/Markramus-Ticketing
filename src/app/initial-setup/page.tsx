import Link from "next/link";
import InitialSetupForm from "@/app/initial-setup/form";

export const dynamic = "force-dynamic";
export const metadata = { title: "الإعداد الأول | فريق مارمرقس للدراما" };

export default async function InitialSetupPage() {
  let setupComplete: boolean | null;
  try {
    const { db } = await import("@/lib/db");
    setupComplete = Boolean(await db.initialSetup.findUnique({ where: { id: "initial" } })) || Boolean(await db.user.findFirst({ where: { role: "SUPER_ADMIN" }, select: { id: true } }));
  }
  catch { setupComplete = null; }
  return <main className="auth-page" dir="rtl">
    <section className="auth-card">
      <p className="eyebrow"><span /> إعداد آمن لمرة واحدة</p>
      <h1>إنشاء مسؤول النظام</h1>
      {setupComplete === null ? <><p>قاعدة بيانات المشروع غير متاحة أو لم تُجهز بعد. لن نعرض نموذج إعداد غير قابل للاستخدام.</p><p className="auth-note">شغّل قاعدة المشروع وطبّق ملفات الترحيل، ثم أعد تحميل هذه الصفحة.</p></> : setupComplete ? <><p>تم إغلاق الإعداد الأول نهائيًا. استخدم صفحة الدخول.</p><Link className="button button-primary" href="/login">تسجيل الدخول</Link></> : <>
        <p>ينشئ هذا النموذج أول Super Admin. بعد نجاحه يُغلق الإعداد الأول، ولا يوجد تسجيل موظفين عام.</p>
        <InitialSetupForm />
        <p className="auth-note">إذا لم تعمل قاعدة البيانات، ابدأ PostgreSQL وطبّق ملفات الترحيل قبل المحاولة.</p>
      </>}
    </section>
  </main>;
}

