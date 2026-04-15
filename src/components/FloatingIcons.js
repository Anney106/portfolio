import { useEffect, useRef } from 'react';

// On-brand icons for a VFX / design portfolio
const ICONS = [
  '✨', '🎬', '🎨', '✂️', '🖌️',
  '🎭', '🎥', '💫', '🌟', '🖼️',
  '🎞️', '🪄', '⚡', '🎇', '🎆',
];

/**
 * FloatingIcons
 * Absolutely-positioned container (inset 0, z-index 0, overflow hidden).
 * Spawns `count` icon elements that drift upward with randomised speed,
 * position, size, and start phase so they don't all trigger at once.
 *
 * Usage: place inside any section that already has position:relative.
 *   <FloatingIcons count={14} />
 */
export default function FloatingIcons({ count = 14 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spawned = [];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'floating-icon';
      el.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];

      const left  = 2 + Math.random() * 96;   // 2-98 %
      const bottom = Math.random() * 80;       // start point in %
      const dur    = 7 + Math.random() * 10;   // 7-17 s
      const delay  = -(Math.random() * dur);   // negative = already mid-animation
      const size   = 0.75 + Math.random() * 1.1; // 0.75-1.85 rem

      el.style.cssText = `
        left:      ${left}%;
        bottom:    ${bottom}%;
        --dur:     ${dur}s;
        --delay:   ${delay}s;
        font-size: ${size}rem;
      `;

      container.appendChild(el);
      spawned.push(el);
    }

    return () => spawned.forEach(el => el.remove());
  }, [count]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
}
