'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

const comparisons = [
  {
    id: 'buy',
    label: 'Buying',
    color: 'text-hv-coral',
    bg: 'bg-hv-coral/5 border-hv-coral/10',
    items: [
      'High upfront cost', 'Storage burden',
      'Long commitment', 'Depreciation', 'Maintenance costs',
    ],
  },
  {
    id: 'rent',
    label: 'Renting',
    color: 'text-hv-mint',
    bg: 'bg-hv-mint/5 border-hv-mint/10',
    items: [
      'Pay as you go', 'No storage needed',
      'Cancel anytime', 'Always latest gear', 'We handle maintenance',
    ],
  },
];

const stats = [
  { id: 'stat-1', value: '78%', label: 'Try before buying' },
  { id: 'stat-2', value: '3.2x', label: 'More hobbies explored' },
  { id: 'stat-3', value: '$2.4k', label: 'Average savings' },
  { id: 'stat-4', value: '94%', label: 'Would rent again' },
];

export const WhyRent = () => (
  <Section>
    <Container>
      <SectionHeader subtitle="Why Rent?" title="Buy vs. Rent: The Smart Choice" />
      <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-14">
        {comparisons.map((c, i) => (
          <ScrollReveal key={c.id} direction={i === 0 ? 'left' : 'right'}>
            <Card className={`p-6 border-2 ${c.bg}`} hoverEffect={false} padding={false}>
              <div className="p-6">
                <div className={`text-2xl font-bold ${c.color} mb-4`}>{c.label}</div>
                <ul className="space-y-3">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-hv-foreground/70">
                      {c.id === 'buy' ? (
                        <Icons.XMark className="w-4 h-4 text-hv-coral flex-shrink-0" />
                      ) : (
                        <Icons.Check className="w-4 h-4 text-hv-mint flex-shrink-0" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </ScrollReveal>
        ))}
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
);
