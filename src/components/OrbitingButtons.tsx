// src/components/OrbitingButtons.tsx
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import AnimatedObject from './AnimatedObject';

// 🟡 Umlaufender Button
function OrbitingButton({
  label,
  positionFn,
  color,
  occludeRef
}: {
  label: string;
  positionFn: (t: number) => [number, number, number];
  color: string;
  occludeRef: React.RefObject<THREE.Mesh>;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const [x, y, z] = positionFn(t);
      groupRef.current.position.set(x, y, z);
    }
  });

  // Hier prüfen wir, ob occludeRef und occludeRef.current nicht null sind.
  // Erst dann geben wir occlude={[occludeRef]} weiter, sonst kein occlude.
  const occludeArray = occludeRef && occludeRef.current ? [occludeRef] : false;

  return (
    <group ref={groupRef}>
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

// 🟡 Orbit-Punkte generieren
function generateOrbitPoints(rx: number, ry: number, rz: number, segments = 100) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * 2 * Math.PI;
    points.push(new THREE.Vector3(rx * Math.cos(t), ry * Math.sin(t), rz * Math.sin(t)));
  }
  return points;
}

// 🟡 Orbit-Linie rendern
function OrbitPath({ points, color }: { points: THREE.Vector3[]; color: string }) {
  const geometryRef = useRef<THREE.BufferGeometry>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => arr.set([p.x, p.y, p.z], i * 3));
    return arr;
  }, [points]);

  return (
    <line>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.3} />
    </line>
  );
}

// 🧠 Hauptkomponente
export default function OrbitingButtons() {
  const orbit1 = useMemo(() => generateOrbitPoints(2.5, 0.4, 2.5), []);
  const orbit2 = useMemo(() => generateOrbitPoints(3, -0.3, 3), []);
  const orbit3 = useMemo(() => generateOrbitPoints(2.2, 1.2, 1.5), []);

  // Ref für den zentralen Würfel
  const cubeRef = useRef<THREE.Mesh>(null!);

  return (
    <>
      {/* Der zentrale rotierende Würfel, bekommt cubeRef */}
      <AnimatedObject ref={cubeRef} />

      {/* Orbit-Pfade */}
      <OrbitPath points={orbit1} color="cyan" />
      <OrbitPath points={orbit2} color="magenta" />
      <OrbitPath points={orbit3} color="yellow" />

      {/* Umlaufende Buttons */}
      <OrbitingButton
        label="Projekte"
        positionFn={(t) => [2.5 * Math.cos(t), 0.4 * Math.sin(t), 2.5 * Math.sin(t)]}
        color="cyan"
        occludeRef={cubeRef}
      />
      <OrbitingButton
        label="Über mich"
        positionFn={(t) => [3 * Math.cos(-t), -0.3 * Math.sin(-t), 3 * Math.sin(-t)]}
        color="magenta"
        occludeRef={cubeRef}
      />
      <OrbitingButton
        label="Kontakt"
        positionFn={(t) => [2.2 * Math.sin(t), 1.2 * Math.cos(t), 1.5 * Math.cos(t)]}
        color="yellow"
        occludeRef={cubeRef}
      />
    </>
  );
}


