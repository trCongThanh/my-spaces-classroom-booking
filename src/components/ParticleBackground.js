import React, { useRef, useMemo } from 'react';
import { Platform } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars(props) {
  const ref = useRef();
  const groupRef = useRef();
  
  const sphere = useMemo(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 3000; i+=3) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.cbrt(Math.random()) * 2.5; 
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i+1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i+2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if(groupRef.current) {
      groupRef.current.rotation.y += delta / 20;
    }
    if(ref.current) {
      const targetX = (state.pointer.y * Math.PI) / 4;
      const targetY = (state.pointer.x * Math.PI) / 4;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.05);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ff00cc" size={0.015} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function ParticleBackground() {
  const eventSource = Platform.OS === 'web' && typeof document !== 'undefined' ? document.body : undefined;

  return (
    <Canvas 
      eventSource={eventSource}
      camera={{ position: [0, 0, 1] }} 
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#050510' }}
    >
      <Stars />
    </Canvas>
  );
}
