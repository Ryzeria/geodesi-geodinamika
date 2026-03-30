import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isDark, lang, toggleTheme, toggleLang, setSearchOpen } = useApp();
  const t = useT(lang);

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/tentang' },
    { label: t.nav.research, href: '/penelitian' },
    { label: t.nav.team, href: '/tim' },
    { label: t.nav.news, href: '/berita' },
    { label: t.nav.contact, href: '/kontak' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  const navBg = scrolled
    ? isDark
      ? 'bg-[#0b1829]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20'
      : 'bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm'
    : isDark
      ? 'bg-[#0b1829]/40 backdrop-blur-sm'
      : 'bg-white/60 backdrop-blur-sm';

  const linkActive = isDark
    ? 'text-blue-400 bg-blue-500/10'
    : 'text-blue-600 bg-blue-50';
  const linkInactive = isDark
    ? 'text-slate-300 hover:text-white hover:bg-white/5'
    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';
  const logoText = isDark ? 'text-white' : 'text-slate-900';
  const logoSub = isDark ? 'text-slate-400' : 'text-slate-500';
  const iconBtnClass = isDark
    ? 'text-slate-300 hover:text-white hover:bg-white/5'
    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center shadow-md shadow-black/30 ring-1 ring-white/20 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
                  <img
                    src="/images/its-logo.png"
                    alt="ITS"
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-white font-bold text-sm font-heading">GG</span>';
                    }}
                  />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#0b1829]" />
              </div>
              <div className="hidden sm:block">
                <p className={`font-heading font-bold text-sm leading-none tracking-wide ${logoText}`}>
                  Lab. Geodesi &amp; Geodinamika
                </p>
                <p className={`text-xs mt-0.5 leading-none ${logoSub}`}>
                  Teknik Geomatika — ITS Surabaya
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href) ? linkActive : linkInactive
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-lg transition-all ${iconBtnClass}`}
                aria-label="Search (Ctrl+K)"
                title="Search (Ctrl+K)"
              >
                <Search size={18} />
              </button>

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${iconBtnClass}`}
                aria-label="Toggle language"
                title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe size={15} />
                <span className="font-mono text-xs font-bold">{lang === 'id' ? 'EN' : 'ID'}</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${iconBtnClass}`}
                aria-label="Toggle theme"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* CTA */}
              <a href="mailto:ekoyh@its.ac.id" className="btn-primary text-sm py-2 px-4 ml-1">
                {t.nav.cta}
              </a>
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 rounded-lg transition-all ${iconBtnClass}`}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all ${iconBtnClass}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-lg transition-all ${iconBtnClass}`}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 border-l shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isDark ? 'bg-[#0f2040] border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="p-6 pt-20 flex flex-col gap-2">
            {/* Logo in mobile */}
            <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm font-heading">GG</span>
              </div>
              <div>
                <p className={`font-heading font-bold text-sm ${logoText}`}>Lab Geodesi &amp; Geodinamika</p>
                <p className={`text-xs ${logoSub}`}>ITS Surabaya</p>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? isDark
                      ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20'
                      : 'text-blue-600 bg-blue-50 border border-blue-200'
                    : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className={`mt-2 pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'} flex flex-col gap-2`}>
              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  isDark ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Globe size={15} />
                {lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
              </button>
              <a
                href="mailto:ekoyh@its.ac.id"
                className="btn-primary w-full justify-center"
              >
                {t.nav.cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
