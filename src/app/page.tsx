import Link from "next/link";
import { PageFrame } from "@/components/site-shell";
import { archiveProductions } from "@/features/archive/data";

export default function HomePage() {
  const highlights = archiveProductions.slice(0, 3);
  return (
    <PageFrame>
      <main>
        <section className="home-hero content-width">
          <div className="hero-copy">
            <p className="eyebrow"><span /> مسرح · حكاية · لقاء</p>
            <h1>كل حكاية<br /><em>تترك أثرًا.</em></h1>
            <p className="hero-intro">من خشبة مسرح كنيسة مارمرقس بشبرا، يلتقي الفن بالإنسان في حكايات نعيشها معًا.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#current-production">اكتشف العرض الحالي <span aria-hidden="true">←</span></a>
              <Link className="text-link" href="/about">تعرّف على الفريق <span aria-hidden="true">←</span></Link>
            </div>
            <div className="hero-footnote"><span aria-hidden="true">✳</span> تجربة مسرحية تجمعنا منذ أواخر ستينيات القرن الماضي</div>
          </div>
          <div className="hero-art" role="img" aria-label="ستارة مسرح حمراء تفتح على ضوء دافئ">
            <div className="hero-light" />
            <div className="hero-curtain curtain-one" />
            <div className="hero-curtain curtain-two" />
            <div className="hero-stage"><span>حكاية</span><i>تبدأ هنا</i></div>
            <div className="hero-art-caption">فريق مارمرقس للدراما <b>·</b> شبرا</div>
          </div>
        </section>

        <section className="current-section" id="current-production">
          <div className="content-width current-grid">
            <div>
              <p className="eyebrow"><span /> نلتقي قريبًا</p>
              <h2>العرض الحالي</h2>
              <p className="section-copy">سيُعلن هنا عن تفاصيل الإنتاج ومواعيد العروض والحجز بعد اعتمادها من الفريق.</p>
            </div>
            <div className="announcement-panel">
              <div className="announcement-mark">✳</div>
              <div><small>الإنتاج التجريبي</small><h3>المحلج</h3><p>لا توجد مواعيد معتمدة أو مقاعد متاحة للحجز حتى الآن.</p></div>
              <Link className="status-pill" href="/booking">الحجز غير متاح</Link>
            </div>
          </div>
        </section>

        <section className="archive-preview content-width">
          <div className="section-heading">
            <div><p className="eyebrow"><span /> من أرشيف الفريق</p><h2>حكايات عبر السنين</h2></div>
            <Link className="text-link" href="/productions">كل العروض <span aria-hidden="true">←</span></Link>
          </div>
          <div className="production-preview-grid">
            {highlights.map((production) => <Link className="production-preview" key={production.slug} href={`/productions/${production.slug}`}>
              <span className="preview-years">{production.years.join(" · ")}</span><h3>{production.title}</h3><span className="card-arrow" aria-hidden="true">↗</span>
            </Link>)}
          </div>
        </section>

        <section className="team-note">
          <div className="content-width team-note-inner"><div><p className="eyebrow"><span /> عن الفريق</p><h2>المسرح مساحة<br />للقاء الإنسان بذاته.</h2></div><div><p>يؤمن الفريق بقدرة الفنون على إحداث تغيير في النفس البشرية، ويمنح المتفرج فرصة للتأمل في صراعات الشخصيات ومراجعة المواقف.</p><Link className="button button-outline" href="/about">اقرأ حكايتنا <span aria-hidden="true">←</span></Link></div></div>
        </section>
      </main>
    </PageFrame>
  );
}

