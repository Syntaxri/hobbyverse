'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useAppStore } from '@/store/useAppStore';
import { FallbackScene } from '@/components/webgl/FallbackScene';
import { shouldEnableWebGL } from '@/lib/webgl-detect';

const WebGLRoot = dynamic(() => import('@/components/webgl/WebGLRoot').then((m) => ({ default: m.WebGLRoot })), {
  ssr: false,
  loading: () => null,
});

export const SceneRoot = () => {
  const { webGLSupported, setWebGLSupport, setPerformanceTier } = useAppStore();
  const [detected, setDetected] = useState('pending');
  const detectionDone = useRef(false);

  useEffect(() => {
    if (detectionDone.current) return;
    detectionDone.current = true;

    const enabled = shouldEnableWebGL();

    if (!enabled) {
      setDetected('unsupported');
      setWebGLSupport(false);
      return;
    }

    setDetected('supported');
    setWebGLSupport(true);

    const mem = navigator.deviceMemory;
    const cores = navigator.hardwareConcurrency;
    if ((mem && mem < 4) || (cores && cores <= 4)) {
      setPerformanceTier('mid');
    } else {
      setPerformanceTier('high');
    }
  }, [setWebGLSupport, setPerformanceTier]);

  if (detected === 'pending') return <FallbackScene />;
  if (detected === 'unsupported' || !webGLSupported) return <FallbackScene />;

  return <WebGLRoot />;
};
