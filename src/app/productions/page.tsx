import Link from "next/link";
import { PageFrame } from "@/components/site-shell";
import { archiveProductions } from "@/features/archive/data";

export const metadata = { title: "أرشيف العروض | فريق مارمرقس للدراما" };

export default function ProductionsPage() {
  return <PageFrame><main className="page-main content-width">
    <div className="page-intro archive-intro"><p className="eyebrow"><span /> ذاكرة الخشبة</p><h1>أعمالٌ وحكايات<br /><em>عاشت معنا.</em></h1><p>نماذج من الأعمال والسنوات الواردة في بروشور الفريق. يظل الأرشيف التاريخي منفصلًا عن نظام حجز الإنتاج الحالي.</p></div>
    <div className="archive-list" aria-label="العروض السابقة">
      {archiveProductions.map((production, index) => <Link className="archive-row" href={`/productions/${production.slug}`} key={production.slug}>
        <span className="archive-index">{String(index + 1).padStart(2, "0")}</span><span className="archive-title">{production.title}</span><span className="archive-source">{production.source ?? production.note ?? "تفاصيل إضافية غير واردة في المصدر"}</span><span className="archive-years">{production.years.length ? production.years.join(" · ") : "السنة غير مذكورة"}</span><span className="archive-arrow" aria-hidden="true">↗</span>
      </Link>)}
    </div>
    <p className="source-note">المعلومات كما وردت في بروشور الفريق. بعض التفاصيل التاريخية غير متاحة في المصدر المرفق.</p>
  </main></PageFrame>;
}
