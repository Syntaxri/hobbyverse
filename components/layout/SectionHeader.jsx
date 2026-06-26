import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/motion/ScrollReveals';

export const SectionHeader = ({ title, subtitle, action, className, align = 'center' }) => (
  <ScrollReveal className={cn('mb-8 sm:mb-10 md:mb-14', align === 'center' && 'text-center', className)}>
    {subtitle && (
      <div className="inline-block mb-2 sm:mb-3 px-3 py-1 rounded-full bg-hv-cyan/10 text-hv-sky text-xs font-semibold tracking-wider uppercase">
        {subtitle}
      </div>
    )}
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-hv-foreground tracking-tight leading-tight text-balance">
      {title}
    </h2>
    {action && <div className="mt-4 sm:mt-6">{action}</div>}
  </ScrollReveal>
);
