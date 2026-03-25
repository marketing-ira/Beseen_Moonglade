import React from "react";

type StatItem = {
  value: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { value: 1500, suffix: "+", label: "Satisfied Homeowners" },
  { value: 15, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Years of experience" },
  { value: 10, suffix: " M", label: "sqft of Development" },
];

function EinfraIraStats() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [hasEnteredView, setHasEnteredView] = React.useState(false);
  const [counts, setCounts] = React.useState<number[]>(() => stats.map(() => 0));

  React.useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!hasEnteredView || typeof window === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setCounts(stats.map((item) => item.value));
      return;
    }

    let frameId = 0;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((item) => Math.round(item.value * easedProgress)));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [hasEnteredView]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-r from-bgGradientLeft to-bgGradientRight"
    >
      <div className="w-full px-[20px] py-[24px] md:w-[86%] md:px-0 md:py-[36px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 ">
          {stats.map((item, index) => {
            const isLeftColumn = index % 2 === 0;
            const isLastDesktopColumn = index === stats.length - 1;

            return (
              <div
                key={item.label}
                className={[
                  "min-h-[132px] px-[14px] py-[22px] md:min-h-0 md:px-[28px] md:py-[20px] text-left transition-all duration-700",
                  isLeftColumn ? "border-r border-[#DEAF97] md:border-r-0" : "",
                  !isLastDesktopColumn ? " md:border-[#DEAF97]" : "",
                  hasEnteredView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                ].join(" ")}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="border-b border-[#DEAF97] pb-[12px] md:pb-[14px]">
                  <p className="font-poppins text-[#181B20] text-[30px] leading-none md:text-[44px] md:leading-[1.05] font-medium tracking-[-0.03em]">
                    {counts[index]}
                    {item.suffix}
                  </p>
                </div>
                <p className="mt-[10px] md:mt-[12px] font-poppins text-[#181B20] text-[15px] leading-[1.35] md:text-[18px] md:leading-[1.5] font-medium tracking-[-0.02em]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EinfraIraStats;