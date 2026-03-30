import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PageHero({ title, subtitle, breadcrumb = [], description }) {
  const { isDark } = useApp();

  return (
    <section className={`relative pt-32 pb-20 overflow-hidden ${isDark ? '' : 'bg-slate-100'}`}>
      {/* Background layers */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-navy-900 to-[#0b1829]' : 'bg-gradient-to-b from-slate-200 to-slate-100'}`} />
      <div className="absolute inset-0 bg-grid opacity-30" />
      {isDark && <div className="absolute inset-0 bg-radial-glow" />}

      {/* Decorative orbs */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <nav className="flex items-center gap-1.5 mb-6 text-sm">
            <Link to="/" className={`transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'}`}>
              Beranda
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={14} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                {item.href ? (
                  <Link to={item.href} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-500 hover:text-blue-600'}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-blue-400">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Section label */}
        {subtitle && <p className="section-subtitle mb-3">{subtitle}</p>}

        {/* Title */}
        <h1 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {description}
          </p>
        )}

        {/* Bottom accent */}
        <div className="mt-10 flex items-center gap-3">
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
          <div className="h-1 w-8 bg-amber-500/50 rounded-full" />
          <div className="h-1 w-4 bg-blue-500/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
