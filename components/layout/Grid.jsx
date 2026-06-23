import { cn } from '@/lib/utils';

/**
 * Global Grid System
 * Enforces fluid layouts: 1 col (mobile) -> 2 cols (tablet) -> 4 cols (desktop)
 */
export const Grid = ({ children, className, as: Component = "div" }) => {
    return (
        <Component
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 xl:gap-10",
                className
            )}
        >
            {children}
        </Component>
    );
};