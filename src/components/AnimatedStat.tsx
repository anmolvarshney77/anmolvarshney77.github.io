import React, { useEffect, useRef } from 'react';

interface AnimatedStatProps {
  value: string;
  label: string;
  className?: string;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, label, className = '' }) => {
  const spanRef      = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el        = spanRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    // Only animate if the value starts with a digit
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target   = parseInt(match[1], 10);
    const suffix   = match[2];
    el.textContent = '0' + suffix;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        const duration  = 1400;
        const startTime = performance.now();

        const animate = (now: number) => {
          const elapsed  = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Cubic ease-out
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(eased * target);
          if (el) el.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.6 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={containerRef} className={className}>
      <span ref={spanRef} className="text-2xl font-bold text-white mb-1 block tabular-nums">
        {value}
      </span>
      <span className="text-zinc-500 text-sm">{label}</span>
    </div>
  );
};

export default AnimatedStat;
