import React, { useRef } from 'react';

/**
 * TiltCard
 * Drop-in wrapper that applies a 3D perspective tilt + holographic
 * cursor-following radial glow to any card.
 *
 * Usage:
 *   <TiltCard className="neu-card shimmer-card">…content…</TiltCard>
 *
 * The component merges the  holo-card  CSS class (defined in vfx2.css)
 * with whatever className you pass in, so all existing card styles are
 * preserved.
 */
export default function TiltCard({
  children,
  className = '',
  style = {},
  as: Tag = 'div',
  maxTilt = 8,     // maximum tilt degrees
  ...rest
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    // Normalised -1 → +1 within the card
    const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
    const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

    const rx = -ny * maxTilt;   // tilt on X-axis
    const ry =  nx * maxTilt;   // tilt on Y-axis

    // Cursor position as percentage (for radial glow)
    const mx = ((e.clientX - rect.left)  / rect.width)  * 100;
    const my = ((e.clientY - rect.top)   / rect.height) * 100;

    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    card.style.setProperty('--mx', `${mx}%`);
    card.style.setProperty('--my', `${my}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <Tag
      ref={cardRef}
      className={`holo-card ${className}`.trim()}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
