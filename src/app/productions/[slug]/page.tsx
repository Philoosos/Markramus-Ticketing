import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/site-shell";
import { archiveProductions, elMahlagCast, elMahlagCredits, findArchiveProduction } from "@/features/archive/data";

export function generateStaticParams() { return archiveProductions.map(({ slug }) => ({ slug })); }

export default async function ProductionDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const production = findArchiveProduction(slug);
  if (!production) notFound();
  const isMahlag = production.slug === "al-mahlag";
  return <PageFrame><main className="page-main content-width production-detail">
    <Link className="back-link" href="/productions">← العودة إلى الأرشيف</Link>
    <div className="detail-hero"><div><p className="eyebrow"><span /> من أرشيف الفريق</p><h1>{production.title}</h1><p className="detail-meta">{production.years.length ? production.years.join(" · ") : "سنة العرض غير مذكورة في البروشور"}</p>{production.source && <p className="detail-source">{production.note ? `${production.note} · ` : ""}{production.source}</p>}</div>
      {isMahlag ? <Image src="/archive/el-mahlag-cover.png" width={993} height={1404} alt="غلاف بروشور عرض المحلج" className="detail-cover" priority /> : <div className="archive-art" aria-hidden="true"><span>حكاية</span><i>على الخشبة</i></div>}
    </div>
    {isMahlag ? <><section className="detail-section"><p className="eyebrow"><span /> عن العرض</p><h2>اختبارٌ أخلاقي لا مفرّ منه</h2><p>حين تعود سيدة إلى عزبة الحلاج، يجد أهل البلدة أنفسهم أمام اختبار أخلاقي لا مفر منه. إعداد حديث عن مسرحية «زيارة السيدة العجوز» للكاتب السويسري فريدريش دورينمات.</p></section>
      <section className="detail-section"><p className="eyebrow"><span /> طاقم التمثيل</p><h2>الشخصيات حسب الظهور</h2><p className="source-note">الأسماء كما وردت في بروشور العرض؛ لم يحدد المصدر توزيعًا مختلفًا حسب موعد أداء.</p><div className="detail-list">{elMahlagCast.map(([character, actors], index) => <div className="detail-list-row" key={character}><span>{String(index + 1).padStart(2, "0")}</span><strong>{character}</strong><p>{actors}</p></div>)}</div></section>
      <section className="detail-section"><p className="eyebrow"><span /> وراء الكواليس</p><h2>اعتمادات العرض</h2><p className="source-note">صيغة موجزة حسب القسم والأشخاص، مستقاة من البروشور.</p><div className="detail-list credits-list">{elMahlagCredits.map(([department, people]) => <div className="detail-list-row" key={department}><strong>{department}</strong><p>{people}</p></div>)}</div></section>
    </> : <section className="detail-section"><p className="eyebrow"><span /> معلومات الأرشيف</p><h2>التفاصيل المتاحة</h2><p>المصدر يذكر عنوان العرض{production.years.length ? ` وسنواته: ${production.years.join("، ")}` : ""}{production.source ? ` ومصدره أو مؤلفه: ${production.source}` : ""}. لم ترد تفاصيل إضافية موثقة لهذا العرض في البروشور المتاح.</p></section>}
    <p className="source-note">المصدر: بروشور الفريق «المحلج». محتوى الأرشيف التاريخي لا يمثل إنتاجًا قابلًا للحجز.</p>
  </main></PageFrame>;
}
