import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import {
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  RepeatWrapping,
  Texture
} from "three";
import * as THREE from "three";
import { ImageItem } from "@/_libs/client";

type Props = {
  imageItems: ImageItem[] | object | null;
};

export default function Model({ imageItems }: Props): React.ReactElement {
  const { scene } = useGLTF("/models/butterfly-picture.glb");

  // テクスチャを imageItems の img.url から読み込み
  const textures: Texture[] = useTexture(
    (imageItems as ImageItem[]).map((item: ImageItem) => item.img.url)
  );

  useEffect(() => {
    const planeNames: string[] = ["Plane", "Plane001", "Plane002", "Plane003", "Plane004"];

    scene.traverse((child: THREE.Object3D) => {
      if (!(child instanceof Mesh)) return;

      // 通常マテリアル設定
      switch (child.name) {
        case "FR_mat_inner":
          child.material = new MeshStandardMaterial({
            color: "#f0e9d8",
            roughness: 1,
            metalness: 0.1
          });
          break;
        case "F_Butter_fly":
          child.material = new THREE.MeshStandardMaterial({
            color: "#baeff9",
            roughness: 1,
            metalness: 0.1,
            emissive: new THREE.Color("#36cafc"),
            emissiveIntensity: 2.0
          });
          break;
        case "F_Stem":
          child.material = new MeshStandardMaterial({
            color: "#4caf50",
            roughness: 0.6,
            metalness: 0.2
          });
          break;
        case "F_Vase":
          child.material = new MeshPhysicalMaterial({
            color: "#ffffff",
            transmission: 0.2,
            thickness: 1,
            roughness: 0,
            metalness: 0,
            transparent: true,
            opacity: 0.99,
            side: DoubleSide
          });
          break;
        default:
          break;
      }

      // Planeオブジェクトに画像を貼る処理
      const index: number = planeNames.indexOf(child.name);
      if (index !== -1) {
        const texture: Texture | undefined = textures[index];

        if (texture) {
          texture.wrapS = texture.wrapT = RepeatWrapping;
          texture.flipY = false;

          child.visible = true;
          child.material = new MeshStandardMaterial({
            map: texture,
            color: "#ffffff",
            roughness: 0.2,
            metalness: 0.0,
            side: DoubleSide
          });
        } else {
          child.visible = false; // テクスチャがないPlaneは非表示
        }
      }
    });
  }, [scene, textures, imageItems]);

  return <primitive object={scene} />;
}
