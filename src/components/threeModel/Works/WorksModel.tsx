"use client";

import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds } from '@react-three/drei';
import { getImagesByPage } from '@/_libs/client';
import { ImageData } from '@/_type/image';
import Model from './Model';
import CameraControls from './CameraControls';
import ButterflyAnimation from './ButterflyAnimation';
import SnowParticles from './SnowParticles';
import { Pagination } from '@/components/Pagination/Pagination';
import Modal from '../Modal/Modal';

export default function WorksModel(): React.ReactElement | null {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageItems, setImageItems] = useState<ImageData[] | object | null>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [modalData, setModalData] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/typedef
    getImagesByPage(currentPage, 5).then(({ contents, totalCount }) => {
      console.log(contents);

      setImageItems(contents);
      setTotalPages(Math.ceil(totalCount / 5));
    });
  }, [currentPage]);

  if (Array.isArray(imageItems) && imageItems.length === 0) return null;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* ページネーションUIを前面に */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={modalData}
      />

      {/* Three.js Canvas */}
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <axesHelper args={[2]} />
        <Suspense fallback={null}>
          <Bounds observe={false} margin={1.2}>
            <Model
              imageItems={imageItems}
              onPlaneClick={(clickedData: ImageData) => {
                setModalData(clickedData);
                setIsModalOpen(true);
              }}
            />
            <ButterflyAnimation />
            <CameraControls />
            <SnowParticles />
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}