import { ProductDetailSkeleton } from '@/components/ui/Skeleton';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function ProductLoading() {
  return (
    <Section className="pt-32">
      <Container>
        <ProductDetailSkeleton />
      </Container>
    </Section>
  );
}
