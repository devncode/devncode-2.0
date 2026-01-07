"use client";

import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);

              setCount(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [target, duration, hasAnimated]);

  return [count, observerRef];
}

export default function StatsCounter({ value, suffix = "", label }) {
  const [count, ref] = useCountUp(value);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-space-grotesk font-bold text-terracotta mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-custom-black/70 dark:text-beige/70 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

