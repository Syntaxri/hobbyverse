'use client';

import { memo } from 'react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Rating } from '@/components/ui/Rating';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { testimonials } from '@/data/testimonials';

export const TestimonialSection = memo(() => (
  <Section>
    <Container>
      <SectionHeader subtitle="Testimonials" title="What Our Community Says" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 0.08}>
            <Card className="flex flex-col h-full" hoverEffect>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-hv-foreground">{t.name}</div>
                  <div className="text-xs text-hv-muted">{t.role}</div>
                </div>
              </div>
              <p className="text-sm text-hv-muted leading-relaxed flex-grow mb-4">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center justify-between pt-3 border-t border-hv-border/50 mt-auto">
                <Rating value={t.rating} />
                <Badge variant="default">{t.hobby}</Badge>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Container>
  </Section>
));
