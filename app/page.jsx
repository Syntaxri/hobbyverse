import { HeroSection } from '@/features/HeroSection';
import { CategoriesGrid } from '@/features/CategoriesGrid';
import { EquipmentShowcase } from '@/features/EquipmentShowcase';
import { HowItWorks } from '@/features/HowItWorks';
import { WhyRent } from '@/features/WhyRent';
import { TestimonialSection } from '@/features/Testimonials';
import { CTASection } from '@/features/CTASection';
import { structuredData } from '@/lib/seo';

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HeroSection />
      <CategoriesGrid />
      <EquipmentShowcase />
      <HowItWorks />
      <WhyRent />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
