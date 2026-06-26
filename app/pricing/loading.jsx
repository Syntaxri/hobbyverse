import { Skeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function PricingLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <div className="text-center mb-12 space-y-3">
          <div className="h-4 w-24 rounded-full bg-hv-border/60 animate-pulse mx-auto" />
          <div className="h-10 w-72 rounded-lg bg-hv-border/60 animate-pulse mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl bg-white border border-hv-border/60 p-6 shadow-soft">
              {i === 2 && <div className="absolute top-0 right-0 w-28 h-7 bg-hv-border/60 animate-pulse rounded-bl-xl" />}
              <div className="h-5 w-20 rounded bg-hv-border/60 animate-pulse mb-4" />
              <div className="flex items-baseline gap-1 mb-4">
                <div className="h-10 w-16 rounded bg-hv-border/60 animate-pulse" />
                <div className="h-4 w-12 rounded bg-hv-border/60 animate-pulse" />
              </div>
              <div className="h-8 w-full rounded bg-hv-border/60 animate-pulse mb-6" />
              <div className="space-y-2.5 mb-6">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded bg-hv-border/60 animate-pulse flex-shrink-0" />
                    <div className="h-3 w-3/5 rounded bg-hv-border/60 animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="h-12 w-full rounded-xl bg-hv-border/60 animate-pulse" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
