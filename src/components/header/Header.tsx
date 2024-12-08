"use client"
import { playRightRO } from "@/util/font/font";
import { CiLight, CiDark } from "react-icons/ci";
import { useDarkMode } from "@/libs/darkmode"
import Link from "next/link";
import styles from '@/components/header/Header.module.scss';

export default function Header() {
  const { isDarkMode, toggle } = useDarkMode()
  return (
    <header className={`${styles.container}`}>
      <div className={`${styles.wrapper}`}>
        <Link href={"/"} className={`${playRightRO.className} ${styles.appHeader}`}>
          <span className={`${styles.appTitle}`}>M</span><span>aiami</span>
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
          <label className={`${styles.switchLabel}`}>
            <input type="checkbox" value="" className={`${styles.switchInput}`} onChange={() => toggle()} />
          </label>
          <CiLight color={`${isDarkMode ? "#fff" : "#000"}`} size={30} />
        </div>
      </div>
    </header>
  );
}