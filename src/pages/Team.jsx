import { useState } from 'react';
import { Mail, ExternalLink, GraduationCap, BookOpen, ChevronDown, Shield } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { teamMembers } from '../data';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

/* Google Scholar SVG icon */
function ScholarIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z" />
    </svg>
  );
}

const positionColors = {
  'Guru Besar': { chip: 'bg-amber-100 text-amber-800 border-amber-300', bar: 'bg-amber-500' },
  'Lektor Kepala': { chip: 'bg-blue-100 text-blue-800 border-blue-300', bar: 'bg-blue-500' },
  'Lektor': { chip: 'bg-purple-100 text-purple-800 border-purple-300', bar: 'bg-purple-500' },
  'Asisten Ahli': { chip: 'bg-teal-100 text-teal-800 border-teal-300', bar: 'bg-teal-500' },
};

function TeamCard({ member, index }) {
  const [expanded, setExpanded] = useState(false);
  const { isDark } = useApp();
  const pos = positionColors[member.position] || positionColors['Asisten Ahli'];

  const cardClass = isDark
    ? 'bg-[#0f2040] border-white/10 hover:border-blue-500/30'
    : 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-blue-300';

  return (
    <ScrollReveal type="reveal-scale" delay={index * 120}>
      <div className={`rounded-2xl overflow-hidden border transition-all duration-300 ${cardClass}`}>

        {/* Full-size photo area */}
        <div className="relative h-72 sm:h-80 overflow-hidden">
          {/* Gradient top bar (accent color) */}
          <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.color} z-10`} />

          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML += `
                <div class="absolute inset-0 bg-gradient-to-br ${member.color} flex items-center justify-center">
                  <span class="text-white font-black text-6xl font-heading opacity-60">${member.initials}</span>
                </div>`;
            }}
          />

          {/* Gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Name + position overlaid on photo */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            {member.badge && (
              <div className="flex items-center gap-1.5 mb-2">
                <Shield size={12} className="text-amber-400" />
                <span className="text-amber-300 text-xs font-bold uppercase tracking-wider">{member.badge}</span>
              </div>
            )}
            <h3 className="font-heading font-bold text-white text-xl leading-tight mb-2">
              {member.name}
            </h3>
            <span className={`inline-flex items-center text-xs px-3 py-1 rounded-full border font-semibold ${pos.chip}`}>
              {member.position}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5">
          {/* Contact & expertise */}
          <div className="flex flex-col gap-3 mb-4">
            <a
              href={`mailto:${member.email}`}
              className={`flex items-center gap-2 text-sm transition-colors hover:text-blue-400 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              <Mail size={14} className="text-blue-400 flex-shrink-0" />
              {member.email}
            </a>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {member.expertise.map((e) => (
              <span key={e} className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                isDark ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
              }`}>
                {e}
              </span>
            ))}
          </div>

          {/* Publication links */}
          <div className="flex items-center gap-2 mb-4">
            {member.publications.scholar && (
              <a href={member.publications.scholar} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20"
                title="Google Scholar">
                <ScholarIcon size={13} /> Scholar
              </a>
            )}
            {member.publications.scopus && (
              <a href={member.publications.scopus} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
                title="Scopus">
                <ExternalLink size={11} /> Scopus
              </a>
            )}
            {member.publications.sinta && (
              <a href={member.publications.sinta} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                title="Sinta">
                <ExternalLink size={11} /> Sinta
              </a>
            )}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-full flex items-center justify-center gap-2 text-xs font-medium py-2.5 rounded-xl border transition-all ${
              isDark
                ? 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            {expanded ? 'Sembunyikan Detail' : 'Lihat Detail'}
            <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Expanded details */}
          {expanded && (
            <div className={`mt-4 pt-4 border-t space-y-4 ${isDark ? 'border-white/8' : 'border-slate-100'}`}>
              {/* NIP/NIDN */}
              <div className={`grid grid-cols-2 gap-2 text-xs`}>
                <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} mb-0.5`}>NIP</p>
                  <p className={`font-mono font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{member.nip}</p>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-50 border-slate-200'}`}>
                  <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} mb-0.5`}>NIDN</p>
                  <p className={`font-mono font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{member.nidn}</p>
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={13} className="text-blue-400" />
                  <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Pendidikan</p>
                </div>
                <ul className="space-y-1.5">
                  {member.education.map((edu, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 mt-1.5 flex-shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Courses */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={13} className="text-purple-400" />
                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Mata Kuliah</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.courses.map((c) => (
                    <span key={c} className={`text-xs px-2 py-0.5 rounded-full border ${
                      isDark ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function Team() {
  const { isDark, lang } = useApp();
  const t = useT(lang);
  const titleClass = isDark ? 'text-white' : 'text-slate-900';

  return (
    <div>
      <PageHero
        title="Tim Dosen"
        subtitle="Our Team"
        breadcrumb={[{ label: 'Tim Dosen' }]}
        description="Kenali para dosen dan peneliti berpengalaman yang mendedikasikan diri untuk mengembangkan ilmu Geodesi dan Geodinamika."
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Team grid — 4 cards, full photo */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Join note */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className={`rounded-2xl p-10 border border-blue-500/10 ${isDark ? 'card-glass' : 'bg-white shadow-sm'}`}>
              <Mail size={36} className="text-blue-400 mx-auto mb-4" />
              <h3 className={`font-heading text-2xl font-bold mb-3 ${titleClass}`}>
                Bergabung sebagai Peneliti
              </h3>
              <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Tertarik bergabung dalam kegiatan penelitian atau membutuhkan pembimbing riset?
                Silakan hubungi salah satu dosen melalui email yang tersedia di atas.
              </p>
              <a href="/kontak" className="btn-primary inline-flex">
                <Mail size={16} />
                Hubungi Kami
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
