import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe, ExternalLink, Instagram, Twitter, Youtube, Linkedin, GraduationCap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

const socialLinks = [
  { href: 'https://www.instagram.com/lab_gg.its/', icon: Instagram, label: 'Instagram' },
  { href: 'https://x.com/geomatika_its', icon: Twitter, label: 'Twitter / X' },
  { href: 'https://www.youtube.com/@teknikgeomatika_ftspk_ITS', icon: Youtube, label: 'YouTube' },
  { href: 'https://www.linkedin.com/in/achmad-fahriza/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://scholar.google.com/citations?user=wTnDEH4AAAAJ&hl=id', icon: GraduationCap, label: 'Google Scholar' },
];

/* Mock visitor data */
const visitorStats = {
  total: 12847,
  today: 34,
  countries: [
    { flag: '🇮🇩', name: 'Indonesia', count: '8.2k', pct: 64 },
    { flag: '🇺🇸', name: 'USA', count: '1.2k', pct: 9 },
    { flag: '🇦🇺', name: 'Australia', count: '648', pct: 5 },
    { flag: '🇯🇵', name: 'Japan', count: '445', pct: 3 },
    { flag: '🌐', name: 'Lainnya', count: '2.4k', pct: 19 },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const { isDark, lang } = useApp();
  const t = useT(lang);

  const footerBg = 'bg-slate-900 border-slate-700/50';
  const textPrimary = 'text-white';
  const textMuted = 'text-slate-400';
  const textFaint = 'text-slate-500';
  const borderClass = 'border-slate-700/50';
  const linkHover = 'hover:text-blue-400 transition-colors';
  const dotColor = 'bg-blue-500/50';

  return (
    <footer className={`relative border-t overflow-hidden ${footerBg}`}>
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ── Left: Brand + contact + social + visitor counter ── */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <img
                  src="/images/its-logo.png"
                  alt="ITS"
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-white font-bold font-heading text-sm">GG</span>';
                  }}
                />
              </div>
              <div>
                <p className={`font-heading font-bold text-lg leading-none ${textPrimary}`}>
                  Lab. Geodesi &amp; Geodinamika
                </p>
                <p className={`text-sm mt-1 ${textMuted}`}>Departemen Teknik Geomatika, ITS</p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed max-w-sm mb-5 ${textMuted}`}>{t.footer.desc}</p>

            <div className="space-y-2.5 mb-5">
              <div className={`flex items-start gap-2.5 text-sm ${textMuted}`}>
                <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Gedung Teknik Geomatika, Kampus ITS Sukolilo, Surabaya 60111</span>
              </div>
              <div className={`flex items-center gap-2.5 text-sm ${textMuted}`}>
                <Mail size={14} className="text-blue-400 flex-shrink-0" />
                <a href="mailto:ekoyh@its.ac.id" className={linkHover}>ekoyh@its.ac.id</a>
              </div>
              <div className={`flex items-center gap-2.5 text-sm ${textMuted}`}>
                <Globe size={14} className="text-blue-400 flex-shrink-0" />
                <a href="https://www.its.ac.id/tgeomatika/id/fasilitas/laboratorium/geodesi-dan-geodinamika" target="_blank" rel="noopener noreferrer" className={`${linkHover} flex items-center gap-1`}>
                  Profil Lab ITS <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="mb-5">
              <p className={`text-xs font-mono uppercase tracking-wider mb-3 ${textFaint}`}>{t.footer.follow}</p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} title={label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Visitor counter */}
            <div className={`pt-5 border-t ${borderClass}`}>
              <div className="flex items-center justify-between mb-3">
                <p className={`text-xs font-mono uppercase tracking-wider ${textFaint}`}>Statistik Pengunjung</p>
                <span className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="text-center p-3 rounded-xl bg-white/[0.04] border border-white/8">
                  <div className={`font-heading font-black text-xl ${textPrimary}`}>
                    {visitorStats.total.toLocaleString('id-ID')}
                  </div>
                  <div className={`text-xs mt-0.5 ${textFaint}`}>Total Pengunjung</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/[0.04] border border-white/8">
                  <div className="font-heading font-black text-xl text-green-400">{visitorStats.today}</div>
                  <div className={`text-xs mt-0.5 ${textFaint}`}>Hari Ini</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {visitorStats.countries.map((c) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <span className="text-sm w-5 flex-shrink-0">{c.flag}</span>
                    <span className={`text-xs w-20 flex-shrink-0 ${textFaint}`}>{c.name}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500/60 rounded-full transition-all" style={{ width: `${c.pct}%` }} />
                    </div>
                    <span className={`text-xs w-8 text-right flex-shrink-0 ${textFaint}`}>{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Nav + Expertise + Map ── */}
          <div>
            <div className="grid grid-cols-2 gap-8 mb-7">
              <div>
                <h4 className={`font-heading font-semibold mb-4 text-xs uppercase tracking-wider ${textPrimary}`}>{t.footer.nav}</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: t.nav.home, href: '/' },
                    { label: t.nav.about, href: '/tentang' },
                    { label: t.nav.research, href: '/penelitian' },
                    { label: t.nav.team, href: '/tim' },
                    { label: t.nav.news + ' & Insight', href: '/berita' },
                    { label: 'Data GNSS', href: '/data' },
                    { label: t.nav.contact, href: '/kontak' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link to={link.href} className={`${textMuted} ${linkHover} text-sm flex items-center gap-1.5 group`}>
                        <span className={`w-1 h-1 ${dotColor} rounded-full group-hover:bg-blue-400 transition-colors`} />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`font-heading font-semibold mb-4 text-xs uppercase tracking-wider ${textPrimary}`}>{t.footer.expertise}</h4>
                <ul className="space-y-2.5">
                  {[
                    { label: 'Geoid & Gravity', color: 'text-blue-400' },
                    { label: 'Geodesy Geometric', color: 'text-purple-400' },
                    { label: 'Sea Level Rise', color: 'text-teal-400' },
                    { label: 'Earthquake & Volcano', color: 'text-red-400' },
                    { label: 'Deformation & Subsidence', color: 'text-amber-400' },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link to="/penelitian" className={`${textMuted} text-sm flex items-center gap-1.5 group transition-colors`}>
                        <span className={`w-1 h-1 rounded-full bg-current opacity-40 ${item.color}`} />
                        <span className={`group-hover:${item.color} transition-colors`}>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`rounded-xl overflow-hidden border ${borderClass} h-52`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.225027013301!2d112.79235437371645!3d-7.279942592727246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa13c4642591%3A0x894902aff3849275!2sDepartemen%20Teknik%20Geomatika%2C%20Fakultas%20Teknik%20Sipil%2C%20Perencanaan%20dan%20Kebumian%20(FTSPK)%2C%20ITS!5e1!3m2!1sid!2sid!4v1774839917091!5m2!1sid!2sid"
                width="100%" height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Departemen Teknik Geomatika ITS"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`py-5 border-t ${borderClass} flex flex-col sm:flex-row items-center justify-between gap-3`}>
          <p className={`text-xs ${textFaint}`}>
            © {year} Laboratorium Geodesi dan Geodinamika — Departemen Teknik Geomatika ITS. {t.footer.rights}
          </p>
          <p className={`text-xs ${textFaint}`}>Institut Teknologi Sepuluh Nopember · Surabaya, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
