'use client';

import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { useCartStore } from '@/store/useCartStore';
import { useRentalStore } from '@/store/useRentalStore';
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

export default function DashboardPage() {
  const rentals = useRentalStore((s) => s.rentals);
  const favorites = useRentalStore((s) => s.favorites);
  const completeReturn = useRentalStore((s) => s.completeReturn);
  const addToast = useToastStore((s) => s.addToast);
  const { items: cartItems } = useCartStore();
  const [returningId, setReturningId] = useState(null);

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
              <p className="text-hv-muted">Your HobbyVerse rental headquarters.</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center">
              <Icons.Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <Card className="p-6 text-center" hoverEffect={false}>
                <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-hv-muted">{stat.label}</div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
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
                    <Card key={rental.id} className="p-5 flex items-center gap-5" hoverEffect={false}>
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${img.gradient} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                        {img.src ? (
                          <img src={img.src} alt={rental.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white/70 text-xs font-bold">{rental.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-sm font-semibold text-hv-foreground truncate">{rental.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="cyan">{rental.duration}</Badge>
                          <span className="text-xs text-hv-muted">${rental.price}/{rental.duration}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-xs text-hv-muted mb-1">
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
                        <div className="text-[10px] text-hv-muted">{rental.duration} &middot; ${rental.price}</div>
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
