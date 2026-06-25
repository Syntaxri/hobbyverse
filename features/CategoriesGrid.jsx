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
          {categories.map((category, i) => (
            <ScrollReveal key={category.id} delay={i * 0.08}>
              <Link href={`/hobbies?category=${category.id}`}>
                <Card className="p-0 overflow-hidden group cursor-pointer" hoverEffect padding={false}>
                  <div
                    className={`aspect-square bg-gradient-to-br ${category.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
                      <svg className="w-24 h-24 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={0.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={
                          category.id === 'books' ? 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' :
                          category.id === 'music' ? 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z' :
                          category.id === 'photography' ? 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z' :
                          category.id === 'art' ? 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' :
                          category.id === 'technology' ? 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z' :
                          category.id === 'astronomy' ? 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15' :
                          category.id === 'surfing' ? 'M2.25 15.75l2.25-3.75 3 4.5 3-6 3 6 3-4.5 3 3.75m-16.5 0h16.5' :
                          'M3.75 9.75l2.25-3 3 3 2.25-2.25 2.25 2.25 3-3 2.25 3M3.75 17.25l17.25-3'
                        } />
                      </svg>
                    </div>
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
