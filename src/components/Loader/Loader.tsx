"use client";

import { useProgress } from "@react-three/drei";
import styles from "./Loader.module.scss";
import { useEffect, useState } from "react";

export default function LoaderOverlay({
  onFinish,
}: {
  onFinish: () => void;
}): JSX.Element {
  const { progress, loaded, total, active } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!active && loaded === total) {
      // 少し遅らせてからフェードアウト
      setTimeout(() => {
        setIsVisible(false);
        onFinish();
      }, 500);
    }
  }, [active, loaded, total, onFinish]);

  return (
    <div
      className={`${styles.loaderWrapper} ${!isVisible ? styles.fadeOut : ""}`}
    >
      <div className={styles.progressBar}>
        <div
          className={styles.progress}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className={styles.label}>{Math.floor(progress)}%</p>
    </div>
  );
}