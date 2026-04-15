import React, { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;

    const particles = [];
    const PARTICLE_COUNT = 90;

    const lavenderColors = [
      'rgba(196,181,253,',  // c4b5fd
      'rgba(167,139,250,',  // a78bfa
      'rgba(139,92,246,',   // 8b5cf6
      'rgba(221,214,254,',  // ddd6fe
      'rgba(237,233,254,',  // ede9fe
    ];

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function randBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function createParticle() {
      return {
        x: randBetween(0, W),
        y: randBetween(0, H),
        r: randBetween(1.5, 5),
        color: lavenderColors[Math.floor(Math.random() * lavenderColors.length)],
        alpha: randBetween(0.15, 0.65),
        vx: randBetween(-0.3, 0.3),
        vy: randBetween(-0.5, -0.1),
        pulse: randBetween(0, Math.PI * 2),
        pulseSpeed: randBetween(0.015, 0.04),
      };
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(167,139,250,${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      drawConnections();

      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const pAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        grad.addColorStop(0, p.color + pAlpha + ')');
        grad.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + (pAlpha * 0.9) + ')';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) { p.y = H + 10; p.x = randBetween(0, W); }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
