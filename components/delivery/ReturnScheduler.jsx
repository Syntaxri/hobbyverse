'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export const ReturnScheduler = ({ rental, onSchedule, onCancel }) => {
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date) return;
    onSchedule(rental.id, date);
  };

  const minDate = rental?.rentalPeriod?.endDate || new Date().toISOString().split('T')[0];

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
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-sm shadow-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-hv-foreground">Schedule Return</h2>
              <p className="text-xs text-hv-muted mt-0.5">{rental?.productName}</p>
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

          <p className="text-sm text-hv-muted mb-5">
            Choose a pickup date for our courier to collect the equipment.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-xs font-medium text-hv-foreground mb-1.5">Pickup Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-hv-border bg-hv-bg text-sm text-hv-foreground focus:outline-2 focus:outline-hv-sky/40 mb-5"
            />

            <button
              type="submit"
              disabled={!date}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-hv-cyan to-hv-sky shadow-soft hover:shadow-elevated transition-all disabled:opacity-40"
            >
              Schedule Pickup
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};
