"use client"
import { playRightRO } from "@/util/font/font";
//import { CiLight, CiDark } from "react-icons/ci";
//import { useDarkMode } from "@/_libs/darkmode"
import Link from "next/link";
import styles from '@/components/header/Header.module.scss';

export default function Header(): JSX.Element {
  //const { isDarkMode, toggle } = useDarkMode()
  return (
    <header className={`${styles.container}`}>
      <div className={`${styles.wrapper}`}>
        <Link href={"/"} className={`${playRightRO.className} ${styles.appHeader}`} scroll={false}>
          <span className={`${styles.appTitle}`}>M</span><span>aiami</span>
        </Link>
        <nav>
          <ul className={styles.navigationList}>
            <li><Link className={styles.navigationLink} href={"/"} scroll={false}>Works</Link></li>
            <li><Link className={styles.navigationLink} href={"/About Me"} scroll={false}>About Me</Link></li>
            {/* <li><Link href={"/blog"} scroll={false}>Blog</Link></li> */}
            {/* <li><Link href={"/contact"} scroll={false}>Contact</Link></li> */}
          </ul>
        </nav>
        {/* <div className={`${styles.darkModeToggleButton}`}>
          <CiDark color={`${isDarkMode ? "#fff" : "#000"}`} size={28} />
          <label className={`${styles.switchLabel}`}>
            <input type="checkbox" value="" className={`${styles.switchInput}`} onChange={() => toggle()} />
          </label>
          <CiLight color={`${isDarkMode ? "#fff" : "#000"}`} size={30} />
        </div> */}
      </div>
    </header>
  );
}