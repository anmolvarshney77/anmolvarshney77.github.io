import React, { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Star {
  x: number; y: number;
  size: number; brightness: number;
  twinklePhase: number; twinkleSpeed: number;
  layer: 0 | 1 | 2;
  r: number; g: number; b: number;
}

interface Shot {
  x: number; y: number;
  vx: number; vy: number;
  trailLen: number; life: number; width: number;
  r: number; g: number; b: number;
  active: boolean;
}

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number; pulsePhase: number; pulseSpeed: number; alpha: number;
  r: number; g: number; b: number;
}

interface Particle {
  a: number; b: number; // node indices
  t: number; speed: number; alpha: number;
  r: number; g: number; bl: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const STAR_COLORS = [
  [200, 210, 255], [255, 255, 255],
  [210, 220, 255], [180, 195, 255], [200, 200, 240],
] as [number, number, number][];

const NODE_COLORS = [
  [99, 102, 241], [168, 85, 247], [34, 211, 238], [56, 189, 248],
] as [number, number, number][];

const PARALLAX  = [0.006, 0.015, 0.030] as const;
const EDGE_DIST = 132;

// ─── Component ────────────────────────────────────────────────────────────────
const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced    = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr        = Math.min(window.devicePixelRatio || 1, 2);
    const lowPower   = navigator.hardwareConcurrency <= 4;
    const STAR_N     = lowPower ? 130 : 210;
    const NODE_N     = lowPower ? 26  : 40;
    const MAX_PARTS  = lowPower ? 12  : 22;
    const MAX_SHOTS  = lowPower ? 2   : 3;

    let W = 0, H = 0;

    const resize = () => {
      const p = canvas.parentElement;
      W = p ? p.offsetWidth  : window.innerWidth;
      H = p ? p.offsetHeight : window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    // ── State ────────────────────────────────────────────────────
    const mouse  = { x: W / 2, y: H / 2, px: W / 2, py: H / 2, speed: 0 };
    const glow   = { x: W / 2, y: H / 2 };  // smoothed cursor glow position
    let frame    = 0;
    let lastShot = 0;
    let lastPart = 0;
    let raf: number;

    const rnd = Math.random.bind(Math);

    // ── Stars ─────────────────────────────────────────────────────
    const stars: Star[] = Array.from({ length: STAR_N }, () => {
      const layer = (Math.floor(rnd() * 3)) as 0 | 1 | 2;
      const sc = STAR_COLORS[Math.floor(rnd() * STAR_COLORS.length)];
      return {
        x: rnd() * W, y: rnd() * H,
        size: layer === 0 ? rnd() * 0.7 + 0.2
            : layer === 1 ? rnd() * 1.0 + 0.4
            :               rnd() * 1.5 + 0.8,
        brightness: rnd() * 0.55 + 0.25,
        twinklePhase: rnd() * Math.PI * 2,
        twinkleSpeed: rnd() * 0.018 + 0.005,
        layer,
        r: sc[0], g: sc[1], b: sc[2],
      };
    });

    // ── Shooting stars ─────────────────────────────────────────────
    const shots: Shot[] = Array.from({ length: MAX_SHOTS }, () => ({
      x: 0, y: 0, vx: 0, vy: 0, trailLen: 0,
      life: 0, width: 0, r: 255, g: 255, b: 255, active: false,
    }));

    const spawnShot = () => {
      const slot = shots.find(s => !s.active);
      if (!slot) return;
      const deg = rnd() * 36 + 14;          // 14°–50° downward
      const rad = deg * (Math.PI / 180);
      const spd = rnd() * 9 + 5;
      const sc  = STAR_COLORS[Math.floor(rnd() * STAR_COLORS.length)];
      slot.x        = rnd() * W * 0.75;
      slot.y        = rnd() * H * 0.42;
      slot.vx       = Math.cos(rad) * spd;
      slot.vy       = Math.sin(rad) * spd;
      slot.trailLen = rnd() * 110 + 70;
      slot.life     = 1;
      slot.width    = rnd() * 1.3 + 0.7;
      slot.r = sc[0]; slot.g = sc[1]; slot.b = sc[2];
      slot.active   = true;
    };

    // ── Constellation nodes ────────────────────────────────────────
    const nodes: Node[] = Array.from({ length: NODE_N }, () => {
      const nc = NODE_COLORS[Math.floor(rnd() * NODE_COLORS.length)];
      return {
        x: rnd() * W, y: rnd() * H,
        vx: (rnd() - 0.5) * 0.38, vy: (rnd() - 0.5) * 0.38,
        size: rnd() * 1.3 + 0.7,
        pulsePhase: rnd() * Math.PI * 2,
        pulseSpeed: rnd() * 0.022 + 0.008,
        alpha: rnd() * 0.28 + 0.12,
        r: nc[0], g: nc[1], b: nc[2],
      };
    });

    // ── Data particles ─────────────────────────────────────────────
    const particles: Particle[] = [];

    // ── Tick ──────────────────────────────────────────────────────
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      mouse.speed  = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      mouse.px     = mouse.x;
      mouse.py     = mouse.y;

      // Shooting star triggers
      const periodicFire = frame % 280 === 0 && rnd() < 0.72;
      const mouseFire    = mouse.speed > 9 && frame - lastShot > 75 && rnd() < 0.042;
      if (periodicFire || mouseFire) { spawnShot(); lastShot = frame; }

      const mx = mouse.x - W / 2;
      const my = mouse.y - H / 2;

      // ── 1. Stars ───────────────────────────────────────────────
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase) * 0.28 + 0.72;
        const alpha   = s.brightness * twinkle;
        const px      = s.x + mx * PARALLAX[s.layer];
        const py      = s.y + my * PARALLAX[s.layer];
        const { r, g, b } = s;

        if (s.size > 0.95 && s.layer >= 1) {
          const gr = ctx.createRadialGradient(px, py, 0, px, py, s.size * 3.5);
          gr.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.5})`);
          gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
        }
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── 2. Cursor radial glow ──────────────────────────────────
      glow.x += (mouse.x - glow.x) * 0.07;
      glow.y += (mouse.y - glow.y) * 0.07;
      const cg = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, 150);
      cg.addColorStop(0,   'rgba(99,102,241,0.052)');
      cg.addColorStop(0.5, 'rgba(168,85,247,0.022)');
      cg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(glow.x, glow.y, 150, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      // ── 3. Constellation edges ────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.pulsePhase += n.pulseSpeed;
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d  = Math.hypot(dx, dy);
        if (d < 210 && d > 1) {
          const f = 0.006 * (1 - d / 210);
          n.vx += (dx / d) * f; n.vy += (dy / d) * f;
        }
        n.vx *= 0.973; n.vy *= 0.973;
        n.x  += n.vx;  n.y  += n.vy;
        if (n.x < 0)   { n.x = 0; n.vx =  Math.abs(n.vx); }
        if (n.x > W)   { n.x = W; n.vx = -Math.abs(n.vx); }
        if (n.y < 0)   { n.y = 0; n.vy =  Math.abs(n.vy); }
        if (n.y > H)   { n.y = H; n.vy = -Math.abs(n.vy); }
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < EDGE_DIST) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / EDGE_DIST) * 0.13})`;
            ctx.stroke();
          }
        }
      }

      // ── 4. Constellation nodes ─────────────────────────────────
      for (const n of nodes) {
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
        const sz    = n.size * (1 + pulse * 0.45);
        const al    = n.alpha * (0.55 + pulse * 0.45);
        const { r, g, b } = n;

        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, sz * 4.5);
        ng.addColorStop(0, `rgba(${r},${g},${b},${al * 0.48})`);
        ng.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        ctx.globalAlpha = al;
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── 5. Data particles ──────────────────────────────────────
      if (frame - lastPart > 18 && particles.length < MAX_PARTS) {
        lastPart = frame;
        outer: for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (dist < EDGE_DIST && rnd() < 0.10) {
              const swap = rnd() < 0.5;
              particles.push({
                a: swap ? j : i, b: swap ? i : j,
                t: 0, speed: rnd() * 0.009 + 0.004,
                alpha: rnd() * 0.55 + 0.30,
                r: 34, g: 211, bl: 238,
              });
              break outer;
            }
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.t += p.speed;
        if (p.t >= 1) { particles.splice(i, 1); continue; }
        const na = nodes[p.a], nb = nodes[p.b];
        const px  = na.x + (nb.x - na.x) * p.t;
        const py  = na.y + (nb.y - na.y) * p.t;
        const fade = Math.min(p.t * 6, 1) * Math.min((1 - p.t) * 6, 1);
        const al   = p.alpha * fade;
        const { r, g, bl } = p;

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pg.addColorStop(0, `rgba(${r},${g},${bl},${al * 0.48})`);
        pg.addColorStop(1, `rgba(${r},${g},${bl},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = pg;
        ctx.fill();

        ctx.globalAlpha = al;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${bl})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── 6. Shooting stars ──────────────────────────────────────
      for (const s of shots) {
        if (!s.active) continue;
        s.x  += s.vx; s.y  += s.vy;
        s.vy += 0.033;          // slight gravitational arc
        s.vx *= 0.999;
        s.life -= 0.013;
        if (s.life <= 0 || s.x > W + 160 || s.y > H + 160) {
          s.active = false; continue;
        }
        const lifeA = Math.min(s.life * 4, 1);
        const spd   = Math.hypot(s.vx, s.vy);
        const tx    = s.x - (s.vx / spd) * s.trailLen;
        const ty    = s.y - (s.vy / spd) * s.trailLen;
        const { r, g, b } = s;

        // Trail gradient
        const tg = ctx.createLinearGradient(s.x, s.y, tx, ty);
        tg.addColorStop(0,    `rgba(${r},${g},${b},${lifeA * 0.88})`);
        tg.addColorStop(0.15, `rgba(${r},${g},${b},${lifeA * 0.42})`);
        tg.addColorStop(1,    `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = tg;
        ctx.lineWidth   = s.width;
        ctx.lineCap     = 'round';
        ctx.stroke();

        // Head glow
        const hg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.width * 5);
        hg.addColorStop(0,    `rgba(255,255,255,${lifeA})`);
        hg.addColorStop(0.35, `rgba(${r},${g},${b},${lifeA * 0.55})`);
        hg.addColorStop(1,    `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 5, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    // ── Reduced-motion: static star field only ─────────────────
    if (reduced) {
      for (const s of stars) {
        ctx.globalAlpha = s.brightness * 0.45;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${s.r},${s.g},${s.b})`;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      return;
    }

    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x  = e.clientX - rect.left;
      mouse.y  = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default GalaxyBackground;
