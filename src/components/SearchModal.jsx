import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, FileText, Users, FlaskConical } from 'lucide-react';
import { teamMembers, newsData, researchAreas } from '../data';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

const buildItems = () => [
  ...teamMembers.map(m => ({
    type: 'team', icon: <Users size={14} />, label: 'Tim Dosen',
    title: m.name, subtitle: m.position, href: '/tim',
    keywords: [m.name, m.position, ...m.expertise, ...m.courses].join(' ').toLowerCase(),
  })),
  ...newsData.map(n => ({
    type: 'news', icon: <FileText size={14} />, label: 'Berita',
    title: n.title, subtitle: n.edition, href: '/berita',
    keywords: [n.title, n.subtitle, n.category, ...n.tags].join(' ').toLowerCase(),
  })),
  ...researchAreas.map(r => ({
    type: 'research', icon: <FlaskConical size={14} />, label: 'Penelitian',
    title: r.title, subtitle: r.description, href: '/penelitian',
    keywords: [r.title, r.description, ...r.topics].join(' ').toLowerCase(),
  })),
];

const allItems = buildItems();

export default function SearchModal() {
  const { isDark, searchOpen, setSearchOpen, lang } = useApp();
  const t = useT(lang);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const results = query.trim().length > 1
    ? allItems.filter(item => item.keywords.includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const bg = isDark ? 'bg-[#0f2040]' : 'bg-white';
  const border = isDark ? 'border-white/10' : 'border-slate-200';
  const inputBg = isDark ? 'bg-white/5' : 'bg-slate-50';
  const textClass = isDark ? 'text-white' : 'text-slate-900';
  const mutedClass = isDark ? 'text-slate-400' : 'text-slate-500';
  const hoverClass = isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50';
  const typeColors = {
    team: isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700',
    news: isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-700',
    research: isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700',
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
      onClick={() => setSearchOpen(false)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative w-full max-w-2xl ${bg} border ${border} rounded-2xl shadow-2xl overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className={`flex items-center gap-3 px-5 py-4 border-b ${border}`}>
          <Search size={18} className={mutedClass} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className={`flex-1 bg-transparent ${textClass} placeholder-slate-500 outline-none text-base`}
          />
          <div className="flex items-center gap-2">
            <span className={`hidden sm:inline text-xs ${mutedClass} font-mono`}>ESC</span>
            <button onClick={() => setSearchOpen(false)} className={`p-1 rounded-lg ${hoverClass} ${mutedClass}`}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query.trim().length > 1 && results.length === 0 && (
            <div className={`py-10 text-center ${mutedClass} text-sm`}>
              {t.search.noResults}
            </div>
          )}
          {results.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              onClick={() => setSearchOpen(false)}
              className={`flex items-start gap-3 px-5 py-3.5 ${hoverClass} transition-colors`}
            >
              <span className={`mt-0.5 p-1.5 rounded-lg ${typeColors[item.type]}`}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${textClass}`}>{item.title}</p>
                <p className={`text-xs ${mutedClass} truncate mt-0.5`}>{item.subtitle}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[item.type]}`}>{item.label}</span>
            </Link>
          ))}
          {query.trim().length <= 1 && (
            <div className={`py-6 px-5 text-xs ${mutedClass}`}>
              <p className="mb-3 font-medium">Telusuri konten:</p>
              <div className="flex flex-wrap gap-2">
                {['GNSS', 'Geoid', 'Deformasi', 'Altimetri', 'Sea Level', 'Geodinamika'].map(k => (
                  <button
                    key={k}
                    onClick={() => setQuery(k)}
                    className={`px-3 py-1.5 rounded-full ${inputBg} border ${border} hover:border-blue-400/50 transition-colors`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-5 py-2.5 border-t ${border} flex justify-between text-xs ${mutedClass}`}>
          <span>{query.trim().length > 1 ? `${results.length} ${t.search.results}` : ''}</span>
          <span>{t.search.pressEsc}</span>
        </div>
      </div>
    </div>
  );
}
