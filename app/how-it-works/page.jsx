'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

const steps = [
  {
    number: '01',
    title: 'Choose a Hobby',
    description: 'Browse our extensive collection of hobby categories. From musical instruments to photography gear, 3D printers to telescopes, we have everything you need to explore your next passion.',
    icon: Icons.Sparkles,
    details: [
      'Browse 50+ hobby categories',
      'Read detailed equipment guides',
      'Compare rental vs. buy costs',
      'Check equipment availability',
    ],
  },
  {
    number: '02',
    title: 'Rent Equipment',
    description: 'Select your gear and choose a rental duration that works for you. Daily, weekly, or monthly — the choice is yours. We deliver premium equipment right to your door.',
    icon: Icons.ShoppingBag,
    details: [
      'Flexible daily/weekly/monthly pricing',
      'Free delivery & pickup',
      'Premium equipment only',
      'Insured & damage protected',
    ],
  },
  {
    number: '03',
    title: 'Learn & Practice',
    description: 'Take your time exploring your new hobby with top-tier equipment. No pressure, no long-term commitment. Just pure discovery and skill-building.',
    icon: Icons.Bolt,
    details: [
      'No long-term contracts',
      'Swap equipment anytime',
      'Access to exclusive tutorials',
      'Join community events',
    ],
  },
  {
    number: '04',
    title: 'Return or Purchase',
    description: 'Loved it? Purchase at a discount. Not for you? Return it easily and try something else. Every rental brings you closer to finding your true passion.',
    icon: Icons.ArrowRight,
    details: [
      'Buy with rental credit',
      'Easy return process',
      'Try unlimited hobbies',
      'Build your passion profile',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <Section className="pt-32">
      <Container>
        <SectionHeader subtitle="How It Works" title="Your Journey in Four Steps" />

        <div className="space-y-5 sm:space-y-6 md:space-y-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.1}>
              <Card className="grid md:grid-cols-5 gap-0 items-start" hoverEffect={false} padding={false}>
                <div className="md:col-span-2 p-5 sm:p-6 md:p-10 md:pr-0">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-hv-foreground/80">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-3 p-5 sm:p-6 md:p-10 md:pl-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-hv-foreground mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-hv-muted leading-relaxed mb-4 sm:mb-6 text-sm md:text-base text-pretty">
                    {step.description}
                  </p>
                  <ul className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm text-hv-foreground/60">
                        <Icons.Check className="w-3.5 h-3.5 text-hv-cyan flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
