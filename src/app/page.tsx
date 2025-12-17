"use client"

import React from "react";
import WaterBackground from "@/components/threeModel/WaterBackground/WaterBackground";
import styles from "./home.module.scss";

export default function Home(): React.ReactElement {

  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>お水ﾁｬﾌﾟﾁｬﾌﾟ</h1>
        <WaterBackground />
      </main>
    </>
  );
}