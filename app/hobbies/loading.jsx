import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function HobbiesLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded-full bg-hv-border/60 animate-pulse" />
            <div className="h-8 w-64 rounded-lg bg-hv-border/60 animate-pulse" />
          </div>
          <div className="h-9 w-36 rounded-xl bg-hv-border/60 animate-pulse" />
        </div>
        <div className="flex gap-2 mb-10">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 w-28 rounded-lg bg-hv-border/60 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
