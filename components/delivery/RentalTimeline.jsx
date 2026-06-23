'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { STATUS_CONFIG, STATUS_ORDER } from './constants';
import { useRentalStore } from '@/store/useRentalStore';

const statusIcons = {
  CONFIRMED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  PACKING: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  OUT_FOR_DELIVERY: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  DELIVERED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  ACTIVE_RENTAL: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  RETURN_SCHEDULED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  ),
  RETURNED: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getStepIndex(status) {
  return STATUS_ORDER.indexOf(status);
}

export const RentalTimeline = ({ rental, onComplete }) => {
  const simulateNextStatus = useRentalStore((s) => s.simulateNextStatus);
  const hasSimulated = useRef(false);

  const currentIdx = getStepIndex(rental.status);
  const simulateAfter = {
    CONFIRMED: 2000,
    PACKING: 3000,
    OUT_FOR_DELIVERY: 4000,
    DELIVERED: 2000,
  };

  useEffect(() => {
    if (hasSimulated.current) return;
    const wait = simulateAfter[rental.status];
    if (!wait) return;
    hasSimulated.current = true;
    const timer = setTimeout(() => {
      simulateNextStatus(rental.id);
    }, wait);
    return () => clearTimeout(timer);
  }, [rental.status, rental.id, simulateNextStatus]);

  useEffect(() => {
    if (rental.status === 'ACTIVE_RENTAL' && onComplete) {
      onComplete(rental);
    }
  }, [rental.status, rental.id, onComplete]);

  const visibleStatuses = STATUS_ORDER.slice(
    0,
    currentIdx >= 4 ? currentIdx + 2 : currentIdx + 1
  );

  return (
    <div className="relative pl-8 space-y-0">
      {visibleStatuses.map((status, i) => {
        const cfg = STATUS_CONFIG[status];
        const isCompleted = i < currentIdx;
        const isCurrent = i === currentIdx;
        const isFuture = i > currentIdx;
        const timelineEntry = rental.timeline.find((t) => t.status === status);

        return (
          <div key={status} className="relative pb-6 last:pb-0">
            {i < visibleStatuses.length - 1 && (
              <div
                className={cn(
                  'absolute left-[11px] top-5 w-0.5 h-full -translate-x-1/2',
                  isCompleted ? 'bg-hv-sky/40' : 'bg-gray-200'
                )}
              />
            )}

            <div className="flex items-start gap-3">
              <motion.div
                initial={isCurrent ? { scale: 1.4 } : { scale: 1 }}
                animate={
                  isCurrent
                    ? { scale: [1, 1.3, 1] }
                    : { scale: 1 }
                }
                transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                className={cn(
                  'absolute left-0 w-[22px] h-[22px] rounded-full flex items-center justify-center z-10',
                  isCompleted ? cfg.bg : isCurrent ? 'bg-white ring-2 ring-hv-sky' : 'bg-gray-100'
                )}
              >
                {isCompleted || isCurrent ? (
                  <span className={cn(isCompleted ? cfg.text : 'text-hv-sky')}>
                    {statusIcons[status]}
                  </span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-gray-300" />
                )}
              </motion.div>

              <div className="ml-2 min-w-0">
                <div className={cn(
                  'text-sm font-medium',
                  isCompleted ? 'text-hv-foreground' : isCurrent ? 'text-hv-sky font-semibold' : 'text-hv-muted'
                )}>
                  {cfg.label}
                </div>
                {timelineEntry && (
                  <div className="text-[11px] text-hv-muted mt-0.5">
                    {formatTime(timelineEntry.timestamp)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
