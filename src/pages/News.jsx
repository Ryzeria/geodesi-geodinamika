import { useState } from 'react';
import { ArrowRight, ExternalLink, Tag, Calendar, BookOpen } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { newsData } from '../data';
import { useApp } from '../context/AppContext';

function NewsCard({ item, index, featured = false, isDark }) {
  const cardBase = isDark
    ? `bg-white/[0.03] border ${item.border} hover:bg-white/[0.06]`
    : `bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200`;
  const titleClass = isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-600';
  const subtitleClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const excerptClass = isDark ? 'text-slate-300' : 'text-slate-600';
  const tagClass = isDark
    ? 'bg-white/5 text-slate-400 border-white/10'
    : 'bg-slate-100 text-slate-500 border-slate-200';
  const refBoxClass = isDark
    ? 'bg-white/[0.03] border-white/8'
    : 'bg-slate-50 border-slate-200';
  const refTextClass = isDark ? 'text-slate-400' : 'text-slate-600';
  const refLabelClass = isDark ? 'text-slate-500' : 'text-slate-400';
  const footerBorderClass = isDark ? 'border-white/5' : 'border-slate-100';
  const dateClass = isDark ? 'text-slate-500' : 'text-slate-400';
  const readMoreHref = item.doi || '/penelitian';
  const isExternal = !!item.doi;

  return (
    <ScrollReveal type="reveal-scale" delay={index * 100}>
      <article className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${cardBase} ${featured ? 'md:col-span-2' : ''}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-48'}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829]/90 via-[#0b1829]/30 to-transparent" />

          {/* Emoji center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-30 group-hover:opacity-50 transition-opacity">
            {item.emoji}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${item.badge}`}>
              {item.edition}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-black/40 text-white border border-white/10 font-medium">
              {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.map((tag) => (
              <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${tagClass}`}>
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className={`font-heading font-bold mb-2 transition-colors ${featured ? 'text-xl' : 'text-lg'} leading-snug ${titleClass}`}>
            {item.title}
          </h2>

          {/* Subtitle */}
          <p className={`text-sm mb-4 italic ${subtitleClass}`}>{item.subtitle}</p>

          {/* Excerpt */}
          <p className={`text-sm leading-relaxed mb-5 line-clamp-3 ${excerptClass}`}>
            {item.excerpt}
          </p>

          {/* Reference */}
          {item.reference && (
            <div className={`mb-5 p-3 rounded-xl border ${refBoxClass}`}>
              <div className="flex items-start gap-2">
                <BookOpen size={14} className="text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className={`text-xs mb-1 font-mono uppercase tracking-wider ${refLabelClass}`}>Referensi</p>
                  <p className={`text-xs leading-relaxed line-clamp-2 ${refTextClass}`}>{item.reference}</p>
                  {item.doi && (
                    <a
                      href={item.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 text-xs mt-1 flex items-center gap-1 hover:text-blue-300 transition-colors"
                    >
                      DOI Link <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className={`flex items-center justify-between pt-4 border-t ${footerBorderClass}`}>
            <div className={`flex items-center gap-1.5 text-xs ${dateClass}`}>
              <Calendar size={12} />
              {item.date}
            </div>
            <a
              href={readMoreHref}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-1.5 text-blue-400 text-xs font-medium hover:gap-2.5 transition-all hover:text-blue-300"
              onClick={(e) => e.stopPropagation()}
            >
              Selengkapnya
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function News() {
  const { isDark } = useApp();
  const [filter, setFilter] = useState('all');
  const categories = ['all', ...new Set(newsData.map((n) => n.category))];

  const filtered = filter === 'all' ? newsData : newsData.filter((n) => n.category === filter);

  return (
    <div>
      <PageHero
        title="Berita & GG Insight"
        subtitle="News & Updates"
        breadcrumb={[{ label: 'Berita' }]}
        description="Temukan artikel ilmiah, insight penelitian, dan kegiatan terbaru dari Laboratorium Geodesi dan Geodinamika ITS."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                    filter === cat
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : isDark
                        ? 'bg-white/[0.03] text-slate-400 border border-white/10 hover:text-white hover:bg-white/5'
                        : 'bg-white text-slate-500 border border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm'
                  }`}
                >
                  {cat === 'all' ? 'Semua' : cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} featured={i === 0 && filter === 'all'} isDark={isDark} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              <div className="text-5xl mb-4">📭</div>
              <p>Tidak ada berita untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* GG Insight intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className={`rounded-2xl p-10 border border-blue-500/10 text-center ${isDark ? 'card-glass' : 'bg-white shadow-sm'}`}>
              <div className="text-4xl mb-4">📡</div>
              <h3 className={`font-heading text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tentang GG Insight
              </h3>
              <p className={`leading-relaxed max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                GG Insight adalah seri konten ilmiah populer dari Laboratorium Geodesi dan
                Geodinamika ITS yang mengangkat topik penelitian terkini dengan bahasa yang
                mudah dipahami. Setiap edisi menampilkan temuan penelitian terbaru dari
                civitas akademika laboratorium.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
