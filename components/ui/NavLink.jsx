'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useNavigation } from './NavigationProvider';

export const NavLink = ({
  href, children, className, activeClassName, exact = false,
  onClick, disabled, showLoading = true, ...props
}) => {
  const pathname = usePathname();
  const { startNavigation } = useNavigation();
  const [clicked, setClicked] = useState(false);
  const clickTimeoutRef = useRef(null);

  const isActive = exact
    ? pathname === href
    : href !== '/' && pathname.startsWith(href);

  const handleClick = useCallback((e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (showLoading) {
      setClicked(true);
      startNavigation();
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = setTimeout(() => setClicked(false), 2000);
    }
    onClick?.(e);
  }, [disabled, showLoading, startNavigation, onClick]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'relative transition-colors select-none',
        isActive && activeClassName,
        clicked && 'opacity-70',
        disabled && 'pointer-events-none opacity-40',
        className
      )}
      {...props}
    >
      {children}
      {clicked && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-hv-cyan animate-pulse" />
      )}
    </Link>
  );
};
