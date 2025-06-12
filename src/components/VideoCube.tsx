import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VideoCubeProps {
  sources?: (string | undefined)[];
}

export default function VideoCube({ sources }: VideoCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texturesRef = useRef<(THREE.VideoTexture | null)[]>([]);
  const [hovered, setHovered] = useState(false);

  // 1) useFrame: Rotation & Texture-Update
  useFrame(() => {
    if (!meshRef.current) return;

    // Rotation
    meshRef.current.rotation.y += hovered ? 0.0005 : 0.01;

    // Video-Texturen bei jedem Frame updaten
    texturesRef.current.forEach((tex) => {
      if (tex && tex.image.readyState >= tex.image.HAVE_CURRENT_DATA) {
        tex.needsUpdate = true;
      }
    });
  });

  useEffect(() => {
    const defaultSources = Array(6).fill(undefined);
    const videoSources = sources ?? defaultSources;

    // 2) Videos anlegen und abspielen
    const videos = videoSources.map((src) => {
      if (!src) return null;
      const video = document.createElement('video');
      video.src = src;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      // Autoplay starten, sobald 'canplay'
      const play = () => video.play().catch(() => {});
      if (video.readyState >= 2) play();
      else video.addEventListener('canplay', play, { once: true });
      return video;
    });

    // 3) VideoTexture erzeugen und im Ref speichern
    texturesRef.current = videos.map((video) => {
      if (!video) return null;
      const tex = new THREE.VideoTexture(video);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.format = THREE.RGBAFormat;
      tex.flipY = false;
      return tex;
    });

    // 4) Texturen auf die sechs Materialien der Mesh anwenden
    const mesh = meshRef.current!;
    if (Array.isArray(mesh.material)) {
      texturesRef.current.forEach((texture, i) => {
        if (!texture) return;
        const mat = (mesh.material as THREE.Material[])[i] as THREE.MeshBasicMaterial;
        mat.map = texture;
        mat.needsUpdate = true;
      });
    }

    // Cleanup: Videos pausieren & Texturen freigeben
    return () => {
      videos.forEach((v) => v && v.pause());
      texturesRef.current.forEach((t) => t && t.dispose());
    };
  }, [sources]);

  // 5) Materialien einmalig erstellen
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
