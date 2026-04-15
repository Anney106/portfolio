import { useEffect, useRef } from 'react';

/**
 * ScrollProgress
 * Renders a glowing lavender progress bar pinned to the top of the viewport.
 * Grows from left to right as the user scrolls the page.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
