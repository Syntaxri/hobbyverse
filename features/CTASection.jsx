'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

export const FinalCTA = memo(() => (
  <Section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-hv-cyan/5 via-hv-lavender/5 to-transparent pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-hv-cyan/5 blur-[120px] pointer-events-none" />

    <Container className="relative z-10">
      <ScrollReveal className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-hv-cyan/10 border border-hv-cyan/20">
          <span className="w-2 h-2 rounded-full bg-hv-cyan" />
          <span className="text-hv-sky text-xs font-semibold tracking-wider uppercase">Start Your Journey</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-hv-foreground tracking-tight mb-5 leading-tight">
          Find Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hv-cyan via-hv-sky to-hv-lavender">
            Next Obsession
          </span>
        </h2>

        <p className="text-base text-hv-muted mb-8 max-w-lg mx-auto leading-relaxed">
          Explore real equipment, discover new hobbies, and start learning today. No expensive commitments required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink href="/explore">
            <Button variant="primary" size="xl" magnetic>
              Explore Hobbies
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </NavLink>
          <NavLink href="/hobbies">
            <Button variant="secondary" size="xl">
              Browse Equipment
              <Icons.Search className="w-4 h-4 ml-2" />
            </Button>
          </NavLink>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-hv-muted">
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> No commitment required</span>
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> Free delivery &amp; returns</span>
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> Cancel anytime</span>
        </div>
      </ScrollReveal>
    </Container>
  </Section>
));
