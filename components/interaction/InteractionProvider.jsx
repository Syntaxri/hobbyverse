'use client';

import { createContext, useContext, useEffect, useRef, useCallback } from 'react';
import { useInteractionStore } from '@/lib/interaction-store';

const InteractionContext = createContext(null);
export const useInteraction = () => useContext(InteractionContext);

export const InteractionProvider = ({ children }) => {
  const setCursor = useInteractionStore((s) => s.setCursor);
  const setScroll = useInteractionStore((s) => s.setScroll);
  const setIntensity = useInteractionStore((s) => s.setIntensity);
  const prevScrollY = useRef(0);
  const prevTime = useRef(0);
  const fpsFrames = useRef([]);

  useEffect(() => {
    let raf;

    const tick = (time) => {
      const scrollY = window.scrollY;
      const dt = time - prevTime.current;

      if (dt > 0) {
        const delta = scrollY - prevScrollY.current;
        const velocity = delta / dt;
        const prevVelocity = useInteractionStore.getState().scroll.velocity;
        const acceleration = (velocity - prevVelocity) / dt;

        setScroll({
          velocity: Math.abs(velocity),
          direction: delta >= 0 ? 'down' : 'up',
          acceleration: Math.abs(acceleration),
        });

        fpsFrames.current.push(time);
        const cutoff = time - 1000;
        fpsFrames.current = fpsFrames.current.filter((t) => t > cutoff);
        const fps = fpsFrames.current.length;
        if (fps < 30) setIntensity(0.4);
        else if (fps < 50) setIntensity(0.7);
        else setIntensity(1);
      }

      prevScrollY.current = scrollY;
      prevTime.current = time;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setScroll, setIntensity]);

  useEffect(() => {
    const handler = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const { cursor } = useInteractionStore.getState();
      setCursor({
        x: Math.round(x * 1000) / 1000,
        y: Math.round(y * 1000) / 1000,
        vx: cursor.x ? (x - cursor.x) * 100 : 0,
        vy: cursor.y ? (y - cursor.y) * 100 : 0,
      });
    };

    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [setCursor]);

  return (
    <InteractionContext.Provider value={{}}>
      {children}
    </InteractionContext.Provider>
  );
};
