'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const SceneRoot = dynamic(() => import('@/components/three/SceneRoot').then((m) => ({ default: m.SceneRoot }), () => null), {
  ssr: false,
  loading: () => null,
});

export const SceneBackground = () => {
  const pathname = usePathname();

  if (pathname !== '/') return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      <SceneRoot />
    </div>
  );
};
