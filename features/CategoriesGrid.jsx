'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScrollReveal } from '@/components/motion/ScrollReveals';
import { categories } from '@/data/categories';

export const CategoriesGrid = () => {
  const featured = categories.filter((c) => c.featured);

  return (
    <Section>
      <Container>
        <SectionHeader
          subtitle="Categories"
          title="Explore Popular Hobby Realms"
          action={
            <Link href="/hobbies" className="text-sm font-medium text-hv-sky hover:text-hv-cyan transition-colors">
              View All Categories &rarr;
            </Link>
          }
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {featured.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 0.08}>
              <Link href={`/hobbies?category=${category.id}`}>
                <Card className="p-0 overflow-hidden group cursor-pointer" hoverEffect padding={false}>
                  <div
                    className={`aspect-square bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10" />
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <h3 className="text-lg font-bold text-hv-foreground mb-1">{category.name}</h3>
                      <p className="text-xs text-hv-muted mb-2">{category.tagline}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="cyan">{category.items} items</Badge>
                        <span className="text-[11px] text-hv-muted">{category.rentals.toLocaleString()} rentals</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};
