import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/useLanguage';

// Attaches an IntersectionObserver to a container and adds the "in" class
// to any descendant with the "reveal" class once it enters or nears the viewport.
// Also watches dynamic DOM additions (e.g. tab switches, filters) via MutationObserver
// so dynamic items reveal immediately instead of staying invisible at opacity: 0.
export default function useReveal(deps = []) {
  const ref = useRef(null);
  const { lang } = useLanguage();

  // Serialize external deps into a stable string key for the effect dependency array
  const depsKey = JSON.stringify(deps);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '120px 0px 60px 0px',
        threshold: 0.01,
      }
    );

    const observeEl = (el) => {
      if (!el || el.classList.contains('in')) return;
      const rect = el.getBoundingClientRect();
      // If already in or near viewport, reveal immediately
      if (rect.top < window.innerHeight + 120 && rect.bottom > -120) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    };

    const scanAndObserve = () => {
      if (!root) return;
      const targets = root.classList.contains('reveal')
        ? [root, ...root.querySelectorAll('.reveal')]
        : [...root.querySelectorAll('.reveal')];
      targets.forEach(observeEl);
    };

    // Initial observation
    scanAndObserve();

    // Listen for DOM changes (e.g. tab switching, filtering)
    const mo = new MutationObserver(() => {
      scanAndObserve();
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [lang, depsKey]);

  return ref;
}
