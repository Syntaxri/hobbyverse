'use client';

import { useRef, useCallback, useState } from 'react';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

export function useHoverPhysics({ stiffness = 180, damping = 20 } = {}) {
  const setHovered = useInteractionStore((s) => s.setHovered);
  const clearHovered = useInteractionStore((s) => s.clearHovered);
  const intensity = useInteractionStore((s) => s.intensity);
  const performanceTier = useAppStore((s) => s.performanceTier);

  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const elRef = useRef(null);
  const raf = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (performanceTier === 'low' || !elRef.current) return;
    const rect = elRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.06 * intensity;
    const dy = (e.clientY - cy) * 0.06 * intensity;
    const clampedX = Math.max(-4, Math.min(4, dx));
    const clampedY = Math.max(-4, Math.min(4, dy));

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setMagneticOffset({ x: clampedX, y: clampedY });
    });
  }, [intensity, performanceTier]);

  const handleMouseLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    setMagneticOffset({ x: 0, y: 0 });
  }, []);

  const handleHoverStart = useCallback((type) => {
    setHovered(elRef.current?.id || null, type);
  }, [setHovered]);

  const handleHoverEnd = useCallback(() => {
    clearHovered();
  }, [clearHovered]);

  return {
    ref: elRef,
    magneticOffset,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleHoverEnd,
    },
    hoverHandlers: {
      onHoverStart: () => handleHoverStart('card'),
      onHoverEnd: handleHoverEnd,
    },
    springConfig: { type: 'spring', stiffness, damping, mass: 0.8 },
  };
}
