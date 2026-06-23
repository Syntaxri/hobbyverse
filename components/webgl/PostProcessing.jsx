'use client';

import { useMemo } from 'react';

export const PostProcessing = () => {
  const enabled = useMemo(() => {
    try {
      return false;
    } catch {
      return false;
    }
  }, []);

  return null;
};
