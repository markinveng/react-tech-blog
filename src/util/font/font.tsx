import { Inter, Noto_Sans_JP } from "next/font/google";
import localFont from 'next/font/local'

const notojp: ReturnType<typeof Noto_Sans_JP> = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-notojp",
  display: "swap",
});

const inter: ReturnType<typeof Inter> = Inter({
  subsets: ["latin"],
  variable: "--font-playwrite-inter"
});

const playRightRO: ReturnType<typeof localFont> = localFont({
  src: './ttf/PlaywriteRO-Regular.ttf',
  variable: "--font-playwrite-ro"
});

export { notojp, inter, playRightRO }