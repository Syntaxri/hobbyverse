'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Icons } from '@/components/icons';

const easeOut = [0.16, 1, 0.3, 1];

const hobbyShowcase = [
  { Icon: Icons.MusicalNote, label: 'Music', color: 'from-cyan-100 to-blue-100', delay: 0 },
  { Icon: Icons.Camera, label: 'Photography', color: 'from-purple-100 to-pink-100', delay: 0.3 },
  { Icon: Icons.Telescope, label: 'Astronomy', color: 'from-indigo-100 to-purple-100', delay: 0.6 },
  { Icon: Icons.PaintBrush, label: 'Art & Design', color: 'from-pink-100 to-rose-100', delay: 0.9 },
  { Icon: Icons.CpuChip, label: 'Technology', color: 'from-slate-100 to-gray-100', delay: 0.2 },
  { Icon: Icons.BookOpen, label: 'Books', color: 'from-amber-100 to-yellow-100', delay: 0.5 },
  { Icon: Icons.Wave, label: 'Surfing', color: 'from-blue-100 to-cyan-100', delay: 0.8 },
  { Icon: Icons.Skateboard, label: 'Skateboarding', color: 'from-orange-100 to-red-100', delay: 1.1 },
];

const FloatingHobbyCard = ({ Icon, label, color, delay, index }) => (
  <motion.div
    className="flex flex-col items-center gap-1.5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.8 + delay, ease: easeOut }}
  >
    <motion.div
      className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-soft`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4 + index * 0.3, delay: index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-700/60" />
    </motion.div>
    <span className="text-[10px] md:text-xs font-medium text-hv-muted">{label}</span>
  </motion.div>
);

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-28">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-purple-50/30 pointer-events-none" />
    <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-hv-sky/6 to-transparent blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-hv-lavender/6 to-transparent blur-[100px] pointer-events-none" />

    <Container className="relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOut }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white/70 border border-hv-border/60 shadow-soft"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-hv-sky" />
            <span className="text-hv-sky text-xs font-semibold tracking-wider uppercase">Hobby Equipment Rental Marketplace</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOut }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-hv-foreground tracking-tight leading-[1.05] mb-5"
          >
            Discover Your Next Hobby{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-hv-sky via-hv-indigo to-hv-lavender">
              Before You Buy It
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
            className="text-sm sm:text-base md:text-lg text-hv-secondary leading-relaxed mb-8"
          >
            Rent real equipment for music, photography, art, astronomy, surfing, skateboarding, books, and technology projects. Try new passions without expensive commitments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10"
          >
            <Link href="/explore">
              <Button variant="primary" size="xl" magnetic>
                Explore Hobbies
                <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/hobbies">
              <Button variant="secondary" size="xl">
                Browse Equipment
                <Icons.Search className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-5 sm:gap-8"
          >
            {[
              { value: '80+', label: 'Products' },
              { value: '8', label: 'Hobby Categories' },
              { value: 'Flexible', label: 'Rental Plans' },
              { value: 'Thousands', label: 'Saved vs Buying' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-hv-sky to-hv-indigo" />
                <div>
                  <span className="text-sm font-bold text-hv-foreground">{stat.value}</span>
                  <span className="text-xs text-hv-muted ml-1">{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-hv-sky/5 via-transparent to-hv-lavender/5 rounded-3xl blur-xl" />
            <div className="relative bg-white/40 backdrop-blur-sm rounded-3xl border border-hv-border/50 p-6 shadow-card">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-hv-border/40">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hv-cyan to-hv-sky flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-white rounded-md" />
                </div>
                <div>
                  <div className="text-sm font-bold text-hv-foreground">HobbyVerse</div>
                  <div className="text-[10px] text-hv-muted">Equipment Marketplace</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 md:gap-5">
                {hobbyShowcase.map((item, i) => (
                  <FloatingHobbyCard key={item.label} {...item} index={i} />
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-hv-border/40 text-center">
                <div className="text-[11px] text-hv-muted font-medium">
                  80+ premium items ready to rent
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3 h-3 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                  <span className="text-[10px] text-hv-muted ml-1">Rated 4.8/5 by renters</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>

    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hv-bg to-transparent pointer-events-none" />
  </section>
);
