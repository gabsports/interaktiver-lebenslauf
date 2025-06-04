import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AnimatedObject from './AnimatedObject';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Starfield from './Starfield';
import TopButtonBar from './TopButtonBar';

export default function ThreeScene() {
  return (
    <div className="relative flex justify-center items-center three-scene-container">
      <TopButtonBar />

      <Canvas
        className="three-scene-canvas rounded-lg shadow-lg"
        style={{ width: 600, height: 600, background: '#0f0f0f' }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        onCreated={({ gl }) => gl.setClearColor('#0f0f0f')}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        <Starfield count={6000} radius={100} />

        <AnimatedObject />

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
