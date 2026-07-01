'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const Drawer = ({ children, isOpen, onClose, title, side = 'right', className }) => {
  const variants = { right: { x: '100%' }, left: { x: '-100%' } };
  const closeRef = useRef(null);
  const previousActiveElement = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Drawer'}
            onKeyDown={handleKeyDown}
            initial={variants[side]} animate={{ x: 0 }} exit={variants[side]}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn('fixed top-0 bottom-0 w-full max-w-md bg-white shadow-modal border-l border-hv-border p-6 z-50', className)}
          >
            <div className="flex items-center justify-between mb-6">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button
                ref={closeRef}
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-hv-border/50 flex items-center justify-center hover:bg-hv-border"
                aria-label="Close drawer"
              >
                <Icons.XMark className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
