"use client"
import WorksModel from '@/components/threeModel/Works/WorksModel';

import React from "react";

export default function Home(): React.ReactElement {

  return (
    <>
      <div className={`homePage`}>
        <main>
          <WorksModel />
        </main>
      </div>
    </>
  );
}