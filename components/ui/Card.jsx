'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHoverPhysics } from '@/components/interaction/useHoverPhysics';
import { useInteractionStore } from '@/lib/interaction-store';
import { useAppStore } from '@/store/useAppStore';

export const Card = ({
  children, className, hoverEffect = true, tilt = false,
  as: Component = motion.div, padding = true, id,
}) => {
  const isMotion = typeof Component === 'object' || Component?.prototype?.isMotionComponent;
  const performanceTier = useAppStore((s) => s.performanceTier);
  const intensity = useInteractionStore((s) => s.intensity);
  const { ref, handlers, springConfig } = useHoverPhysics({ stiffness: 250, damping: 20 });
  const isMobile = useAppStore((s) => s.isMobile);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 15 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    handlers.onMouseMove(e);
    if (!tilt || performanceTier === 'low' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 6 * intensity);
    rotateY.set(x * 6 * intensity);
  };

  const handleMouseLeave = (e) => {
    handlers.onMouseLeave(e);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <Component
      ref={ref}
      id={id}
      onMouseMove={isMotion ? handleMouseMove : undefined}
      onMouseLeave={isMotion ? handleMouseLeave : undefined}
      onHoverStart={() => useInteractionStore.getState().setHovered(id || null, 'card')}
      onHoverEnd={() => useInteractionStore.getState().clearHovered()}
      {...(isMotion && hoverEffect && performanceTier !== 'low' && !isMobile ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: springConfig,
      } : {})}
      style={tilt ? { perspective: 800, rotateX: smoothRotateX, rotateY: smoothRotateY } : undefined}
      className={cn(
        'relative overflow-hidden rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card',
        hoverEffect && 'md:hover:shadow-hover md:hover:cursor-pointer',
        padding && 'p-5 sm:p-6',
        className
      )}
    >
      {children}
    </Component>
  );
};
