'use client';

import { useEffect, useRef } from 'react';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

const TARGET_LERP = 0.08;

export const CursorFollower = () => {
  const cursor = useInteractionStore((s) => s.cursor);
  const hoveredType = useInteractionStore((s) => s.hoveredType);
  const intensity = useInteractionStore((s) => s.intensity);
  const performanceTier = useAppStore((s) => s.performanceTier);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const cursorRef = useRef(cursor);
  const hoveredTypeRef = useRef(hoveredType);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    cursorRef.current = cursor;
    hoveredTypeRef.current = hoveredType;
    intensityRef.current = intensity;
  });

  useEffect(() => {
    if (performanceTier === 'low') return;

    let raf;
    const tick = () => {
      const c = cursorRef.current;
      const h = hoveredTypeRef.current;
      const inten = intensityRef.current;
      const tx = c.x * window.innerWidth;
      const ty = c.y * window.innerHeight;
      pos.current.x += (tx - pos.current.x) * TARGET_LERP;
      pos.current.y += (ty - pos.current.y) * TARGET_LERP;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const isHover = h === 'card' || h === 'button';
        const scale = isHover ? 3 : 1;
        const opacity = isHover ? 0.15 : 0.4;
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = opacity * inten;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [performanceTier]);

  if (performanceTier === 'low') return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-hv-sky pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-hv-sky/60 pointer-events-none z-[99] transition-opacity duration-300 hidden md:block"
        style={{ willChange: 'transform, opacity' }}
      />
    </>
  );
};
