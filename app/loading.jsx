import { PageHeaderSkeleton, DashboardStatsSkeleton, RentalCardSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeaderSkeleton />
        <DashboardStatsSkeleton />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <RentalCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
