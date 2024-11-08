import type { Metadata } from "next";
import { notojp, } from "@/util/font/font";

import "./globals.css";



export const metadata: Metadata = {
  title: "Maiami",
  description: "エンジニアHinoのポートフォリオサイトです。私がこれまでに手がけた制作物、身につけたスキルをまとめています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notojp.className}>{children}</body>
    </html>
  );
}
