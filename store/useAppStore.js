import { create } from 'zustand';

export const useAppStore = create((set) => ({
    performanceTier: 'mid',
    webGLSupported: false,
    isMobile: false,
    isNavOpen: false,

    setPerformanceTier: (tier) => set({ performanceTier: tier }),
    setWebGLSupport: (status) => set({ webGLSupported: status }),
    setIsMobile: (status) => set({ isMobile: status }),
    toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));
