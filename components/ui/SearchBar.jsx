'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const SearchBar = ({ className, onSearch, placeholder = 'Search equipment, hobbies...' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  const handleSubmit = (e) => { e.preventDefault(); if (onSearch) onSearch(query); };

  return (
    <div className={cn('relative', className)}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="search-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="w-11 h-11 rounded-xl bg-white/70 border border-hv-border flex items-center justify-center hover:bg-white hover:shadow-soft transition-all min-touch"
            aria-label="Open search"
          >
            <Icons.Search className="w-4 h-4 text-hv-muted" />
          </motion.button>
        ) : (
          <motion.form
            key="search-form"
            initial={{ width: 44, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            exit={{ width: 44, opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative sm:w-[280px]"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              onBlur={() => { if (!query) setIsOpen(false); }}
              className="w-full bg-white border border-hv-border rounded-xl pl-10 pr-9 py-3 text-sm text-hv-foreground placeholder-hv-muted/60 focus:outline-none focus:border-hv-cyan focus:ring-2 focus:ring-hv-cyan/20 transition-all shadow-soft min-h-[44px]"
            />
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hv-muted" />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-hv-muted hover:text-hv-foreground rounded-lg hover:bg-hv-border/50"
                aria-label="Clear search"
              >
                <Icons.XMark className="w-4 h-4" />
              </button>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
