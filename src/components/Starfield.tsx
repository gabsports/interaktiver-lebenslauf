// src/components/Starfield.tsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Hier muss "export default" stehen:
export default function Starfield({
  count = 5000,
  radius = 50,
}: {
  count?: number;
  radius?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      arr[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* BufferAttribute nun über args */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="white"
        transparent
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
}

// Diese Komponente rendert einen Sternenhimmel mit zufälligen Punkten auf einer Kugeloberfläche.
// Sie nutzt `useMemo` für die Performance und `useFrame` für eine sanfte Rotation.