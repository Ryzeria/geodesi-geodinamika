import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  className = '',
  type = 'reveal', // 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale'
  delay = 0,
  threshold = 0.15,
}) {
  const ref = useScrollReveal({ threshold });

  return (
    <div
      ref={ref}
      className={`${type} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
