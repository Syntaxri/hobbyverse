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

  useFrame((_state, delta) => {
    const cursorVec = new THREE.Vector3(
      (cursor.x - 0.5) * 2,
      (cursor.y - 0.5) * 2,
      0
    );
    const distLength = cursorVec.length();
    const distStrength = Math.min(distLength * intensity * 0.15, 0.3);

    scene.traverse((child) => {
      if (child.isMesh && child.material && child.material.userData.distortable) {
        const originalPos = child.userData.originalPosition || child.position.clone();
        if (!child.userData.originalPosition) {
          child.userData.originalPosition = child.position.clone();
        }
        const pull = new THREE.Vector3()
          .copy(cursorVec)
          .multiplyScalar(distStrength * 0.02);
        child.position.x = originalPos.x + pull.x;
        child.position.y = originalPos.y + pull.y;
      }
    });

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
