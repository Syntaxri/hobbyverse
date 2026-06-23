'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';

const easeOut = [0.16, 1, 0.3, 1];

const FloatingShape = ({ className, delay = 0 }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 5, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center overflow-hidden pt-28">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-hv-sky/4 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-hv-lavender/4 to-transparent blur-[100px] pointer-events-none" />

      <FloatingShape className="absolute top-32 left-[15%] w-3 h-3 rounded-full bg-hv-sky/15 hidden md:block" delay={0} />
      <FloatingShape className="absolute top-48 right-[20%] w-2 h-2 rounded-full bg-hv-lavender/20 hidden md:block" delay={1.5} />
      <FloatingShape className="absolute bottom-40 left-[25%] w-4 h-4 rounded-full bg-hv-sky/10 hidden md:block" delay={3} />
      <FloatingShape className="absolute bottom-36 right-[15%] w-2.5 h-2.5 rounded-full bg-hv-indigo/15 hidden md:block" delay={0.8} />

      <motion.div style={{ y, opacity }} className="w-full">
        <Container className="relative z-10 flex flex-col items-center text-center pt-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full bg-white/60 border border-hv-border/60 shadow-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-hv-sky animate-pulse-soft" />
            <span className="text-hv-sky text-xs font-semibold tracking-wider uppercase">Discover. Rent. Explore.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-hv-foreground tracking-tight leading-[0.9] mb-6"
          >
            Discover Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hv-sky via-hv-indigo to-hv-lavender">
              Next Passion
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: easeOut }}
            className="text-base sm:text-lg text-hv-secondary max-w-xl mb-10 leading-relaxed"
          >
            Rent premium hobby equipment and explore new skills
            <br className="hidden sm:block" />
            without expensive commitments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/hobbies">
              <Button variant="primary" size="xl" magnetic>
                Explore Hobbies
                <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="secondary" size="xl">
                How It Works
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-hv-muted"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-hv-mint" />
              2,500+ Items Available
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-hv-sky" />
              50+ Hobby Categories
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-hv-lavender" />
              99% Satisfaction
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-hv-indigo" />
              Free Delivery
            </span>
          </motion.div>
        </Container>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hv-bg to-transparent pointer-events-none" />
    </section>
  );
};
