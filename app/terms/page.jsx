'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';

export default function TermsPage() {
  return (
    <Section className="pt-32">
      <Container>
        <SectionHeader subtitle="Legal" title="Terms & Conditions" />

        <div className="max-w-3xl mx-auto space-y-8 text-sm text-hv-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Next Hobby, you agree to be bound by these Terms & Conditions. If you do not agree, do not use our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of changes.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">2. Rental Agreement</h2>
            <p>All equipment rentals are subject to availability. Rental periods begin at delivery and end at scheduled return. Extended rental periods must be requested and approved in advance. Late returns may incur additional charges.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use equipment in accordance with instructions and safety guidelines</li>
              <li>Return equipment in the same condition as received (normal wear excepted)</li>
              <li>Report any damage or issues immediately upon discovery</li>
              <li>Ensure the equipment is used only by the agreed-upon individuals</li>
              <li>Not modify, repair, or tamper with any rented equipment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">4. Damage & Liability</h2>
            <p>Renters are responsible for the full replacement cost of lost, stolen, or irreparably damaged equipment. Minor wear and tear is expected and covered under standard rental fees. Damage protection plans may reduce liability as outlined in your selected plan.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">5. Delivery & Pickup</h2>
            <p>Delivery times are estimates and not guaranteed. A signature may be required upon delivery and return. Renters must ensure someone is available at the provided address during the scheduled delivery window. Rescheduling fees may apply for missed deliveries.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">6. Cancellation & Refunds</h2>
            <p>Cancellations made at least 24 hours before the scheduled delivery are fully refundable. Late cancellations may incur a fee equal to one day&apos;s rental. Early returns do not qualify for partial refunds unless part of a monthly plan with specific terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">7. Limitation of Liability</h2>
            <p>Next Hobby shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use rented equipment. Our total liability is limited to the total rental fees paid for the specific rental in question.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-hv-foreground mb-3">8. Governing Law</h2>
            <p>These terms are governed by the laws of Morocco. Any disputes shall be resolved in the courts of Morocco. By using our service, you consent to this jurisdiction.</p>
          </section>
        </div>
      </Container>
    </Section>
  );
}
