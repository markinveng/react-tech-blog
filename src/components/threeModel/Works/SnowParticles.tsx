import { useRef, useMemo } from 'react';
import { useFrame, extend, Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import snowVertex from '@/shaders/snow.vert.glsl';
import snowFragment from '@/shaders/snow.fag.glsl';

const SnowShaderMaterial: typeof THREE.ShaderMaterial = shaderMaterial(
  { uTime: 0 },
  snowVertex,
  snowFragment
);
extend({ SnowShaderMaterial });
declare module '@react-three/fiber' {
  interface ThreeElements {
    snowShaderMaterial: Object3DNode<typeof SnowShaderMaterial, typeof SnowShaderMaterial> & {
      transparent?: boolean;
      depthWrite?: boolean;
    };
  }
}

export default function SnowParticles({ count = 500 }): JSX.Element {
  const pointsRef: React.MutableRefObject<THREE.Points | null> = useRef(null);
  // eslint-disable-next-line @typescript-eslint/typedef
  const materialRef = useRef<THREE.ShaderMaterial & { uTime: number } | null>(null);

  const { positions, scales } = useMemo(() => {
    const positions: Float32Array = new Float32Array(count * 3);
    const scales: Float32Array = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i: number = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      scales[i] = Math.random() * 0.5 + 3;
      seeds[i] = Math.random();
    }
    return { positions, scales, seeds };
  }, [count]);

  useFrame(({ clock }: { clock: THREE.Clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          array={scales}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <snowShaderMaterial ref={materialRef as React.Ref<typeof SnowShaderMaterial>} transparent depthWrite={false} />
    </points>
  );
}