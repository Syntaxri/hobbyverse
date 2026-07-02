'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Icons } from '@/components/icons';

export const PricingCard = ({ plan, price, period = '', description, features = [], featured, trial, currentPlan, onSelect, loading }) => {
  const isCurrent = currentPlan && !loading;
  const ctaLabel = isCurrent ? 'Current Plan' : trial ? 'Start Free Trial' : featured ? 'Choose Plus' : 'Choose Plan';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white border border-hv-border/60 p-5 sm:p-6 transition-shadow duration-300',
        featured ? 'shadow-elevated ring-2 ring-hv-sky/15' : 'shadow-soft hover:shadow-hover'
      )}
    >
      {featured && !isCurrent && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-hv-cyan to-hv-sky text-white text-[11px] font-semibold tracking-wider uppercase rounded-bl-xl">
          Most Popular
        </div>
      )}
      {trial && !isCurrent && (
        <div className="absolute top-0 left-0 px-3 py-1 bg-gradient-to-r from-hv-mint to-green-500 text-white text-[11px] font-semibold tracking-wider uppercase rounded-br-xl">
          14-Day Free Trial
        </div>
      )}
      {isCurrent && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-hv-muted/80 text-white text-[11px] font-semibold tracking-wider uppercase rounded-bl-xl">
          Active
        </div>
      )}
      <h3 className="text-base font-semibold text-hv-foreground mb-1">{plan}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-3xl sm:text-4xl font-black text-hv-foreground">{price === 0 ? 'Free' : `${price} DH`}</span>
        {period && <span className="text-sm text-hv-muted">{period}</span>}
      </div>
      <p className="text-sm text-hv-muted mb-5 sm:mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-2.5 mb-5 sm:mb-6">
        {features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-hv-foreground/80">
            <Icons.Check className="w-4 h-4 text-hv-mint flex-shrink-0" />
            {feat}
          </li>
        ))}
      </ul>
      <Button
        variant={isCurrent ? 'ghost' : featured ? 'primary' : 'secondary'}
        className="w-full"
        onClick={onSelect}
        loading={loading}
        loadingText="Processing..."
        disabled={isCurrent}
      >
        {ctaLabel}
      </Button>
    </motion.div>
  );
};
