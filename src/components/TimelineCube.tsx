import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Mesh } from 'three';
import { animated, useSpring } from '@react-spring/three';
import type { TimelineEvent } from './Timeline';

interface TimelineCubeProps {
  event: TimelineEvent;
  position: [number, number, number];
  onSelect: (id: string) => void;
}

export default function TimelineCube({ event, position, onSelect }: TimelineCubeProps) {
  const ref = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const { scale } = useSpring({ scale: hovered ? 1.2 : 1, config: { tension: 170, friction: 12 } });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += hovered ? 0.005 : 0.01;
    }
  });

  return (
    <animated.mesh
      ref={ref}
      position={position}
      scale={scale}
      onClick={() => onSelect(event.id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {hovered ? (
        <sphereGeometry args={[0.75, 32, 32]} />
      ) : (
        <boxGeometry args={[1, 1, 1]} />
      )}
      <meshStandardMaterial color={hovered ? 'orange' : 'hotpink'} />
      <Html
        position={[0, -1.2, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: 'none', fontSize: '0.5rem', color: 'white' }}
      >
        {event.title}
      </Html>
    </animated.mesh>
  );
}

