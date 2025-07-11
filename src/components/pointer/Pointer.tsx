"use client"
import styles from "@/components/pointer/pointer.module.scss"
import { useEffect, useState } from "react";

export default function Pointer(): JSX.Element {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const mouseMoveListener: (event: MouseEvent) => void = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", mouseMoveListener);
    return (): void => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);
  return (
    <>
      {/* 検証ツールを開くと重くなるので開発中は削除する */}
      <div className={`${styles.pointer}`} style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}>
      </div>
      <div className={`${styles.smallPointer}`} style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }}>
      </div>
    </>
  )
}