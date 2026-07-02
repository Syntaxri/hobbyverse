'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { useToastStore } from '@/store/useToastStore';

const plans = [
  {
    plan: 'Explorer',
    price: 0,
    period: '/month',
    description: 'Perfect for getting started and browsing our collection.',
    features: [
      'Browse all equipment',
      'Basic search & filters',
      'Equipment reviews',
      'Rental history',
      'Email support',
    ],
    featured: false,
  },
  {
    plan: 'Creator',
    price: 79,
    period: '/month',
    description: 'For hobbyists who want flexibility and premium access.',
    features: [
      'Everything in Explorer',
      'Priority booking',
      'Free delivery & returns',
      'Exclusive discounts',
      'Extended rental periods',
      'Priority support',
    ],
    featured: true,
  },
  {
    plan: 'Pro',
    price: 199,
    period: '/month',
    description: 'For power users and professionals who rent frequently.',
    features: [
      'Everything in Creator',
      'Unlimited rentals',
      'Free damage protection',
      'First access to new gear',
      'Dedicated account manager',
      'Same-day delivery',
      'VIP support 24/7',
    ],
    featured: false,
  },
];

export default function PricingPage() {
  const router = useRouter();
  const addToast = useToastStore((s) => s.addToast);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (planName) => {
    setSelectedPlan(planName);
    addToast(`Subscribed to ${planName} plan!`, 'success');
    setTimeout(() => {
      router.push('/hobbies');
    }, 300);
  };

  return (
    <Section className="pt-32">
      <Container>
        <SectionHeader subtitle="Pricing" title="Choose Your Plan" />

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.plan} delay={i * 0.15}>
              <PricingCard {...plan} loading={selectedPlan === plan.plan} onSelect={() => handleSelect(plan.plan)} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="text-center mt-16">
          <p className="text-sm text-hv-muted">
            All plans include free cancellation. No hidden fees. No long-term contracts.
          </p>
        </ScrollReveal>
      </Container>
    </Section>
  );
}
