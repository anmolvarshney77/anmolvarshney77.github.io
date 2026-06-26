import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [pct,     setPct]     = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY;
      const total   = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (scrollY / total) * 100 : 0);
      setVisible(scrollY > 60);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-r-full"
        style={{ width: `${pct}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  );
};

export default ScrollProgress;
