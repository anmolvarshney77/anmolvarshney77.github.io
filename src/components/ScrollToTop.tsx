import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      className={[
        'fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl',
        'bg-zinc-900 border border-zinc-700 hover:border-indigo-500/60',
        'text-zinc-400 hover:text-indigo-400',
        'flex items-center justify-center',
        'shadow-lg shadow-black/30',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none',
      ].join(' ')}
    >
      <ChevronUp size={18} />
    </button>
  );
};

export default ScrollToTop;
