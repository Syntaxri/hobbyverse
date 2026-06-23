'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useInteractionStore } from '@/lib/interaction-store';

const LERP_IDLE = 0.025;
const LERP_INTERACTION = 0.04;
const LERP_FOCUS = 0.02;

export const CameraSystem = () => {
  const { camera } = useThree();
  const cursor = useInteractionStore((s) => s.cursor);
  const scroll = useInteractionStore((s) => s.scroll);
  const intensity = useInteractionStore((s) => s.intensity);
  const focusTarget = useInteractionStore((s) => s.focusTarget);
  const focusIntensity = useInteractionStore((s) => s.focusIntensity);
  const heroVisible = useInteractionStore((s) => s.heroVisible);

  const idleAngle = useRef(0);
  const smoothPos = useRef({ x: 0, y: 0, z: 12 });

  useFrame((_state, delta) => {
    idleAngle.current += delta * 0.012;

    const idleX = Math.sin(idleAngle.current) * 0.25;
    const idleZ = Math.cos(idleAngle.current) * 0.25;

    const pX = cursor.x * 0.35 * intensity;
    const pY = cursor.y * 0.18 * intensity;

    const scrollDepth = Math.min(Math.abs(scroll.velocity) * 0.08, 0.4);

    let focusX = 0;
    let focusY = 0;
    let focusZ = 0;
    if (focusTarget && focusIntensity > 0.01) {
      focusX = (focusTarget.x || 0) * focusIntensity * 0.3;
      focusY = (focusTarget.y || 0) * focusIntensity * 0.3;
      focusZ = -focusIntensity * 0.3;
    }

    if (heroVisible && !focusTarget) {
      focusY = 0.15;
      focusZ = -0.2;
    }

    const targetX = idleX + pX + focusX;
    const targetY = pY + focusY;
    const targetZ = 12 + idleZ - scrollDepth + focusZ;

    const lerpRate = focusIntensity > 0.1 ? LERP_FOCUS : LERP_INTERACTION;

    smoothPos.current.x += (targetX - smoothPos.current.x) * lerpRate;
    smoothPos.current.y += (targetY - smoothPos.current.y) * lerpRate;
    smoothPos.current.z += (targetZ - smoothPos.current.z) * lerpRate;

    camera.position.x = smoothPos.current.x;
    camera.position.y = smoothPos.current.y;
    camera.position.z = smoothPos.current.z;

    camera.lookAt(0, 0, 0);
  });

  return null;
};
