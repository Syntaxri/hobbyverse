import '@/styles/globals.css';
import { SceneRoot } from '@/components/three/SceneRoot';
import { Navbar } from '@/components/layout/Navbar';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { InteractionProvider } from '@/components/interaction/InteractionProvider';
import { CursorFollower } from '@/components/interaction/CursorFollower';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-hv-bg text-hv-foreground">
        <InteractionProvider>
          <CursorFollower />
          <SmoothScroll>
            <Navbar />
            <main className="relative z-10 flex flex-col min-h-screen pb-[72px] md:pb-0">
              {children}
              <Footer />
            </main>
            <MobileBottomNav />
            <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
              <SceneRoot />
            </div>
          </SmoothScroll>
          <ToastContainer />
        </InteractionProvider>
      </body>
    </html>
  );
}
