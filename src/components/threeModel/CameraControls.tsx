import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { PerspectiveCamera, Vector3 } from 'three';
import GUI from 'lil-gui';

const showGUI: boolean = true;

// easeInOut: Hermite interpolation
const easeInOut: (t: number) => number = (t: number): number => t * t * (3 - 2 * t);

export default function CameraControls(): null {
  const { camera } = useThree();

  const guiRef: React.MutableRefObject<GUI | null> = useRef<GUI | null>(null);
  const targetPos: React.MutableRefObject<Vector3> = useRef<Vector3>(new Vector3(16.8, 20.1, 13.1));
  const targetLook: React.MutableRefObject<Vector3> = useRef<Vector3>(new Vector3(9.4, 18, 0));
  const fov: React.MutableRefObject<number> = useRef<number>(55);

  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (!showGUI) return;

    const gui: GUI = new GUI();
    guiRef.current = gui;

    const pos: GUI = gui.addFolder('Camera Position');
    pos.add(targetPos.current, 'x', -50, 50, 0.1).name('X');
    pos.add(targetPos.current, 'y', -50, 50, 0.1).name('Y');
    pos.add(targetPos.current, 'z', -50, 50, 0.1).name('Z');

    const look: GUI = gui.addFolder('Camera LookAt');
    look.add(targetLook.current, 'x', -50, 50, 0.1).name('X');
    look.add(targetLook.current, 'y', -50, 50, 0.1).name('Y');
    look.add(targetLook.current, 'z', -50, 50, 0.1).name('Z');

    gui.add(fov, 'current', 10, 100).name('FOV').onChange((v: number) => {
      const cam: PerspectiveCamera = camera as PerspectiveCamera;
      cam.fov = v;
      cam.updateProjectionMatrix();
    });

    return (): void => gui.destroy();
  }, [camera]);

  useFrame((_: unknown, delta: number) => {
    const cam: PerspectiveCamera = camera as PerspectiveCamera;

    const speed: number = 2.0;
    if (animProgress < 1) {
      const t: number = Math.min(animProgress + delta / speed, 1);
      const easedT: number = easeInOut(t);
      setAnimProgress(t);

      const start: Vector3 = new Vector3(0, 0, 50);
      const currentPos: Vector3 = start.clone().lerp(targetPos.current, easedT);
      cam.position.copy(currentPos);
      cam.lookAt(targetLook.current);
    } else {
      cam.position.copy(targetPos.current);
      cam.lookAt(targetLook.current);
    }

    cam.fov = fov.current;
    cam.updateProjectionMatrix();
  });

  return null;
}
