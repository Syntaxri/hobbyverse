'use client';

import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getCategoryFallbackGradient } from '@/lib/getProduct';

const gradientColorMap = {
  'from-amber-100 to-yellow-100': '#f59e0b',
  'from-cyan-100 to-blue-100': '#06b6d4',
  'from-purple-100 to-pink-100': '#a855f7',
  'from-pink-100 to-rose-100': '#ec4899',
  'from-slate-100 to-gray-100': '#64748b',
  'from-indigo-100 to-purple-100': '#6366f1',
  'from-blue-100 to-cyan-100': '#3b82f6',
  'from-orange-100 to-red-100': '#f97316',
  'from-gray-100 to-gray-200': '#94a3b8',
};

const categoryIconMap = {
  books: 'BookOpen',
  music: 'MusicalNote',
  photography: 'Camera',
  art: 'PaintBrush',
  technology: 'CpuChip',
  astronomy: 'Telescope',
  surfing: 'Wave',
  skateboarding: 'Skateboard',
};

const iconSvgs = {
  BookOpen: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  MusicalNote: 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z',
  Camera: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z',
  PaintBrush: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
  CpuChip: 'M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z',
  Telescope: 'M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15',
  Wave: 'M2.25 15.75l2.25-3.75 3 4.5 3-6 3 6 3-4.5 3 3.75m-16.5 0h16.5',
  Skateboard: 'M3.75 9.75l2.25-3 3 3 2.25-2.25 2.25 2.25 3-3 2.25 3M3.75 17.25l17.25-3',
};

function getInitials(text) {
  if (!text) return '?';
  return text.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';
}

function getCategoryIconPath(categoryId) {
  const iconName = categoryIconMap[categoryId] || 'BookOpen';
  return iconSvgs[iconName] || iconSvgs.BookOpen;
}

const ShimmerOverlay = () => (
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 2.5s ease-in-out infinite',
    }}
  />
);

const FallbackContent = ({ category, alt }) => (
  <div className="relative z-10 flex flex-col items-center gap-3 p-4 text-center">
    <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
      <path strokeLinecap="round" strokeLinejoin="round" d={getCategoryIconPath(category)} />
    </svg>
    <span className="text-xs font-semibold text-white/80 leading-tight max-w-[90%]">
      {alt || getInitials('Product')}
    </span>
  </div>
);

export const ProductImage = ({ src, alt, gradient, product, category, className, aspect = '4/3', priority = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const resolvedSrc = useMemo(() => src || product?.image || '', [src, product]);
  const resolvedAlt = useMemo(() => alt || product?.name || '', [alt, product]);
  const resolvedCategory = useMemo(() => category || product?.category || '', [category, product]);
  const resolvedGradient = useMemo(() => gradient || product?.gradient || getCategoryFallbackGradient(resolvedCategory), [gradient, product, resolvedCategory]);

  const bgColor = gradientColorMap[resolvedGradient] || '#94a3b8';

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setError(true), []);

  const isFallback = !resolvedSrc || error;

  const containerStyle = useMemo(() => ({
    aspectRatio: aspect,
    backgroundColor: bgColor,
    backgroundImage: `linear-gradient(135deg, ${bgColor}22, ${bgColor}44)`,
  }), [aspect, bgColor]);

  if (isFallback) {
    return (
      <div className={cn('relative overflow-hidden flex items-center justify-center', className)} style={containerStyle}>
        <ShimmerOverlay />
        <FallbackContent category={resolvedCategory} alt={resolvedAlt} />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)} style={containerStyle}>
      {!loaded && (
        <div className="absolute inset-0">
          <ShimmerOverlay />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d={getCategoryIconPath(resolvedCategory)} />
            </svg>
          </div>
        </div>
      )}
      {resolvedSrc.startsWith('/') ? (
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={priority ? undefined : 'lazy'}
          priority={priority}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'object-cover transition-all duration-500',
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        />
      ) : (
        <img
          src={resolvedSrc}
          alt={resolvedAlt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-all duration-500',
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          )}
        />
      )}
    </div>
  );
};

export { gradientColorMap };
