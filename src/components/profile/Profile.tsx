"use client"
import { playRightRO } from '@/util/font/font';
import Image from "next/image";
import { SiZenn } from "react-icons/si";
import { LuGithub } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { IoIosContact } from "react-icons/io";
import Link from 'next/link';
import { useDarkMode } from '@/_libs/darkmode';
import styles from "@/components/profile/profile.module.scss";

export default function Profile(): JSX.Element {
  const { isDarkMode } = useDarkMode()
  return (
    <aside className={`${styles.content}`}>
      <div className={`${styles.profileImageWrapper}`}>
        <Image
          className={`${styles.profileIcon}`}
          src={"/aside/logo.png"}
          alt="logo"
          width={100}
          height={100}
        ></Image>
        <span className={`${playRightRO.className} ${styles.profileName}`}>Maiami</span>
      </div>
      <Image
        className={`${styles.profileImage}`}
        src={"/aside/profile_icon.jpg"}
        alt="avatar"
        width={100}
        height={100}
      ></Image>
      <div className={`${styles.aboutMe}`}>
        <p className={`${styles.aboutMeTitle}`}>About me</p>
        <p className={`${styles.aboutMeDetail}`}>Frontend and Mobile developer from Tokyo.</p>
      </div>
      <div className={`${styles.iconDescription}`}>
        <p className={`${styles.iconDescriptionTItle}`}>Who is this icon</p>
        <p className={`${styles.iconDescriptionDetail}`}>She is a character from the manga Jormungandr called Dr. Maiami.</p>
      </div>
      <div className={`${styles.linkArea}`}>
        <Link href={'https://zenn.dev/markinveng'} target='_blank' className={`${styles.link}`}>
          <SiZenn color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
        </Link>
        <Link href={'https://github.com/markinveng'} target='_blank' className={`${styles.link}`}>
          <LuGithub color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
        </Link>
        <Link href={'https://x.com/BizMarkinveng'} target='_blank' className={`${styles.link}`}>
          <FaTwitter color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
        </Link>
        <Link href={'https://qiita.com/Maiami'} target='_blank' className={`${styles.link}`}>
          <SiQiita color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
        </Link>
        <Link href={'/contact'} className={`${styles.link}`}>
          <IoIosContact color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
        </Link>
      </div>
    </aside>
  )
}