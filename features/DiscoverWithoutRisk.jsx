'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

const concerns = [
  {
    icon: Icons.Shield,
    title: 'I don\'t know if I\'ll enjoy photography.',
    solution: 'Rent a camera for a week. If you love it, apply your rental fees toward purchase. If not, try something else.',
    color: 'from-purple-100 to-pink-100',
  },
  {
    icon: Icons.MusicalNote,
    title: 'I\'ve never played guitar before.',
    solution: 'Start with a beginner acoustic guitar. We include setup guides and beginner resources with every rental.',
    color: 'from-cyan-100 to-blue-100',
  },
  {
    icon: Icons.Telescope,
    title: 'I want to try astronomy but telescopes are expensive.',
    solution: 'Rent a telescope for $15/day instead of spending $1,200. Test it under real night skies first.',
    color: 'from-indigo-100 to-purple-100',
  },
  {
    icon: Icons.Sparkles,
    title: 'I don\'t want to spend $2,000 on equipment.',
    solution: 'You don\'t have to. Rent premium gear for a fraction of the cost. Only buy if you truly love the hobby.',
    color: 'from-amber-100 to-yellow-100',
  },
];

export const DiscoverWithoutRisk = memo(() => (
  <Section>
    <Container>
      <SectionHeader
        subtitle="No Pressure"
        title="Discover Without the Risk"
      />

      <div className="grid md:grid-cols-2 gap-5 md:gap-6">
        {concerns.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.08}>
            <Card className="p-6 h-full" hoverEffect padding={false}>
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-5 h-5 text-gray-700/60" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-hv-foreground mb-2 leading-snug">
                      &ldquo;{item.title}&rdquo;
                    </h3>
                    <p className="text-sm text-hv-muted leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="mt-10 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-hv-cyan/5 to-hv-lavender/5 border border-hv-border/50">
          <Icons.Check className="w-4 h-4 text-hv-mint" />
          <span className="text-sm text-hv-muted">
            Rent first. Decide later. No pressure, no regrets.
          </span>
        </div>
      </ScrollReveal>
    </Container>
  </Section>
));
