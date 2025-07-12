"use client"
import styles from "@/components/pointer/pointer.module.scss"
import { useEffect, useState } from "react";

export default function Pointer(): JSX.Element | null {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize: () => void = (): void => {
      const breakpoint: number = 768; // タブレット以下のブレークポイント
      console.log(window.innerWidth > breakpoint);
      setIsVisible(window.innerWidth > breakpoint);
    };

    checkScreenSize();
    return (): void => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {

    const mouseMoveListener: (event: MouseEvent) => void = (event: MouseEvent): void => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    window.addEventListener("mousemove", mouseMoveListener);

    return (): void => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className={`${styles.pointer}`} style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }} />
      <div className={`${styles.smallPointer}`} style={{ transform: `translate(${mouseX}px, ${mouseY}px)` }} />
    </>
  );
}