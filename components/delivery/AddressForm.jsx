'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const AddressForm = ({ product, duration, price, quantity, onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const form = e.currentTarget;
    const data = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      street: form.street.value.trim(),
      city: form.city.value.trim(),
      postalCode: form.postalCode.value.trim(),
    };
    if (!data.fullName || !data.phone || !data.street || !data.city || !data.postalCode) return;
    setIsSubmitting(true);
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/20 backdrop-blur-sm p-0 sm:p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-hv-foreground">Delivery Details</h2>
              <p className="text-xs text-hv-muted mt-0.5">{product?.name}</p>
            </div>
            <button
              onClick={onCancel}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 mb-6">
            <div>
              <span className="text-sm font-semibold text-hv-foreground">${price}</span>
              <span className="text-xs text-hv-muted ml-1">/ {duration} &times; {quantity}</span>
            </div>
            <span className="text-sm font-bold text-hv-foreground">${(price * quantity).toLocaleString()}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-hv-foreground mb-1">Full Name *</label>
                <input name="fullName" required className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40" placeholder="John Doe" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-hv-foreground mb-1">Phone *</label>
                <input name="phone" type="tel" required className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40" placeholder="+1 555-0123" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-hv-foreground mb-1">Street Address *</label>
              <input name="street" required className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40" placeholder="123 Main St" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-hv-foreground mb-1">City *</label>
                <input name="city" required className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40" placeholder="San Francisco" />
              </div>
              <div>
                <label className="block text-xs font-medium text-hv-foreground mb-1">Postal Code *</label>
                <input name="postalCode" required className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground placeholder:text-hv-muted focus:outline-2 focus:outline-hv-sky/40" placeholder="94102" />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              size="lg"
              loading={isSubmitting}
              loadingText="Confirming..."
            >
              Confirm Rental
            </Button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
