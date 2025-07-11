import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
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
import { useFrame, useThree } from '@react-three/fiber';
import { ImageData } from '@/_type/image';

type Props = {
  imageItems: ImageItem[] | object | null;
  onPlaneClick: (clickedData: ImageData) => void;
};

export default function Model({ imageItems, onPlaneClick }: Props): React.ReactElement {
  const { scene } = useGLTF("/models/butterfly-picture.glb");
  const { camera, gl } = useThree();
  const raycaster: React.MutableRefObject<THREE.Raycaster> = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const pointer: React.MutableRefObject<THREE.Vector2> = useRef<THREE.Vector2>(new THREE.Vector2());

  const urls: string[] = useMemo(() => {
    return (imageItems as ImageItem[]).map((item: ImageItem) => item.img.url);
  }, [imageItems]);

  // テクスチャを imageItems の img.url から読み込み
  const textures: Texture[] = useTexture(urls);

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
          texture.repeat.x = -1;

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

  useEffect(() => {
    const raycaster: THREE.Raycaster = new THREE.Raycaster();
    const pointer: THREE.Vector2 = new THREE.Vector2();
    const planeNames: string[] = ['Plane', 'Plane001', 'Plane002', 'Plane003', 'Plane004'];

    const handleClick: (event: MouseEvent) => void = (event: MouseEvent) => {
      const canvasBounds: DOMRect = gl.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
      pointer.y = -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects: THREE.Intersection[] = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const clickedObject: Mesh = intersects[0].object as Mesh;

        if (clickedObject.name.includes('Plane')) {

          const index: number = planeNames.indexOf(clickedObject.name);
          const clickedData: ImageItem | undefined = Array.isArray(imageItems) ? imageItems[index] : undefined;

          if (clickedData && onPlaneClick) {
            onPlaneClick(clickedData);
          }
        }
      }
    };

    gl.domElement.addEventListener('click', handleClick);
    return (): void => gl.domElement.removeEventListener('click', handleClick);
  }, [camera, gl, scene, imageItems, onPlaneClick]);

  useEffect(() => {
    const onPointerMove: (event: MouseEvent) => void = (event: MouseEvent): void => {
      const bounds: DOMRect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    };

    gl.domElement.addEventListener('mousemove', onPointerMove);
    return (): void => gl.domElement.removeEventListener('mousemove', onPointerMove);
  }, [gl]);

  useEffect(() => {
    textures.forEach((texture: Texture) => {
      texture.flipY = false;
      texture.needsUpdate = true;
    });
  }, [textures]);

  useFrame(() => {
    raycaster.current.setFromCamera(pointer.current, camera);
    const intersects: THREE.Intersection[] = raycaster.current.intersectObjects(scene.children, true);
    const hasPlane: THREE.Intersection | undefined = intersects.find((obj: THREE.Intersection) => obj.object.name.includes('Plane'));

    gl.domElement.style.cursor = hasPlane ? 'pointer' : 'default';
  });

  return <primitive object={scene} />;
}
