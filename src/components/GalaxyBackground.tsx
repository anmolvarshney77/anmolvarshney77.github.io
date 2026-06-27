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
  // Cubic bezier arc
  sx: number; sy: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  ex: number; ey: number;
  t: number; speed: number; width: number; life: number;
  r: number; g: number; b: number;
  active: boolean;
}

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  pulsePhase: number; pulseSpeed: number;
  alpha: number; boost: number;
  r: number; g: number; b: number;
}

interface DataPart {
  ni: number; nj: number;   // node indices (ni/nj to avoid clash with color b)
  t: number; speed: number; alpha: number;
  r: number; g: number; b: number;
}

interface CursorPart {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number; g: number; b: number;
  active: boolean;
}

interface Nebula {
  x: number; y: number;
  rx: number; ry: number;
  r: number; g: number; b: number;
  baseAlpha: number;
  phase: number; phaseSpeed: number;
  driftX: number; driftY: number;
}

// ─── Color palettes ───────────────────────────────────────────────────────────
const STAR_PAL: [number,number,number][] = [
  [220,228,255],[255,255,255],[200,218,255],[185,205,255],[240,240,255],[215,215,255],
];
const NODE_PAL: [number,number,number][] = [
  [99,102,241],[168,85,247],[34,211,238],[56,189,248],[139,92,246],[6,182,212],
];
const NEBULA_PAL: [number,number,number][] = [
  [99,102,241],[168,85,247],[34,211,238],[139,92,246],[56,189,248],
];

const PARALLAX   = [0.004, 0.013, 0.028] as const;
const EDGE_DIST  = 130;
const BOOST_DIST = 180; // extended edge threshold when cursor is near a node

// ─── Bezier evaluator ─────────────────────────────────────────────────────────
const bz = (t: number, p0: number, p1: number, p2: number, p3: number) => {
  const u = 1 - t;
  return u*u*u*p0 + 3*u*u*t*p1 + 3*u*t*t*p2 + t*t*t*p3;
};

// ─── Component ────────────────────────────────────────────────────────────────
const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr       = Math.min(window.devicePixelRatio || 1, 2);
    const lowPower  = navigator.hardwareConcurrency <= 4;

    const N_STARS   = lowPower ? 150 : 270;
    const N_NODES   = lowPower ? 22  : 36;
    const N_SHOTS   = lowPower ? 2   : 3;
    const N_CPARTS  = lowPower ? 14  : 24;
    const N_NEBULAE = lowPower ? 3   : 5;
    const N_DPARTS  = lowPower ? 10  : 20;

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

    const rnd = Math.random.bind(Math);
    const rb  = (a: number, b: number) => a + rnd() * (b - a);

    // ── Mouse ─────────────────────────────────────────────────────
    const mouse = { x: W/2, y: H/2, px: W/2, py: H/2, speed: 0 };
    const cglow = { x: W/2, y: H/2 }; // lagged cursor glow position

    let frame    = 0;
    let lastShot = 0;
    let lastCPrt = 0;
    let lastDPrt = 0;
    let raf: number;

    // ── Nebulae ────────────────────────────────────────────────────
    const nebulae: Nebula[] = Array.from({ length: N_NEBULAE }, (_, i) => {
      const c = NEBULA_PAL[i % NEBULA_PAL.length];
      return {
        x: rb(W * 0.05, W * 0.95),
        y: rb(H * 0.05, H * 0.95),
        rx: rb(160, 420), ry: rb(110, 300),
        r: c[0], g: c[1], b: c[2],
        baseAlpha: rb(0.025, 0.058),
        phase: rnd() * Math.PI * 2,
        phaseSpeed: rb(0.0018, 0.006),
        driftX: (rnd() - 0.5) * 0.038,
        driftY: (rnd() - 0.5) * 0.028,
      };
    });

    // ── Stars ──────────────────────────────────────────────────────
    const stars: Star[] = Array.from({ length: N_STARS }, () => {
      const layer = Math.floor(rnd() * 3) as 0|1|2;
      const sc = STAR_PAL[Math.floor(rnd() * STAR_PAL.length)];
      return {
        x: rnd() * W, y: rnd() * H,
        size:
          layer === 0 ? rb(0.15, 0.62)
        : layer === 1 ? rb(0.35, 1.05)
        :               rb(0.75, 1.80),
        brightness: rb(0.18, 0.72),
        twinklePhase: rnd() * Math.PI * 2,
        twinkleSpeed: rb(0.004, 0.022),
        layer, r: sc[0], g: sc[1], b: sc[2],
      };
    });

    // ── Shooting stars ─────────────────────────────────────────────
    const shots: Shot[] = Array.from({ length: N_SHOTS }, () => ({
      sx:0, sy:0, c1x:0, c1y:0, c2x:0, c2y:0, ex:0, ey:0,
      t:0, speed:0, width:0, life:0, r:255, g:255, b:255, active:false,
    }));

    const spawnShot = () => {
      const slot = shots.find(s => !s.active);
      if (!slot) return;
      const sx  = rb(0, W * 0.65);
      const sy  = rb(0, H * 0.42);
      const ang = rb(14, 48) * (Math.PI / 180);
      const dst = rb(180, 380);
      const ex  = sx + Math.cos(ang) * dst;
      const ey  = sy + Math.sin(ang) * dst;
      const cx  = (sx + ex) / 2, cy = (sy + ey) / 2;
      const perp = rb(-22, 22);
      const sc  = STAR_PAL[Math.floor(rnd() * STAR_PAL.length)];
      Object.assign(slot, {
        sx, sy,
        c1x: sx + (cx - sx) * 0.4 + perp,
        c1y: sy + (cy - sy) * 0.4 - Math.abs(perp) * 0.4,
        c2x: cx + (ex - cx) * 0.5 + perp * 0.4,
        c2y: cy + (ey - cy) * 0.5,
        ex, ey,
        t: 0, speed: rb(0.007, 0.015),
        width: rb(0.8, 1.8), life: 1,
        r: sc[0], g: sc[1], b: sc[2],
        active: true,
      });
    };

    // ── Constellation nodes ────────────────────────────────────────
    const nodes: Node[] = Array.from({ length: N_NODES }, () => {
      const nc = NODE_PAL[Math.floor(rnd() * NODE_PAL.length)];
      return {
        x: rnd() * W, y: rnd() * H,
        vx: (rnd()-0.5) * 0.30,
        vy: (rnd()-0.5) * 0.30,
        size: rb(0.7, 1.5),
        pulsePhase: rnd() * Math.PI * 2,
        pulseSpeed: rb(0.008, 0.024),
        alpha: rb(0.10, 0.28),
        boost: 0,
        r: nc[0], g: nc[1], b: nc[2],
      };
    });

    // ── Data particles ─────────────────────────────────────────────
    const dparts: DataPart[] = [];

    // ── Cursor energy particles ────────────────────────────────────
    const cparts: CursorPart[] = Array.from({ length: N_CPARTS }, () => ({
      x:0, y:0, vx:0, vy:0, life:0, maxLife:0,
      r:99, g:102, b:241, active:false,
    }));

    const spawnCPart = () => {
      const slot = cparts.find(p => !p.active);
      if (!slot) return;
      const ang = rnd() * Math.PI * 2;
      const d   = rb(4, 22);
      const c   = NODE_PAL[Math.floor(rnd() * NODE_PAL.length)];
      slot.x       = mouse.x + Math.cos(ang) * d;
      slot.y       = mouse.y + Math.sin(ang) * d;
      slot.vx      = (rnd()-0.5) * 1.1;
      slot.vy      = (rnd()-0.5) * 1.1;
      slot.life    = 1;
      slot.maxLife = rb(28, 65);
      slot.r = c[0]; slot.g = c[1]; slot.b = c[2];
      slot.active  = true;
    };

    // ── Tick ──────────────────────────────────────────────────────
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      mouse.speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      mouse.px = mouse.x; mouse.py = mouse.y;

      if (!reduced) {
        // Shooting star triggers
        if ((frame % 295 === 0 && rnd() < 0.78) ||
            (mouse.speed > 10 && frame - lastShot > 80 && rnd() < 0.044)) {
          spawnShot(); lastShot = frame;
        }
        // Cursor particle trail
        if (mouse.speed > 1.5 && frame - lastCPrt > 4) {
          spawnCPart(); lastCPrt = frame;
        }
      }

      const mx = mouse.x - W / 2;
      const my = mouse.y - H / 2;

      // ── 1. Nebulae — screen blend ─────────────────────────────
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const n of nebulae) {
        n.phase += n.phaseSpeed;
        n.x += n.driftX; n.y += n.driftY;
        // Soft wrap at edges
        if (n.x + n.rx < 0)  n.x = W + n.rx;
        if (n.x - n.rx > W)  n.x = -n.rx;
        if (n.y + n.ry < 0)  n.y = H + n.ry;
        if (n.y - n.ry > H)  n.y = -n.ry;

        const breathe = Math.sin(n.phase) * 0.28 + 0.72;
        const alpha   = n.baseAlpha * breathe;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(n.x, n.y);
        ctx.scale(n.rx, n.ry);               // unit-circle → ellipse
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        grad.addColorStop(0,   `rgb(${n.r},${n.g},${n.b})`);
        grad.addColorStop(0.45,`rgba(${n.r},${n.g},${n.b},0.35)`);
        grad.addColorStop(1,   `rgba(${n.r},${n.g},${n.b},0)`);
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      }
      ctx.restore(); // back to source-over

      // ── 2. Stars — parallax + depth-of-field + gravitational lens
      for (const s of stars) {
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase) * 0.30 + 0.70;
        const alpha   = s.brightness * twinkle;

        // Parallax position
        let px = s.x + mx * PARALLAX[s.layer];
        let py = s.y + my * PARALLAX[s.layer];

        // Gravitational lens: push stars slightly away from cursor
        const gx = px - mouse.x, gy = py - mouse.y;
        const gd = Math.hypot(gx, gy);
        if (gd < 190 && gd > 1) {
          const str = (1 - gd / 190) ** 2 * 9; // max ~9px
          px += (gx / gd) * str;
          py += (gy / gd) * str;
        }

        const { r, g, b, size, layer } = s;

        if (layer === 0) {
          // Deep background: blurry — halo only, no sharp core (DoF simulation)
          ctx.globalAlpha = alpha * 0.55;
          ctx.beginPath();
          ctx.arc(px, py, size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
        } else if (layer === 1) {
          // Mid: small glow + core
          if (size > 0.65) {
            const gr = ctx.createRadialGradient(px, py, 0, px, py, size * 3);
            gr.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.42})`);
            gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(px, py, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = gr;
            ctx.fill();
          }
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
        } else {
          // Foreground: sharp core + visible glow (in-focus)
          const gr = ctx.createRadialGradient(px, py, 0, px, py, size * 4.5);
          gr.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.52})`);
          gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(px, py, size * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = gr;
          ctx.fill();
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      // ── 3. Smoothed cursor radial glow ────────────────────────
      cglow.x += (mouse.x - cglow.x) * 0.06;
      cglow.y += (mouse.y - cglow.y) * 0.06;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      const cg = ctx.createRadialGradient(cglow.x, cglow.y, 0, cglow.x, cglow.y, 165);
      cg.addColorStop(0,   'rgba(99,102,241,0.058)');
      cg.addColorStop(0.5, 'rgba(168,85,247,0.022)');
      cg.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cglow.x, cglow.y, 165, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
      ctx.restore();

      // ── 4. Constellation nodes — update ──────────────────────
      for (const n of nodes) {
        n.pulsePhase += n.pulseSpeed;
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const d  = Math.hypot(dx, dy);
        if (d < 210 && d > 1) {
          const f = 0.006 * (1 - d / 210);
          n.vx += (dx / d) * f; n.vy += (dy / d) * f;
        }
        n.vx *= 0.972; n.vy *= 0.972;
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx =  Math.abs(n.vx); }
        if (n.x > W) { n.x = W; n.vx = -Math.abs(n.vx); }
        if (n.y < 0) { n.y = 0; n.vy =  Math.abs(n.vy); }
        if (n.y > H) { n.y = H; n.vy = -Math.abs(n.vy); }
        // Cursor proximity boost
        const targetBoost = d < 140 ? (1 - d / 140) : 0;
        n.boost += (targetBoost - n.boost) * 0.08;
      }

      // ── 5. Constellation edges ────────────────────────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = (a.boost > 0.05 || b.boost > 0.05) ? BOOST_DIST : EDGE_DIST;
          if (d < maxD) {
            const base  = (1 - d / maxD) * 0.13;
            const boost = ((a.boost + b.boost) * 0.5) * 0.25;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(99,102,241,${base + boost})`;
            ctx.stroke();
          }
        }
      }

      // ── 6. Constellation node glows + cores ──────────────────
      for (const n of nodes) {
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5;
        const sz    = n.size * (1 + pulse * 0.45 + n.boost * 0.85);
        const al    = Math.min(n.alpha * (0.55 + pulse * 0.45) + n.boost * 0.45, 0.9);
        const { r, g, b } = n;

        const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, sz * 5);
        ng.addColorStop(0, `rgba(${r},${g},${b},${al * 0.45})`);
        ng.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz * 5, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();

        ctx.globalAlpha = al;
        ctx.beginPath();
        ctx.arc(n.x, n.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── 7. Data particles along edges ─────────────────────────
      if (frame - lastDPrt > 20 && dparts.length < N_DPARTS) {
        lastDPrt = frame;
        outer: for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (d < EDGE_DIST && rnd() < 0.10) {
              const swap = rnd() < 0.5;
              dparts.push({
                ni: swap ? j : i, nj: swap ? i : j,
                t: 0, speed: rb(0.004, 0.010),
                alpha: rb(0.30, 0.60),
                r: 34, g: 211, b: 238,
              });
              break outer;
            }
          }
        }
      }

      for (let i = dparts.length - 1; i >= 0; i--) {
        const p = dparts[i];
        p.t += p.speed;
        if (p.t >= 1) { dparts.splice(i, 1); continue; }
        const na = nodes[p.ni], nb = nodes[p.nj];
        const px  = na.x + (nb.x - na.x) * p.t;
        const py  = na.y + (nb.y - na.y) * p.t;
        const fade = Math.min(p.t * 6, 1) * Math.min((1 - p.t) * 6, 1);
        const al   = p.alpha * fade;
        const { r, g, b } = p;

        const pg = ctx.createRadialGradient(px, py, 0, px, py, 5);
        pg.addColorStop(0, `rgba(${r},${g},${b},${al * 0.5})`);
        pg.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = pg; ctx.fill();

        ctx.globalAlpha = al;
        ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── 8. Cursor energy particles ────────────────────────────
      for (const p of cparts) {
        if (!p.active) continue;
        // Weak spring toward cursor + noise
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        p.vx += dx * 0.0012 + (rnd() - 0.5) * 0.18;
        p.vy += dy * 0.0012 + (rnd() - 0.5) * 0.18;
        p.vx *= 0.92; p.vy *= 0.92;
        p.x += p.vx; p.y += p.vy;
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) { p.active = false; continue; }
        const al = p.life * p.life;
        const { r, g, b } = p;
        ctx.globalAlpha = al * 0.62;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 * p.life + 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // ── 9. Shooting stars — bezier arc trail ──────────────────
      const TRAIL = 30;
      for (const s of shots) {
        if (!s.active) continue;
        s.t    += s.speed;
        s.life -= 0.011;
        if (s.t >= 1 || s.life <= 0) { s.active = false; continue; }
        const lifeA   = Math.min(s.life * 4, 1);
        const trailDt = 0.16; // t-space span of trail

        for (let i = 0; i < TRAIL; i++) {
          const t1 = s.t - trailDt * (i     / TRAIL);
          const t2 = s.t - trailDt * ((i+1) / TRAIL);
          if (t2 < 0) break;
          const x1 = bz(t1, s.sx, s.c1x, s.c2x, s.ex);
          const y1 = bz(t1, s.sy, s.c1y, s.c2y, s.ey);
          const x2 = bz(t2, s.sx, s.c1x, s.c2x, s.ex);
          const y2 = bz(t2, s.sy, s.c1y, s.c2y, s.ey);
          const segA = ((1 - i / TRAIL) ** 2) * lifeA * 0.88;
          const segW = s.width * (1 - i / TRAIL);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${segA})`;
          ctx.lineWidth   = segW;
          ctx.lineCap     = 'round';
          ctx.stroke();
        }

        // Glowing head
        const hx = bz(s.t, s.sx, s.c1x, s.c2x, s.ex);
        const hy = bz(s.t, s.sy, s.c1y, s.c2y, s.ey);
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, s.width * 5.5);
        hg.addColorStop(0,   `rgba(255,255,255,${lifeA})`);
        hg.addColorStop(0.4, `rgba(${s.r},${s.g},${s.b},${lifeA * 0.55})`);
        hg.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);
        ctx.beginPath();
        ctx.arc(hx, hy, s.width * 5.5, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    // ── Reduced-motion: static star field only ─────────────────
    if (reduced) {
      for (const s of stars) {
        ctx.globalAlpha = s.brightness * 0.40;
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
