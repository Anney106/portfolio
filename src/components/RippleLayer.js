import { useEffect } from 'react';

/**
 * RippleLayer
 * Listens for click events anywhere on the page and spawns
 * three concentric expanding rings at the cursor position.
 * On CTA buttons (.sparkle-btn) it additionally spawns 3
 * burst-ring elements for a more dramatic effect.
 */
export default function RippleLayer() {
  useEffect(() => {
    const spawnRipple = (x, y, isBurst = false) => {
      const count = isBurst ? 3 : 3;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        const size = 56;

        if (isBurst) {
          el.className = 'burst-ring';
          el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top:  ${y}px;
          `;
        } else {
          el.className = `ripple-circle r${i + 1}`;
          el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x - size / 2}px;
            top:  ${y - size / 2}px;
          `;
        }

        document.body.appendChild(el);

        // Remove once the longest possible animation finishes
        const cleanup = () => el.remove();
        el.addEventListener('animationend', cleanup);
        // Fallback in case animationend never fires
        setTimeout(cleanup, 2000);
      }
    };

    const handleClick = (e) => {
      const isBurst = e.target.closest('.sparkle-btn, .neu-btn-accent, .submit-btn');
      spawnRipple(e.clientX, e.clientY, false);
      if (isBurst) spawnRipple(e.clientX, e.clientY, true);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return null; // purely side-effect
}
