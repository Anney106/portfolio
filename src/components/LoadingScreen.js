import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/**
 * LoadingScreen — cinematic VFX intro for Trishikha's portfolio.
 * Canvas-based animation featuring:
 *   • Expanding lavender energy rings
 *   • Particle burst with trailing embers
 *   • Name reveal with glitch flicker
 *   • Progress bar with glow
 *   • Fade-out wipe when done
 */
export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress]   = useState(0);
  const [phase, setPhase]         = useState('loading');   // loading | reveal | done
  const [nameVisible, setNameVisible] = useState(false);

  // ── canvas VFX ───────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let w, h;

    function resize() {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // — particles —
    const particles = [];
    function spawnParticle(burst = false) {
      const cx = w / 2, cy = h / 2;
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 3 + Math.random() * 5 : 0.3 + Math.random() * 1.2;
      particles.push({
        x: cx + (burst ? 0 : (Math.random() - 0.5) * w),
        y: cy + (burst ? 0 : (Math.random() - 0.5) * h),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: burst ? 2 + Math.random() * 3 : 1 + Math.random() * 2,
        life: 0,
        maxLife: burst ? 60 + Math.random() * 40 : 120 + Math.random() * 80,
        hue: 255 + Math.random() * 50,
        alpha: burst ? 0.9 : 0.3 + Math.random() * 0.5,
        trail: [],
      });
    }

    for (let i = 0; i < 60; i++) spawnParticle(false);

    // — rings —
    const rings = [];
    function spawnRing(burst = false) {
      rings.push({
        r: burst ? 0 : Math.random() * 300,
        maxR: burst ? 600 : 350,
        speed: burst ? 5 : 0.8 + Math.random() * 0.6,
        alpha: burst ? 0.7 : 0.12 + Math.random() * 0.12,
        hue: 260 + Math.random() * 40,
        width: burst ? 2 : 0.5 + Math.random(),
      });
    }
    for (let i = 0; i < 4; i++) spawnRing(false);

    // ring pulse timer
    const ringTimer = setInterval(() => spawnRing(false), 1200);

    // — draw —
    let t = 0;
    function draw() {
      animId = requestAnimationFrame(draw);
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2, cy = h / 2;

      // deep background vignette
      const vg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
      vg.addColorStop(0, 'rgba(30,20,50,0.0)');
      vg.addColorStop(1, 'rgba(10,5,20,0.55)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      // rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const rng = rings[i];
        rng.r += rng.speed;
        if (rng.r > rng.maxR) { rings.splice(i, 1); continue; }
        const fade = 1 - rng.r / rng.maxR;
        ctx.beginPath();
        ctx.arc(cx, cy, rng.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${rng.hue},75%,75%,${rng.alpha * fade})`;
        ctx.lineWidth = rng.width;
        ctx.stroke();
      }

      // central glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160);
      cg.addColorStop(0, `rgba(196,181,253,${0.18 + 0.08 * Math.sin(t * 2)})`);
      cg.addColorStop(0.5, 'rgba(139,92,246,0.08)');
      cg.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      // particles
      if (Math.random() > 0.6) spawnParticle(false);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.trail.push([p.x, p.y]);
        if (p.trail.length > 8) p.trail.shift();
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.life++;
        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }
        const prog = p.life / p.maxLife;
        const a = Math.sin(prog * Math.PI) * p.alpha;

        // trail
        if (p.trail.length > 2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0][0], p.trail[0][1]);
          p.trail.forEach(([tx, ty]) => ctx.lineTo(tx, ty));
          ctx.strokeStyle = `hsla(${p.hue},70%,80%,${a * 0.3})`;
          ctx.lineWidth = p.r * 0.4;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - prog * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,85%,${a})`;
        ctx.fill();
      }
    }

    draw();

    // ── progress simulation ──────────────────────────────────────
    let prog = 0;
    const progTimer = setInterval(() => {
      prog += 1.8 + Math.random() * 2.5;
      if (prog >= 100) {
        prog = 100;
        clearInterval(progTimer);
        // burst!
        for (let i = 0; i < 40; i++) spawnParticle(true);
        spawnRing(true);
        setTimeout(() => setNameVisible(true), 200);
        setTimeout(() => setPhase('reveal'), 400);
        setTimeout(() => {
          setPhase('done');
          onComplete && onComplete();
        }, 2000);
      }
      setProgress(Math.min(prog, 100));
    }, 40);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(ringTimer);
      clearInterval(progTimer);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`loader-wrap ${phase === 'reveal' ? 'loader-exit' : ''}`}>
      <canvas ref={canvasRef} className="loader-canvas" />

      <div className="loader-content">
        {/* Logo mark */}
        <div className="loader-logo">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,4 56,18 56,42 30,56 4,42 4,18"
              stroke="url(#lg)" strokeWidth="1.5" fill="none"/>
            <polygon points="30,14 46,23 46,37 30,46 14,37 14,23"
              stroke="url(#lg)" strokeWidth="1" fill="none" opacity="0.5"/>
            <circle cx="30" cy="30" r="6" fill="url(#lg)" opacity="0.9"/>
            <defs>
              <linearGradient id="lg" x1="4" y1="4" x2="56" y2="56">
                <stop offset="0%" stopColor="#c4b5fd"/>
                <stop offset="100%" stopColor="#7c3aed"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Name */}
        <div className={`loader-name ${nameVisible ? 'loader-name--visible' : ''}`}>
          <span className="loader-name-first">Trishikha</span>
          <span className="loader-name-last">Chakraborty</span>
        </div>

        <p className="loader-tagline">Visual Storyteller &amp; VFX Artist</p>

        {/* Progress bar */}
        <div className="loader-bar-wrap">
          <div className="loader-bar" style={{ width: `${progress}%` }} />
          <div className="loader-bar-glow" style={{ left: `${progress}%` }} />
        </div>
        <div className="loader-pct">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}
