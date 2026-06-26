import { DashboardStatsSkeleton, RentalCardSkeleton, PageHeaderSkeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function DashboardLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <PageHeaderSkeleton />
        <DashboardStatsSkeleton />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <RentalCardSkeleton key={i} />
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 flex items-center gap-3 rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card">
                <div className="w-10 h-10 rounded-lg bg-hv-border/60 animate-pulse flex-shrink-0" />
                <div className="flex-grow space-y-1.5">
                  <div className="h-3 w-3/5 rounded bg-hv-border/60 animate-pulse" />
                  <div className="h-2.5 w-1/3 rounded bg-hv-border/60 animate-pulse" />
                </div>
                <div className="h-5 w-16 rounded-full bg-hv-border/60 animate-pulse flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
