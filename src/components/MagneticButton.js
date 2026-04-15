import React, { useRef } from 'react';

/**
 * MagneticButton
 * Wraps any element and makes it magnetically attract the cursor
 * when the pointer enters a zone around it. The inner child shifts
 * slightly toward the cursor, creating a satisfying tactile feel.
 *
 * Usage:
 *   <MagneticButton>
 *     <a className="neu-btn-accent sparkle-btn">Explore My Work</a>
 *   </MagneticButton>
 *
 * Props:
 *   strength  — how far the inner content moves (px). Default 12.
 *   zone      — extra padding around the element that triggers
 *               the effect (px). Default 40.
 */
export default function MagneticButton({ children, strength = 12, zone = 40 }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);

  const handleMouseMove = (e) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;

    const dx = (e.clientX - cx) / (rect.width  / 2 + zone);
    const dy = (e.clientY - cy) / (rect.height / 2 + zone);

    inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const handleMouseLeave = () => {
    const inner = innerRef.current;
    if (inner) inner.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={wrapRef}
      className="magnetic"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} style={{ transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
        {children}
      </div>
    </div>
  );
}
