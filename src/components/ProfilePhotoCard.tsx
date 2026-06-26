import React, { useRef, useState, useEffect, useCallback } from 'react';

import { PHOTO_URL } from '../constants';

const ProfilePhotoCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltRef      = useRef<HTMLDivElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);
  const spotRef      = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  const [mounted,   setMounted]   = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ── Entrance: scale + fade in shortly after mount ──────────────
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 140);
    return () => clearTimeout(id);
  }, []);

  // ── Global mouse: proximity glow (RAF, zero state updates) ─────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!containerRef.current || !glowRef.current) return;
        const r   = containerRef.current.getBoundingClientRect();
        const cx  = r.left + r.width  / 2;
        const cy  = r.top  + r.height / 2;
        const dx  = e.clientX - cx;
        const dy  = e.clientY - cy;
        const d   = Math.sqrt(dx * dx + dy * dy);
        const max = Math.max(r.width, r.height) * 1.5;
        const p   = Math.max(0, 1 - d / max);
        glowRef.current.style.opacity   = String(0.14 + p * 0.32);
        glowRef.current.style.transform = `scale(${1 + p * 0.15})`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Hover: 3D tilt + directional shadow + spotlight ─────────────
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !tiltRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;

    // 3D tilt
    tiltRef.current.style.transform  = `perspective(1000px) rotateX(${-y * 11}deg) rotateY(${x * 11}deg)`;
    tiltRef.current.style.transition = 'transform 0.1s ease-out';
    // Directional shadow: light source is opposite cursor
    tiltRef.current.style.filter =
      `drop-shadow(${-x * 30}px ${-y * 30}px 22px rgba(99,102,241,0.32))`;

    // Spotlight inside photo
    if (spotRef.current) {
      const sx = ((e.clientX - r.left) / r.width)  * 100;
      const sy = ((e.clientY - r.top)  / r.height) * 100;
      spotRef.current.style.background =
        `radial-gradient(circle 140px at ${sx}% ${sy}%, rgba(255,255,255,0.10), transparent 75%)`;
    }
  }, []);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
    if (spotRef.current) spotRef.current.style.opacity = '1';
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    if (tiltRef.current) {
      tiltRef.current.style.transform  = '';
      tiltRef.current.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1)';
      tiltRef.current.style.filter     = '';
    }
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }, []);

  // ── Corner bracket helper ─────────────────────────────────────
  const corner = (
    pos: { top?: string; bottom?: string; left?: string; right?: string },
    borders: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean },
    radius: string,
    color: string,
    delay: string,
    nudge: string,
  ) => ({
    position: 'absolute' as const,
    width: '20px',
    height: '20px',
    pointerEvents: 'none' as const,
    ...pos,
    ...(borders.top    ? { borderTop:    `1.5px solid ${color}` } : {}),
    ...(borders.bottom ? { borderBottom: `1.5px solid ${color}` } : {}),
    ...(borders.left   ? { borderLeft:   `1.5px solid ${color}` } : {}),
    ...(borders.right  ? { borderRight:  `1.5px solid ${color}` } : {}),
    borderRadius: radius,
    opacity:   isHovered ? 1 : 0,
    transform: isHovered ? 'translate(0,0)' : `translate(${nudge})`,
    transition: `opacity 0.22s ease ${delay}, transform 0.38s cubic-bezier(0.34,1.56,0.64,1) ${delay}`,
  });

  const indigo = 'rgba(99,102,241,0.88)';
  const cyan   = 'rgba(34,211,238,0.82)';

  return (
    <div
      ref={containerRef}
      className={`photo-entrance relative${mounted ? ' photo-entrance-visible' : ''}`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* ── Proximity glow (GPU-only, no re-renders) ─────────────── */}
      <div
        ref={glowRef}
        className="proximity-glow absolute pointer-events-none"
        style={{ inset: '-42%', opacity: 0.14 }}
      />

      {/* ── Float wrapper ─────────────────────────────────────────── */}
      <div className="relative" style={{ animation: 'float 5s ease-in-out infinite' }}>

        {/* ── 3D tilt + directional shadow target ─────────────────── */}
        <div ref={tiltRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>

          {/* ── Rotating conic-gradient border ──────────────────── */}
          <div className="relative rounded-3xl overflow-hidden p-[2px] shadow-2xl shadow-black/50">
            {/* Conic gradient — rotates independently from content */}
            <div className="rotating-conic" />

            {/* ── Photo ─────────────────────────────────────────── */}
            <div className="relative rounded-[22px] overflow-hidden bg-zinc-950 z-[1]">
              <img
                src={PHOTO_URL}
                alt="Anmol Varshney"
                className="w-60 h-[300px] sm:w-72 sm:h-[360px] lg:w-80 lg:h-[400px] object-cover object-top block brightness-[1.06] contrast-[1.03]"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://ui-avatars.com/api/?name=Anmol+Varshney&background=6366f1&color=fff&size=400';
                }}
              />
              {/* Cursor-following spotlight */}
              <div
                ref={spotRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              {/* Top glaze */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-zinc-950/20 pointer-events-none" />
              {/* Periodic shimmer sweep */}
              <div className="shimmer-sweep pointer-events-none" />
            </div>
          </div>

          {/* ── Corner accent brackets (spring in on hover) ───────── */}
          <div style={corner({ top: '-8px',  left:  '-8px' }, { top: true,    left:  true  }, '7px 0 0 0', indigo, '0s',      ' 5px, 5px'  )} />
          <div style={corner({ top: '-8px',  right: '-8px' }, { top: true,    right: true  }, '0 7px 0 0', indigo, '0.05s',   '-5px, 5px'  )} />
          <div style={corner({ bottom: '-8px', right: '-8px' }, { bottom: true, right: true }, '0 0 7px 0', cyan,   '0.10s',   '-5px,-5px'  )} />
          <div style={corner({ bottom: '-8px', left:  '-8px' }, { bottom: true, left:  true }, '0 0 0 7px', cyan,   '0.15s',   ' 5px,-5px'  )} />

        </div>{/* /tiltRef */}

        {/* ── Badges ────────────────────────────────────────────── */}
        <div className="badge-float-2 absolute -bottom-4 -right-4 lg:-right-6 z-10 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/80 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            <span className="text-white text-xs font-semibold whitespace-nowrap">SWE @ Lyzr AI</span>
          </div>
        </div>
        <div className="badge-float-3 absolute -top-4 -left-4 lg:-left-6 z-10 bg-zinc-900/90 backdrop-blur-md border border-indigo-500/25 rounded-2xl px-3.5 py-2.5 shadow-xl shadow-black/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
            <span className="text-indigo-300 text-xs font-semibold whitespace-nowrap">IIT Madras</span>
          </div>
        </div>

      </div>{/* /float */}
    </div>
  );
};

export default ProfilePhotoCard;
