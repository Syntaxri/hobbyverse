'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ScrollReveal } from '@/components/motion/ScrollReveals';

const journeys = [
  {
    title: 'Photography Journey',
    subtitle: 'From beginner to pro',
    gradient: 'from-purple-100 to-pink-100',
    steps: [
      { label: 'Beginner Camera', desc: 'Start with a Sony A6700' },
      { label: 'Prime Lens', desc: 'Add a Sigma 24-70mm' },
      { label: 'Drone', desc: 'Expand with DJI Mini 4 Pro' },
      { label: 'Professional Kit', desc: 'Full-frame Canon R5 setup' },
    ],
  },
  {
    title: 'Music Journey',
    subtitle: 'Find your rhythm',
    gradient: 'from-cyan-100 to-blue-100',
    steps: [
      { label: 'Acoustic Guitar', desc: 'Start with Yamaha FG800' },
      { label: 'Electric Guitar', desc: 'Level up to Fender Strat' },
      { label: 'Digital Piano', desc: 'Add keys with Roland FP-30X' },
      { label: 'DJ Controller', desc: 'Go pro with DDJ-1000SRT' },
    ],
  },
  {
    title: 'Technology Journey',
    subtitle: 'Build the future',
    gradient: 'from-slate-100 to-gray-100',
    steps: [
      { label: 'Arduino', desc: 'Learn electronics basics' },
      { label: 'Raspberry Pi', desc: 'Build your first computer' },
      { label: '3D Printer', desc: 'Create physical objects' },
      { label: 'Advanced Projects', desc: 'Full maker studio setup' },
    ],
  },
];

export const HobbyJourneys = () => (
  <Section>
    <Container>
      <SectionHeader
        subtitle="Learning Paths"
        title="Your Hobby Journey Starts Here"
      />

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {journeys.map((journey, i) => (
          <ScrollReveal key={journey.title} delay={i * 0.1}>
            <Card className="p-6 overflow-hidden relative h-full" hoverEffect padding={false}>
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${journey.gradient}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${journey.gradient} flex items-center justify-center`}>
                    <span className="text-lg font-bold text-gray-700/60">{journey.title[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-hv-foreground">{journey.title}</h3>
                    <p className="text-xs text-hv-muted">{journey.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-0">
                  {journey.steps.map((step, si) => (
                    <div key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {si < journey.steps.length - 1 && (
                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-hv-border to-hv-border/20" />
                      )}
                      <div className="relative flex-shrink-0 w-6 h-6 rounded-full bg-hv-bg border-2 border-hv-border/60 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-hv-muted">{si + 1}</span>
                      </div>
                      <div className="flex-grow min-w-0 pt-0.5">
                        <div className="text-sm font-semibold text-hv-foreground">{step.label}</div>
                        <div className="text-xs text-hv-muted mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </Section>
);
