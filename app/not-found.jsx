import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Container className="text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-hv-cyan/20 to-hv-lavender/20 border border-hv-border flex items-center justify-center">
          <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-hv-cyan to-hv-lavender">?</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 text-hv-foreground">
          Realm Not Found
        </h1>
        <p className="text-hv-muted mb-8 max-w-md mx-auto text-base leading-relaxed">
          This dimension doesn&apos;t exist in the Next Hobby universe. Let&apos;s get you back to familiar territory.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated hover:brightness-105 transition-all"
        >
          Return to Home
        </Link>
      </Container>
    </div>
  );
}
