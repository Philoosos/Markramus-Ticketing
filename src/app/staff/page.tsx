import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";
import { requireStaff } from "@/lib/auth/session";
export const metadata = { title: "حجوزات المجموعات | فريق مارمرقس للدراما" };
export default async function BookingOfficerPage() {
  const user = await requireStaff(["BOOKING_OFFICER"]);
  return <main className="staff-page" dir="rtl"><header className="staff-topbar"><Link href="/">فريق مارمرقس للدراما</Link><span>{user.fullName} · مسؤول حجز</span><form action={logoutAction}><button className="button-secondary">تسجيل الخروج</button></form></header><section className="staff-content"><p className="eyebrow"><span /> لوحة مسؤول الحجز</p><h1>الحجوزات الجماعية</h1><article className="staff-card"><p>سيظهر مسار اختيار العرض والمقاعد عند توفر ملف المقاعد المعتمد وإنشاء أداء فعلي. لم تُنشأ مقاعد افتراضية.</p></article></section></main>;
}


