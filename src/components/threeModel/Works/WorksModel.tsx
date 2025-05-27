'use client';

import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import { getImageItems, ImageItem } from '@/_libs/client';
import Model from './Model'; // ← Model.tsx または ButterflyModel.tsx
import ButterflyAnimation from './ButterflyAnimation';
import CameraControls from './CameraControls';
import SnowParticles from './SnowParticles';

export default function WorksModel(): React.ReactElement | null {
  const [imageItems, setImageItems] = useState<ImageItem[] | null>(null);

  useEffect(() => {
    getImageItems(3).then(setImageItems); // Planeが3枚の場合
  }, []);

  if (!imageItems) return null; // 読み込み中は何も表示しない（必要に応じてSpinnerなど）

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <axesHelper args={[2]} />
        <Suspense fallback={null}>
          <Bounds observe={false} margin={1.2}>
            <Model imageItems={imageItems} />
            <ButterflyAnimation />
            <CameraControls />
            <SnowParticles />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}