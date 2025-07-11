import { useLoader, useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertex from '@/shaders/butterfly/butterfly.vert.glsl';
import fragment from '@/shaders/butterfly/butterfly.frag.glsl';
import { shaderMaterial } from '@react-three/drei';

const ButterflyShaderMaterial: typeof THREE.ShaderMaterial & { uTime: number } = shaderMaterial(
  { uTime: 0, transparent: true },
  vertex,
  fragment
) as unknown as typeof THREE.ShaderMaterial & { uTime: number };

extend({ ButterflyShaderMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    butterflyShaderMaterial: ReactThreeFiber.Object3DNode<typeof ButterflyShaderMaterial, typeof ButterflyShaderMaterial>;
  }
}

export default function ButterflyParticles(): JSX.Element {
  const gltf: GLTF = useLoader(GLTFLoader, '/models/butterfly-shader.glb');
  const mesh: THREE.Mesh | null = gltf.scene.children[0] instanceof THREE.Mesh ? gltf.scene.children[0] : null;

  // eslint-disable-next-line @typescript-eslint/typedef
  const materialRef = useRef<(typeof THREE.ShaderMaterial & { uTime: number }) | null>(null);

  const { positions, seeds } = useMemo(() => {
    if (!mesh) {
      throw new Error('Mesh is null. Ensure the GLTF model is loaded correctly.');
    }
    const geometry: THREE.BufferGeometry = mesh.geometry as THREE.BufferGeometry;
    const posAttr: THREE.BufferAttribute = geometry.attributes.position as THREE.BufferAttribute;
    const count: number = posAttr.count;

    const positions: Float32Array = new Float32Array(count * 3);
    const seeds: Float32Array = new Float32Array(count);

    for (let i: number = 0; i < count; i++) {
      positions[i * 3 + 0] = posAttr.getX(i);
      positions[i * 3 + 1] = posAttr.getY(i);
      positions[i * 3 + 2] = posAttr.getZ(i);
      seeds[i] = Math.random();
    }

    return { positions, seeds };
  }, [mesh]);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    gltf.scene.traverse((child: THREE.Object3D) => {
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
