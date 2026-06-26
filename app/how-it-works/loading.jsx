import { Skeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function HowItWorksLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <div className="text-center mb-16 space-y-3">
          <div className="h-4 w-28 rounded-full bg-hv-border/60 animate-pulse mx-auto" />
          <div className="h-10 w-64 rounded-lg bg-hv-border/60 animate-pulse mx-auto" />
          <div className="h-4 w-80 rounded bg-hv-border/60 animate-pulse mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-hv-border/60 animate-pulse mx-auto" />
              <div className="h-5 w-28 rounded bg-hv-border/60 animate-pulse mx-auto" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-hv-border/60 animate-pulse" />
                <div className="h-3 w-3/4 rounded bg-hv-border/60 animate-pulse mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
