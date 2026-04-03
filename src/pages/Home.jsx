import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, Satellite, Waves, Zap, Mountain,
  ChevronDown, BookOpen, Users, FlaskConical, Award, Mail, Database
} from 'lucide-react';
import ParticleCanvas from '../components/ParticleCanvas';
import ScrollReveal from '../components/ScrollReveal';
import { researchAreas, newsData, stats } from '../data';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

/* ─── Stat Counter ─── */
function StatCard({ value, suffix, label, icon, delay = 0, isDark }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 1800;
      const step = (ts) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        setCount(Math.floor(ease * value));
        if (prog < 1) requestAnimationFrame(step);
        else setCount(value);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, value, delay]);

  return (
    <div ref={ref} className="text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="font-heading text-4xl lg:text-5xl font-black mb-1 text-white">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-blue-200">{label}</div>
    </div>
  );
}

/* ─── Research Card ─── */
const areaIcons = { geoid: Globe, geodesy: Satellite, sealevel: Waves, earthquake: Mountain, deformation: Zap };
const areaColors = {
  geoid: { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', hover: 'hover:border-blue-400/60 hover:shadow-blue-500/20' },
  geodesy: { text: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10', hover: 'hover:border-purple-400/60 hover:shadow-purple-500/20' },
  sealevel: { text: 'text-teal-400', border: 'border-teal-500/30', bg: 'bg-teal-500/10', hover: 'hover:border-teal-400/60 hover:shadow-teal-500/20' },
  earthquake: { text: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/10', hover: 'hover:border-red-400/60 hover:shadow-red-500/20' },
  deformation: { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', hover: 'hover:border-amber-400/60 hover:shadow-amber-500/20' },
};

function ResearchCard({ area, index, isDark }) {
  const Icon = areaIcons[area.id] || Globe;
  const c = areaColors[area.id];
  const cardBase = isDark
    ? `bg-white/[0.03] border ${c.border}`
    : `bg-white border ${c.border} shadow-sm`;
  return (
    <ScrollReveal type="reveal" delay={index * 80}>
      <Link
        to="/penelitian"
        className={`block p-6 rounded-2xl ${cardBase} ${c.hover} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full`}
      >
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.bg} ${c.text} mb-4 text-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} />
        </div>
        <h3 className={`font-heading font-bold text-lg mb-2 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {area.title}
        </h3>
        <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{area.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {area.topics.slice(0, 2).map((topic) => (
            <span key={topic} className={`text-xs px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border}`}>
              {topic}
            </span>
          ))}
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ─── News Mini Card ─── */
function NewsMiniCard({ item, index, isDark }) {
  const cardClass = isDark
    ? 'bg-white/[0.03] border-white/8 hover:border-blue-500/30 hover:bg-blue-500/5'
    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 shadow-sm';
  return (
    <ScrollReveal type="reveal" delay={index * 100}>
      <Link
        to="/berita"
        className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 group ${cardClass}`}
      >
        <div className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} border ${item.border} flex items-center justify-center text-2xl overflow-hidden relative`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="absolute">{item.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <span className={`text-xs px-2 py-0.5 rounded-full border ${item.badge} font-medium`}>
            {item.edition}
          </span>
          <h4 className={`font-semibold text-sm mt-1 leading-snug group-hover:text-blue-400 transition-colors line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {item.title}
          </h4>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{item.date}</p>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ─── Home Page ─── */
export default function Home() {
  const [heroVisible, setHeroVisible] = useState(false);
  const { isDark, lang } = useApp();
  const t = useT(lang);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    document.getElementById('content-start')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background — light or dark */}
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[#0b1829]" />
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-3xl pointer-events-none" />
            <ParticleCanvas />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/60 to-white" />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/70 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/80 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4" />
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-100/60 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-10">

          {/* Large logo */}
          <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-3xl flex items-center justify-center shadow-2xl mb-8 mx-auto ${
              isDark ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/30' : 'bg-gradient-to-br from-blue-600 to-blue-800 shadow-blue-500/25'
            }`}>
              <img
                src="/images/its-logo.png"
                alt="ITS Logo"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-white font-black text-4xl font-heading">GG</span>';
                }}
              />
            </div>
          </div>

          {/* University badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 delay-100 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } ${isDark
            ? 'bg-blue-500/10 border border-blue-500/25 text-blue-300'
            : 'bg-blue-100 border border-blue-200 text-blue-700'
          }`}>
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`} />
            Institut Teknologi Sepuluh Nopember — Surabaya
          </div>

          {/* Main title */}
          <h1 className={`font-heading font-black leading-none mb-5 transition-all duration-700 delay-150 text-5xl sm:text-6xl md:text-7xl lg:text-8xl ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className={isDark ? 'text-white' : 'text-slate-900'}>Lab. </span>
            <span className="gradient-text">Geodesi</span>
            <br />
            <span className={isDark ? 'text-white' : 'text-slate-900'}>&amp; </span>
            <span className="gradient-text-gold">Geodinamika</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg sm:text-xl font-light mb-3 transition-all duration-700 delay-200 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Departemen Teknik Geomatika
          </p>

          <p className={`text-base max-w-2xl mx-auto mb-8 leading-relaxed transition-all duration-700 delay-300 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          } ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Mengembangkan ilmu dan teknologi geodesi serta geodinamika bertaraf nasional dan
            internasional melalui penelitian inovatif dan kolaborasi strategis.
          </p>

          {/* Tag pills */}
          <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-400 ${
            heroVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            {['🌍 Geodesi', '📡 GNSS', '🌊 Altimetri', '⚡ Deformasi', '🌋 Geodinamika'].map((tag) => (
              <span key={tag} className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                isDark
                  ? 'bg-white/5 border-white/15 text-slate-300'
                  : 'bg-white border-blue-200 text-blue-700 shadow-sm'
              }`}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className={`flex flex-wrap items-center justify-center gap-3 mb-14 transition-all duration-700 delay-500 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <Link to="/penelitian" className="btn-primary">
              Eksplorasi Penelitian <ArrowRight size={18} />
            </Link>
            <Link to="/data" className="btn-gold">
              <Database size={16} />
              Akses Data GNSS
            </Link>
            <Link to="/tim" className="btn-secondary">
              Tim Dosen
            </Link>
          </div>

          {/* Stats bar */}
          <div className={`w-full max-w-3xl transition-all duration-700 delay-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className={`rounded-2xl px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 border ${
              isDark
                ? 'bg-white/5 border-white/10 backdrop-blur-sm'
                : 'bg-white/80 border-blue-100 shadow-xl shadow-blue-500/8 backdrop-blur-sm'
            }`}>
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`font-heading text-3xl font-black ${isDark ? 'text-white' : 'text-blue-700'}`}>
                    {s.value}{s.suffix}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button onClick={scrollToContent}
          className={`relative z-10 flex flex-col items-center gap-2 transition-all duration-500 pb-6 ${
            heroVisible ? 'opacity-100' : 'opacity-0'
          } ${isDark ? 'text-slate-500 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}
        >
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </button>
      </section>

      {/* ──────────── STATS (animated counters) ──────────── */}
      <section id="content-start" className={`py-16 relative overflow-hidden ${isDark ? '' : 'bg-white'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-10 md:p-12 border shadow-2xl ${isDark ? 'card-glass border-blue-500/10 shadow-blue-500/5' : 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-500'}`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14">
              {stats.map((s, i) => (
                <StatCard key={s.label} {...s} delay={i * 200} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── VISION ──────────── */}
      <section className={`py-20 relative overflow-hidden ${isDark ? '' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal type="reveal-left">
              <div>
                <p className="section-subtitle mb-3">Visi Kami</p>
                <h2 className={`section-title mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Standar{' '}
                  <span className="gradient-text">Nasional</span>{' '}
                  &amp; Internasional
                </h2>
                <p className={`text-lg leading-relaxed mb-8 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Menjadi laboratorium berstandar nasional dan internasional dalam pengembangan
                  ilmu dan teknologi di bidang Geodesi dan Geodinamika — mendorong inovasi
                  yang berdampak nyata bagi masyarakat dan sains global.
                </p>
                <Link to="/tentang" className="btn-primary inline-flex">
                  Selengkapnya
                  <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal type="reveal-right">
              <div className="relative">
                {/* Lab photo */}
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <img
                    src="/images/lab-photo.jpg"
                    alt="Laboratorium Geodesi dan Geodinamika"
                    className="w-full h-72 lg:h-96 object-cover"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-72 lg:h-96 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                          <div class="text-center">
                            <div class="text-6xl mb-4">🔭</div>
                            <p class="text-slate-400 font-mono text-sm">lab-photo.jpg</p>
                            <p class="text-slate-500 text-xs mt-1">Foto Laboratorium</p>
                          </div>
                        </div>`;
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0b1829]/60' : 'from-slate-900/40'} to-transparent`} />
                </div>

                {/* Floating badges */}
                <div className={`absolute -bottom-4 -left-4 border border-blue-500/30 rounded-2xl p-4 shadow-xl ${isDark ? 'bg-[#0f2040]' : 'bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <FlaskConical size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>5 Bidang Riset</p>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Aktif & Berkembang</p>
                    </div>
                  </div>
                </div>

                <div className={`absolute -top-4 -right-4 border border-amber-500/30 rounded-2xl p-4 shadow-xl ${isDark ? 'bg-[#0f2040]' : 'bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Award size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Guru Besar</p>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Prof. Eko Y. Handoko</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ──────────── RESEARCH AREAS ──────────── */}
      <section className={`py-20 relative overflow-hidden ${isDark ? '' : 'bg-slate-50'}`}>
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Bidang Keahlian</p>
              <h2 className={`section-title mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Area <span className="gradient-text">Penelitian</span>
              </h2>
              <p className={`max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Lima bidang riset utama yang menjadi fokus pengembangan ilmu dan teknologi
                di Laboratorium Geodesi dan Geodinamika ITS.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area, i) => (
              <ResearchCard key={area.id} area={area} index={i} isDark={isDark} />
            ))}
            {/* CTA card */}
            <ScrollReveal type="reveal" delay={5 * 80}>
              <Link
                to="/penelitian"
                className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed transition-all duration-300 group h-full min-h-[220px] ${
                  isDark
                    ? 'border-white/15 hover:border-blue-500/40 hover:bg-blue-500/5'
                    : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <ArrowRight size={22} className={`${isDark ? 'text-slate-400' : 'text-slate-400'} group-hover:text-blue-400 transition-colors`} />
                </div>
                <p className={`font-medium text-sm text-center group-hover:text-blue-500 transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Lihat Roadmap Penelitian Lengkap
                </p>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ──────────── LATEST NEWS ──────────── */}
      <section className={`py-20 relative overflow-hidden ${isDark ? '' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <ScrollReveal type="reveal-left">
              <div>
                <p className="section-subtitle mb-3">Terbaru</p>
                <h2 className={`section-title ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Berita &amp; <span className="gradient-text">GG Insight</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal type="reveal-right">
              <Link
                to="/berita"
                className="hidden md:flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
              >
                Semua Berita
                <ArrowRight size={16} />
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {newsData.map((item, i) => (
              <NewsMiniCard key={item.id} item={item} index={i} isDark={isDark} />
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-8 text-center md:hidden">
              <Link to="/berita" className="btn-secondary">
                Semua Berita
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────── TEAM TEASER ──────────── */}
      <section className={`py-20 relative overflow-hidden ${isDark ? '' : 'bg-slate-50'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-3xl p-10 md:p-16 border border-blue-500/10 text-center overflow-hidden relative ${isDark ? 'card-glass' : 'bg-white shadow-lg'}`}>
            <div className="absolute inset-0 bg-grid opacity-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

            <ScrollReveal>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="flex -space-x-3">
                    {['MT', 'IA', 'EH', 'AK', 'PM'].map((init, i) => (
                      <div
                        key={init}
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold font-heading overflow-hidden ${isDark ? 'border-[#0f2040]' : 'border-white'}`}
                        style={{ background: ['#1d4ed8', '#7c3aed', '#d97706', '#0d9488', '#0891b2'][i] }}
                      >
                        <img
                          src={`/images/team/${['taufik', 'ira', 'eko', 'akbar', 'putra'][i]}.jpg`}
                          alt={init}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.textContent = init; }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <p className="section-subtitle mb-3">Tim Kami</p>
                <h2 className={`section-title mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Peneliti &amp; <span className="gradient-text">Dosen</span> Berpengalaman
                </h2>
                <p className={`max-w-lg mx-auto mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Lima dosen peneliti dengan keahlian khusus di bidang Geodesi dan Geodinamika,
                  berpengalaman dari universitas nasional dan internasional terkemuka.
                </p>
                <Link to="/tim" className="btn-primary">
                  <Users size={18} />
                  Kenali Tim Kami
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ──────────── CTA FOOTER ──────────── */}
      <section className={`py-20 relative overflow-hidden ${isDark ? '' : 'bg-white'}`}>
        {isDark && <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] to-transparent" />}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="section-subtitle mb-4">Bergabunglah Bersama Kami</p>
            <h2 className={`section-title mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Tertarik Berkolaborasi atau{' '}
              <span className="gradient-text-gold">Ingin Tahu Lebih?</span>
            </h2>
            <p className={`text-lg mb-10 max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hubungi kami untuk informasi penelitian, kolaborasi, atau peluang pengembangan
              ilmu di bidang Geodesi dan Geodinamika.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/kontak" className="btn-gold">
                <Mail size={18} />
                Hubungi Kami
              </Link>
              <Link to="/penelitian" className={`btn-secondary ${isDark ? '' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                <BookOpen size={18} />
                Lihat Penelitian
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

