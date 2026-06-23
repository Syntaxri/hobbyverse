import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes intelligently to avoid conflicts.
 * Essential for our dynamic UI components.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}