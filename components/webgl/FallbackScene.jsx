'use client';

export const FallbackScene = () => (
  <div className="absolute inset-0 bg-gradient-to-b from-hv-sky/[0.03] via-hv-lavender/[0.02] to-transparent pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-hv-sky/[0.04] via-transparent to-transparent" />
    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-hv-sky/[0.02] rounded-full blur-3xl" />
    <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-hv-lavender/[0.02] rounded-full blur-3xl" />
  </div>
);
