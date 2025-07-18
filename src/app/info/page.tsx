
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import ButterflyParticles from '@/components/threeModel/AboutMe/ButterflyParticles';
import CameraControls from '@/components/threeModel/AboutMe/CameraControl';
import styles from '@/app/info/page.module.scss';
import LoaderOverlay from '@/components/Loader/Loader';

function ButterflyModel(): JSX.Element {
  const { scene } = useGLTF('/models/butterfly-shader.glb');
  return <primitive object={scene} />;
}

export default function InfoPage(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleLoadFinish: () => void = () => {
    setShowLoader(true);
  };

  useEffect((): void | (() => void) => {
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsVisible(true);
    }, 1);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    {showLoader && <LoaderOverlay onFinish={handleLoadFinish} />}
      <main>
        <div className={`${styles.container} ${isVisible ? styles.isVisible : ''}`} >
          <div className={styles.infoWrapper}>
            <div className={styles.info}>
              <h1 className={styles.title}>Info</h1>
              <div className={styles.detailContainer}>
                <h2 className={styles.infoSubTitle}>About Me</h2>
                <p className={styles.description}>
                  Web開発を主軸に、UI演出やインタラクションデザインの制作を行なっています。<br />また映像制作やイラスト制作にも取り組んでいます。<br />サイト名の「Maiami」はヨルムンガンドのDr.マイアミ(蝶好き)から取ってきてます。
                </p>
                <div className={styles.linkWrapper}>
                  <a className={styles.link} href="https://x.com/maiami_meeeee" target='_blank'>X(Twitter)</a>
                </div>
              </div>
              <div className={styles.detailContainer}>
                <h2 className={styles.infoSubTitle}>Job</h2>
                <p className={styles.description}>
                  お仕事のご相談・ご依頼は XのDM または Googleフォーム よりお気軽にご連絡ください。<br />
                  ご予算やスケジュールに応じた柔軟な対応が可能です。<br />
                  ご相談だけでも歓迎です。お待ちしております。
                </p>
                <div className={styles.linkWrapper}>
                  <a className={styles.link} href="https://forms.gle/qDG4QisiqTzj2zsR8" target='_blank'>Google Form</a>
                </div>
              </div>
              <div className={styles.detailContainer}>
                <h2 className={styles.infoSubTitle}>Available</h2>
                <p className={styles.description}>
                  使用技術
                  <br />
                  HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, Three.js, React Fiber ...etc
                </p>
                <p className={styles.description}>
                  使用ツール
                  <br />
                  VS Code, Figma, Adobe XD, PhotoShop, Illustrator, After Effects, Blender, Ableton Live, Clip Studio ...etc
                </p>
              </div>
            </div>
          </div>
          <div className={styles.overlay}></div>
          <div className={styles.canvasWrapper}>
            <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <CameraControls />
              <directionalLight position={[2, 2, 2]} />
              <Suspense fallback={null}>
                <ButterflyModel />
              </Suspense>
              <ButterflyParticles />
              {/* <OrbitControls /> */}
              {/* <axesHelper args={[2]} /> */}
            </Canvas>
          </div>
        </div>
      </main>
    </>
  );
}