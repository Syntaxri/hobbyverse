'use client';

import { useEffect } from 'react';
import { Container } from '@/components/layout/Container';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Container className="text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-hv-coral/10 border border-hv-coral/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-hv-coral">!</span>
        </div>
        <h1 className="text-4xl font-bold text-hv-foreground mb-4">Something Went Wrong</h1>
        <p className="text-hv-muted mb-8 max-w-md mx-auto text-base leading-relaxed">
          A glitch occurred in the HobbyVerse. Our team has been notified.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated hover:brightness-105 transition-all"
        >
          Try Again
        </button>
      </Container>
    </div>
  );
}
