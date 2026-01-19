import React, { useEffect, useRef, useState } from "react";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";

interface LazyImageProps extends Omit<GatsbyImageProps, "image"> {
  image: any;
  placeholderClassName?: string;
  animationDuration?: number;
}

/**
 * LazyImage Component
 * Wraps GatsbyImage with intersection observer for optimal lazy loading
 * Features:
 * - Intersection observer based lazy loading
 * - Smooth fade-in animation
 * - Customizable animation duration
 * - Blurred placeholder support
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  image,
  placeholderClassName = "lazy-placeholder",
  animationDuration = 300,
  className = "",
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${animationDuration}ms ease-in-out`,
      }}
      className={className}
    >
      {isVisible && (
        <GatsbyImage
          image={image}
          loading="lazy"
          {...props}
          className={`${props.className || ""} lazy-fade-in`}
        />
      )}
      {!isVisible && (
        <div className={`w-full aspect-video ${placeholderClassName}`} />
      )}
    </div>
  );
};

export default LazyImage;
