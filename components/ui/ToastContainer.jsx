'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useToastStore } from '@/store/useToastStore';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

const typeStyles = {
  success: 'bg-hv-mint/10 border-hv-mint/30 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-700',
  info: 'bg-hv-sky/10 border-hv-sky/30 text-hv-sky',
};

const icons = {
  success: Icons.Check,
  error: null,
  info: null,
};

export const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none items-end" style={{ paddingBottom: 'env(safe-area-inset-bottom, 72px)' }} role="status" aria-live="polite" aria-label="Notifications">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={cn(
                'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-elevated backdrop-blur-xl bg-white/90 min-w-0 w-full sm:min-w-[280px] sm:max-w-[400px]',
                typeStyles[toast.type]
              )}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                <Icons.XMark className="w-3 h-3" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
