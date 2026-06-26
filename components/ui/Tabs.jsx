'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Tabs = ({ tabs = [], defaultTab, onChange, className }) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);
  const scrollRef = useRef(null);

  const handleChange = (id) => { setActive(id); if (onChange) onChange(id); };

  useEffect(() => {
    if (!scrollRef.current) return;
    const activeBtn = scrollRef.current.querySelector(`[data-tab-id="${active}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [active]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex gap-1 p-1 rounded-xl bg-white/70 border border-hv-border overflow-x-auto scrollbar-none',
        '-mx-4 xs:-mx-5 sm:mx-0 px-4 xs:px-5 sm:px-0 w-[calc(100%+32px)] xs:w-[calc(100%+40px)] sm:w-auto',
        className
      )}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          data-tab-id={tab.id}
          onClick={() => handleChange(tab.id)}
          className={cn(
            'relative px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-h-[44px] flex-shrink-0',
            active === tab.id ? 'text-hv-foreground' : 'text-hv-muted hover:text-hv-foreground'
          )}
        >
          {active === tab.id && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute inset-0 bg-white rounded-lg border border-hv-border shadow-soft"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
