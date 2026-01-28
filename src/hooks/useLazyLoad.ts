import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for lazy loading images using Intersection Observer API
 * @param options - IntersectionObserver options
 * @returns [ref, isVisible] - Reference to attach to element and visibility state
 */
export const useLazyLoad = (
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "50px" }
) => {
  const ref = useRef<HTMLDivElement | HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};

/**
 * Custom hook for lazy loading multiple elements with staggered loading
 * @param itemCount - Number of items to lazy load
 * @param delayMs - Delay between each item load in milliseconds
 * @returns [ref, visibleIndices] - Reference and array of visible item indices
 */
export const useLazyLoadStaggered = (itemCount: number, delayMs: number = 100) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          const children = ref.current.children;
          const newVisibleIndices = new Set(visibleIndices);

          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              newVisibleIndices.add(index);
              setVisibleIndices(new Set(newVisibleIndices));
            }, index * delayMs);
          });

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delayMs, visibleIndices]);

  return [ref, visibleIndices] as const;
};
