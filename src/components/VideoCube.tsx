/*import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function VideoCube() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Video erstellen & starten
  useEffect(() => {
    const video = document.createElement('video');
    video.src = '/videos/front.mp4'; // Pfad im public-Ordner
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play();

    const videoTexture = new THREE.VideoTexture(video);

    // Nur Frontseite → index 4
    const mesh = meshRef.current;
    if (Array.isArray(mesh.material)) {
      (mesh.material[4] as THREE.MeshBasicMaterial).map = videoTexture;
      mesh.material[4].needsUpdate = true;
    }
  }, []);

  // Sechs identische Materialien (eine wird später ersetzt)
  const materials = Array.from({ length: 6 }, () => new THREE.MeshBasicMaterial({ color: 'gray' }));

  return (
    <mesh ref={meshRef} material={materials}>
      <boxGeometry args={[4, 4, 4]} />
    </mesh>
  );
}*/
