// src/components/OrbitingButtons.tsx
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import AnimatedObject from './AnimatedObject';

// 🟡 Umlaufender Button
function StaticButton({
  label,
  position,
  color,
  occludeRef,
}: {
  label: string;
  position: [number, number, number];
  color: string;
  occludeRef: React.RefObject<THREE.Mesh>;
}) {

  // Hier prüfen wir, ob occludeRef und occludeRef.current nicht null sind.
  // Erst dann geben wir occlude={[occludeRef]} weiter, sonst kein occlude.
  const occludeArray = occludeRef && occludeRef.current ? [occludeRef] : false;

  return (
    <group position={position}>
      <Html
        center
        transform
        occlude={occludeArray}
        scale={0.1}
      >
        <button className="glow-button" style={{ borderColor: color }}>
          {label}
        </button>
      </Html>
    </group>
  );
}


// 🧠 Hauptkomponente
export default function OrbitingButtons() {
  // Ref für den zentralen Würfel
  const cubeRef = useRef<THREE.Mesh>(null!);

  return (
    <>
      {/* Der zentrale rotierende Würfel, bekommt cubeRef */}
      <AnimatedObject ref={cubeRef} />

      {/* Statische Buttons */}
      <StaticButton label="Projekte" position={[3, 0.5, 0]} color="cyan" occludeRef={cubeRef} />
      <StaticButton label="Über mich" position={[-3, 0.5, 0]} color="magenta" occludeRef={cubeRef} />
      <StaticButton label="Kontakt" position={[0, -0.5, 3]} color="yellow" occludeRef={cubeRef} />
    </>
  );
}


