'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useInteractionStore } from '@/lib/interaction-store';

export const LightingSystem = () => {
  const { performanceTier } = useAppStore();
  const intensity = useInteractionStore((s) => s.intensity);

  const shadowConfig = useMemo(() => ({
    mapSize: performanceTier === 'high' ? [1024, 1024] : [512, 512],
    bias: -0.001,
    normalBias: 0.02,
  }), [performanceTier]);

  const lightIntensity = 0.4 * intensity + 0.6;

  return (
    <>
      <ambientLight intensity={0.25} />

      <hemisphereLight
        args={['#94a3b8', '#1e293b', 0.3]}
        intensity={0.35 * intensity}
      />

      <directionalLight
        position={[8, 12, 4]}
        intensity={lightIntensity * 1.2}
        color="#f0f9ff"
        castShadow={performanceTier === 'high'}
        shadow-mapSize={shadowConfig.mapSize}
        shadow-bias={shadowConfig.bias}
        shadow-normalBias={shadowConfig.normalBias}
      >
        {performanceTier === 'high' && (
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10, 0.1, 30]} />
        )}
      </directionalLight>

      <directionalLight
        position={[-6, 4, -8]}
        intensity={lightIntensity * 0.5}
        color="#8b5cf6"
      />

      <directionalLight
        position={[0, -8, 6]}
        intensity={lightIntensity * 0.15}
        color="#6366f1"
      />
    </>
  );
};
