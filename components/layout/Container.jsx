import { cn } from '@/lib/utils';

export const Container = ({ children, className, as: Component = 'div' }) => (
  <Component className={cn('w-full max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8', className)}>
    {children}
  </Component>
);
