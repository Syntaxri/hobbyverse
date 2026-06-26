'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigation } from './NavigationProvider';

export const RouteChangeLoader = () => {
  const { navigating } = useNavigation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startProgress = useCallback(() => {
    setVisible(true);
    setProgress(0);
    const step = () => {
      setProgress((p) => {
        if (p >= 90) return p;
        const increment = Math.max(2, (90 - p) * 0.08);
        return Math.min(90, p + increment);
      });
    };
    intervalRef.current = setInterval(step, 80);
  }, []);

  const finishProgress = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    if (navigating) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      startProgress();
    } else {
      finishProgress();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [navigating, startProgress, finishProgress]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
      role="progressbar"
      aria-valuenow={progress}
      aria-label="Page loading"
    >
      <div
        className="h-full bg-gradient-to-r from-hv-cyan via-hv-sky to-hv-lavender transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 8px rgba(59,130,246,0.4), 0 0 2px rgba(59,130,246,0.6)',
        }}
      />
    </div>
  );
};
