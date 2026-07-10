import { useEffect, useState } from 'react';

export default function CursorSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="cursor-spotlight"
      style={{
        left: \\px\,
        top: \\px\,
      }}
    />
  );
}

