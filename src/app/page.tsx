"use client"
import Header from '@/components/header/Header'
import styles from "@/app/home.module.scss"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import WorksModel from '@/components/threeModel/Works/WorksModel';

import React from "react";

export default function Home(): React.ReactElement {

  return (
    <>
      <div className={`homePage`}>
        {/* <Header /> */}
        <main className={`${styles.mainWrapper}`}>
        </main>
        <WorksModel />
      </div>
    </>
  );
}