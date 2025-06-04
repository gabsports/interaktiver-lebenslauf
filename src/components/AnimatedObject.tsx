// src/components/AnimatedObject.tsx
import { forwardRef, useEffect, useState, useRef, useImperativeHandle } from 'react';
import { useSpring, a } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const AnimatedObject = forwardRef<Mesh>((_, ref) => {
  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Verknüpfe den externen ref mit meshRef
  useImperativeHandle(ref, () => meshRef.current!);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const { scale } = useSpring({
    scale: visible ? [1, 1, 1] : [0, 0, 0],
    config: { mass: 2, tension: 120, friction: 20 },
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.0005 : 0.01;
    }
  });

  return (
    <a.mesh
      ref={meshRef}
      scale={scale.to((x, y, z) => [x, y, z])}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
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
});

export default AnimatedObject;





