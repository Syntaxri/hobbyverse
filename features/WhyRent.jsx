'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';
import { products } from '@/data/products';

const comparisons = [
  {
    label: 'Canon EOS R6',
    buyPrice: 2499,
    productId: 'canon-eos-r6m2',
    image: '',
  },
  {
    label: 'Yamaha P-515 Digital Piano',
    buyPrice: 1799,
    productId: 'yamaha-p515',
    image: '',
  },
  {
    label: 'Celestron NexStar 8SE',
    buyPrice: 1199,
    productId: 'celestron-nexstar-8se',
    image: '',
  },
];

function getRentalPrice(productId) {
  const p = products.find((prod) => prod.id === productId);
  return p ? p.daily : 0;
}

const stats = [
  { id: 'stat-1', value: '78%', label: 'Try before buying' },
  { id: 'stat-2', value: '3.2x', label: 'More hobbies explored' },
  { id: 'stat-3', value: '$2.4k', label: 'Average savings' },
  { id: 'stat-4', value: '94%', label: 'Would rent again' },
];

export const WhyRent = memo(() => (
  <Section>
    <Container>
      <SectionHeader
        subtitle="Why Rent?"
        title="Buy vs. Rent: See the Real Difference"
      />

      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-14">
        {comparisons.map((item, i) => {
          const rentalPrice = getRentalPrice(item.productId);
          return (
            <ScrollReveal key={item.label} delay={i * 0.1}>
              <Card className="p-6 overflow-hidden relative" hoverEffect padding={false}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-hv-sky/5 to-transparent rounded-bl-full" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hv-sky/10 to-hv-indigo/10 flex items-center justify-center">
                      <Icons.ShoppingBag className="w-4 h-4 text-hv-sky" />
                    </div>
                    <span className="text-sm font-semibold text-hv-foreground">{item.label}</span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black text-hv-coral">${item.buyPrice.toLocaleString()}</span>
                    <span className="text-xs text-hv-muted">to buy</span>
                  </div>

                  <div className="h-px bg-gradient-to-r from-hv-border/80 to-transparent my-4" />

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-hv-cyan to-hv-sky">
                      ${rentalPrice}
                    </span>
                    <span className="text-xs text-hv-muted">/day to rent</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-hv-muted bg-hv-cyan/5 rounded-lg px-3 py-2">
                    <Icons.Check className="w-3.5 h-3.5 text-hv-mint flex-shrink-0" />
                    Save {Math.round((1 - rentalPrice * 30 / item.buyPrice) * 100)}% vs buying
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.id} delay={i * 0.08}>
            <Card className="text-center py-6" hoverEffect={false}>
              <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-hv-cyan to-hv-sky mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-hv-muted">{stat.label}</div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </Section>
));
