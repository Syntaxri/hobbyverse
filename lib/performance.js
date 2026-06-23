/**
 * Evaluates device capabilities to assign a performance tier.
 * Returns: 'low' | 'mid' | 'high'
 */
export const getDevicePerformanceTier = () => {
    if (typeof window === 'undefined') return 'mid'; // SSR fallback

    let score = 0;

    // 1. Check Hardware Concurrency (Logical CPU cores)
    const cores = navigator.hardwareConcurrency || 4;
    if (cores >= 8) score += 2;
    else if (cores >= 4) score += 1;

    // 2. Check Device Memory (RAM in GB)
    const memory = navigator.deviceMemory || 4;
    if (memory >= 8) score += 2;
    else if (memory >= 4) score += 1;

    // 3. Network Connection (Avoid heavy 3D assets on slow connections)
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        if (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
            score -= 2;
        }
    }

    // 4. Power Saving Mode / Reduced Motion Preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return 'low'; // Instantly downgrade for accessibility

    // Evaluate final score
    if (score >= 4) return 'high';
    if (score >= 2) return 'mid';
    return 'low';
};

/**
 * Usage in store (example):
 * import { getDevicePerformanceTier } from '@/lib/performance';
 * set({ performanceTier: getDevicePerformanceTier() });
 */