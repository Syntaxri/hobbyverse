'use client';

import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHoverPhysics } from '@/components/interaction/useHoverPhysics';
import { useInteractionStore } from '@/lib/interaction-store';

const easeOut = [0.16, 1, 0.3, 1];

const variants = {
  primary: 'bg-gradient-to-br from-hv-sky to-hv-indigo text-white font-semibold shadow-soft hover:shadow-elevated hover:brightness-105',
  secondary: 'bg-white/80 border border-hv-border text-hv-foreground font-medium hover:bg-white hover:shadow-soft',
  ghost: 'bg-transparent text-hv-secondary hover:text-hv-foreground hover:bg-white/60',
  outline: 'bg-transparent border-2 border-hv-sky/30 text-hv-sky hover:bg-hv-sky/5',
};

const sizes = {
  sm: 'px-3.5 py-1.5 text-xs min-h-[36px]',
  md: 'px-5 py-2.5 text-sm min-h-[42px]',
  lg: 'px-7 py-3.5 text-base min-h-[48px]',
  xl: 'px-10 py-4 text-lg min-h-[54px]',
};

const Spinner = ({ className }) => (
  <svg
    className={cn('animate-spin -ml-1 mr-2 h-4 w-4', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = forwardRef(({
  children, variant = 'primary', size = 'md', className,
  magnetic = false, onClick, type = 'button', disabled, loading, loadingText, ...props
}, ref) => {
  const btnRef = useRef(null);
  const { magneticOffset, handlers: magneticHandlers } = useHoverPhysics({ stiffness: 300, damping: 18 });

  const isDisabled = disabled || loading;

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-hv-sky/40 focus-visible:outline-offset-2',
    'disabled:opacity-40 disabled:pointer-events-none select-none',
    variants[variant], sizes[size], className
  );

  const onHoverStart = () => useInteractionStore.getState().setHovered(null, 'button');
  const onHoverEnd = () => useInteractionStore.getState().clearHovered();

  const content = loading ? (
    <>
      <Spinner />
      {loadingText || 'Loading...'}
    </>
  ) : children;

  const btnProps = {
    ref: ref || btnRef,
    type,
    onClick,
    disabled: isDisabled,
    className: baseClasses,
    style: { x: magneticOffset.x, y: magneticOffset.y },
    onMouseMove: magneticHandlers.onMouseMove,
    onMouseLeave: magneticHandlers.onMouseLeave,
    onHoverStart,
    onHoverEnd,
    ...props,
  };

  if (magnetic) {
    return (
      <motion.button
        {...btnProps}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.6 }}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.button
      {...btnProps}
      whileHover={{ scale: isDisabled ? 1 : 1.02 }}
      whileTap={{ scale: isDisabled ? 1 : 0.98 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Spinner };
