'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '@/lib/interaction-store';

export const InteractionBridge = () => {
  const { scene } = useThree();
  const cursor = useInteractionStore((s) => s.cursor);
  const scroll = useInteractionStore((s) => s.scroll);
  const intensity = useInteractionStore((s) => s.intensity);
  const focusIntensity = useInteractionStore((s) => s.focusIntensity);

  const distortionRef = useRef(null);
  const cacheRef = useRef(null);
  const pullVec = useRef(new THREE.Vector3());
  const cursorVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!cacheRef.current) {
      const meshes = [];
      scene.traverse((child) => {
        if (child.isMesh && child.material && child.material.userData.distortable) {
          if (!child.userData.originalPosition) {
            child.userData.originalPosition = child.position.clone();
          }
          meshes.push(child);
        }
      });
      cacheRef.current = meshes;
    }

    const meshes = cacheRef.current;
    cursorVec.current.set(
      (cursor.x - 0.5) * 2,
      (cursor.y - 0.5) * 2,
      0
    );
    const distLength = cursorVec.current.length();
    const distStrength = Math.min(distLength * intensity * 0.15, 0.3);

    for (let i = 0; i < meshes.length; i++) {
      const child = meshes[i];
      const originalPos = child.userData.originalPosition;
      pullVec.current
        .copy(cursorVec.current)
        .multiplyScalar(distStrength * 0.02);
      child.position.x = originalPos.x + pullVec.current.x;
      child.position.y = originalPos.y + pullVec.current.y;
    }

    if (distortionRef.current) {
      const targetScale = 1 + distStrength * 0.3;
      distortionRef.current.scale.x += (targetScale - distortionRef.current.scale.x) * 0.05;
      distortionRef.current.scale.y += (targetScale - distortionRef.current.scale.y) * 0.05;
    }
  });

  return (
    <mesh ref={distortionRef} visible={false}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
};
