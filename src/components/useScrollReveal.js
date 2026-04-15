import { useEffect, useRef } from 'react';

/**
 * useScrollReveal - attaches an IntersectionObserver to a ref
 * and adds the 'visible' class when the element enters the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal-up"> ... </div>
 *
 * Pair with the CSS classes in vfx.css.
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
