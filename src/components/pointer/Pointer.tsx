"use client"
import styles from "@/components/pointer/pointer.module.scss"
import { useEffect, useState } from "react";

export default function Pointer(): JSX.Element | null {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkScreenSize: () => void = (): void => {
      const breakpoint: number = 768; // タブレット以下のブレークポイント
      setIsVisible(window.innerWidth > breakpoint);
    };

    checkScreenSize(); // 初期チェック
    window.addEventListener("resize", checkScreenSize);

    return (): void => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const mouseMoveListener: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const screenWidth: number = window.innerWidth;
      const screenHeight: number = window.innerHeight;

      // マウスが画面外に出た場合は非表示
      if (
        event.clientX < 0 || // 左端
        event.clientY < 0 || // 上端
        event.clientX > screenWidth || // 右端
        event.clientY > screenHeight // 下端
      ) {
        setIsVisible(false);
      } else {
        // 画面内に戻った場合は再表示
        setIsVisible(true);
      }

      setMouseX(event.clientX);
      setMouseY(event.clientY);
    };

    const mouseLeaveListener: () => void = (): void => {
      setIsVisible(false); // マウスがブラウザ外に出たら非表示
    };

    const mouseEnterListener: () => void = (): void => {
      setIsVisible(true); // マウスがブラウザ内に戻ったら再表示
    };

    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseleave", mouseLeaveListener);
    window.addEventListener("mouseenter", mouseEnterListener);

    return (): void => {
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseleave", mouseLeaveListener);
      window.removeEventListener("mouseenter", mouseEnterListener);
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