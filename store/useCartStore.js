import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,

      addItem: (product, duration = 'weekly', quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + quantity, duration }
                  : i
              ),
              totalItems: state.totalItems + quantity,
            };
          }
          const price = product[duration] || product.weekly;
          return {
            items: [
              ...state.items,
              { ...product, quantity, duration, price },
            ],
            totalItems: state.totalItems + quantity,
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          totalItems: state.items.reduce(
            (sum, i) => (i.id !== id ? sum + i.quantity : sum),
            0
          ),
        })),

      updateDuration: (id, duration) =>
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id !== id) return i;
            const price = state.items.find((p) => p.id === id)?.[duration] || i.price;
            return { ...i, duration, price };
          }),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.id !== id),
              totalItems: state.totalItems - (state.items.find((i) => i.id === id)?.quantity || 0),
            };
          }
          const diff = quantity - (state.items.find((i) => i.id === id)?.quantity || 0);
          return {
            items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
            totalItems: state.totalItems + diff,
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0 }),

      getTotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    { name: 'nexthobby-cart' }
  )
);
