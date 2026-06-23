'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

const palette = [
  new THREE.Color('#3B82F6'),
  new THREE.Color('#8B5CF6'),
  new THREE.Color('#6366F1'),
  new THREE.Color('#94A3B8'),
  new THREE.Color('#60A5FA'),
];

const vertexShader = `
  attribute vec3 aBasePosition;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;

  uniform float uTime;
  uniform vec2 uCursor;
  uniform float uIntensityCurrent;
  uniform float uScale;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = aBasePosition;

    float driftX = sin(uTime * 0.25 + aPhase) * 0.35;
    float driftY = cos(uTime * 0.2 + aPhase * 1.3) * 0.35;
    float driftZ = sin(uTime * 0.22 + aPhase * 0.7) * 0.35;

    vec2 cursorDelta = uCursor - 0.5;
    float cursorPull = length(cursorDelta) * uIntensityCurrent * 0.12;
    vec2 attracted = cursorDelta * cursorPull;

    pos.x += driftX + attracted.x;
    pos.y += driftY + attracted.y;
    pos.z += driftZ;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uScale * (180.0 / -mvPosition.z);
    gl_PointSize = clamp(gl_PointSize, 1.0, 12.0);
    gl_Position = projectionMatrix * mvPosition;

    vColor = aColor;
    vAlpha = 0.5 + 0.5 * uIntensityCurrent;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export const ParticleField = () => {
  const pointsRef = useRef(null);
  const { performanceTier } = useAppStore();
  const cursor = useInteractionStore((s) => s.cursor);
  const intensity = useInteractionStore((s) => s.intensity);

  const count = performanceTier === 'high' ? 1200 : 400;
  const uniformRef = useRef({
    uTime: { value: 0 },
    uCursor: { value: new THREE.Vector2(0.5, 0.5) },
    uIntensityCurrent: { value: 1 },
    uScale: { value: performanceTier === 'high' ? 1.5 : 1.0 },
  });

  const { positions, colors, sizes, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const pha = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = radius * Math.cos(phi) * 0.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = 0.03 + Math.random() * 0.07;
      pha[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, colors: col, sizes: siz, phases: pha };
  }, [count]);

  const geometryRef = useRef(null);

  useFrame((_state, delta) => {
    const u = uniformRef.current;
    u.uTime.value += delta;

    u.uCursor.value.x = cursor.x;
    u.uCursor.value.y = cursor.y;
    u.uIntensityCurrent.value = intensity;

    if (geometryRef.current) {
      geometryRef.current.attributes.aBasePosition.needsUpdate = false;
      geometryRef.current.attributes.aSize.needsUpdate = false;
      geometryRef.current.attributes.aColor.needsUpdate = false;
      geometryRef.current.attributes.aPhase.needsUpdate = false;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-aBasePosition"
          args={[positions, 3]}
          count={count}
          itemSize={3}
          usage={THREE.StaticDrawUsage}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
          usage={THREE.StaticDrawUsage}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
          count={count}
          itemSize={3}
          usage={THREE.StaticDrawUsage}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
          count={count}
          itemSize={1}
          usage={THREE.StaticDrawUsage}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniformRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
