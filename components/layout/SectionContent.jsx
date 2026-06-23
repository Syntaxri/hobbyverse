import { cn } from '@/lib/utils';

export const SectionContent = ({ children, className, as: Component = 'div' }) => {
  return (
    <Component className={cn('relative', className)}>
      {children}
    </Component>
  );
};
