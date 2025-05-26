"use client";

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import CameraControls from './CameraControls';
import Model from './Model';
import ButterflyAnimation from './ButterflyAnimation';
import SnowParticles from './SnowParticles';



export default function WorksModel(): React.ReactElement {
  const imageUrls: string[] = [
    'https://t.pimg.jp/107/693/351/1/107693351.jpg',
    'https://t.pimg.jp/107/693/351/1/107693351.jpg',
    'https://t.pimg.jp/107/693/351/1/107693351.jpg',
  ];
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <axesHelper args={[2]} />
        <Suspense fallback={null}>
          <Bounds observe={false} margin={1.2}>
            <Model imageUrls={imageUrls} />
            <ButterflyAnimation />
            <CameraControls />
            <SnowParticles />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}