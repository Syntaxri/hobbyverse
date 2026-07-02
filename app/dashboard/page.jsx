'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { useCartStore } from '@/store/useCartStore';
import { useRentalStore } from '@/store/useRentalStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useToastStore } from '@/store/useToastStore';
import { getProduct, getCategoryFallbackGradient } from '@/lib/getProduct';
import { Icons } from '@/components/icons';

function getImageForRental(rental) {
  const product = getProduct(rental.productId);
  const gradient = product?.gradient || getCategoryFallbackGradient(product?.category) || getCategoryFallbackGradient(rental.category);
  if (product?.image) return { src: product.image, gradient };
  if (rental.image) return { src: rental.image, gradient: getCategoryFallbackGradient(rental.category) };
  return { src: '', gradient };
}

function PlanBanner() {
  const planKey = useSubscriptionStore((s) => s.plan);
  const trialActive = useSubscriptionStore((s) => s.trialActive);
  const getPlanInfo = useSubscriptionStore((s) => s.getPlanInfo);
  const startTrial = useSubscriptionStore((s) => s.startTrial);
  const upgrade = useSubscriptionStore((s) => s.upgrade);
  const info = getPlanInfo();
  const activeRentals = useRentalStore((s) => s.rentals.filter((r) => r.status !== 'RETURNED').length);
  const addToast = useToastStore((s) => s.addToast);

  const isAtLimit = info.maxActiveRentals !== null && activeRentals >= info.maxActiveRentals;

  return (
    <Card className="p-4 sm:p-5 mb-6 sm:mb-8" hoverEffect={false}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center flex-shrink-0">
            <Icons.Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-hv-foreground">
                {info.name} Plan
              </span>
              <Badge variant={info.isTrial ? 'cyan' : info.planKey === 'starter' ? 'default' : 'green'}>
                {info.isTrial ? `Trial · ${Math.max(0, Math.ceil((new Date(info.trialEndsAt) - new Date()) / (1000 * 60 * 60 * 24)))}d left` : info.planKey === 'premium' ? 'Premium' : info.planKey === 'plus' ? 'Active' : 'Free'}
              </Badge>
            </div>
            <p className="text-xs text-hv-muted mt-0.5">
              {info.maxActiveRentals === null
                ? 'Unlimited active rentals'
                : `${activeRentals}/${info.maxActiveRentals} active rentals used`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {info.planKey === 'starter' && (
            <>
              <Button variant="primary" size="sm" onClick={() => {
                startTrial();
                addToast('14-day free trial started! Welcome to Plus.', 'success');
              }}>
                Start Free Trial
              </Button>
              <Button variant="ghost" size="sm" onClick={() => {
                upgrade('premium');
                addToast('Upgraded to Premium!', 'success');
              }}>
                Go Premium
              </Button>
            </>
          )}
          {isAtLimit && info.planKey !== 'starter' && (
            <Button variant="primary" size="sm" onClick={() => {
              upgrade('premium');
              addToast('Upgraded to Premium — unlimited rentals!', 'success');
            }}>
              Upgrade for Unlimited
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const rentals = useRentalStore((s) => s.rentals);
  const favorites = useRentalStore((s) => s.favorites);
  const completeReturn = useRentalStore((s) => s.completeReturn);
  const addToast = useToastStore((s) => s.addToast);
  const upgrade = useSubscriptionStore((s) => s.upgrade);
  const { items: cartItems } = useCartStore();
  const [hydrated, setHydrated] = useState(false);
  const [returningId, setReturningId] = useState(null);
  const [stripeLoading, setStripeLoading] = useState(false);

  useEffect(() => { setHydrated(true); }, []);

  useEffect(() => {
    const subscription = searchParams.get('subscription');
    const plan = searchParams.get('plan');
    const sessionId = searchParams.get('session_id');

    if (subscription === 'success' && plan && sessionId) {
      setStripeLoading(true);
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            upgrade(data.plan);
            addToast(`Welcome to ${data.plan === 'plus' ? 'Plus' : 'Premium'}! Your subscription is active.`, 'success');
          } else {
            addToast('Payment could not be verified. Please contact support.', 'error');
          }
        })
        .catch(() => {
          addToast('Failed to verify payment. Please contact support.', 'error');
        })
        .finally(() => setStripeLoading(false));

      const url = new URL(window.location.href);
      url.searchParams.delete('subscription');
      url.searchParams.delete('plan');
      url.searchParams.delete('session_id');
      window.history.replaceState({}, '', url);
    }
  }, []);

  const activeRentals = rentals.filter((r) => r.status !== 'RETURNED');
  const completedRentals = rentals.filter((r) => r.status === 'RETURNED');

  const stats = [
    { label: 'Active Rentals', value: activeRentals.length.toString(), color: 'from-hv-cyan to-hv-sky' },
    { label: 'Completed', value: completedRentals.length.toString(), color: 'from-hv-lavender to-hv-indigo' },
    { label: 'Favorites', value: favorites.length.toString(), color: 'from-hv-coral to-orange-500' },
    { label: 'Cart Items', value: cartItems.length.toString(), color: 'from-hv-mint to-green-500' },
  ];

  return (
    <Section className="pt-32">
      <Container>
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-hv-foreground tracking-tight mb-2">
                Command Center
              </h1>
              <p className="text-hv-muted">Your Next Hobby rental headquarters.</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center">
              <Icons.Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </ScrollReveal>

        {hydrated && <PlanBanner />}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <Card className="p-4 sm:p-6 text-center" hoverEffect={false}>
                <div className={`text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-hv-muted">{stat.label}</div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-hv-foreground mb-6">Active Rentals</h2>
            {activeRentals.length === 0 && completedRentals.length === 0 ? (
              <Card className="p-10 text-center" hoverEffect={false}>
                <div className="w-14 h-14 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.ShoppingBag className="w-6 h-6 text-hv-cyan" />
                </div>
                <p className="text-hv-muted mb-4">No active rentals</p>
                <NavLink href="/hobbies">
                  <Button variant="secondary" size="sm">Browse Equipment</Button>
                </NavLink>
              </Card>
            ) : (
              <div className="space-y-4">
                {activeRentals.map((rental) => {
                  const img = getImageForRental(rental);
                  return (
                    <Card key={rental.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4" hoverEffect={false}>
                      <div className="flex items-center gap-4 sm:gap-5 flex-grow min-w-0">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${img.gradient} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                          {img.src ? (
                            <img src={img.src} alt={rental.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white/70 text-xs font-bold">{rental.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-hv-foreground truncate">{rental.name}</h3>
                          <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                            <Badge variant="cyan">{rental.duration}</Badge>
                            <span className="text-xs text-hv-muted">{rental.price} DH/{rental.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right gap-2 sm:gap-1 flex-shrink-0 pl-0 sm:pl-4">
                        <div className="text-xs text-hv-muted sm:mb-1">
                          Due {new Date(rental.endDate).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => {
                          setReturningId(rental.id);
                          completeReturn(rental.id);
                          addToast('Return initiated', 'success');
                          setTimeout(() => setReturningId(null), 600);
                        }} loading={returningId === rental.id} loadingText="Returning...">
                          Return
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-hv-foreground mb-6">Recent History</h2>
            {completedRentals.length === 0 ? (
              <Card className="p-10 text-center" hoverEffect={false}>
                <div className="w-14 h-14 rounded-2xl bg-hv-lavender/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.Sparkles className="w-6 h-6 text-hv-lavender" />
                </div>
                <p className="text-hv-muted">No rental history yet</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {completedRentals.slice(0, 5).map((rental) => {
                  const img = getImageForRental(rental);
                  return (
                    <Card key={rental.id} className="p-4 flex items-center gap-3" hoverEffect={false}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${img.gradient} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                        {img.src ? (
                          <img src={img.src} alt={rental.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white/70 text-[10px] font-bold">{rental.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="text-xs font-medium text-hv-foreground truncate">{rental.name}</div>
                        <div className="text-[10px] text-hv-muted">{rental.duration} &middot; {rental.price} DH</div>
                      </div>
                      <Badge variant="default" className="flex-shrink-0">Returned</Badge>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
