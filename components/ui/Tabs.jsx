'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Tabs = ({ tabs, defaultTab, onChange, className }) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleChange = (id) => { setActive(id); if (onChange) onChange(id); };

  return (
    <div className={cn('flex gap-1 p-1 rounded-xl bg-white/70 border border-hv-border w-fit', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleChange(tab.id)}
          className={cn(
            'relative px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap min-h-[44px]',
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
