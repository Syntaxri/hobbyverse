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
            className="w-9 h-9 rounded-xl bg-white/70 border border-hv-border flex items-center justify-center hover:bg-white hover:shadow-soft transition-all"
            aria-label="Open search"
          >
            <Icons.Search className="w-4 h-4 text-hv-muted" />
          </motion.button>
        ) : (
          <motion.form
            key="search-form"
            initial={{ width: 36, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 36, opacity: 0 }}
            onSubmit={handleSubmit}
            className="relative"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              onBlur={() => { if (!query) setIsOpen(false); }}
              className="w-full bg-white border border-hv-border rounded-xl pl-9 pr-8 py-2 text-sm text-hv-foreground placeholder-hv-muted/60 focus:outline-none focus:border-hv-cyan focus:ring-2 focus:ring-hv-cyan/20 transition-all shadow-soft"
            />
            <Icons.Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-hv-muted" />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setIsOpen(false); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-hv-muted hover:text-hv-foreground"
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
