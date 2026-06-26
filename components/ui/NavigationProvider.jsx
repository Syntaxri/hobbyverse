'use client';

import { createContext, useContext, useState, useCallback, useRef, useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const NavigationContext = createContext(null);

export const useNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
};

const NavigationProviderInner = ({ children }) => {
  const pathname = usePathname();
  useSearchParams();
  const [navigating, setNavigating] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (navigating && pathname !== prevPathRef.current) {
      setNavigating(false);
    }
    prevPathRef.current = pathname;
  }, [pathname, navigating]);

  const startNavigation = useCallback(() => {
    prevPathRef.current = pathname;
    setNavigating(true);
  }, [pathname]);

  const finishNavigation = useCallback(() => {
    setNavigating(false);
  }, []);

  return (
    <NavigationContext.Provider value={{ navigating, startNavigation, finishNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const NavigationProvider = ({ children }) => {
  return (
    <Suspense fallback={null}>
      <NavigationProviderInner>{children}</NavigationProviderInner>
    </Suspense>
  );
};
