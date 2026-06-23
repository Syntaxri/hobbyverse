import { cn } from '@/lib/utils';

const variants = {
  default: 'bg-hv-border/50 text-hv-muted',
  cyan: 'bg-hv-cyan/10 text-hv-sky',
  lavender: 'bg-hv-lavender/10 text-hv-lavender',
  coral: 'bg-hv-coral/10 text-hv-coral',
  mint: 'bg-hv-mint/10 text-hv-mint',
  indigo: 'bg-hv-indigo/10 text-hv-indigo',
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-emerald-100 text-emerald-700',
};

export const Badge = ({ children, variant = 'default', className, dot }) => (
  <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
    {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
    {children}
  </span>
);
