'use client';

import { motion } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1];

const variants = {
  up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -32 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } },
  none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export const ScrollReveal = ({
  children, direction = 'up', delay = 0, className, once = true,
  duration = 0.7, distance = 32,
}) => {
  const v = variants[direction] || variants.up;
  const hidden = direction === 'none' ? v.hidden : { ...v.hidden, y: direction === 'up' ? distance : direction === 'down' ? -distance : 0, x: direction === 'left' ? distance : direction === 'right' ? -distance : 0 };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: easeOut }}
      variants={{ hidden, visible: v.visible }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerReveal = ({ children, className, staggerDelay = 0.08, once = true }) => (
  <div className={className}>
    {Array.isArray(children)
      ? children.map((child, i) => (
          <motion.div
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * staggerDelay, ease: easeOut }}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {child}
          </motion.div>
        ))
      : children}
  </div>
);

export const FadeIn = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay, ease: easeOut }}
    className={className}
  >
    {children}
  </motion.div>
);
