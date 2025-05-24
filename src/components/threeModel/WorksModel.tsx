"use client";

import { Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Bounds } from '@react-three/drei';
import CameraControls from './CameraControls';

function Model(): React.ReactElement {
  const { scene } = useGLTF('/models/butterfly-picture.glb'); // public 配下
  scene.position.set(0, 0, 0); // 原点に配置
  scene.rotation.set(0, 0, 0); // 正面向きに調整
  return <primitive object={scene} />;
}

export default function WorksModel(): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <axesHelper args={[2]} />
        <Suspense fallback={null}>
          <Bounds observe={false} margin={1.2}>
            <Model />
            <CameraControls />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}