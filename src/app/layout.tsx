import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextJS Base App",
  description: "基础 Next.js 项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
