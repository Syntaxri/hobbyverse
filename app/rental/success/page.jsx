'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { useRentalStore } from '@/store/useRentalStore';
import { useToastStore } from '@/store/useToastStore';
import { getAllProducts } from '@/lib/getProduct';

export default function RentalSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const createRental = useRentalStore((s) => s.createRental);
  const addToast = useToastStore((s) => s.addToast);
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`/api/verify-rental-payment?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.valid) {
          setStatus('error');
          return;
        }

        const { rental } = data;
        const products = getAllProducts();
        const product = products.find((p) => p.id === rental.productId);
        if (!product) {
          setStatus('error');
          return;
        }

        const result = createRental(product, rental.duration, rental.quantity, rental.address);
        if (result.error) {
          addToast(result.error, 'error');
          setStatus('error');
          return;
        }

        addToast('Rental confirmed! Payment received.', 'success');
        setStatus('success');
        setTimeout(() => router.push('/delivery'), 1500);
      })
      .catch(() => {
        setStatus('error');
      });
  }, []);

  return (
    <Section className="pt-32">
      <Container className="text-center py-20">
        {status === 'verifying' && (
          <div>
            <div className="w-16 h-16 rounded-2xl bg-hv-cyan/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-6 h-6 rounded-full border-2 border-hv-cyan border-t-transparent animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-hv-foreground mb-2">Verifying Payment...</h1>
            <p className="text-hv-muted">Please wait while we confirm your payment.</p>
          </div>
        )}
        {status === 'success' && (
          <div>
            <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-hv-foreground mb-2">Payment Successful!</h1>
            <p className="text-hv-muted">Redirecting to delivery tracking...</p>
          </div>
        )}
        {status === 'error' && (
          <div>
            <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-hv-foreground mb-2">Payment Verification Failed</h1>
            <p className="text-hv-muted mb-6">Please contact support if your card was charged.</p>
            <button onClick={() => router.push('/hobbies')} className="text-hv-sky hover:underline font-medium">
              Browse Equipment
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
