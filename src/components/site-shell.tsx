import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="فريق مارمرقس للدراما، الرئيسية">
        <Image src="/brand/team-logo.png" width={473} height={344} alt="شعار فريق مارمرقس للدراما" priority />
      </Link>
      <nav className="main-nav" aria-label="التنقل الرئيسي">
        <Link href="/about">عن الفريق</Link>
        <Link href="/productions">أرشيف العروض</Link>
        <Link className="nav-booking" href="/#current-production">العرض الحالي <span aria-hidden="true">←</span></Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>فريق مارمرقس للدراما · كنيسة مارمرقس بشبرا</span>
      <span>حكايات تُعاش على خشبة المسرح</span><Link href="/login">دخول الموظفين</Link>
    </footer>
  );
}

export function PageFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  return <><SiteHeader />{children}<SiteFooter /></>;
}

