import { useRef, useEffect, useState } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export default function AnimatedObject() {
  const meshRef = useRef<Mesh>(null!);
  const [visible, setVisible] = useState(false);
   const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // Animation beim Laden
  const { scale } = useSpring({
    scale: visible ? [1, 1, 1] : [0, 0, 0],
    config: { mass: 2, tension: 120, friction: 20 },
  });

  // Dauerhafte Rotation
  useFrame(() => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  useFrame(() => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <a.mesh
      ref={meshRef}
      scale={scale.to((x, y, z) => [x, y, z])} // Typanpassung für scale
      onPointerOver={() => setHovered(true)}   // 👈 Hover aktiv
      onPointerOut={() => setHovered(false)}   // 👈 Hover verlässt
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'gold' : 'hotpink'} />
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
  color={hovered ? 'black' : 'hotpink'}
  emissive={hovered ? '#00ffff' : 'hotpink'}
  emissiveIntensity={hovered ? 1.2 : 0.6}
  metalness={1}
  roughness={0.1}
/>
    </a.mesh>
  );
}