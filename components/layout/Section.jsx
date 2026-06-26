import { cn } from '@/lib/utils';
import { Container } from './Container';

export const Section = ({ children, className, contained = true, id, compact = false }) => {
  const content = contained ? <Container>{children}</Container> : children;
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        compact ? 'py-12 md:py-16' : 'py-16 md:py-20 lg:py-28',
        className
      )}
    >
      {content}
    </section>
  );
};
