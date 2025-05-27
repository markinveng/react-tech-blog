import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { DoubleSide, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, RepeatWrapping, Texture } from "three";
import * as THREE from 'three';
import { ImageItem } from '@/_libs/client';

type Props = {
  imageItems: ImageItem[];
};

export default function Model({ imageItems }: Props): React.ReactElement {
  const { scene } = useGLTF('/models/butterfly-picture.glb');
  const textures: Texture[] = useTexture(imageItems.map(item => item.img.url));

  useEffect(() => {
    //console.log('Model scene:', scene);
    scene.traverse((child: THREE.Object3D) => {
      //console.log('Traversing child:', child.name);
      if (!(child instanceof Mesh)) return;

      // FR_mat_innner: ザラザラしたクリーム色
      if (child.name === 'FR_mat_inner') {
        child.material = new MeshStandardMaterial({
          color: '#f0e9d8',
          roughness: 1,
          metalness: 0.1,
        });
      }

      if (child.name === 'F_Butter_fly') {
        child.material = new THREE.MeshStandardMaterial({
          color: '#baeff9', // 薄い青白色（AliceBlue）
          roughness: 1,
          metalness: 0.1,
          emissive: new THREE.Color('#36cafc'), // 青白の発光色
          emissiveIntensity: 2.0, // 放射強度（1.0〜3.0くらいで調整）
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
        texture.flipY = false;
        child.material = new MeshStandardMaterial({
          map: texture,
          color: '#ffffff',
          //roughness: 0.2,
          metalness: 0.1,
          side: DoubleSide,
        });
      }
    });
  }, [scene, textures]);

  return <primitive object={scene} />;
}