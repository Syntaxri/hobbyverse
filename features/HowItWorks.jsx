'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

const steps = [
  {
    number: '01', title: 'Choose a Hobby',
    description: 'Browse our collection of hobbies and find what sparks your interest. From music to astronomy, we have it all.',
    icon: Icons.Sparkles, color: 'from-hv-cyan to-hv-sky',
  },
  {
    number: '02', title: 'Rent Equipment',
    description: 'Select your gear, choose daily/weekly/monthly pricing, and we\'ll deliver it to your door. Premium quality guaranteed.',
    icon: Icons.ShoppingBag, color: 'from-hv-lavender to-hv-indigo',
  },
  {
    number: '03', title: 'Learn & Practice',
    description: 'Explore your new passion with top-tier equipment. No pressure, no long-term commitment. Just pure discovery.',
    icon: Icons.Bolt, color: 'from-hv-coral to-orange-500',
  },
  {
    number: '04', title: 'Return or Purchase',
    description: 'Loved it? Buy it at a discount. Not for you? Return it easily and try something new. The choice is yours.',
    icon: Icons.ArrowRight, color: 'from-hv-mint to-green-500',
  },
];

export const HowItWorks = memo(() => (
  <Section>
    <Container>
      <SectionHeader subtitle="Simple Process" title="How Next Hobby Works" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {steps.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.1}>
            <Card className="p-6 text-center h-full" hoverEffect>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-3xl font-black text-hv-border/70 mb-2 block">{step.number}</span>
              <h3 className="text-base font-semibold text-hv-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-hv-muted leading-relaxed">{step.description}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </Section>
));
