import { useState } from 'react';
import { Globe, Satellite, Waves, Mountain, Zap, ChevronRight, MapPin } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { researchAreas, roadmapData } from '../data';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

const areaIcons = { geoid: Globe, geodesy: Satellite, sealevel: Waves, earthquake: Mountain, deformation: Zap };

const colorConfig = {
  blue: {
    bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400',
    tag: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    gradient: 'from-blue-600/20 to-transparent',
    glow: 'hover:shadow-blue-500/20',
    active: 'border-blue-400 bg-blue-500/15',
    activeLt: 'border-blue-400 bg-blue-50',
  },
  purple: {
    bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400',
    tag: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    gradient: 'from-purple-600/20 to-transparent',
    glow: 'hover:shadow-purple-500/20',
    active: 'border-purple-400 bg-purple-500/15',
    activeLt: 'border-purple-400 bg-purple-50',
  },
  teal: {
    bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400',
    tag: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    gradient: 'from-teal-600/20 to-transparent',
    glow: 'hover:shadow-teal-500/20',
    active: 'border-teal-400 bg-teal-500/15',
    activeLt: 'border-teal-400 bg-teal-50',
  },
  red: {
    bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400',
    tag: 'bg-red-500/20 text-red-300 border-red-500/30',
    gradient: 'from-red-600/20 to-transparent',
    glow: 'hover:shadow-red-500/20',
    active: 'border-red-400 bg-red-500/15',
    activeLt: 'border-red-400 bg-red-50',
  },
  amber: {
    bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400',
    tag: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    gradient: 'from-amber-600/20 to-transparent',
    glow: 'hover:shadow-amber-500/20',
    active: 'border-amber-400 bg-amber-500/15',
    activeLt: 'border-amber-400 bg-amber-50',
  },
};

const areaColorMap = {
  geoid: 'blue', geodesy: 'purple', sealevel: 'teal', earthquake: 'red', deformation: 'amber',
};

function ResearchDetailCard({ area, isActive, onClick, isDark }) {
  const color = areaColorMap[area.id];
  const c = colorConfig[color];
  const Icon = areaIcons[area.id] || Globe;

  const activeClass = isDark ? c.active : c.activeLt;
  const inactiveClass = isDark
    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
        isActive ? activeClass + ' shadow-xl ' + c.glow : inactiveClass
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-heading font-semibold text-sm ${
            isActive
              ? isDark ? 'text-white' : 'text-slate-900'
              : isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {area.title}
          </p>
        </div>
        <ChevronRight size={16} className={`flex-shrink-0 transition-transform ${isActive ? 'rotate-90 ' + c.text : isDark ? 'text-slate-600' : 'text-slate-400'}`} />
      </div>
    </button>
  );
}

export default function Research() {
  const [activeArea, setActiveArea] = useState(researchAreas[0]);
  const { isDark, lang } = useApp();
  const t = useT(lang);

  const activeColor = areaColorMap[activeArea.id];
  const c = colorConfig[activeColor];
  const Icon = areaIcons[activeArea.id] || Globe;

  const sectionBg = isDark ? '' : 'bg-slate-50';
  const cardBg = isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-600';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={isDark ? '' : 'bg-slate-50'}>
      <PageHero
        title={t.research.title}
        subtitle={t.research.subtitle}
        breadcrumb={[{ label: t.research.title }]}
        description="Bidang penelitian aktif dan roadmap pengembangan ilmu Geodesi dan Geodinamika hingga 2029."
      />

      {/* ─── Research Areas ─── */}
      <section className={`py-20 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="mb-12">
              <p className="section-subtitle mb-3">Bidang Riset</p>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Area <span className="gradient-text">Penelitian</span> Utama
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar list */}
            <ScrollReveal type="reveal-left">
              <div className="space-y-3">
                {researchAreas.map((area) => (
                  <ResearchDetailCard
                    key={area.id}
                    area={area}
                    isActive={activeArea.id === area.id}
                    onClick={() => setActiveArea(area)}
                    isDark={isDark}
                  />
                ))}
              </div>
            </ScrollReveal>

            {/* Detail panel */}
            <div className="lg:col-span-2">
              <ScrollReveal type="reveal-right" key={activeArea.id}>
                <div className={`h-full p-8 rounded-2xl bg-gradient-to-br ${c.gradient} border ${c.border} shadow-xl transition-all duration-300 ${isDark ? 'bg-white/[0.03]' : 'bg-white'}`}>
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl ${c.bg} ${c.text} flex items-center justify-center flex-shrink-0 text-2xl`}>
                      <Icon size={28} />
                    </div>
                    <div>
                      <p className={`text-xs font-mono uppercase tracking-wider ${c.text} mb-1`}>Research Area</p>
                      <h3 className={`font-heading text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{activeArea.title}</h3>
                    </div>
                  </div>

                  {/* Image */}
                  <div className={`relative w-full h-40 rounded-xl overflow-hidden mb-6 border ${c.border}`}>
                    <img
                      src={`/images/research/${activeArea.id}.jpg`}
                      alt={activeArea.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.parentElement.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center ${isDark ? 'bg-navy-800/50' : 'bg-slate-100'}">
                            <div class="text-center">
                              <div class="text-4xl mb-2">${activeArea.icon}</div>
                              <p class="${isDark ? 'text-slate-500' : 'text-slate-400'} text-xs font-mono">${activeArea.id}.jpg</p>
                            </div>
                          </div>`;
                      }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${c.gradient} opacity-50`} />
                  </div>

                  {/* Description */}
                  <p className={`leading-relaxed mb-6 ${bodyText}`}>{activeArea.description}</p>

                  {/* Topics */}
                  <div>
                    <p className={`text-xs font-mono uppercase tracking-wider ${c.text} mb-3`}>Topik Riset</p>
                    <div className="grid grid-cols-2 gap-2">
                      {activeArea.topics.map((topic) => (
                        <div key={topic} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isDark ? c.tag : `${c.bg} ${c.text} ${c.border}`}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${c.bg.replace('/10', '/60')} flex-shrink-0`} />
                          <span className="text-xs font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Roadmap ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-transparent via-blue-950/10 to-transparent' : 'bg-gradient-to-b from-white/50 to-transparent'}`} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Roadmap</p>
              <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Peta Jalan <span className="gradient-text">Penelitian</span>
              </h2>
              <p className={`mt-4 max-w-xl mx-auto ${mutedText}`}>
                Rencana strategis pengembangan penelitian Laboratorium Geodesi dan Geodinamika
                dari 2025 hingga 2029.
              </p>
            </div>
          </ScrollReveal>

          {/* Roadmap image */}
          <ScrollReveal>
            <div className="mb-10 relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
              <img
                src="/images/roadmap.jpg"
                alt="Research Roadmap"
                className="w-full object-cover"
                style={{ maxHeight: '500px' }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </ScrollReveal>

          {/* Roadmap CSS Grid Table */}
          <ScrollReveal>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(150px, 200px) repeat(3, 1fr)',
                gap: '8px',
                alignItems: 'stretch',
              }}
            >
              {/* Headers */}
              <div /> {/* empty corner */}
              {['2025', '2026', '2027 – 2029'].map(yr => (
                <div
                  key={yr}
                  className={`text-center text-xs font-mono uppercase tracking-wider px-3 py-2.5 rounded-lg ${
                    isDark
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {yr}
                </div>
              ))}

              {/* Rows */}
              {roadmapData.map(row => (
                <div key={row.theme} style={{ display: 'contents' }}>
                  {/* Theme label — always in col 1 */}
                  <div
                    style={{ gridColumn: 1 }}
                    className={`flex items-center px-4 py-3 rounded-xl border self-start mt-1 ${row.bgClass} ${row.borderClass}`}
                  >
                    <span className={`font-heading font-semibold text-sm leading-snug ${row.textClass}`}>{row.theme}</span>
                  </div>
                  {/* Data cells with explicit grid placement */}
                  {row.cells.map((cell, i) => (
                    <div
                      key={i}
                      style={{
                        gridColumn: `${cell.startCol} / span ${cell.colSpan}`,
                      }}
                      className={`p-3 rounded-xl border text-sm leading-relaxed ${row.bgClass} ${row.borderClass} ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
                    >
                      {cell.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Mobile roadmap fallback */}
          <div className="mt-6 space-y-4 md:hidden">
            {roadmapData.map((row) => (
              <div key={row.theme} className={`p-5 rounded-2xl border ${row.bgClass} ${row.borderClass}`}>
                <h4 className={`font-heading font-bold ${row.textClass} mb-4`}>{row.theme}</h4>
                <div className="space-y-3">
                  {row.cells.map((cell, i) => {
                    const yearLabels = ['', '2025', '2026', '2027–2029'];
                    const start = cell.startCol;
                    const end = start + cell.colSpan - 1;
                    const yearRange = start === end
                      ? yearLabels[start]
                      : `${yearLabels[start]}–${yearLabels[end]}`;
                    return (
                      <div key={i} className="flex gap-3">
                        <span className={`text-xs font-mono font-bold ${row.textClass} flex-shrink-0 mt-0.5 w-24`}>{yearRange}</span>
                        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{cell.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Research Data ─── */}
      <section className={`py-16 ${sectionBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="section-subtitle mb-3">{t.research.dataTitle}</p>
            <h2 className={`section-title mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dataset &amp; <span className="gradient-text">Observasi</span>
            </h2>
            <p className={`mb-10 max-w-2xl ${mutedText}`}>{t.research.dataDesc}</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CORS ITSN — Available */}
            <ScrollReveal type="reveal-scale" delay={0}>
              <div className={`rounded-2xl border p-6 h-full ${cardBg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-green-500/15 border border-green-500/25' : 'bg-green-50 border border-green-200'}`}>
                    <span className="text-2xl">📡</span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    isDark
                      ? 'bg-green-500/15 text-green-400 border-green-500/25'
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    ● {t.research.available}
                  </span>
                </div>
                <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>CORS ITSN</h3>
                <p className={`text-sm mt-2 mb-4 ${mutedText}`}>
                  Jaringan Continuously Operating Reference Stations ITS Nopember. Data pengamatan GNSS berkelanjutan dengan presisi tinggi.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    { label: 'Tipe', value: 'GNSS Continuous Obs.' },
                    { label: 'Format', value: 'RINEX 2 / RINEX 3' },
                    { label: 'Cakupan', value: 'Jawa Timur' },
                    { label: 'Interval', value: '30 detik' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className={mutedText}>{item.label}</span>
                      <span className={`font-mono font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full text-center text-sm font-medium py-2 rounded-lg border transition-colors ${
                  isDark
                    ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10'
                    : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                }`}>
                  Akses Data →
                </button>
              </div>
            </ScrollReveal>

            {/* GNSS Meteorologi — Coming Soon */}
            <ScrollReveal type="reveal-scale" delay={100}>
              <div className={`rounded-2xl border p-6 h-full opacity-80 ${cardBg}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-100'}`}>
                    <span className="text-2xl">🌤️</span>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    isDark
                      ? 'bg-slate-500/15 text-slate-400 border-slate-500/25'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    ○ {t.research.comingSoon}
                  </span>
                </div>
                <h3 className={`font-heading font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>GNSS Meteorologi</h3>
                <p className={`text-sm mt-2 mb-4 ${mutedText}`}>
                  Data Tropospheric Delay dan Precipitable Water Vapor (PWV) dari jaringan GNSS kampus ITS.
                </p>
                <div className="space-y-2 mb-5">
                  {[
                    { label: 'Tipe', value: 'PWV / ZTD' },
                    { label: 'Format', value: 'NetCDF / CSV' },
                    { label: 'Cakupan', value: 'Kampus ITS' },
                    { label: 'Status', value: 'Dalam Pengembangan' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span className={mutedText}>{item.label}</span>
                      <span className={`font-mono font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <button disabled className={`w-full text-center text-sm font-medium py-2 rounded-lg border cursor-not-allowed ${
                  isDark ? 'border-slate-500/20 text-slate-500' : 'border-slate-200 text-slate-400'
                }`}>
                  Segera Tersedia
                </button>
              </div>
            </ScrollReveal>

            {/* More datasets coming */}
            <ScrollReveal type="reveal-scale" delay={200}>
              <div className={`rounded-2xl border border-dashed p-6 flex flex-col items-center justify-center text-center min-h-[250px] ${
                isDark ? 'border-white/10' : 'border-slate-300'
              }`}>
                <span className={`text-4xl mb-3 ${isDark ? 'opacity-40' : 'opacity-30'}`}>+</span>
                <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Dataset lainnya akan ditambahkan</p>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>Sea Surface Height, Deformation Maps, dll.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Publications note ─── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className={`rounded-2xl p-8 border ${cardBg}`}>
              <p className={`text-sm mb-2 font-mono uppercase tracking-wider ${mutedText}`}>Publikasi</p>
              <h3 className={`font-heading text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Daftar Publikasi Lengkap
              </h3>
              <p className={`mb-6 ${mutedText}`}>
                Lihat seluruh publikasi dosen dan peneliti di profil Google Scholar, Scopus, dan Sinta
                masing-masing pada halaman Tim Dosen.
              </p>
              <a href="/tim" className="btn-secondary inline-flex">
                <MapPin size={16} />
                Halaman Tim Dosen
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
