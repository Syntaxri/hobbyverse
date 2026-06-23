'use client';

import { useEffect } from 'react';

export function useReducedMotion() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      document.documentElement.classList.add('reduce-motion');
    }
    const handler = (e) => {
      document.documentElement.classList.toggle('reduce-motion', e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
}

export function useHighContrast() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-contrast: more)');
    if (mq.matches) {
      document.documentElement.classList.add('high-contrast');
    }
    const handler = (e) => {
      document.documentElement.classList.toggle('high-contrast', e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
}
