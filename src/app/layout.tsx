import type { Metadata } from "next";
import { notojp, } from "@/util/font/font";
import '../style/globals.scss';

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
        <body className={`${notojp.className}`} >{children}</body>
      </DarkModeProvider>
    </html>
  );
}
