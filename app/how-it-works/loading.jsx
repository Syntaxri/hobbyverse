import { Skeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function HowItWorksLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <div className="text-center mb-12 space-y-3">
          <Skeleton className="h-4 w-28 rounded-full mx-auto" />
          <Skeleton className="h-10 w-64 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>
        <div className="space-y-5 sm:space-y-6 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 sm:p-6 md:p-10 rounded-2xl border border-hv-border/80 bg-white/70 shadow-card space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
