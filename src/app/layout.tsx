import type { Metadata } from "next";
import '@/style/globals.scss';
import Header from "@/components/header/Header";
import AdobeFontLoader from "@/components/AdobeFontLoarder/AdobeFontLoader";



export const metadata: Metadata = {
  title: "水",
  description: "Portfolio site of Rhetenor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/igd0gfy.css" />
      </head>
      <body className="dark" >
        <AdobeFontLoader />
        {children}
      </body>
    </html>
  );
}