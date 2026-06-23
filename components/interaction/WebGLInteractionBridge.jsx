'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

export const WebGLInteractionBridge = () => {
  const cursor = useInteractionStore((s) => s.cursor);
  const scroll = useInteractionStore((s) => s.scroll);
  const hoveredType = useInteractionStore((s) => s.hoveredType);
  const performanceTier = useAppStore((s) => s.performanceTier);
  const camera = useThree((s) => s.camera);
  const clock = useRef({ elapsed: 0 });

  useFrame((state, delta) => {
    clock.current.elapsed += delta;

    const tx = (cursor.x - 0.5) * 1.2;
    const ty = (cursor.y - 0.5) * 0.8;

    if (performanceTier === 'high') {
      camera.position.x += (tx - camera.position.x) * 0.02;
      camera.position.y += (-ty - camera.position.y) * 0.02;
    }

    const fogTarget = performanceTier === 'high' ? 15 + scroll.velocity * 2 : 12;
    state.scene.fog?.propertyChanged?.();

    return null;
  });

  return null;
};
