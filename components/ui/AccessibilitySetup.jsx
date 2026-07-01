'use client';

import { useReducedMotion } from '@/lib/accessibility';

export const AccessibilitySetup = () => {
  useReducedMotion();
  return null;
};
