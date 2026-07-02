'use client';

import { useState } from 'react';
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
  const startTrial = useSubscriptionStore((s) => s.startTrial);
  const upgrade = useSubscriptionStore((s) => s.upgrade);
  const currentPlanKey = useSubscriptionStore((s) => s.plan);
  const getPlanInfo = useSubscriptionStore((s) => s.getPlanInfo);
  const currentPlan = getPlanInfo();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (planName) => {
    setSelectedPlan(planName);
    const planKey = planName.toLowerCase();
    const isCurrent = currentPlan.planKey === planKey;

    if (isCurrent) {
      addToast(`You're already on the ${planName} plan!`, 'info');
      setTimeout(() => router.push('/hobbies'), 300);
      return;
    }

    if (planName === 'Plus') {
      startTrial();
      addToast('14-day free trial started! Welcome to Plus.', 'success');
      setTimeout(() => router.push('/hobbies'), 300);
      return;
    }

    upgrade(planKey);
    addToast(`Upgraded to ${planName}!`, 'success');
    setTimeout(() => router.push('/hobbies'), 300);
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
                currentPlan={currentPlan.planKey === plan.plan.toLowerCase()}
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
