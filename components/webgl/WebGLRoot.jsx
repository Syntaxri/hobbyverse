'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAppStore } from '@/store/useAppStore';
import { SceneController } from './SceneController';
import { FallbackScene } from './FallbackScene';

export const WebGLRoot = () => {
  const { performanceTier, setWebGLSupport } = useAppStore();
  const [ready, setReady] = useState(false);
  const [crashed, setCrashed] = useState(false);
  const canvasRef = useRef(null);
  const cleanupRef = useRef(null);

  const dpr = 1;
  const shadows = false;

  const handleCreated = useCallback(({ gl }) => {
    gl.setClearColor(0x000000, 0);

    const handleContextLost = (e) => {
      e.preventDefault();
      setCrashed(true);
      setWebGLSupport(false);
    };

    const handleContextRestored = () => {
      setCrashed(false);
    };

    gl.domElement.addEventListener('webglcontextlost', handleContextLost);
    gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    cleanupRef.current = () => {
      gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
      gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [setWebGLSupport]);

  const handleError = useCallback(() => {
    setCrashed(true);
    setWebGLSupport(false);
  }, [setWebGLSupport]);

  useEffect(() => {
    setReady(true);
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      shadows={shadows}
      dpr={dpr}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        alpha: true,
        stencil: false,
        depth: true,
        failIfMajorPerformanceCaveat: true,
      }}
      camera={{ position: [0, 0, 12], fov: 45, near: 0.1, far: 100 }}
      style={{ pointerEvents: 'none' }}
      onCreated={handleCreated}
      onError={handleError}
    >
      <SceneController />
    </Canvas>
  );
};
