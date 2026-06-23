'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { getCategoryFallbackGradient } from '@/lib/getProduct';

const gradientColorMap = {
  'from-indigo-100 to-blue-100': '#818cf8',
  'from-purple-100 to-indigo-100': '#a78bfa',
  'from-blue-100 to-cyan-100': '#60a5fa',
  'from-amber-100 to-orange-100': '#fbbf24',
  'from-gray-100 to-zinc-100': '#9ca3af',
  'from-indigo-100 to-purple-100': '#818cf8',
  'from-pink-100 to-rose-100': '#f472b6',
  'from-amber-100 to-yellow-100': '#fbbf24',
  'from-red-100 to-rose-100': '#f87171',
  'from-violet-100 to-purple-100': '#8b5cf6',
  'from-cyan-100 to-blue-100': '#22d3ee',
  'from-orange-100 to-amber-100': '#fb923c',
  'from-teal-100 to-emerald-100': '#2dd4bf',
  'from-gray-100 to-slate-100': '#94a3b8',
  'from-green-100 to-emerald-100': '#34d399',
};

function getInitials(text) {
  if (!text) return '?';
  return text.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase() || '?';
}

export const ProductImage = ({ src, alt, gradient, product, category, className, aspect = '4/3' }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const resolvedSrc = src || product?.image || '';
  const resolvedAlt = alt || product?.name || '';
  const resolvedGradient = gradient || product?.gradient || getCategoryFallbackGradient(category || product?.category);

  const bgColor = gradientColorMap[resolvedGradient] || '#94a3b8';

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setError(true), []);

  if (!resolvedSrc || error) {
    return (
      <div
        className={cn('relative overflow-hidden flex items-center justify-center', className)}
        style={{
          aspectRatio: aspect,
          backgroundColor: bgColor,
          backgroundImage: `linear-gradient(135deg, ${bgColor}22, ${bgColor}44)`,
        }}
      >
        <span className="text-2xl font-bold text-white/70 select-none">
          {getInitials(resolvedAlt)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio: aspect,
        backgroundColor: bgColor,
        backgroundImage: `linear-gradient(135deg, ${bgColor}22, ${bgColor}44)`,
      }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: bgColor }} />
      )}
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
    </div>
  );
};
