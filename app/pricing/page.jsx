'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { useToastStore } from '@/store/useToastStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';

const plans = [
  {
    plan: 'Starter',
    price: 0,
    period: '',
    description: 'Free. Browse, discover, and rent one item at a time.',
    features: [
      'Browse all equipment',
      'Basic search & filters',
      'Read equipment reviews',
      'View rental history',
      'Email support',
      '1 active rental at a time',
    ],
    featured: false,
  },
  {
    plan: 'Plus',
    price: 49,
    period: '/month',
    description: 'For hobbyists who rent regularly. Start with a 14-day free trial.',
    features: [
      'Everything in Starter, plus:',
      'Up to 5 active rentals at once',
      'Priority booking',
      'Free delivery & returns',
      'Exclusive discounts',
      'Extended rental periods',
      'Priority support',
    ],
    featured: true,
    trial: true,
  },
  {
    plan: 'Premium',
    price: 129,
    period: '/month',
    description: 'For power users who want unlimited access and VIP treatment.',
    features: [
      'Everything in Plus, plus:',
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
  const getPlanInfo = useSubscriptionStore((s) => s.getPlanInfo);
  const [hydrated, setHydrated] = useState(false);
  const currentPlan = getPlanInfo();

  useEffect(() => { setHydrated(true); }, []);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = async (planName) => {
    setSelectedPlan(planName);

    const planKey = planName.toLowerCase();
    const isCurrent = currentPlan.planKey === planKey;

    if (isCurrent) {
      addToast(`You're already on the ${planName} plan!`, 'info');
      setSelectedPlan(null);
      return;
    }

    if (planName === 'Starter') {
      router.push('/hobbies');
      setSelectedPlan(null);
      return;
    }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        addToast(data.error || 'Something went wrong', 'error');
        setSelectedPlan(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      addToast('Failed to connect to payment provider', 'error');
      setSelectedPlan(null);
    }
  };

  return (
    <Section className="pt-32">
      <Container>
        <SectionHeader subtitle="Pricing" title="Choose Your Plan" />

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.plan} delay={i * 0.15}>
              <PricingCard
                {...plan}
                loading={selectedPlan === plan.plan}
                onSelect={() => handleSelect(plan.plan)}
                currentPlan={hydrated && currentPlan.planKey === plan.plan.toLowerCase()}
              />
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
