'use client';

import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothTouch: true,
        touchMultiplier: 1.5,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
      }}
      autoRaf
    >
      {children}
    </ReactLenis>
  );
};
