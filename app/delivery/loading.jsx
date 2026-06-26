import { DeliveryCardSkeleton, PageHeaderSkeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function DeliveryLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <PageHeaderSkeleton />
        <div className="flex gap-1 mb-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-9 w-32 rounded-lg bg-hv-border/60 animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <DeliveryCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
