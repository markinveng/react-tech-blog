import { useLoader, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertex from '@/shaders/butterfly/butterfly.vert.glsl';
import fragment from '@/shaders/butterfly/butterfly.frag.glsl';
import { shaderMaterial } from '@react-three/drei';

const ButterflyShaderMaterial = shaderMaterial(
  { uTime: 0, transparent: true },
  vertex,
  fragment
);

extend({ ButterflyShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    butterflyShaderMaterial: ReactThreeFiber.Object3DNode<typeof ButterflyShaderMaterial, typeof ButterflyShaderMaterial>;
  }
}

export default function ButterflyParticles() {
  const gltf = useLoader(GLTFLoader, '/models/butterfly-shader.glb');
  const mesh = gltf.scene.children[0] as THREE.Mesh;

  const materialRef = useRef<any>(null);

  const { positions, seeds } = useMemo(() => {
    const geometry = mesh.geometry as THREE.BufferGeometry;
    const posAttr = geometry.attributes.position;
    const count = posAttr.count;

    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = posAttr.getX(i);
      positions[i * 3 + 1] = posAttr.getY(i);
      positions[i * 3 + 2] = posAttr.getZ(i);
      seeds[i] = Math.random();
    }

    return { positions, seeds };
  }, [mesh.geometry]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = false; // ← モデルの表示を完全にOFFにする
      }
    });
  }, [gltf]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-aSeed" array={seeds} count={seeds.length} itemSize={1} />
      </bufferGeometry>
      <butterflyShaderMaterial
        ref={materialRef}
        args={[{
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          transparent: true, // これも必要になる場合あり
        }]}
      />
    </points>
  );
}
