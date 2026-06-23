'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { Icons } from '@/components/icons';

export const CTASection = () => (
  <Section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-hv-cyan/5 via-hv-lavender/5 to-transparent pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-hv-cyan/5 blur-[120px] pointer-events-none" />

    <Container className="relative z-10">
      <ScrollReveal className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-hv-mint/10 border border-hv-mint/20">
          <span className="w-2 h-2 rounded-full bg-hv-mint" />
          <span className="text-hv-mint text-xs font-semibold tracking-wider uppercase">Start Your Journey</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-hv-foreground tracking-tight mb-5 leading-tight">
          Ready to Discover Your
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hv-cyan via-hv-sky to-hv-lavender">
            Next Passion?
          </span>
        </h2>

        <p className="text-base text-hv-muted mb-8 max-w-lg mx-auto leading-relaxed">
          Join thousands of explorers who are renting premium equipment and discovering new hobbies every day.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/hobbies">
            <Button variant="primary" size="xl" magnetic>
              Start Renting Now
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/how-it-works">
            <Button variant="secondary" size="xl">
              Explore Free
            </Button>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs text-hv-muted">
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> No commitment required</span>
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> Free delivery &amp; returns</span>
          <span className="flex items-center gap-1.5"><Icons.Check className="w-3.5 h-3.5 text-hv-mint" /> Cancel anytime</span>
        </div>
      </ScrollReveal>
    </Container>
  </Section>
);
