import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only run cursor spotlight on desktop devices where it makes sense
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        // Direct DOM manipulation bypasses React render cycle for 60fps performance
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <div className="cursor-spotlight" ref={cursorRef} />;
}
