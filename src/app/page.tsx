"use client"
import Header from '@/components/header'
import { useDarkMode } from "@/libs/darkmode"
import { defaultStyles } from '@/util/defaultStyles';
import { playRightRO } from '@/util/font/font';
import Image from "next/image";
import { SiZenn } from "react-icons/si";
import { LuGithub } from "react-icons/lu";
import { FaTwitter } from "react-icons/fa";
import { SiQiita } from "react-icons/si";
import { IoIosContact } from "react-icons/io";
import Link from 'next/link';

export default function Home() {
  const { isDarkMode } = useDarkMode();

  return (
    <>
      <div className='flex flex-row-reverse justify-between px-[50px]'>
        <div className='w-[80%]'>
          <Header />
          <main className=''>
            <div className=''>
              <div className='h-[2000px]'>
                <h1 className={`${defaultStyles.text}`}>Maiami is a frontend and mobile app developer</h1>
                <h2 className={`${defaultStyles.text}`}>About this site</h2>
                <p className={`${defaultStyles.text}`}>This site is Maiami&apos;s portfolio site. I compile my past work history and the technology I use. I would like to send out a lot of information so that I can try new things.</p>
                <h2 className={`${defaultStyles.text}`}>About me</h2>
                <p className={`${defaultStyles.text}`}>Engineer born and raised in Tokyo.After graduating from the Department of Information Engineering, he got a job at a web production company and worked as a front-end and mobile application engineer.</p>
                <h2 className={`${defaultStyles.text}`}>Skill</h2>
              </div>
            </div>
          </main>
        </div>
        <aside className='sticky top-[10px] w-[300px] h-fit border-[1px] dark:border-[#334146] border-[#ded3d3] dark:bg-[#151515] bg-[#e8e8f1] rounded-[20px] p-7 dark:shadow-sm'>
          <div className='flex gap-2 justify-center items-center'>
            <Image
              className="rounded-lg w-[32px] h-full"
              src={"/aside/logo.png"}
              alt="logo"
              width={100}
              height={100}
            ></Image>
            <span className={`${playRightRO.className} ${defaultStyles.text} text-2xl pt-[8px]`}>Maiami</span>
          </div>
          <Image
            className="rounded-lg w-[150px] h-full mt-2 mx-auto"
            src={"/aside/profile_icon.jpg"}
            alt="avatar"
            width={100}
            height={100}
          ></Image>
          <div className='mt-2'>
            <p className={`${defaultStyles.text} text-sm`}>About me</p>
            <p className={`${defaultStyles.text} text-base mt-2 font-bold`}>Frontend and Mobile developer from Tokyo.</p>
          </div>
          <div className='mt-10'>
            <p className={`${defaultStyles.text} text-sm`}>Who is this icon</p>
            <p className={`${defaultStyles.text} text-base mt-2 font-bold`}>She is a character from the manga Jormungandr called Dr. Maiami.</p>
          </div>
          <div className='mt-10 flex gap-[10px] justify-center'>
            <Link href={'https://zenn.dev/markinveng'} target='_blank' className='border dark:border-white border-black rounded-full p-[8px] dark:transition transition duration-300 dark:hover:shadow-[0_0px_20px_rgba(240,_46,_170,_0.7)] hover:shadow-[0_0px_20px_rgba(_0,0,_255,_0.7)]'>
              <SiZenn color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
            </Link>
            <Link href={'https://github.com/markinveng'} target='_blank' className='border dark:border-white border-black rounded-full p-[8px] dark:transition transition duration-300 dark:hover:shadow-[0_0px_20px_rgba(240,_46,_170,_0.7)] hover:shadow-[0_0px_20px_rgba(_0,0,_255,_0.7)]'>
              <LuGithub color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
            </Link>
            <Link href={'https://x.com/BizMarkinveng'} target='_blank' className='border dark:border-white border-black rounded-full p-[8px] dark:transition transition duration-300 dark:hover:shadow-[0_0px_20px_rgba(240,_46,_170,_0.7)] hover:shadow-[0_0px_20px_rgba(_0,0,_255,_0.7)]'>
              <FaTwitter color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
            </Link>
            <Link href={'https://qiita.com/Maiami'} target='_blank' className='border dark:border-white border-black rounded-full p-[8px] dark:transition transition duration-300 dark:hover:shadow-[0_0px_20px_rgba(240,_46,_170,_0.7)] hover:shadow-[0_0px_20px_rgba(_0,0,_255,_0.7)]'>
              <SiQiita color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
            </Link>
            <Link href={'/contact'} className='border dark:border-white border-black rounded-full p-[8px] dark:transition transition duration-300 dark:hover:shadow-[0_0px_20px_rgba(240,_46,_170,_0.7)] hover:shadow-[0_0px_20px_rgba(_0,0,_255,_0.7)]'>
              <IoIosContact color={`${isDarkMode ? "#fff" : "#000"}`} size={20} />
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}