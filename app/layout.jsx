import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { InteractionProvider } from '@/components/interaction/InteractionProvider';
import { CursorFollower } from '@/components/interaction/CursorFollower';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { SceneBackground } from '@/components/three/SceneBackground';
import { AccessibilitySetup } from '@/components/ui/AccessibilitySetup';
import { Suspense } from 'react';
import { NavigationProvider } from '@/components/ui/NavigationProvider';
import { RouteChangeLoader } from '@/components/ui/RouteChangeLoader';
import { PageTransition } from '@/components/motion/PageTransition';
import { generateMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = generateMetadata({});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} antialiased scroll-smooth`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%233EE6FF%22/><text y=%22.75em%22 font-size=%2270%22 x=%22.5em%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22>NH</text></svg>" />
      </head>
      <body className="bg-hv-bg text-hv-foreground">
        <AccessibilitySetup />
        <NavigationProvider>
          <Suspense fallback={null}><RouteChangeLoader /></Suspense>
          <InteractionProvider>
            <CursorFollower />
            <SmoothScroll>
              <Navbar />
              <main className="relative z-10 flex flex-col min-h-screen safe-pb-nav md:pb-0">
                <ErrorBoundary>
                  <PageTransition>{children}</PageTransition>
                </ErrorBoundary>
                <Footer />
              </main>
              <MobileBottomNav />
              <SceneBackground />
            </SmoothScroll>
            <ToastContainer />
          </InteractionProvider>
        </NavigationProvider>
      </body>
    </html>
  );
}
