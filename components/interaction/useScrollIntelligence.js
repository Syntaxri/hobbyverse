'use client';

import { useMemo } from 'react';
import { useInteractionStore } from '@/lib/interaction-store';

export function useScrollIntelligence() {
  const scroll = useInteractionStore((s) => s.scroll);
  const intensity = useInteractionStore((s) => s.intensity);

  return useMemo(() => {
    const isFast = scroll.velocity > 1.5;
    const isSlow = scroll.velocity < 0.3;
    return {
      ...scroll,
      intensity,
      isFast,
      isSlow,
      reducedMotion: isFast || intensity < 0.5,
    };
  }, [scroll.velocity, scroll.direction, scroll.acceleration, intensity]);
}
