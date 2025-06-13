import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';
import type { TimelineEvent } from './Timeline';

interface TimelineCubeProps {
  event: TimelineEvent;
  position: [number, number, number];
  onSelect: (id: string) => void;
}

export default function TimelineCube({ event, position, onSelect }: TimelineCubeProps) {
  const ref = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? 0.005 : 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={() => onSelect(event.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'orange' : 'hotpink'} />
      <Html center distanceFactor={6} style={{ pointerEvents: 'none', fontSize: '0.5rem', color: 'white' }}>
        {event.title}
      </Html>
    </mesh>
  );
}

