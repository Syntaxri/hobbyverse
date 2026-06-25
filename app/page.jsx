import { HeroSection } from '@/features/HeroSection';
import { CategoriesGrid } from '@/features/CategoriesGrid';
import { EquipmentShowcase } from '@/features/EquipmentShowcase';
import { WhyRent } from '@/features/WhyRent';
import { HobbyJourneys } from '@/features/HobbyJourneys';
import { HowItWorks } from '@/features/HowItWorks';
import { DiscoverWithoutRisk } from '@/features/DiscoverWithoutRisk';
import { FinalCTA } from '@/features/CTASection';
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
      <WhyRent />
      <HobbyJourneys />
      <HowItWorks />
      <DiscoverWithoutRisk />
      <FinalCTA />
    </>
  );
}
