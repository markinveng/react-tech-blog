import type { Metadata } from "next";
import { notojp, } from "@/util/font/font";

import "./globals.css";
import { DarkModeProvider } from "@/libs/darkmode";



export const metadata: Metadata = {
  title: "Maiami",
  description: "エンジニアMaiamiのポートフォリオサイトです。私がこれまでに手がけた制作物、身につけたスキルをまとめています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <DarkModeProvider>
        <body className={`${notojp.className} dark:bg-[#0e0e0e] bg-[#e0e6ee]`} >{children}</body>
      </DarkModeProvider>
    </html>
  );
}
