import * as React from "react";
import { useLazyLoad } from "../hooks/useLazyLoad";

interface LazySectionProps {
  children: React.ReactNode;
  /** Optional className forwarded to the wrapper div */
  className?: string;
  /**
   * How far from the viewport edge to start loading.
   * 300px means the section starts loading when it's 300px away from the screen.
   */
  rootMargin?: string;
  /**
   * Reserve vertical space before the component loads to prevent layout shift.
   * Tune this to roughly match the section's rendered height.
   */
  minHeight?: string;
}

/**
 * Defers rendering + code-splitting of a lazy-imported component until it's
 * near the viewport.  Combines IntersectionObserver (via useLazyLoad) with
 * React.Suspense so that the JS chunk is only downloaded when needed.
 */
const LazySection: React.FC<LazySectionProps> = ({
  children,
  className,
  rootMargin = "300px",
  minHeight = "100px",
}) => {
  // Memoize so the object reference stays stable across renders.
  // useLazyLoad depends on [options] — a new object every render would
  // cause the IntersectionObserver to be torn down and re-created each time.
  const options = React.useMemo(
    () => ({ rootMargin, threshold: 0 as number }),
    [rootMargin]
  );
  const [ref, isVisible] = useLazyLoad(options);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={!isVisible ? { minHeight } : undefined}
    >
      {isVisible && (
        <React.Suspense fallback={<div style={{ minHeight }} />}>
          {children}
        </React.Suspense>
      )}
    </div>
  );
};

export default LazySection;
