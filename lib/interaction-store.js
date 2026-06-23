import { create } from 'zustand';

export const useInteractionStore = create((set) => ({
  cursor: { x: 0.5, y: 0.5, vx: 0, vy: 0 },
  hoveredId: null,
  hoveredType: null,
  scroll: { y: 0, velocity: 0, direction: 'down', acceleration: 0 },
  intensity: 1,
  focusTarget: null,
  focusIntensity: 0,
  heroVisible: false,

  setCursor: (cursor) => set({ cursor }),
  setHovered: (id, type) => set({ hoveredId: id, hoveredType: type }),
  clearHovered: () => set({ hoveredId: null, hoveredType: null }),
  setScroll: (scroll) => set({ scroll }),
  setIntensity: (intensity) => set({ intensity }),
  setFocus: (focusTarget, focusIntensity) => set({ focusTarget, focusIntensity }),
  clearFocus: () => set({ focusTarget: null, focusIntensity: 0 }),
  setHeroVisible: (heroVisible) => set({ heroVisible }),
}));
