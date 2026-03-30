import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          if (options.once !== false) {
            observer.unobserve(el);
          }
        } else if (options.once === false) {
          el.classList.remove('visible');
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return ref;
}

export function useCountUp(target, duration = 2000, shouldStart = false) {
  const ref = useRef(null);

  useEffect(() => {
    if (!shouldStart || !ref.current) return;

    let startTime = null;
    const start = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * (target - start) + start);

      if (ref.current) {
        ref.current.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else if (ref.current) {
        ref.current.textContent = target;
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, shouldStart]);

  return ref;
}
