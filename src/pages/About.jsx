import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Target, Eye, Heart } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { useApp } from '../context/AppContext';

const missions = [
  "Menyelenggarakan pendidikan dalam bidang keahlian Geodesi dan Geodinamika.",
  "Mengembangkan penelitian maju dan inovatif dalam bidang Geodesi dan Geodinamika sebagai kontribusi pengembangan keilmuan dan profesi di tingkat nasional dan internasional.",
  "Menjalin kerjasama maupun pengabdian kepada masyarakat untuk berkontribusi bagi penyelesaian permasalahan di bidang Geodesi dan Geodinamika.",
];

const goals = [
  {
    icon: "🔬",
    title: "Pengembangan Ilmu & Teknologi",
    desc: "Mengembangkan ilmu pengetahuan dan teknologi di bidang Geodesi dan Geodinamika secara berkelanjutan.",
    color: "blue",
  },
  {
    icon: "📄",
    title: "Karya Ilmiah & Inovatif",
    desc: "Menghasilkan karya ilmiah dan inovatif di bidang Geodesi-Geodinamika yang berdampak nyata.",
    color: "amber",
  },
];

const expertiseItems = [
  { label: "Geodesi", icon: "🌐", desc: "Pengukuran dan pemetaan bumi dengan metode modern" },
  { label: "Geodinamika", icon: "⚡", desc: "Dinamika dan perubahan geometri bumi" },
  { label: "Deformasi", icon: "🔀", desc: "Monitoring perubahan bentuk permukaan bumi" },
  { label: "Altimetri", icon: "🛰️", desc: "Pengukuran ketinggian menggunakan satelit" },
  { label: "Geoid", icon: "🌍", desc: "Permodelan bentuk ekuipotensial bumi" },
];

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: 'bg-blue-500/20' },
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', icon: 'bg-amber-500/20' },
};

export default function About() {
  const { isDark } = useApp();
  const cardBg = isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm';
  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const bodyText = isDark ? 'text-slate-300' : 'text-slate-600';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div>
      <PageHero
        title="Tentang Laboratorium"
        subtitle="Tentang Kami"
        breadcrumb={[{ label: 'Tentang Kami' }]}
        description="Mengenal lebih dekat Laboratorium Geodesi dan Geodinamika — visi, misi, tujuan, dan bidang keahlian kami."
      />

      {/* ─── Lab intro ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <ScrollReveal type="reveal-left">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/10">
                  <img
                    src="/images/lab-photo.jpg"
                    alt="Lab Interior"
                    className="w-full h-80 object-cover"
                    onError={(e) => {
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-80 bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center rounded-2xl">
                          <div class="text-center">
                            <div class="text-7xl mb-4">🔭</div>
                            <p class="text-slate-400 text-sm font-mono">lab-photo.jpg</p>
                          </div>
                        </div>`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829]/70 via-transparent to-transparent" />
                </div>
                {/* ITS logo badge */}
                <div className="absolute -bottom-5 -right-5 bg-[#0f2040] border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                  <img
                    src="/images/its-logo.png"
                    alt="ITS"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML += '<div class="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm">ITS</div>';
                    }}
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">Institut Teknologi</p>
                    <p className="text-blue-400 text-xs font-mono">Sepuluh Nopember</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal type="reveal-right">
              <div>
                <p className="section-subtitle mb-3">Profil Laboratorium</p>
                <h2 className={`section-title mb-6 ${titleClass}`}>
                  Pusat Riset <span className="gradient-text">Geodesi</span> &amp;{' '}
                  <span className="gradient-text-gold">Geodinamika</span>
                </h2>
                <p className={`leading-relaxed mb-4 ${bodyText}`}>
                  Laboratorium Geodesi dan Geodinamika merupakan unit riset dan pendidikan
                  di bawah Departemen Teknik Geomatika, Institut Teknologi Sepuluh Nopember (ITS)
                  Surabaya.
                </p>
                <p className={`leading-relaxed mb-6 ${mutedText}`}>
                  Laboratorium ini berfokus pada pengembangan ilmu dan teknologi di bidang
                  geodesi, geodinamika, deformasi, altimetri, dan geoid — berkontribusi pada
                  penelitian berstandar internasional dan penyelesaian permasalahan nyata
                  di Indonesia.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Riset Internasional', 'Publikasi Ilmiah', 'Pengabdian Masyarakat', 'Kolaborasi Industri'].map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/penelitian" className="btn-primary">
                  Lihat Penelitian
                  <ArrowRight size={18} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Landasan</p>
              <h2 className={`section-title ${titleClass}`}>
                Visi &amp; <span className="gradient-text">Misi</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Vision */}
            <ScrollReveal type="reveal-left">
              <div className={`h-full p-8 rounded-2xl shadow-xl ${isDark ? 'bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/20 shadow-blue-500/5' : 'bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500 shadow-blue-500/20'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Eye size={22} className="text-blue-200" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-mono uppercase tracking-wider">Vision</p>
                    <h3 className="font-heading text-xl font-bold text-white">Visi</h3>
                  </div>
                </div>
                <div className="relative pl-4 border-l-2 border-white/30">
                  <p className="text-white/90 text-lg leading-relaxed italic">
                    "Menjadi laboratorium berstandar nasional dan internasional dalam pengembangan
                    ilmu dan teknologi di bidang Geodesi dan Geodinamika."
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Standar Nasional', 'Standar Internasional', 'Inovasi Teknologi'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-white/15 text-white border border-white/25">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal type="reveal-right">
              <div className={`h-full p-8 rounded-2xl shadow-xl ${isDark ? 'bg-gradient-to-br from-amber-900/30 to-amber-950/30 border border-amber-500/20 shadow-amber-500/5' : 'bg-gradient-to-br from-amber-500 to-amber-700 border border-amber-400 shadow-amber-500/20'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Target size={22} className="text-amber-200" />
                  </div>
                  <div>
                    <p className="text-amber-200 text-xs font-mono uppercase tracking-wider">Mission</p>
                    <h3 className="font-heading text-xl font-bold text-white">Misi</h3>
                  </div>
                </div>
                <ul className="space-y-4">
                  {missions.map((m, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle size={18} className="text-white/80 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90 text-sm leading-relaxed">{m}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Goals ─── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Tujuan</p>
              <h2 className={`section-title ${titleClass}`}>
                Yang Ingin Kami <span className="gradient-text">Capai</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {goals.map((g, i) => {
              const c = colorMap[g.color];
              return (
                <ScrollReveal key={i} type="reveal-scale" delay={i * 150}>
                  <div className={`p-8 rounded-2xl ${c.bg} border ${c.border} shadow-xl`}>
                    <div className={`w-16 h-16 rounded-2xl ${c.icon} flex items-center justify-center text-3xl mb-5`}>
                      {g.icon}
                    </div>
                    <h3 className={`font-heading text-xl font-bold mb-3 ${titleClass}`}>{g.title}</h3>
                    <p className={`leading-relaxed ${bodyText}`}>{g.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Expertise / Fields ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-subtitle mb-3">Kompetensi</p>
              <h2 className={`section-title ${titleClass}`}>
                Bidang <span className="gradient-text">Keahlian</span>
              </h2>
              <p className={`mt-4 max-w-xl mx-auto ${mutedText}`}>
                Lima bidang keahlian utama yang menjadi pilar keilmuan Laboratorium
                Geodesi dan Geodinamika ITS.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4">
            {expertiseItems.map((item, i) => (
              <ScrollReveal key={item.label} type="reveal-scale" delay={i * 80}>
                <div className={`group flex flex-col items-center p-6 rounded-2xl border hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 hover:-translate-y-1 w-44 text-center cursor-default ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 block">
                    {item.icon}
                  </span>
                  <p className={`font-heading font-bold text-sm mb-2 ${titleClass}`}>{item.label}</p>
                  <p className={`text-xs leading-relaxed ${mutedText}`}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="card-glass rounded-3xl p-12 border border-blue-500/10">
              <Heart size={40} className="text-red-400 mx-auto mb-5" />
              <h2 className={`section-title mb-4 ${titleClass}`}>
                Bergabunglah dalam <span className="gradient-text">Misi</span> Kami
              </h2>
              <p className={`mb-8 max-w-lg mx-auto ${mutedText}`}>
                Bersama-sama kita kembangkan ilmu Geodesi dan Geodinamika untuk masa
                depan yang lebih baik.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/tim" className="btn-primary">
                  Kenali Tim Kami <ArrowRight size={16} />
                </Link>
                <Link to="/kontak" className="btn-secondary">
                  Hubungi Kami
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
