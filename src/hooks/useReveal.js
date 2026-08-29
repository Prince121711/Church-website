import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Attaches an IntersectionObserver to a container and adds the "in" class
// to any descendant with the "reveal" class once it enters the viewport.
// Re-runs when language changes so new DOM elements get observed.
export default function useReveal() {
  const ref = useRef(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const targets = root.classList.contains('reveal')
      ? [root, ...root.querySelectorAll('.reveal')]
      : [...root.querySelectorAll('.reveal')];

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  return ref;
}
