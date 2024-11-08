"use client"
import { playRightRO } from "@/util/font/font";
import { CiLight, CiDark } from "react-icons/ci";
import { useSimpleDarkMode } from "@/libs/darkmode"
import Link from "next/link";

export default function Header() {
  
  return (
    <header className="max-w-4xl m-auto py-4 sticky top-0 border-blue-200">
      <div className="flex justify-between items-end">
        <Link href={"/"} className={`${playRightRO.className} text-3xl`}>
          <span className="text-cyan-400 dark:text-fuchsia-400">M</span>aiami
        </Link>
        <nav>
          <ul className="flex gap-4 text-lg font-extrabold">
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/works"}>Works</Link></li>
            <li><Link href={"/blog"}>Blog</Link></li>
            <li><Link href={"/contact"}>Contact</Link></li>
          </ul>
        </nav>
        <div className="flex items-center justify-between w-28">
          <CiLight color="#000" size={30} />
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" onChange={() => useSimpleDarkMode} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500"></div>
          </label>
          <CiDark color="#000" size={28} />
        </div>
      </div>
    </header>
  );
}