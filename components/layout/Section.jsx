import { cn } from '@/lib/utils';
import { Container } from './Container';

export const Section = ({ children, className, contained = true, id, compact = false }) => {
  const content = contained ? <Container>{children}</Container> : children;
  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        compact ? 'py-16 md:py-20' : 'py-20 md:py-28',
        className
      )}
    >
      {content}
    </section>
  );
};
