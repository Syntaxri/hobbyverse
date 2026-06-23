import { cn } from '@/lib/utils';

export const Stack = ({ children, className, direction = 'col', gap = 6, as: Component = 'div' }) => {
  const gapMap = {
    0: 'gap-0', 1: 'gap-1', 2: 'gap-2', 3: 'gap-3', 4: 'gap-4',
    5: 'gap-5', 6: 'gap-6', 8: 'gap-8', 10: 'gap-10', 12: 'gap-12',
    16: 'gap-16', 20: 'gap-20', 24: 'gap-24',
  };

  return (
    <Component
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row flex-wrap',
        gapMap[gap] || `gap-${gap}`,
        className
      )}
    >
      {children}
    </Component>
  );
};
