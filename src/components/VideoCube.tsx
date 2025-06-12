import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VideoCubeProps {
  /**
   * Optional array of six video sources in the order
   * [right, left, top, bottom, front, back].
   * Undefined entries will use the mesh's base material color.
   */
  sources?: (string | undefined)[];
}

export default function VideoCube({ sources }: VideoCubeProps) {
  // Ref to the mesh
  const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material[]>>(null!);
  // Ref to store VideoTextures
  const texturesRef = useRef<(THREE.VideoTexture | null)[]>([]);
  const [hovered, setHovered] = useState(false);

  // Rotate cube and update video textures each frame
  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      // Rotate
      mesh.rotation.y += hovered ? 0.0005 : 0.01;
      // Update each video texture
      texturesRef.current.forEach((tex) => {
        if (tex && tex.image.readyState >= tex.image.HAVE_CURRENT_DATA) {
          tex.needsUpdate = true;
        }
      });
    }
  });

  // Initialize videos and textures
  useEffect(() => {
    const defaultSources = Array<string | undefined>(6).fill(undefined);
    const videoSources = sources ?? defaultSources;

    // Create <video> elements
    const videos = videoSources.map((src) => {
      if (!src) return null;
      const video = document.createElement('video');
      video.src = src;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      // Attempt to play on canplay
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) {
        play();
      } else {
        video.addEventListener('canplay', play, { once: true });
      }
      return video;
    });

    // Create VideoTextures and store in ref
    texturesRef.current = videos.map((video) => {
      if (!video) return null;
      const tex = new THREE.VideoTexture(video);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.format = THREE.RGBAFormat;
      tex.flipY = false;
      return tex;
    });

    // Apply textures to mesh materials
    const mesh = meshRef.current;
    if (mesh && Array.isArray(mesh.material)) {
      texturesRef.current.forEach((texture, index) => {
        if (!texture) return;
        const mat = mesh.material[index] as THREE.MeshBasicMaterial;
        mat.map = texture;
        mat.needsUpdate = true;
      });
    }

    // Workaround for autoplay: start on first user interaction
    const startAll = () => {
      videos.forEach((v) => v?.play().catch(() => {}));
      window.removeEventListener('click', startAll);
    };
    window.addEventListener('click', startAll);

    // Cleanup
    return () => {
      window.removeEventListener('click', startAll);
      videos.forEach((v) => v && v.pause());
      texturesRef.current.forEach((t) => t && t.dispose());
    };
  }, [sources]);

  // Create a default set of materials (black base color)
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