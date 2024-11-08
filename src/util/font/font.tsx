import { Inter, Noto_Sans_JP } from "next/font/google";
import localFont from 'next/font/local'

const notojp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-notojp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-playwrite-inter"
});

const playRightRO = localFont({
  src: './ttf/PlaywriteRO-Regular.ttf',
  variable: "--font-playwrite-ro"
});

export { notojp, inter, playRightRO }