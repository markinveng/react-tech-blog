import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import GUI from 'lil-gui';

const showGUI: boolean = false;

const easeInOut: (t: number) => number = (t: number): number => t * t * (3 - 2 * t);

export default function CameraControls(): null {
  const { camera } = useThree();

  const targetPos: React.MutableRefObject<Vector3> = useRef<Vector3>(new Vector3(16.8, 20.1, 13.1));
  const lookAt: React.MutableRefObject<{ x: number; y: number; z: number }> = useRef<{ x: number; y: number; z: number }>({ x: 9.4, y: 18, z: 0 });
  const cameraState: React.MutableRefObject<{ fov: number }> = useRef<{ fov: number }>({ fov: 55 });

  const [animProgress, setAnimProgress] = useState(0);

  // 初期化：画面幅によって lookAt と fov を設定
  useEffect(() => {
    const width: number = typeof window !== 'undefined' ? window.innerWidth : 1024;

    if (width <= 768) {
      targetPos.current.set(-2.7, 25.6, 0.6);
      lookAt.current = { x: 3.4, y: -36, z: -8.69 };
      cameraState.current.fov = 26.2;
    } else if (width <= 1024) {
      targetPos.current.set(-3.8, 25.6, 2);
      lookAt.current = { x: 3.4, y: -36, z: -10.1 };
      cameraState.current.fov = 22.42;
    } else {
      targetPos.current.set(-5.5, 25.6, 2.8);
      lookAt.current = { x: 1.6, y: -36, z: -10.5 };
      cameraState.current.fov = 16.84;
    }
  }, []);

  useEffect(() => {
    if (!showGUI) return;

    const gui: GUI = new GUI();
    gui.add(targetPos.current, 'x', -50, 50, 0.1).name('Camera X');
    gui.add(targetPos.current, 'y', -50, 50, 0.1).name('Camera Y');
    gui.add(targetPos.current, 'z', -50, 50, 0.1).name('Camera Z');

    const look: GUI = gui.addFolder('Look At');
    look.add(lookAt.current, 'x', -50, 50, 0.1).name('LookAt X');
    look.add(lookAt.current, 'y', -50, 50, 0.1).name('LookAt Y');
    look.add(lookAt.current, 'z', -50, 50, 0.1).name('LookAt Z');

    gui.add(cameraState.current, 'fov', 10, 100).name('FOV');

    return (): void => gui.destroy();
  }, []);

  useFrame((_: unknown, delta: number) => {
    const cam: PerspectiveCamera = camera as PerspectiveCamera;
    const speed: number = 10;

    if (animProgress < 1) {
      const t: number = Math.min(animProgress + delta / speed, 1);
      setAnimProgress(t);

      const start: Vector3 = new Vector3(0, 0, 4.0);
      cam.position.copy(start.lerp(targetPos.current, easeInOut(t)));
    } else {
      cam.position.copy(targetPos.current);
    }

    cam.lookAt(new Vector3(lookAt.current.x, lookAt.current.y, lookAt.current.z));
    cam.fov = cameraState.current.fov;
    cam.updateProjectionMatrix();
  });

  return null;
}
