"use client"
import styles from "@/app/home.module.scss"
import WorksModel from '@/components/threeModel/Works/WorksModel';

import React from "react";
import Head from "./Head";

export default function Home(): React.ReactElement {

  return (
    <>
      <Head />
      <div className={`homePage`}>
        <main className={`${styles.mainWrapper}`}>
        </main>
        <WorksModel />
      </div>
    </>
  );
}