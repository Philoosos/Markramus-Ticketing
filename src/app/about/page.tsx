import { PageFrame } from "@/components/site-shell";

export const metadata = { title: "عن الفريق | فريق مارمرقس للدراما" };

export default function AboutPage() {
  return <PageFrame><main className="page-main content-width">
    <div className="page-intro"><p className="eyebrow"><span /> حكايتنا</p><h1>مسرح يفتح بابًا<br /><em>لمواجهة الذات.</em></h1><p>منذ أواخر ستينيات القرن الماضي، احتضنت كنيسة مارمرقس بشبرا نشاط التمثيل. ومع افتتاح مسرح مبنى الخدمات، تأسس فريق مارمرقس للدراما في أوائل السبعينيات.</p></div>
    <section className="about-section"><div className="about-kicker">01 <span>رؤيتنا</span></div><div><h2>الفن لقاءٌ وتأمل</h2><p>يؤمن الفريق بقدرة الفنون، والمسرح في القلب منها، على إحداث تغيير في النفس البشرية والإسهام في الارتقاء بالمجتمع. والفن فعل إبداعي متكامل يشارك في صنعه المبدع والمتلقي، ويمنح المتفرج فرصة للقاء الإنسان بذاته والتأمل في صراعات الشخصيات ومراجعة المواقف.</p><p>لا يعتمد الفريق على الوعظ المباشر أو تلقين الأفكار؛ بل يطرح رسائله الدينية والإنسانية والأخلاقية من خلال أعمال تجمع بين عمق الفكرة وجودة الأداء والاحترافية الفنية.</p></div></section>
    <section className="about-section"><div className="about-kicker">02 <span>طريقتنا</span></div><div><h2>تدريب مستمر وشغف منضبط</h2><p>يعتمد الفريق منهجًا ستانسلافسكيًا في إعداد الممثل، مع الانفتاح على مناهج مايزنر وأدلر. ويحرص أعضاؤه على التدريب المستمر وصقل أدوات الممثل والفنان.</p><div className="stat-row"><div><strong>+40</strong><span>عرضًا مسرحيًا على مدار المسيرة</span></div><div><strong>1970s</strong><span>بدايات الفريق في أوائل السبعينيات</span></div><div><strong>عربية</strong><span>الفصحى والعامية المصرية</span></div></div></div></section>
    <section className="about-note"><span aria-hidden="true">✳</span><p>المسرح مساحة للقاء، والحكاية دعوة إلى التأمل.</p></section>
    <p className="source-note">المصدر: بروشور الفريق المرفق «المحلج». هذه الصفحة تلخص المعلومات الواردة فيه، ولا تضيف تواريخ أو إنجازات غير موثقة.</p>
  </main></PageFrame>;
}
