import { cn } from '@/lib/utils';

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn('animate-pulse rounded-lg bg-hv-border/60', className)}
    {...props}
  />
);

export const ProductCardSkeleton = () => (
  <div className="p-0 overflow-hidden rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card">
    <Skeleton className="w-full rounded-none" style={{ aspectRatio: '4/3' }} />
    <div className="p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-10" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-hv-border/50">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-14 rounded-lg" />
      </div>
    </div>
  </div>
);

export const DashboardStatsSkeleton = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-6 text-center rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card">
        <Skeleton className="h-8 w-12 mx-auto mb-1" />
        <Skeleton className="h-3 w-20 mx-auto" />
      </div>
    ))}
  </div>
);

export const RentalCardSkeleton = () => (
  <div className="p-5 flex items-center gap-5 rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card">
    <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
    <div className="flex-grow space-y-2">
      <Skeleton className="h-4 w-3/5" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
    <div className="text-right flex-shrink-0 space-y-2">
      <Skeleton className="h-3 w-16 ml-auto" />
      <Skeleton className="h-8 w-16 rounded-lg ml-auto" />
    </div>
  </div>
);

export const DeliveryCardSkeleton = () => (
  <div className="p-5 rounded-card bg-white/70 backdrop-blur-sm border border-hv-border/80 shadow-card">
    <div className="flex items-center gap-4">
      <Skeleton className="w-14 h-14 rounded-xl flex-shrink-0" />
      <div className="flex-grow space-y-2">
        <Skeleton className="h-4 w-2/5" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-3 w-24 hidden sm:block" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-20">
    <div>
      <Skeleton className="w-full rounded-3xl" style={{ aspectRatio: '1/1' }} />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-10 w-4/5" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-16 w-full" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-32 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
    </div>
  </div>
);

export const PageHeaderSkeleton = () => (
  <div className="flex items-center justify-between mb-10">
    <div className="space-y-2">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-48" />
    </div>
    <Skeleton className="w-12 h-12 rounded-xl" />
  </div>
);
