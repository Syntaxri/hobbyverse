'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const Modal = ({ children, isOpen, onClose, className }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <div
            className={cn('relative w-full max-w-lg bg-white rounded-2xl shadow-modal border border-hv-border p-6 max-h-[85vh] overflow-y-auto', className)}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-hv-border/50 flex items-center justify-center hover:bg-hv-border transition-colors"
            >
              <Icons.XMark className="w-4 h-4" />
            </button>
            {children}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
