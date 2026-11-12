import Link from "next/link";
import { PageFrame } from "@/components/site-shell";
export const metadata = { title: "حجز تذاكر المحلج | فريق مارمرقس للدراما" };
export default function BookingPage() {
  return <PageFrame><main className="page-main content-width" dir="rtl">
    <Link className="back-link" href="/">العودة للرئيسية</Link>
    <div className="page-intro"><p className="eyebrow"><span /> حجز التذاكر</p><h1>المحلج</h1><p>لا توجد مواعيد منشورة أو مقاعد متاحة للحجز الآن. لا يحتاج العميل إلى إنشاء حساب؛ عند فتح الحجز سيختار موعدًا ومقاعد متاحة ثم يدخل بيانات التواصل المطلوبة.</p></div>
    <section className="announcement-panel"><div className="announcement-mark" aria-hidden="true">✳</div><div><small>الحجز لم يفتح بعد</small><h3>المواعيد ومخزون المقاعد غير جاهزين</h3><p>لن نعرض مقاعد قابلة للاختيار حتى تُستعاد القائمة canonical وتُطابق مع مخططي الصالة والبلكونة.</p></div><span className="status-pill">قريبًا</span></section>
  </main></PageFrame>;
}
