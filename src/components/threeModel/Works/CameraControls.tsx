import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import GUI from 'lil-gui';

const showGUI: boolean = true;

const easeInOut: (t: number) => number = (t: number): number => t * t * (3 - 2 * t);

export default function CameraControls(): null {
  const { camera } = useThree();

  const targetPos: React.MutableRefObject<Vector3> = useRef<Vector3>(new Vector3(16.8, 20.1, 13.1));
  const lookAt: React.MutableRefObject<{ x: number; y: number; z: number }> = useRef<{ x: number; y: number; z: number }>({ x: 9.4, y: 18, z: 0 }); // 修正: オブジェクトで追跡可能に
  const cameraState: React.MutableRefObject<{ fov: number }> = useRef<{ fov: number }>({ fov: 55 });        // 修正: fovもオブジェクトで管理

  const [animProgress, setAnimProgress] = useState(0);

  // 初期化：画面幅によって lookAt と fov を設定
  useEffect(() => {
    const width: number = typeof window !== 'undefined' ? window.innerWidth : 1024;

    if (width <= 768) {
      lookAt.current = { x: 7.2, y: 18, z: 0 };
      cameraState.current.fov = 80;
    } else if (width <= 1024) {
      lookAt.current = { x: 6.2, y: 18, z: 0 };
      cameraState.current.fov = 60;
    } else {
      lookAt.current = { x: 9.4, y: 18, z: 0 };
      cameraState.current.fov = 55;
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
    const speed: number = 2;

    if (animProgress < 1) {
      const t: number = Math.min(animProgress + delta / speed, 1);
      setAnimProgress(t);

      const start: Vector3 = new Vector3(0, 0, 50);
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
