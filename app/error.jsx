'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';

export default function Error({ error, reset }) {
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    setIsResetting(true);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Container className="text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-hv-coral/10 border border-hv-coral/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-hv-coral">!</span>
        </div>
        <h1 className="text-4xl font-bold text-hv-foreground mb-4">Something Went Wrong</h1>
        <p className="text-hv-muted mb-8 max-w-md mx-auto text-base leading-relaxed">
          A glitch occurred in the Next Hobby universe. Our team has been notified.
        </p>
        <button
          onClick={handleReset}
          disabled={isResetting}
          className="inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated hover:brightness-105 transition-all disabled:opacity-40"
        >
          {isResetting && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {isResetting ? 'Retrying...' : 'Try Again'}
        </button>
      </Container>
    </div>
  );
}
