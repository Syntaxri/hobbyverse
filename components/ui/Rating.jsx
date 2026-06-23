import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export const Rating = ({ value = 0, max = 5, size = 'sm', showValue = true }) => {
  const sizeMap = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Icons.Star
            key={i}
            size="custom"
            className={cn(sizeMap[size], i < Math.round(value) ? 'text-amber-400 fill-amber-400' : 'text-gray-200')}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-hv-muted">{value.toFixed(1)}</span>}
    </div>
  );
};
