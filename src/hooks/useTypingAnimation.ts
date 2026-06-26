import { useEffect, useRef, useState } from 'react';

const ROLES = [
  'Software Engineer',
  'AI Engineer',
  'LLM Systems Builder',
  'Full-Stack Developer',
];

const TYPE_MS    = 62;
const DELETE_MS  = 38;
const PAUSE_END  = 2600;
const PAUSE_NEXT = 480;

export function useTypingAnimation() {
  const [displayed, setDisplayed] = useState('');
  const [cursorOn,  setCursorOn]  = useState(true);
  const roleIdx    = useRef(0);
  const charIdx    = useRef(0);
  const isDeleting = useRef(false);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Typing loop
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(ROLES[0]);
      return;
    }

    let t: ReturnType<typeof setTimeout>;

    const tick = () => {
      const role = ROLES[roleIdx.current];

      if (!isDeleting.current) {
        charIdx.current += 1;
        setDisplayed(role.slice(0, charIdx.current));

        if (charIdx.current === role.length) {
          isDeleting.current = true;
          t = setTimeout(tick, PAUSE_END);
          return;
        }
        t = setTimeout(tick, TYPE_MS + Math.random() * 28);
      } else {
        charIdx.current -= 1;
        setDisplayed(role.slice(0, charIdx.current));

        if (charIdx.current === 0) {
          isDeleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % ROLES.length;
          t = setTimeout(tick, PAUSE_NEXT);
          return;
        }
        t = setTimeout(tick, DELETE_MS);
      }
    };

    t = setTimeout(tick, PAUSE_NEXT);
    return () => clearTimeout(t);
  }, []);

  return { displayed, cursorOn };
}
