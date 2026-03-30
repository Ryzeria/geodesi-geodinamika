import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe, ExternalLink, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

/* ResearchGate SVG icon (no lucide equivalent) */
function ResearchGateIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.586 0H4.414A4.414 4.414 0 000 4.414v15.172A4.414 4.414 0 004.414 24h15.172A4.414 4.414 0 0024 19.586V4.414A4.414 4.414 0 0019.586 0zM9.5 6.5c.828 0 1.5.672 1.5 1.5S10.328 9.5 9.5 9.5 8 8.828 8 8s.672-1.5 1.5-1.5zm4 11c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5c1.168 0 2.236.446 3.033 1.177l-1.06 1.06A2.995 2.995 0 0013.5 10c-1.657 0-3 1.343-3 3s1.343 3 3 3a2.995 2.995 0 002.474-1.237l1.06 1.06A4.477 4.477 0 0113.5 17.5z" />
    </svg>
  );
}

const socialLinks = [
  { href: 'https://instagram.com/labgeodesiits', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com/labgeodesiits', icon: Twitter, label: 'Twitter / X' },
  { href: 'https://youtube.com/@labgeodesiits', icon: Youtube, label: 'YouTube' },
  { href: 'https://linkedin.com/in/labgeodesiits', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://researchgate.net/lab/geodesi-its', icon: ResearchGateIcon, label: 'ResearchGate' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { isDark, lang } = useApp();
  const t = useT(lang);

  const footerBg = isDark ? 'bg-[#050b16] border-white/5' : 'bg-slate-900 border-slate-700';
  const textPrimary = 'text-white';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-400';
  const textFaint = isDark ? 'text-slate-500' : 'text-slate-500';
  const borderClass = isDark ? 'border-white/5' : 'border-slate-700';
  const linkHover = 'hover:text-blue-400 transition-colors';
  const dotColor = isDark ? 'bg-blue-500/50' : 'bg-blue-400/60';

  return (
    <footer className={`relative border-t overflow-hidden ${footerBg}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <img
                  src="/images/its-logo.png"
                  alt="ITS"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-white font-bold font-heading">GG</span>';
                  }}
                />
              </div>
              <div>
                <p className={`font-heading font-bold text-lg leading-none ${textPrimary}`}>
                  Lab. Geodesi &amp; Geodinamika
                </p>
                <p className={`text-sm mt-1 ${textMuted}`}>
                  Departemen Teknik Geomatika, ITS
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed max-w-sm mb-6 ${textMuted}`}>
              {t.footer.desc}
            </p>

            {/* Contact brief */}
            <div className="space-y-3">
              <div className={`flex items-start gap-2.5 text-sm ${textMuted}`}>
                <MapPin size={15} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>
                  Gedung Teknik Geomatika, Kampus ITS<br />
                  Sukolilo, Surabaya 60111, Jawa Timur
                </span>
              </div>
              <div className={`flex items-center gap-2.5 text-sm ${textMuted}`}>
                <Mail size={15} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:ekoyh@its.ac.id" className={linkHover}>
                  ekoyh@its.ac.id
                </a>
              </div>
              <div className={`flex items-center gap-2.5 text-sm ${textMuted}`}>
                <Globe size={15} className="text-blue-400 flex-shrink-0" />
                <a
                  href="https://www.its.ac.id/geomatika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkHover} flex items-center gap-1`}
                >
                  geomatika.its.ac.id
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Social media */}
            <div className="mt-6">
              <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${textFaint}`}>
                {t.footer.follow}
              </p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isDark
                        ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500'
                    }`}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Lab quick stats */}
            <div className={`mt-6 pt-5 border-t ${borderClass}`}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '5', label: 'Dosen Aktif', emoji: '👨‍🏫' },
                  { value: '50+', label: 'Publikasi', emoji: '📄' },
                  { value: '10+', label: 'Tahun Berdiri', emoji: '🏛️' },
                ].map((s) => (
                  <div key={s.label} className={`text-center p-3 rounded-xl border ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-800 border-slate-700'}`}>
                    <div className="text-lg mb-0.5">{s.emoji}</div>
                    <div className={`font-heading font-black text-sm leading-none ${textPrimary}`}>{s.value}</div>
                    <div className={`text-xs mt-0.5 leading-tight ${textMuted}`}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Nav + Expertise + Map */}
          <div>
            {/* Nav and Expertise side by side */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Quick links */}
              <div>
                <h4 className={`font-heading font-semibold mb-5 text-sm uppercase tracking-wider ${textPrimary}`}>
                  {t.footer.nav}
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: t.nav.home, href: '/' },
                    { label: t.nav.about, href: '/tentang' },
                    { label: t.nav.research, href: '/penelitian' },
                    { label: t.nav.team, href: '/tim' },
                    { label: t.nav.news + ' & Insight', href: '/berita' },
                    { label: t.nav.contact, href: '/kontak' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className={`${textMuted} ${linkHover} text-sm flex items-center gap-1.5 group`}
                      >
                        <span className={`w-1 h-1 ${dotColor} rounded-full group-hover:bg-blue-400 transition-colors`} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research areas */}
              <div>
                <h4 className={`font-heading font-semibold mb-5 text-sm uppercase tracking-wider ${textPrimary}`}>
                  {t.footer.expertise}
                </h4>
                <ul className="space-y-3">
                  {[
                    { label: 'Geoid & Gravity', color: 'text-blue-400' },
                    { label: 'Geodesy Geometric', color: 'text-purple-400' },
                    { label: 'Sea Level Rise', color: 'text-teal-400' },
                    { label: 'Earthquake & Volcano', color: 'text-red-400' },
                    { label: 'Deformation & Subsidence', color: 'text-amber-400' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        to="/penelitian"
                        className={`${textMuted} text-sm flex items-center gap-1.5 group transition-colors hover:${item.color}`}
                      >
                        <span className={`w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}/50 group-hover:${item.color.replace('text-', 'bg-')} transition-colors`} />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Google Maps — sized to match this right column */}
            <div className={`rounded-xl overflow-hidden border ${borderClass} h-52`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.225027013301!2d112.79235437371645!3d-7.279942592727246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa13c4642591%3A0x894902aff3849275!2sDepartemen%20Teknik%20Geomatika%2C%20Fakultas%20Teknik%20Sipil%2C%20Perencanaan%20dan%20Kebumian%20(FTSPK)%2C%20ITS!5e1!3m2!1sid!2sid!4v1774839917091!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Departemen Teknik Geomatika ITS"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`py-5 border-t ${borderClass} flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <p className={`text-xs ${textFaint}`}>
            © {year} Laboratorium Geodesi dan Geodinamika — Departemen Teknik Geomatika ITS. {t.footer.rights}
          </p>
          <div className={`flex items-center gap-1 text-xs ${textFaint}`}>
            <span>Institut Teknologi Sepuluh Nopember</span>
            <span className="mx-1">·</span>
            <span>Surabaya, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
