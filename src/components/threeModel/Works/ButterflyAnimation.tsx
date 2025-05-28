import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ButterflyModel(): JSX.Element {
  const { scene, animations, } = useGLTF('/models/butterfly-picture.glb');
  const mixer: React.MutableRefObject<THREE.AnimationMixer | undefined> = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    // 特定の子オブジェクトを取得（ボーンやメッシュなど）
    const butterfly: THREE.Object3D | undefined = scene.getObjectByName('F_Butter_fly_B');

    if (!butterfly) {
      console.warn('F_Butter_fly_B が見つかりません');
      return;
    }

    // AnimationMixerの対象をこの子オブジェクトに限定（または scene 全体に適用してもOK）
    mixer.current = new THREE.AnimationMixer(butterfly);

    animations.forEach((clip: THREE.AnimationClip) => {
      const action: THREE.AnimationAction = mixer.current!.clipAction(clip);
      action.play();
    });
  }, [scene, animations]);

  useFrame((_: unknown, delta: number) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
}
