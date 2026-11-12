import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "فريق مارمرقس للدراما", template: "%s | فريق مارمرقس للدراما" },
  description: "الموقع الرسمي لفريق مارمرقس للدراما: حكايات الفريق وأرشيف عروضه والعرض الحالي.",
  icons: { icon: "/brand/team-logo.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
