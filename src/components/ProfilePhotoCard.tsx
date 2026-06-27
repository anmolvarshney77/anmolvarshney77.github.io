import React, { useRef, useState, useEffect, useCallback } from 'react';

import { PHOTO_URL } from '../constants';

// ── Orbiting particle definition ──────────────────────────────────────────────
interface OrbParticle {
  angle: number;
  r: number;        // orbit radius
  speed: number;    // radians/frame base speed
  size: number;     // core radius
  cr: number; cg: number; cb: number; // color
  eccentricity: number; // 0 = circle, >0 = ellipse (y-scale)
}

const ORB_PARTICLES: OrbParticle[] = [
  // Inner orbit
  { angle: 0,                r: 145, speed: 0.0080, size: 2.4, cr:99,  cg:102, cb:241, eccentricity: 0.82 },
  { angle: Math.PI * 0.5,    r: 145, speed: 0.0080, size: 1.8, cr:168, cg:85,  cb:247, eccentricity: 0.82 },
  { angle: Math.PI,          r: 145, speed: 0.0080, size: 2.4, cr:34,  cg:211, cb:238, eccentricity: 0.82 },
  { angle: Math.PI * 1.5,    r: 145, speed: 0.0080, size: 1.8, cr:99,  cg:102, cb:241, eccentricity: 0.82 },
  // Middle orbit
  { angle: Math.PI * 0.25,   r: 170, speed: 0.0052, size: 1.7, cr:168, cg:85,  cb:247, eccentricity: 0.78 },
  { angle: Math.PI * 0.75,   r: 170, speed: 0.0052, size: 1.4, cr:56,  cg:189, cb:248, eccentricity: 0.78 },
  { angle: Math.PI * 1.25,   r: 170, speed: 0.0052, size: 1.7, cr:34,  cg:211, cb:238, eccentricity: 0.78 },
  { angle: Math.PI * 1.75,   r: 170, speed: 0.0052, size: 1.4, cr:139, cg:92,  cb:246, eccentricity: 0.78 },
  // Outer orbit
  { angle: Math.PI * 0.15,   r: 200, speed: 0.0030, size: 1.4, cr:56,  cg:189, cb:248, eccentricity: 0.72 },
  { angle: Math.PI * 0.82,   r: 200, speed: 0.0030, size: 1.2, cr:99,  cg:102, cb:241, eccentricity: 0.72 },
  { angle: Math.PI * 1.45,   r: 200, speed: 0.0030, size: 1.4, cr:168, cg:85,  cb:247, eccentricity: 0.72 },
];

// ─────────────────────────────────────────────────────────────────────────────
const ProfilePhotoCard: React.FC = () => {
  const containerRef  = useRef<HTMLDivElement>(null);
  const tiltRef       = useRef<HTMLDivElement>(null);
  const glowRef       = useRef<HTMLDivElement>(null);
  const spotRef       = useRef<HTMLDivElement>(null);
  const orbCanvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef        = useRef<number>(0);
  const orbRafRef     = useRef<number>(0);
  const isHoveredRef  = useRef(false);

  const [mounted,   setMounted]   = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // ── Entrance animation ──────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 140);
    return () => clearTimeout(id);
  }, []);

  // ── Orbiting particles canvas ───────────────────────────────────
  useEffect(() => {
    const canvas = orbCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 500;
    canvas.width  = SIZE * dpr;
    canvas.height = SIZE * dpr;
    canvas.style.width  = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2, cy = SIZE / 2;
    const TAIL = 18; // tail arc steps

    const particles = ORB_PARTICLES.map(p => ({ ...p })); // mutable copy

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      const hovered    = isHoveredRef.current;
      const speedMult  = hovered ? 2.2 : 1;
      const glowMult   = hovered ? 1.6 : 1;

      for (const p of particles) {
        p.angle += p.speed * speedMult;

        // Elliptical orbit: scale y-axis
        const px = cx + Math.cos(p.angle) * p.r;
        const py = cy + Math.sin(p.angle) * p.r * p.eccentricity;
        const { cr, cg, cb } = p;

        // Depth cue: fade particles when at top/bottom of ellipse
        const depthAlpha = 0.55 + Math.abs(Math.sin(p.angle)) * 0.45;

        // Tail — fading arc dots behind the particle
        for (let i = 1; i <= TAIL; i++) {
          const ta   = p.angle - (p.speed * speedMult * i * 2.2);
          const tx   = cx + Math.cos(ta) * p.r;
          const ty   = cy + Math.sin(ta) * p.r * p.eccentricity;
          const tAlpha = ((1 - i / TAIL) ** 2) * depthAlpha * 0.40 * glowMult;
          const tSize  = p.size * (1 - i / TAIL) * 0.7;
          ctx.globalAlpha = tAlpha;
          ctx.beginPath();
          ctx.arc(tx, ty, Math.max(tSize, 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Glow halo
        const glowR = p.size * 4.5;
        const grad  = ctx.createRadialGradient(px, py, 0, px, py, glowR);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${0.55 * glowMult * depthAlpha})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(px, py, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core
        ctx.globalAlpha = depthAlpha;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      orbRafRef.current = requestAnimationFrame(draw);
    };

    orbRafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(orbRafRef.current);
  }, []);

  // ── Global mouse: proximity glow ───────────────────────────────
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
        const d   = Math.sqrt(dx*dx + dy*dy);
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

  // ── Hover: 3D tilt + spotlight ──────────────────────────────────
  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !tiltRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    tiltRef.current.style.transform  = `perspective(1000px) rotateX(${-y*11}deg) rotateY(${x*11}deg)`;
    tiltRef.current.style.transition = 'transform 0.1s ease-out';
    tiltRef.current.style.filter     = `drop-shadow(${-x*30}px ${-y*30}px 22px rgba(99,102,241,0.32))`;
    if (spotRef.current) {
      const sx = ((e.clientX - r.left) / r.width)  * 100;
      const sy = ((e.clientY - r.top)  / r.height) * 100;
      spotRef.current.style.background =
        `radial-gradient(circle 140px at ${sx}% ${sy}%, rgba(255,255,255,0.10), transparent 75%)`;
    }
  }, []);

  const handleEnter = useCallback(() => {
    setIsHovered(true);
    isHoveredRef.current = true;
    if (spotRef.current) spotRef.current.style.opacity = '1';
  }, []);

  const handleLeave = useCallback(() => {
    setIsHovered(false);
    isHoveredRef.current = false;
    if (tiltRef.current) {
      tiltRef.current.style.transform  = '';
      tiltRef.current.style.transition = 'transform 0.7s cubic-bezier(0.23,1,0.32,1)';
      tiltRef.current.style.filter     = '';
    }
    if (spotRef.current) spotRef.current.style.opacity = '0';
  }, []);

  // ── Corner bracket helper ───────────────────────────────────────
  const corner = (
    pos: { top?: string; bottom?: string; left?: string; right?: string },
    borders: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean },
    radius: string,
    color: string,
    delay: string,
    nudge: string,
  ) => ({
    position: 'absolute' as const,
    width: '20px', height: '20px',
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
      {/* ── Nebula: diffuse breathe glow ─────────────────────────── */}
      <div
        className="galaxy-nebula-glow absolute pointer-events-none"
        style={{ inset: '-65%' }}
      />

      {/* ── Galaxy halo: slow rotating conic ring ─────────────────── */}
      <div
        className="galaxy-halo absolute pointer-events-none"
        style={{ inset: '-52%' }}
      />

      {/* ── Proximity glow ────────────────────────────────────────── */}
      <div
        ref={glowRef}
        className="proximity-glow absolute pointer-events-none"
        style={{ inset: '-42%', opacity: 0.14 }}
      />

      {/* ── Float wrapper ─────────────────────────────────────────── */}
      <div className="relative" style={{ animation: 'float 5s ease-in-out infinite' }}>

        {/* ── Orbiting particles canvas ──────────────────────────── */}
        <canvas
          ref={orbCanvasRef}
          className="pointer-events-none"
          style={{
            position: 'absolute',
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        />

        {/* ── Energy pulse rings ─────────────────────────────────── */}
        <div className="energy-pulse ep-1 absolute inset-0 pointer-events-none rounded-3xl" style={{ zIndex: 1 }} />
        <div className="energy-pulse ep-2 absolute inset-0 pointer-events-none rounded-3xl" style={{ zIndex: 1 }} />
        <div className="energy-pulse ep-3 absolute inset-0 pointer-events-none rounded-3xl" style={{ zIndex: 1 }} />

        {/* ── 3D tilt target ─────────────────────────────────────── */}
        <div ref={tiltRef} className="relative" style={{ transformStyle: 'preserve-3d', zIndex: 2 }}>

          {/* Rotating conic border */}
          <div className="relative rounded-3xl overflow-hidden p-[2px] shadow-2xl shadow-black/50">
            <div className="rotating-conic" />

            {/* Photo */}
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
              <div
                ref={spotRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-zinc-950/20 pointer-events-none" />
              <div className="shimmer-sweep pointer-events-none" />
            </div>
          </div>

          {/* Corner brackets */}
          <div style={corner({ top: '-8px',    left:  '-8px'  }, { top:true,    left:true   }, '7px 0 0 0', indigo,'0s',     ' 5px, 5px' )} />
          <div style={corner({ top: '-8px',    right: '-8px'  }, { top:true,    right:true  }, '0 7px 0 0', indigo,'0.05s',  '-5px, 5px' )} />
          <div style={corner({ bottom:'-8px',  right: '-8px'  }, { bottom:true, right:true  }, '0 0 7px 0', cyan,  '0.10s',  '-5px,-5px' )} />
          <div style={corner({ bottom:'-8px',  left:  '-8px'  }, { bottom:true, left:true   }, '0 0 0 7px', cyan,  '0.15s',  ' 5px,-5px' )} />

        </div>

        {/* ── Badges ─────────────────────────────────────────────── */}
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

      </div>
    </div>
  );
};

export default ProfilePhotoCard;
