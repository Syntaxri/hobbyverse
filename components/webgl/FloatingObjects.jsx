'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

const HOBBY_OBJECTS = [
  { label: 'piano', color: '#3B82F6', size: 0.6 },
  { label: 'guitar', color: '#8B5CF6', size: 0.7 },
  { label: 'camera', color: '#6366F1', size: 0.5 },
  { label: 'telescope', color: '#60A5FA', size: 0.55 },
  { label: 'books', color: '#94A3B8', size: 0.5 },
  { label: 'paint', color: '#818CF8', size: 0.5 },
];

const Piano = ({ color }) => (
  <group>
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[0.8, 0.1, 0.5]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
    <mesh position={[0, 0.08, 0]}>
      <boxGeometry args={[0.6, 0.03, 0.35]} />
      <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.7} />
    </mesh>
    {[0, 1, 2, 3].map((i) => (
      <mesh key={i} position={[-0.2 + i * 0.12, 0.12, 0.12]}>
        <boxGeometry args={[0.02, 0.03, 0.08]} />
        <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.5} />
      </mesh>
    ))}
  </group>
);

const Guitar = ({ color }) => (
  <group>
    <mesh position={[0, 0.3, 0]}>
      <boxGeometry args={[0.04, 0.5, 0.04]} />
      <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.4} />
    </mesh>
    <mesh position={[0, -0.1, 0]}>
      <sphereGeometry args={[0.2, 12, 12]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
    </mesh>
    <mesh position={[0, -0.15, 0]} scale={[0.9, 0.9, 0.9]}>
      <circleGeometry args={[0.18, 12]} />
      <meshStandardMaterial color="#0f172a" side={THREE.DoubleSide} metalness={0.2} roughness={0.6} />
    </mesh>
    <mesh position={[0, 0.52, 0]}>
      <boxGeometry args={[0.08, 0.04, 0.04]} />
      <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.3} />
    </mesh>
  </group>
);

const Camera = ({ color }) => (
  <group>
    <mesh>
      <boxGeometry args={[0.3, 0.2, 0.15]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
    <mesh position={[0, 0.12, 0.05]}>
      <boxGeometry args={[0.08, 0.04, 0.06]} />
      <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.5} />
    </mesh>
    <mesh position={[0, 0, 0.12]}>
      <cylinderGeometry args={[0.04, 0.06, 0.06, 12]} />
      <meshStandardMaterial color="#f8fafc" metalness={0.6} roughness={0.2} />
    </mesh>
    <mesh position={[0.12, 0.05, 0.12]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color="#ef4444" metalness={0.1} roughness={0.3} />
    </mesh>
  </group>
);

const Telescope = ({ color }) => (
  <group>
    <mesh rotation={[0, 0, Math.PI * 0.5]}>
      <cylinderGeometry args={[0.05, 0.08, 0.5, 10]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
    </mesh>
    <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI * 0.5]}>
      <cylinderGeometry args={[0.03, 0.04, 0.08, 10]} />
      <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.4} />
    </mesh>
    <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI * 0.5]}>
      <cylinderGeometry args={[0.1, 0.08, 0.04, 10]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
    </mesh>
  </group>
);

const Books = ({ color }) => (
  <group>
    <mesh position={[0, 0.04, 0]}>
      <boxGeometry args={[0.25, 0.03, 0.18]} />
      <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
    </mesh>
    <mesh position={[0.02, 0.08, -0.01]}>
      <boxGeometry args={[0.22, 0.03, 0.16]} />
      <meshStandardMaterial color="#60A5FA" metalness={0.2} roughness={0.6} />
    </mesh>
    <mesh position={[-0.01, 0.12, 0.01]}>
      <boxGeometry args={[0.2, 0.03, 0.14]} />
      <meshStandardMaterial color="#818CF8" metalness={0.2} roughness={0.6} />
    </mesh>
  </group>
);

const PaintTools = ({ color }) => (
  <group>
    <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0.1]}>
      <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
      <meshStandardMaterial color="#d4d4d8" metalness={0.2} roughness={0.5} />
    </mesh>
    <mesh position={[-0.08, 0.14, 0]} rotation={[0, 0, 0.1]}>
      <boxGeometry args={[0.03, 0.03, 0.04]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.7} />
    </mesh>
    <mesh position={[0.08, 0, 0]} rotation={[0, 0, -0.1]}>
      <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
      <meshStandardMaterial color="#d4d4d8" metalness={0.2} roughness={0.5} />
    </mesh>
    <mesh position={[0.08, 0.14, 0]} rotation={[0, 0, -0.1]}>
      <boxGeometry args={[0.03, 0.03, 0.04]} />
      <meshStandardMaterial color="#8B5CF6" metalness={0.1} roughness={0.7} />
    </mesh>
  </group>
);

const objectComponents = {
  piano: Piano,
  guitar: Guitar,
  camera: Camera,
  telescope: Telescope,
  books: Books,
  paint: PaintTools,
};

const ORBIT_RADIUS_MIN = 3.5;
const ORBIT_RADIUS_MAX = 6;
const FLOAT_AMP = 0.3;
const FLOAT_SPEED_MIN = 0.3;
const FLOAT_SPEED_MAX = 0.7;
const ROTATE_SPEED_MIN = 0.1;
const ROTATE_SPEED_MAX = 0.4;

export const FloatingObjects = () => {
  const groupRef = useRef(null);
  const cursor = useInteractionStore((s) => s.cursor);
  const scroll = useInteractionStore((s) => s.scroll);
  const intensity = useInteractionStore((s) => s.intensity);
  const hoveredType = useInteractionStore((s) => s.hoveredType);
  const { performanceTier } = useAppStore();

  const objectConfigs = useMemo(() =>
    HOBBY_OBJECTS.map((obj, i) => {
      const angleOffset = (i / HOBBY_OBJECTS.length) * Math.PI * 2;
      return {
        ...obj,
        orbitRadius: ORBIT_RADIUS_MIN + Math.random() * (ORBIT_RADIUS_MAX - ORBIT_RADIUS_MIN),
        orbitSpeed: 0.08 + Math.random() * 0.1,
        angleOffset,
        heightOffset: (Math.random() - 0.5) * 1.5,
        floatSpeed: FLOAT_SPEED_MIN + Math.random() * (FLOAT_SPEED_MAX - FLOAT_SPEED_MIN),
        rotateSpeed: ROTATE_SPEED_MIN + Math.random() * (ROTATE_SPEED_MAX - ROTATE_SPEED_MIN),
        scale: 0.6 + Math.random() * 0.4,
      };
    }), []
  );

  const timeRef = useRef(0);
  const objectRefs = useRef([]);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (!groupRef.current) return;

    const t = timeRef.current;
    const scrollSpeed = Math.min(Math.abs(scroll.velocity) * 0.5, 1.5);
    const cursorInfluence = intensity * 0.08;

    objectConfigs.forEach((config, i) => {
      const obj = objectRefs.current[i];
      if (!obj) return;

      const angle = t * config.orbitSpeed * (1 + scrollSpeed * 0.1) + config.angleOffset;
      const radius = config.orbitRadius + Math.sin(t * 0.5 + config.angleOffset) * 0.3;
      const floatY = Math.sin(t * config.floatSpeed + config.angleOffset) * FLOAT_AMP;

      const orbitX = Math.cos(angle) * radius;
      const orbitZ = Math.sin(angle) * radius;

      const cursorOffsetX = (cursor.x - 0.5) * cursorInfluence * radius;
      const cursorOffsetY = (cursor.y - 0.5) * cursorInfluence * 0.5;

      obj.position.x = orbitX + cursorOffsetX;
      obj.position.y = config.heightOffset + floatY + cursorOffsetY;
      obj.position.z = orbitZ;

      if (hoveredType === 'card' || hoveredType === 'button') {
        obj.position.z -= 0.15;
      }

      obj.rotation.x = Math.sin(t * 0.3 + i) * 0.1;
      obj.rotation.y = t * config.rotateSpeed + cursorOffsetX * 0.5;
      obj.rotation.z = Math.cos(t * 0.2 + i * 0.5) * 0.05;
    });
  });

  if (performanceTier === 'low') {
    return null;
  }

  return (
    <group ref={groupRef}>
      {objectConfigs.map((config, i) => {
        const Component = objectComponents[config.label];
        if (!Component) return null;
        return (
          <group
            key={config.label}
            ref={(el) => { objectRefs.current[i] = el; }}
            scale={config.scale}
          >
            <Component color={config.color} />
          </group>
        );
      })}
    </group>
  );
};
