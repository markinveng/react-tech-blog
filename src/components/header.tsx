"use client"
import { playRightRO } from "@/util/font/font";
import { CiLight, CiDark } from "react-icons/ci";
import { useDarkMode } from "@/libs/darkmode"
import Link from "next/link";
import { defaultStyles } from "@/util/defaultStyles";
import styles from '@/components/Header.module.scss'

export default function Header() {
  const { isDarkMode, toggle } = useDarkMode()
  return (
    <header className={`${styles.container}`}>
      <div className={`${styles.wrapper}`}>
        <Link href={"/"} className={`${playRightRO.className} ${styles.appHeader}`}>
          <span className={`${defaultStyles.colorText}`}>M</span><span className={`${defaultStyles.text}`}>aiami</span>
        </Link>
        <nav>
          <ul className={styles.navigationList}>
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/works"}>Works</Link></li>
            <li><Link href={"/blog"}>Blog</Link></li>
            <li><Link href={"/contact"}>Contact</Link></li>
          </ul>
        </nav>
        <div className={`${styles.darkModeToggleButton}`}>
          <CiDark color={`${isDarkMode ? "#fff" : "#000"}`} size={28} />
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={() => toggle()} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500"></div>
          </label>
          <CiLight color={`${isDarkMode ? "#fff" : "#000"}`} size={30} />
        </div>
      </div>
    </header>
  );
}