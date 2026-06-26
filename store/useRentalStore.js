import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const RENTAL_DEFAULTS = {
  id: '',
  productId: '',
  name: 'Unknown Rental',
  productName: 'Unknown Rental',
  image: '/images/placeholder.webp',
  productImage: '/images/placeholder.webp',
  gradient: 'from-gray-100 to-gray-200',
  productGradient: 'from-gray-100 to-gray-200',
  category: '',
  status: 'unknown',
  duration: '',
  price: 0,
  endDate: '',
  rentalPeriod: {
    startDate: '',
    endDate: '',
    duration: '',
    price: 0,
    quantity: 1,
  },
  delivery: {
    method: '',
    address: { fullName: '', phone: '', street: '', city: '', postalCode: '' },
    scheduledDate: '',
    trackingId: '',
    carrier: '',
  },
  return: { scheduledPickupDate: null, status: 'pending' },
  timeline: [],
  createdAt: '',
};

export function normalizeRental(raw) {
  if (!raw || typeof raw !== 'object') return { ...RENTAL_DEFAULTS };

  const name = raw.name || raw.productName || RENTAL_DEFAULTS.name;
  const image = raw.image || raw.productImage || RENTAL_DEFAULTS.image;
  const gradient = raw.gradient || raw.productGradient || RENTAL_DEFAULTS.gradient;
  const rp = raw.rentalPeriod || RENTAL_DEFAULTS.rentalPeriod;

  return {
    ...RENTAL_DEFAULTS,
    ...raw,
    name,
    productName: name,
    image,
    productImage: image,
    gradient,
    productGradient: gradient,
    duration: raw.duration || rp.duration || RENTAL_DEFAULTS.duration,
    price: raw.price != null ? raw.price : (rp.price != null ? rp.price : RENTAL_DEFAULTS.price),
    endDate: raw.endDate || rp.endDate || RENTAL_DEFAULTS.endDate,
    rentalPeriod: {
      ...RENTAL_DEFAULTS.rentalPeriod,
      ...rp,
    },
    delivery: {
      ...RENTAL_DEFAULTS.delivery,
      ...(raw.delivery || {}),
      address: {
        ...RENTAL_DEFAULTS.delivery.address,
        ...((raw.delivery && raw.delivery.address) || {}),
      },
    },
    return: {
      ...RENTAL_DEFAULTS.return,
      ...(raw.return || {}),
    },
    timeline: Array.isArray(raw.timeline) ? raw.timeline : RENTAL_DEFAULTS.timeline,
  };
}

export function normalizeRentals(rentals) {
  if (!Array.isArray(rentals)) return [];
  return rentals.map(normalizeRental);
}

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
        const existing = get().rentals;
        const existingIds = new Set(existing.map((r) => r.id));
        const maxNum = existing.reduce((max, r) => {
          const m = r.id.match(/^rnt_(\d+)$/);
          return m ? Math.max(max, parseInt(m[1], 10)) : max;
        }, 100);
        let nextNum = maxNum;
        let id;
        do {
          nextNum++;
          id = `rnt_${nextNum}`;
        } while (existingIds.has(id));
        const startDate = now().split('T')[0];
        const dayMap = { daily: 1, weekly: 7, monthly: 30 };
        const endDate = addDays(startDate, (dayMap[duration] || 7) * quantity);
        const price = product[duration] || product.weekly;

        const raw = {
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

        const rental = normalizeRental(raw);
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
        normalizeRentals(get().rentals).filter((r) => r.status !== 'RETURNED'),

      getCompletedRentals: () =>
        normalizeRentals(get().rentals).filter((r) => r.status === 'RETURNED'),

      getRentalById: (id) => {
        const r = get().rentals.find((r) => r.id === id);
        return r ? normalizeRental(r) : null;
      },

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
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const seen = new Map();
        const deduped = [];
        for (const r of state.rentals) {
          if (seen.has(r.id)) continue;
          seen.set(r.id, true);
          deduped.push(normalizeRental(r));
        }
        if (deduped.length !== state.rentals.length) {
          state.rentals = deduped;
        } else {
          state.rentals = deduped;
        }
      },
    }
  )
);
