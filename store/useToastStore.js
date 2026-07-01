import { create } from 'zustand';

let nextId = 0;
const timeouts = new Map();

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, type = 'success', duration = 3000) => {
    const id = ++nextId;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    if (duration > 0) {
      const timeout = setTimeout(() => {
        timeouts.delete(id);
        const { toasts } = get();
        set({ toasts: toasts.filter((t) => t.id !== id) });
      }, duration);
      timeouts.set(id, timeout);
      return id;
    }
    return id;
  },

  removeToast: (id) => {
    const t = timeouts.get(id);
    if (t) { clearTimeout(t); timeouts.delete(id); }
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  clearToasts: () => {
    timeouts.forEach((t) => clearTimeout(t));
    timeouts.clear();
    set({ toasts: [] });
  },
}));
