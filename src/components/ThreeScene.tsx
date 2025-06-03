import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import AnimatedObject from './AnimatedObject';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import OrbitingButtons from './OrbitingButtons';
import Starfield from './Starfield';

export default function ThreeScene() {
   {/* 1. Sternenhimmel im Hintergrund */}
      <Starfield count={6000} radius={100} />
  return (
    <div className="flex justify-center items-center w-[400px] h-[400px]">

      <Canvas
       className="w-[600px] h-[600px] rounded-lg shadow-lg"
  style={{ width: 1600, height: 1000, background: '#0f0f0f' }}
  camera={{ position: [0, 0, 6], fov: 50 }}
  onCreated={({ gl }) => gl.setClearColor('#0f0f0f')}
>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />

        {/* animierter Würfel */}
        {/* 1. Sternenhimmel im Hintergrund */}
        <Starfield count={6000} radius={100} />

        <AnimatedObject/>
        <OrbitingButtons/>

    


        <OrbitControls />
        <EffectComposer>
  <Bloom
    intensity={1.2}            // Stärke des Glows
    luminanceThreshold={0.2}   // ab wann etwas leuchtet
    luminanceSmoothing={0.9}   // weichere Übergänge
  />
</EffectComposer>
      </Canvas>
    </div>
  );
}



