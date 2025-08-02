import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const GlobeModel = () => {
  const meshRef = useRef();
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshPhongMaterial
        color="#1e40af"
        emissive="#1e40af"
        emissiveIntensity={0.1}
        shininess={5}
        transparent
        opacity={0.8}
        wireframe={false}
      />
      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          wireframe
        />
      </mesh>
    </mesh>
  );
};

const Globe = () => {
  return (
    <div className="w-full h-64 md:h-96 lg:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GlobeModel />
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Globe;
