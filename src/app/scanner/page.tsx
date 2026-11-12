import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";
import { requireStaff } from "@/lib/auth/session";
export const metadata = { title: "فحص التذاكر | فريق مارمرقس للدراما" };
export default async function ScannerPage() {
  const user = await requireStaff(["SCANNER"]);
  return <main className="staff-page" dir="rtl"><header className="staff-topbar"><Link href="/">فريق مارمرقس للدراما</Link><span>{user.fullName} · ماسح تذاكر</span><form action={logoutAction}><button className="button-secondary">تسجيل الخروج</button></form></header><section className="staff-content"><p className="eyebrow"><span /> دخول الجمهور</p><h1>فحص التذاكر</h1><article className="staff-card"><p>التحقق من QR يتطلب أداءً منشورًا وتذاكر صادرة. لم يتم تفعيل المسح بعد.</p></article></section></main>;
}


