'use client';

import { Suspense } from 'react';
import { CameraSystem } from './CameraSystem';
import { LightingSystem } from './LightingSystem';
import { EnvironmentShell } from './EnvironmentShell';
import { ParticleField } from './ParticleField';
import { FloatingObjects } from './FloatingObjects';
import { InteractionBridge } from './InteractionBridge';
import { useAppStore } from '@/store/useAppStore';

export const SceneController = () => {
  const { performanceTier } = useAppStore();

  return (
    <Suspense fallback={null}>
      <CameraSystem />
      <LightingSystem />

      <EnvironmentShell />

      {(performanceTier === 'high' || performanceTier === 'mid') && <ParticleField />}
      <FloatingObjects />
      <InteractionBridge />
    </Suspense>
  );
};
