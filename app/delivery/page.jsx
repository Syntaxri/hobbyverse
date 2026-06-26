'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { DeliveryTrackerCard } from '@/components/delivery/DeliveryTrackerCard';
import { ReturnScheduler } from '@/components/delivery/ReturnScheduler';
import { useRentalStore } from '@/store/useRentalStore';
import { useToastStore } from '@/store/useToastStore';
import { Icons } from '@/components/icons';

export default function DeliveryPage() {
  const rentals = useRentalStore((s) => s.rentals);
  const scheduleReturn = useRentalStore((s) => s.scheduleReturn);
  const addToast = useToastStore((s) => s.addToast);
  const [activeTab, setActiveTab] = useState('active');
  const [returningRental, setReturningRental] = useState(null);

  const activeRentals = rentals.filter((r) => r.status !== 'RETURNED');
  const completedRentals = rentals.filter((r) => r.status === 'RETURNED');

  const handleScheduleReturn = (rentalId, date) => {
    scheduleReturn(rentalId, date);
    setReturningRental(null);
    addToast('Return scheduled successfully', 'success');
  };

  return (
    <Section className="pt-32">
      <Container>
        <ScrollReveal>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-hv-foreground tracking-tight mb-2">
                Deliveries
              </h1>
              <p className="text-hv-muted">Track your rentals from confirmation to return.</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center">
              <Icons.Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </ScrollReveal>

        {rentals.length === 0 ? (
          <Card className="p-12 text-center" hoverEffect={false}>
            <div className="w-16 h-16 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4">
              <Icons.ShoppingBag className="w-6 h-6 text-hv-cyan" />
            </div>
            <h2 className="text-xl font-bold text-hv-foreground mb-2">No Deliveries Yet</h2>
            <p className="text-sm text-hv-muted mb-6 max-w-md mx-auto">
              Rent your first piece of equipment and track every step of the delivery journey here.
            </p>
            <NavLink href="/hobbies">
              <Button variant="primary">Browse Equipment</Button>
            </NavLink>
          </Card>
        ) : (
          <>
            <ScrollReveal className="mb-6 sm:mb-8">
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                {['active', 'completed'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 sm:px-5 py-2.5 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                      activeTab === tab
                        ? 'bg-white text-hv-foreground shadow-sm'
                        : 'text-hv-muted hover:text-hv-foreground'
                    }`}
                  >
                    {tab === 'active' ? `Active (${activeRentals.length})` : `Completed (${completedRentals.length})`}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {(activeTab === 'active' ? activeRentals : completedRentals).map((rental, i) => (
                  <ScrollReveal key={rental.id} delay={i * 0.05}>
                    <DeliveryTrackerCard
                      rental={rental}
                      onReturn={(r) => setReturningRental(r)}
                    />
                  </ScrollReveal>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}

        <AnimatePresence>
          {returningRental && (
            <ReturnScheduler
              rental={returningRental}
              onSchedule={handleScheduleReturn}
              onCancel={() => setReturningRental(null)}
            />
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
