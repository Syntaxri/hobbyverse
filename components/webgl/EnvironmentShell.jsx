'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

export const EnvironmentShell = () => {
  const { scene } = useThree();
  const fogRef = useRef(null);
  const scroll = useInteractionStore((s) => s.scroll);
  const intensity = useInteractionStore((s) => s.intensity);
  const { performanceTier } = useAppStore();

  const baseFogDensity = 0.012;

  useFrame(() => {
    if (!fogRef.current) return;
    const scrollFactor = Math.min(Math.abs(scroll.velocity) * 0.003, 0.015);
    const density = baseFogDensity + scrollFactor;
    fogRef.current.density = density;
  });

  return (
    <>
      <fog
        ref={fogRef}
        attach="fog"
        args={['#0f172a', 15, 35]}
      />

      {performanceTier !== 'low' && (
        <mesh>
          <sphereGeometry args={[30, 32, 32]} />
          <meshBasicMaterial
            color="#0f172a"
            transparent
            opacity={0.3 * intensity}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </>
  );
};
