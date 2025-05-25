"use client";

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Bounds, useTexture } from '@react-three/drei';
import CameraControls from './CameraControls';
import { DoubleSide, Mesh, MeshStandardMaterial, MeshPhysicalMaterial, Texture, RepeatWrapping } from 'three';

type Props = {
  imageUrls: string[]; // MicroCMSから取得した画像URL
};

function Model({ imageUrls }: Props): React.ReactElement {
  const { scene } = useGLTF('/models/butterfly-picture.glb');
  const textures: Texture[] = useTexture(imageUrls);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof Mesh)) return;

      // FR_mat_innner: ザラザラしたクリーム色
      if (child.name === 'FR_mat_inner') {
        child.material = new MeshStandardMaterial({
          color: '#f0e9d8',
          roughness: 1,
          metalness: 0.1,
        });
      }

      // F_Stem: 緑の茎
      if (child.name === 'F_Stem') {
        child.material = new MeshStandardMaterial({
          color: '#4caf50',
          roughness: 0.6,
          metalness: 0.2,
        });
      }

      // F_Vase: ガラスっぽい花瓶
      if (child.name === 'F_Vase') {
        child.material = new MeshPhysicalMaterial({
          color: '#ffffff',
          transmission: 0.2,
          thickness: 1,
          roughness: 0,
          metalness: 0,
          transparent: true,
          opacity: 0.99,
          side: DoubleSide
        });
      }

      // Plane, Plane001, Plane002: 写真＋テクスチャ
      const planeNames: string[] = ['Plane', 'Plane001', 'Plane002'];
      const planeIndex: number = planeNames.indexOf(child.name);
      if (planeIndex !== -1 && textures[planeIndex]) {
        const texture: Texture = textures[planeIndex] as Texture;
        texture.wrapS = texture.wrapT = RepeatWrapping;

        child.material = new MeshStandardMaterial({
          map: texture,
          color: '#ffffff',
          roughness: 0.2,
          metalness: 0.1,
        });
      }
    });
  }, [scene, textures]);

  return <primitive object={scene} />;
}


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
            <CameraControls />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}