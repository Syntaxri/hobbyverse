import { Skeleton } from '@/components/ui/Skeleton';

export default function LoginLoading() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-28 pb-20">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center mb-8 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-hv-border/60 animate-pulse mx-auto" />
          <div className="h-8 w-48 rounded-lg bg-hv-border/60 animate-pulse mx-auto" />
          <div className="h-4 w-64 rounded bg-hv-border/60 animate-pulse mx-auto" />
        </div>
        <div className="bg-white rounded-2xl border border-hv-border/60 shadow-card p-6 space-y-5">
          <div className="space-y-1.5">
            <div className="h-3.5 w-12 rounded bg-hv-border/60 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-hv-border/60 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <div className="h-3.5 w-16 rounded bg-hv-border/60 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-hv-border/60 animate-pulse" />
          </div>
          <div className="h-10 w-full rounded-xl bg-hv-border/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
