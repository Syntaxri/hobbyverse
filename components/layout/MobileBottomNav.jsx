'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { useInteractionStore } from '@/lib/interaction-store';
import { useScrollIntelligence } from '@/components/interaction/useScrollIntelligence';
import { useCartStore } from '@/store/useCartStore';

const RIPPLE_DURATION = 600;

const Ripple = ({ x, y }) => (
  <motion.span
    className="absolute rounded-full bg-hv-sky/15 pointer-events-none"
    style={{ left: x - 8, top: y - 8, width: 16, height: 16 }}
    initial={{ scale: 0, opacity: 0.6 }}
    animate={{ scale: 12, opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: RIPPLE_DURATION / 1000, ease: 'easeOut' }}
  />
);

const items = [
  { id: 'home', label: 'Home', href: '/', icon: Icons.Sparkles },
  { id: 'hobbies', label: 'Explore', href: '/hobbies', icon: Icons.Search },
  { id: 'rentals', label: 'Rentals', href: '/dashboard', icon: Icons.ShoppingBag },
  { id: 'pricing', label: 'Pricing', href: '/pricing', icon: Icons.Tag },
  { id: 'profile', label: 'Profile', href: '/dashboard', icon: Icons.User },
];

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { reducedMotion } = useScrollIntelligence();
  const [ripples, setRipples] = useState({});
  const totalItems = useCartStore((s) => s.totalItems);

  const addRipple = useCallback((id, x, y) => {
    const key = `${id}-${Date.now()}`;
    setRipples((prev) => ({ ...prev, [key]: { id, x, y } }));
    setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, RIPPLE_DURATION);
  }, []);

  const handleTap = useCallback((e, itemId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    addRipple(itemId, x, y);
    useInteractionStore.getState().setHovered(itemId, 'bottom-nav');
    setTimeout(() => useInteractionStore.getState().clearHovered(), 300);
  }, [addRipple]);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <motion.div
        className="bg-white/90 backdrop-blur-2xl border-t border-hv-border/50 shadow-modal"
        animate={reducedMotion ? {} : { y: [2, -2, 0] }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-around px-1 py-1">
          {items.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleTap(e, item.id)}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-0.5 py-1.5 px-3 rounded-xl transition-colors min-w-[56px] min-h-[52px] overflow-hidden',
                  isActive ? 'text-hv-sky' : 'text-hv-muted hover:text-hv-foreground'
                )}
              >
                <AnimatePresence>
                  {Object.entries(ripples)
                    .filter(([_, r]) => r.id === item.id)
                    .map(([key, r]) => (
                      <Ripple key={key} x={r.x} y={r.y} />
                    ))}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-active"
                    className="absolute inset-0 bg-hv-sky/5 rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon className="w-5 h-5" />
                  {item.id === 'rentals' && totalItems > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-hv-coral text-white text-[8px] font-bold flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </span>
                <span className={cn('relative z-10 text-[10px] font-medium leading-tight', isActive ? 'font-semibold' : '')}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-dot"
                    className="w-1 h-1 rounded-full bg-hv-sky relative z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};
