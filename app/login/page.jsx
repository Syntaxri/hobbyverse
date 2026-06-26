'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';

export default function LoginPage() {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (formData) => {
    const errs = {};
    const email = formData.get('email');
    const password = formData.get('password');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (isSigningIn) return;
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setIsSigningIn(true);
    setTimeout(() => setIsSigningIn(false), 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-24 safe-pb-nav sm:pb-20">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center mx-auto mb-4">
            <span className="w-3 h-3 bg-white rounded-md" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-hv-foreground tracking-tight mb-2 text-balance">
            Sign In
          </h1>
          <p className="text-hv-muted text-sm">Enter your credentials to continue.</p>
        </div>

        <form onSubmit={handleSignIn} noValidate className="bg-white rounded-2xl border border-hv-border/60 shadow-card p-5 sm:p-6 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-hv-foreground mb-1.5">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40 min-h-[48px]"
              style={{ borderColor: errors.email ? '#FF6B6B' : undefined }}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-hv-coral mt-1.5" role="alert">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-hv-foreground mb-1.5">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40 min-h-[48px]"
              style={{ borderColor: errors.password ? '#FF6B6B' : undefined }}
            />
            {errors.password && (
              <p id="password-error" className="text-xs text-hv-coral mt-1.5" role="alert">{errors.password}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSigningIn}
            loading={isSigningIn}
            loadingText="Signing In..."
          >
            Sign In
          </Button>
          <p className="text-xs text-hv-muted text-center">
            Don&apos;t have an account?{' '}
            <NavLink href="/pricing" className="text-hv-sky hover:underline font-medium">Create one</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
}
