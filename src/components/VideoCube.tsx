import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VideoCubeProps {
  /**
   * Optional array of six video sources in the order
   * [right, left, top, bottom, front, back].
   * Undefined entries will simply use the mesh's base
   * material color instead of a video texture.
   */
  sources?: (string | undefined)[];
}

export default function VideoCube({ sources }: VideoCubeProps) {
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material[]>>(null!);
  const [hovered, setHovered] = useState(false);

  // Continuously rotate the cube, slowing down when hovered
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.0005 : 0.01;
    }
  });

  useEffect(() => {
    // Place your videos in the `public/videos` folder and reference
    // them here (e.g. '/videos/front.mp4').
    const defaultSources = Array(6).fill(undefined);
    const videoSources = sources ?? defaultSources;

    const videos = videoSources.map((src) => {
      if (!src) return null;
      const video = document.createElement('video');
      video.src = src;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      // Calling play() can throw on some browsers if not triggered by user
      void video.play().catch(() => {});
      return video;
    });

    const textures = videos.map((video) => (video ? new THREE.VideoTexture(video) : null));

    const mesh = meshRef.current;
    if (Array.isArray(mesh.material)) {
      textures.forEach((texture, index) => {
        if (!texture) return;
        const material = mesh.material[index] as THREE.MeshBasicMaterial;
        material.map = texture;
        material.needsUpdate = true;
      });
    }

    return () => {
      videos.forEach((video) => video && video.pause());
      textures.forEach((texture) => texture && texture.dispose());
    };
  }, [sources]);

  // create the materials once so video textures are not lost on re-render
  const materials = useMemo(
    () => Array.from({ length: 6 }, () => new THREE.MeshBasicMaterial({ color: 'black' })),
    []
  );

  return (
    <mesh
      ref={meshRef}
      material={materials}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}