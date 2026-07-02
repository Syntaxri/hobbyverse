import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const PLANS = {
  starter: {
    name: 'Starter',
    price: 0,
    maxActiveRentals: 1,
    features: ['browse', 'search', 'reviews', 'history', 'email_support'],
  },
  plus: {
    name: 'Plus',
    price: 49,
    maxActiveRentals: 5,
    features: ['priority_booking', 'free_delivery', 'discounts', 'extended_periods', 'priority_support'],
    trialDays: 14,
  },
  premium: {
    name: 'Premium',
    price: 129,
    maxActiveRentals: null,
    features: ['unlimited_rentals', 'damage_protection', 'early_access', 'account_manager', 'same_day_delivery', 'vip_support'],
  },
};

export const useSubscriptionStore = create(
  persist(
    (set, get) => ({
      plan: 'starter',
      trialActive: false,
      trialEndsAt: null,

      startTrial: () => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 14);
        set({ plan: 'plus', trialActive: true, trialEndsAt: endDate.toISOString() });
      },

      upgrade: (plan) => {
        if (!PLANS[plan]) return;
        set({ plan, trialActive: false, trialEndsAt: null });
      },

      cancelTrial: () => {
        set({ plan: 'starter', trialActive: false, trialEndsAt: null });
      },

      getPlanInfo: () => {
        const state = get();
        const config = PLANS[state.plan];
        if (!config) return { ...PLANS.starter, isTrial: false, trialEndsAt: null, isTrialExpired: true };
        const isTrialExpired = state.trialActive && state.trialEndsAt && new Date() > new Date(state.trialEndsAt);
        return {
          ...config,
          isTrial: state.trialActive && !isTrialExpired,
          trialEndsAt: isTrialExpired ? null : state.trialEndsAt,
          isTrialExpired,
          planKey: state.plan,
        };
      },

      canRent: (currentActiveCount) => {
        const state = get();
        const config = PLANS[state.plan];
        if (!config) return { allowed: false, reason: 'Invalid plan' };
        if (config.maxActiveRentals === null) return { allowed: true };
        if (currentActiveCount >= config.maxActiveRentals) {
          const limit = config.maxActiveRentals;
          return {
            allowed: false,
            reason: `Your ${config.name} plan allows up to ${limit} active rental${limit > 1 ? 's' : ''} at a time. Upgrade to ${PLANS.premium.name} for unlimited, or ${PLANS.plus.name} for up to ${PLANS.plus.maxActiveRentals}.`,
          };
        }
        return { allowed: true };
      },

      getRentalLimit: () => {
        const config = PLANS[get().plan];
        return config ? config.maxActiveRentals : null;
      },
    }),
    {
      name: 'nexthobby-subscription',
      partialize: (state) => ({
        plan: state.plan,
        trialActive: state.trialActive,
        trialEndsAt: state.trialEndsAt,
      }),
    }
  )
);
