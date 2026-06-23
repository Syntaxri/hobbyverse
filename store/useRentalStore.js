import { create } from 'zustand';
import { persist } from 'zustand/middleware';

let nextRentalId = 100;

const STATUS_ORDER = [
  'CONFIRMED',
  'PACKING',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'ACTIVE_RENTAL',
  'RETURN_SCHEDULED',
  'RETURNED',
];

function now() {
  return new Date().toISOString();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function generateTrackingId() {
  return `HV-TRACK-${String(Math.floor(Math.random() * 90000) + 10000)}`;
}

export const useRentalStore = create(
  persist(
    (set, get) => ({
      rentals: [],
      favorites: [],

      createRental: (product, duration, quantity, address) => {
        const id = `rnt_${++nextRentalId}`;
        const startDate = now().split('T')[0];
        const dayMap = { daily: 1, weekly: 7, monthly: 30 };
        const endDate = addDays(startDate, (dayMap[duration] || 7) * quantity);
        const price = product[duration] || product.weekly;

        const rental = {
          id,
          productId: product.id,
          productName: product.name,
          productImage: product.image,
          productGradient: product.gradient,
          category: product.category,
          status: 'CONFIRMED',
          rentalPeriod: { startDate, endDate, duration, price, quantity },
          delivery: {
            method: 'home_delivery',
            address: {
              fullName: address.fullName,
              phone: address.phone,
              street: address.street,
              city: address.city,
              postalCode: address.postalCode,
            },
            scheduledDate: startDate,
            trackingId: generateTrackingId(),
            carrier: 'HobbyVerse Logistics',
          },
          return: { scheduledPickupDate: null, status: 'pending' },
          timeline: [{ status: 'CONFIRMED', timestamp: now() }],
          createdAt: now(),
        };

        set((state) => ({ rentals: [...state.rentals, rental] }));
        return id;
      },

      updateRentalStatus: (rentalId, newStatus) =>
        set((state) => {
          if (!STATUS_ORDER.includes(newStatus)) return state;
          return {
            rentals: state.rentals.map((r) =>
              r.id === rentalId
                ? {
                    ...r,
                    status: newStatus,
                    timeline: [
                      ...r.timeline,
                      { status: newStatus, timestamp: now() },
                    ],
                  }
                : r
            ),
          };
        }),

      scheduleReturn: (rentalId, pickupDate) =>
        set((state) => ({
          rentals: state.rentals.map((r) =>
            r.id === rentalId
              ? {
                  ...r,
                  status: 'RETURN_SCHEDULED',
                  return: { scheduledPickupDate: pickupDate, status: 'scheduled' },
                  timeline: [
                    ...r.timeline,
                    { status: 'RETURN_SCHEDULED', timestamp: now() },
                  ],
                }
              : r
          ),
        })),

      completeReturn: (rentalId) =>
        set((state) => ({
          rentals: state.rentals.map((r) =>
            r.id === rentalId
              ? {
                  ...r,
                  status: 'RETURNED',
                  return: { ...r.return, status: 'completed' },
                  timeline: [
                    ...r.timeline,
                    { status: 'RETURNED', timestamp: now() },
                  ],
                }
              : r
          ),
        })),

      toggleFavorite: (productId) =>
        set((state) => ({
          favorites: state.favorites.includes(productId)
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId],
        })),

      isFavorite: (productId) => get().favorites.includes(productId),

      getActiveRentals: () =>
        get().rentals.filter((r) => r.status !== 'RETURNED'),

      getCompletedRentals: () =>
        get().rentals.filter((r) => r.status === 'RETURNED'),

      getRentalById: (id) => get().rentals.find((r) => r.id === id),

      simulateNextStatus: (rentalId) => {
        const rental = get().rentals.find((r) => r.id === rentalId);
        if (!rental) return;
        const idx = STATUS_ORDER.indexOf(rental.status);
        if (idx < 0 || idx >= STATUS_ORDER.length - 1) return;
        const nextStatus = STATUS_ORDER[idx + 1];
        if (nextStatus === 'RETURN_SCHEDULED' || nextStatus === 'RETURNED') return;
        get().updateRentalStatus(rentalId, nextStatus);
      },
    }),
    {
      name: 'hobbyverse-rentals',
      partialize: (state) => ({
        rentals: state.rentals,
        favorites: state.favorites,
      }),
    }
  )
);
