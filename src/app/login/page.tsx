import Link from "next/link";
import LoginForm from "@/app/login/form";
export const metadata = { title: "دخول الموظفين | فريق مارمرقس للدراما" };
export default function LoginPage() {
  return <main className="auth-page" dir="rtl"><section className="auth-card">
    <p className="eyebrow"><span /> للموظفين فقط</p><h1>تسجيل الدخول</h1>
    <p>العملاء يحجزون دون حساب. هذه الصفحة مخصصة لحسابات الفريق.</p>
    <LoginForm />
    <Link className="back-link" href="/">العودة للموقع العام</Link>
  </section></main>;
}
