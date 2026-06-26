'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/ui/ProductImage';
import { DeliveryStatusBadge } from './DeliveryStatusBadge';
import { RentalTimeline } from './RentalTimeline';

export const DeliveryTrackerCard = ({ rental, onReturn }) => {
  const [expanded, setExpanded] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);

  const totalDays = Math.ceil(
    (new Date(rental.rentalPeriod.endDate) - new Date(rental.rentalPeriod.startDate)) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div layout className="w-full">
      <Card
        className="p-5 cursor-pointer hover:shadow-hover transition-shadow"
        onClick={() => setExpanded(!expanded)}
        hoverEffect={false}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <ProductImage
              product={rental}
              className="w-full h-full"
              aspect="1/1"
            />
          </div>

          <div className="flex-grow min-w-0">
            <h3 className="text-sm font-semibold text-hv-foreground truncate">
              {rental.productName}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <DeliveryStatusBadge status={rental.status} size="sm" />
              <span className="text-[11px] text-hv-muted">
                {rental.rentalPeriod.startDate} &mdash; {rental.rentalPeriod.endDate}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 text-right hidden sm:block">
            <div className="text-xs text-hv-muted">Tracking</div>
            <div className="text-xs font-mono text-hv-foreground">
              {rental.delivery.trackingId}
            </div>
          </div>

          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-4 h-4 text-hv-muted flex-shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-hv-border/50">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-semibold text-hv-muted uppercase tracking-wider mb-3">
                      Delivery Timeline
                    </h4>
                    <RentalTimeline rental={rental} />
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-hv-muted uppercase tracking-wider mb-3">
                      Details
                    </h4>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-hv-muted">Duration</span>
                        <span className="text-hv-foreground font-medium capitalize">{rental.rentalPeriod.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hv-muted">Total Days</span>
                        <span className="text-hv-foreground font-medium">{totalDays} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hv-muted">Price</span>
                        <span className="text-hv-foreground font-medium">${rental.rentalPeriod.price}/{rental.rentalPeriod.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hv-muted">Tracking</span>
                        <span className="text-hv-foreground font-mono text-xs">{rental.delivery.trackingId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-hv-muted">Delivery</span>
                        <span className="text-hv-foreground font-medium">{rental.delivery.address.city}</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-hv-border/50">
                      <h4 className="text-xs font-semibold text-hv-muted uppercase tracking-wider mb-3">
                        Delivery Address
                      </h4>
                      <div className="text-sm text-hv-foreground space-y-0.5">
                        <div>{rental.delivery.address.fullName}</div>
                        <div>{rental.delivery.address.street}</div>
                        <div>{rental.delivery.address.city} {rental.delivery.address.postalCode}</div>
                      </div>
                    </div>

                    {(rental.status === 'ACTIVE_RENTAL') && onReturn && (
                      <div className="mt-5 pt-4 border-t border-hv-border/50">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setScheduleId(rental.id);
                            onReturn(rental);
                          }}
                          loading={scheduleId === rental.id}
                          loadingText="Opening..."
                        >
                          Schedule Return
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
