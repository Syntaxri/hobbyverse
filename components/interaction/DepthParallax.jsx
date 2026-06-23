'use client';

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export const DepthLayer = ({ children, speed = 0.5, className, as = 'div' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, -speed * 60]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
};

export const DepthParallax = ({ children, layers = [] }) => {
  const layerSpeeds = useMemo(() => {
    if (layers.length > 0) return layers;
    return [
      { speed: 0.2, children: null },
      { speed: 0.5, children: null },
      { speed: 1, children: null },
    ];
  }, [layers]);

  return (
    <>
      {layerSpeeds.map((layer, i) => (
        <DepthLayer key={i} speed={layer.speed}>
          {layer.children}
        </DepthLayer>
      ))}
      {children}
    </>
  );
};
