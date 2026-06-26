'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { NavLink } from '@/components/ui/NavLink';

const navLinks = [
  { id: 'home', name: 'Home', href: '/' },
  { id: 'hobbies', name: 'Explore', href: '/hobbies' },
  { id: 'how-it-works', name: 'How it Works', href: '/how-it-works' },
  { id: 'pricing', name: 'Pricing', href: '/pricing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300',
        scrolled
          ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-hv-border/50 shadow-soft'
          : 'py-5 bg-transparent'
      )}
    >
      <Container className="flex items-center justify-between">
        <NavLink href="/" className="relative z-50 flex items-center gap-2.5 group" activeClassName="">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
            <span className="w-2.5 h-2.5 bg-white rounded-md" />
          </div>
          <span className="text-lg font-bold text-hv-foreground">HobbyVerse</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href !== '/' && pathname.startsWith(link.href);
            return (
              <NavLink
                key={link.id}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors relative group',
                  isActive ? 'text-hv-foreground' : 'text-hv-muted hover:text-hv-foreground'
                )}
              >
                {link.name}
                <span className={cn(
                  'absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-hv-cyan to-hv-sky rounded-full transition-all duration-300',
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                )} />
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <NavLink
            href="/login"
            className="text-sm font-medium text-hv-muted hover:text-hv-foreground transition-colors px-3 py-2"
          >
            Log In
          </NavLink>
          <NavLink href="/delivery" className="relative text-hv-muted hover:text-hv-foreground transition-colors px-2 py-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </NavLink>
          <NavLink href="/dashboard" className="relative text-hv-muted hover:text-hv-foreground transition-colors px-2 py-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-hv-coral text-white text-[9px] font-bold flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </NavLink>
          <NavLink
            href="/pricing"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated hover:brightness-105 transition-all"
          >
            Start Renting
          </NavLink>
        </div>
      </Container>
    </header>
  );
};
