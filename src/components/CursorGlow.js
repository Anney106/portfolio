import React, { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const smoothPos = useRef({ x: -200, y: -200 });

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    let animId;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.1;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.1;

      glow.style.transform = `translate(${smoothPos.current.x - 200}px, ${smoothPos.current.y - 200}px)`;
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Large trailing glow */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
      {/* Sharp dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(196,181,253,0.9)',
          boxShadow: '0 0 12px rgba(167,139,250,0.8), 0 0 4px rgba(196,181,253,1)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
    </>
  );
}
