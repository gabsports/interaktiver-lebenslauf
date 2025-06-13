import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Starfield from './Starfield';
import TopButtonBar from './TopButtonBar';
import TimelineCube from './TimelineCube';
import type { TimelineEvent } from './Timeline';

interface ThreeSceneProps {
  events: TimelineEvent[];
  onSelect: (id: string) => void;
}

export default function ThreeScene({ events, onSelect }: ThreeSceneProps) {
  return (
    <div className="relative flex justify-center items-center three-scene-container">
      <TopButtonBar />

      <Canvas
        className="three-scene-canvas rounded-lg shadow-lg"
        style={{ background: '#0f0f0f' }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        onCreated={({ gl }) => gl.setClearColor('#0f0f0f')}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Starfield count={6000} radius={100} />

        {events.map((event, idx) => (
          <TimelineCube
            key={event.id}
            event={event}
            position={[idx * 3 - (events.length - 1) * 1.5, 0, 0]}
            onSelect={onSelect}
          />
        ))}

        <OrbitControls />
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
