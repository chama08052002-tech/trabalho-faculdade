import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function GridParticles() {
  const points = useRef();
  const count = 40;
  
  const positions = React.useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
        for(let j = 0; j < count; j++) {
            pos.push((i - count/2) * 0.5);
            pos.push(0);
            pos.push((j - count/2) * 0.5);
        }
    }
    return new Float32Array(pos);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count * count; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        const y = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 0.3;
        points.current.geometry.attributes.position.array[i * 3 + 1] = y;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00e5ff"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.3}
      />
    </points>
  );
}

export default function TechBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, background: '#0a0b0d' }}>
      <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
        <GridParticles />
      </Canvas>
    </div>
  );
}
