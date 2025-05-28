"use client"
import WorksModel from '@/components/threeModel/Works/WorksModel';

import React from "react";
import Head from "./Head";

export default function Home(): React.ReactElement {

  return (
    <>
      <Head />
      <div className={`homePage`}>
        <main>
          <WorksModel />
        </main>
      </div>
    </>
  );
}