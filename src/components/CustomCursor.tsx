import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on true pointer devices, not touch screens
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if ( window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add('cursor-none-custom');

    const mouse   = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const state   = { hovering: false, visible: false };

    const DOT_R          = 3;
    const RING_R_DEFAULT = 14;
    const RING_R_HOVER   = 22;
    const LERP           = 0.11;

    let raf: number;

    const animate = () => {
      ringPos.x += (mouse.x - ringPos.x) * LERP;
      ringPos.y += (mouse.y - ringPos.y) * LERP;

      const r = state.hovering ? RING_R_HOVER : RING_R_DEFAULT;
      ring.style.transform    = `translate(${ringPos.x - r}px, ${ringPos.y - r}px)`;
      ring.style.width        = `${r * 2}px`;
      ring.style.height       = `${r * 2}px`;
      ring.style.opacity      = state.visible ? (state.hovering ? '1' : '0.55') : '0';
      ring.style.borderColor  = state.hovering ? 'rgba(99,102,241,0.9)' : 'rgba(255,255,255,0.38)';
      ring.style.borderWidth  = state.hovering ? '2px' : '1px';

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.transform = `translate(${e.clientX - DOT_R}px, ${e.clientY - DOT_R}px)`;
      if (!state.visible) {
        state.visible = true;
        dot.style.opacity = '1';
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t) return;
      state.hovering = !!t.closest('a, button, [role="button"], input, textarea, select, label, [tabindex="0"]');
    };

    const onLeave = () => {
      state.visible = false;
      dot.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.body.classList.remove('cursor-none-custom');
    };
  }, []);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] rounded-full bg-white opacity-0 pointer-events-none mix-blend-difference"
        style={{ width: '6px', height: '6px', willChange: 'transform' }}
      />
      {/* Ring — lagged follow */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] rounded-full border border-white/40 opacity-0 pointer-events-none"
        style={{ width: '28px', height: '28px', willChange: 'transform', transition: 'width 0.18s ease, height 0.18s ease, border-color 0.18s ease, border-width 0.18s ease, opacity 0.25s ease' }}
      />
    </>
  );
};

export default CustomCursor;
