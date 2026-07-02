'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Container } from './Container';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';
import { NavLink } from '@/components/ui/NavLink';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';

const navLinks = [
  { id: 'home', name: 'Home', href: '/' },
  { id: 'hobbies', name: 'Explore', href: '/hobbies' },
  { id: 'how-it-works', name: 'How it Works', href: '/how-it-works' },
  { id: 'pricing', name: 'Pricing', href: '/pricing' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const updateDuration = useCartStore((s) => s.updateDuration);
  const getTotal = useCartStore((s) => s.getTotal);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuantityChange = useCallback((id, delta) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    updateQuantity(id, item.quantity + delta);
  }, [items, updateQuantity]);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-40 transition-all duration-300 safe-top',
        scrolled
          ? 'py-2 sm:py-3 bg-white/80 backdrop-blur-xl border-b border-hv-border/50 shadow-soft'
          : 'py-3 sm:py-5 bg-transparent'
      )}
    >
      <Container className="flex items-center justify-between">
        <NavLink href="/" className="relative z-50 flex items-center gap-2 group" activeClassName="">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center shadow-soft transition-transform group-hover:scale-105">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-md" />
          </div>
          <span className="text-base sm:text-lg font-bold text-hv-foreground">Next Hobby</span>
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

        <div className="flex items-center gap-2 sm:gap-3">
          <NavLink
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-hv-muted hover:text-hv-foreground transition-colors px-3 py-2 min-touch"
          >
            Log In
          </NavLink>
          <NavLink href="/delivery" className="relative text-hv-muted hover:text-hv-foreground transition-colors w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60" aria-label="Delivery tracking">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </NavLink>
          <NavLink href="/dashboard" className="relative text-hv-muted hover:text-hv-foreground transition-colors w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60" aria-label="Dashboard">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
          </NavLink>
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-hv-muted hover:text-hv-foreground transition-colors w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60"
            aria-label={`Open cart, ${totalItems} items`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-hv-coral text-white text-[9px] font-bold flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
          <NavLink
            href="/pricing"
            className="hidden sm:inline-flex px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated hover:brightness-105 transition-all min-h-[44px]"
          >
            Start Renting
          </NavLink>
        </div>
      </Container>

      <Drawer isOpen={cartOpen} onClose={() => setCartOpen(false)} title={`Cart (${totalItems} items)`}>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
              <Icons.ShoppingBag className="w-6 h-6 text-hv-cyan" />
            </div>
            <p className="text-hv-muted mb-1">Your cart is empty</p>
            <p className="text-xs text-hv-muted">Browse equipment to add items.</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-3 -mx-6 px-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 py-3 border-b border-hv-border/50 last:border-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-hv-cyan/20 to-hv-sky/20 flex-shrink-0 overflow-hidden">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-hv-foreground truncate">{item.name}</h4>
                    <p className="text-xs text-hv-muted">{item.price} DH/{item.duration}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-hv-bg border border-hv-border flex items-center justify-center text-xs hover:bg-hv-border/50 transition-colors"
                          aria-label="Decrease quantity"
                        >-</button>
                        <span className="text-xs font-medium w-5 text-center select-none">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-hv-bg border border-hv-border flex items-center justify-center text-xs hover:bg-hv-border/50 transition-colors"
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[11px] text-hv-coral hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-bold text-hv-foreground">{(item.price * item.quantity).toLocaleString()} DH</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-hv-border pt-4 mt-4 -mx-6 px-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-hv-muted">Total</span>
                <span className="text-lg font-bold text-hv-foreground">{getTotal().toLocaleString()} DH</span>
              </div>
              <NavLink href="/hobbies" className="block">
                <Button variant="primary" className="w-full" size="md" onClick={() => setCartOpen(false)}>
                  Continue Browsing
                </Button>
              </NavLink>
            </div>
          </div>
        )}
      </Drawer>
    </header>
  );
};
