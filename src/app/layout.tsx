import type { Metadata } from "next";
import '@/style/globals.scss';
import Header from "@/components/header/Header";
//import { DarkModeProvider } from "@/_libs/darkmode";
//import Pointer from "@/components/pointer/Pointer";



export const metadata: Metadata = {
  title: "Maiami",
  description: "Maiamiのポートフォリオサイトです。私がこれまでに手がけた作品や、使用しているツールや技術をまとめています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      {/* <DarkModeProvider> */}
      <body className="dark" >
        {/* <Pointer /> */}
        <Header />
        {children}
      </body>
      {/* </DarkModeProvider> */}
    </html>
  );
}
