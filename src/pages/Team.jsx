import { useState } from 'react';
import { Mail, ExternalLink, GraduationCap, BookOpen, User, Award, ChevronDown } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { teamMembers } from '../data';
import { useApp } from '../context/AppContext';
import { useT } from '../translations';

function TeamCard({ member, index }) {
  const [expanded, setExpanded] = useState(false);
  const { isDark } = useApp();

  const positionColors = {
    'Guru Besar': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Lektor Kepala': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Lektor': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Asisten Ahli': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    'Dosen Tidak Tetap': 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  };

  const posClass = positionColors[member.position] || positionColors['Asisten Ahli'];

  return (
    <ScrollReveal type="reveal-scale" delay={index * 100}>
      <div className={`border hover:border-blue-500/20 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 group ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
        {/* Card top */}
        <div className={`relative h-32 bg-gradient-to-br ${member.color}`}>
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829]/80 to-transparent" />

          {/* Decorative blobs */}
          <div className="absolute top-3 right-3 w-16 h-16 rounded-full bg-white/5 blur-xl" />
          <div className="absolute -bottom-2 left-6 w-20 h-20 rounded-full bg-black/20 blur-xl" />

          {/* Position badge */}
          {member.badge && (
            <div className="absolute top-3 left-3">
              <span className={`text-xs px-2.5 py-1 rounded-full border font-bold ${posClass} flex items-center gap-1`}>
                <Award size={11} />
                {member.badge}
              </span>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center -mt-10 mb-4 px-6">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} border-4 shadow-xl overflow-hidden flex items-center justify-center text-2xl font-bold font-heading text-white ${isDark ? 'border-[#0b1829]' : 'border-white'}`}>
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.textContent = member.initials;
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Name & position */}
          <div className="text-center mb-4">
            <h3 className={`font-heading font-bold text-lg leading-snug mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {member.name}
            </h3>
            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border font-medium ${posClass}`}>
              {member.position}
            </span>
          </div>

          {/* NIP/NIDN */}
          <div className="grid grid-cols-2 gap-2 mb-5">
            <div className={`text-center p-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-slate-500 text-xs mb-0.5">NIP</p>
              <p className={`text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{member.nip}</p>
            </div>
            <div className={`text-center p-2 rounded-lg border ${isDark ? 'bg-white/[0.03] border-white/8' : 'bg-slate-50 border-slate-200'}`}>
              <p className="text-slate-500 text-xs mb-0.5">NIDN</p>
              <p className={`text-xs font-mono ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{member.nidn}</p>
            </div>
          </div>

          {/* Email */}
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors mb-5 justify-center"
          >
            <Mail size={14} />
            {member.email}
          </a>

          {/* Expertise */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {member.expertise.map((e) => (
              <span key={e} className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                {e}
              </span>
            ))}
          </div>

          {/* Expandable section */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`w-full flex items-center justify-center gap-2 transition-colors text-xs font-medium py-2 border-t ${isDark ? 'border-white/5 text-slate-500 hover:text-white group-hover:text-slate-300' : 'border-slate-100 text-slate-400 hover:text-slate-700'}`}
          >
            {expanded ? 'Sembunyikan' : 'Lihat Detail'}
            <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {expanded && (
            <div className="mt-4 space-y-4">
              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={14} className="text-blue-400" />
                  <p className="text-blue-400 text-xs font-mono uppercase tracking-wider">Riwayat Pendidikan</p>
                </div>
                <ul className="space-y-1.5">
                  {member.education.map((edu, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                      {edu}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Courses */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={14} className="text-purple-400" />
                  <p className="text-purple-400 text-xs font-mono uppercase tracking-wider">Mata Kuliah</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.courses.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Publications */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ExternalLink size={14} className="text-amber-400" />
                  <p className="text-amber-400 text-xs font-mono uppercase tracking-wider">Publikasi</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.publications.scholar && (
                    <a href={member.publications.scholar} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20 transition-colors flex items-center gap-1">
                      Scholar <ExternalLink size={10} />
                    </a>
                  )}
                  {member.publications.scopus && (
                    <a href={member.publications.scopus} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors flex items-center gap-1">
                      Scopus <ExternalLink size={10} />
                    </a>
                  )}
                  {member.publications.sinta && (
                    <a href={member.publications.sinta} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-green-500/10 text-green-300 border border-green-500/20 hover:bg-green-500/20 transition-colors flex items-center gap-1">
                      Sinta <ExternalLink size={10} />
                    </a>
                  )}
                  {member.publications.researchgate && (
                    <a href={member.publications.researchgate} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 hover:bg-teal-500/20 transition-colors flex items-center gap-1">
                      ResearchGate <ExternalLink size={10} />
                    </a>
                  )}
                  {member.publications.cv && (
                    <a href={member.publications.cv} target="_blank" rel="noopener noreferrer"
                      className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1">
                      CV <ExternalLink size={10} />
                    </a>
                  )}
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

  return (
    <div>
      <PageHero
        title="Tim Dosen"
        subtitle="Our Team"
        breadcrumb={[{ label: 'Tim Dosen' }]}
        description="Kenali para dosen dan peneliti berpengalaman yang mendedikasikan diri untuk mengembangkan ilmu Geodesi dan Geodinamika."
      />

      {/* Team intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              {[
                { label: '5', desc: 'Dosen Aktif', icon: '👨‍🏫' },
                { label: '1', desc: 'Guru Besar', icon: '🏆' },
                { label: '1', desc: 'Lektor Kepala', icon: '🎓' },
                { label: '3+', desc: 'Gelar Doktor', icon: '🔬' },
              ].map((item) => (
                <div key={item.desc} className={`text-center p-5 min-w-[120px] rounded-2xl border ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className={`font-heading text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.desc}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Team grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Join note */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="card-glass rounded-2xl p-10 border border-blue-500/10">
              <User size={36} className="text-blue-400 mx-auto mb-4" />
              <h3 className={`font-heading text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bergabung sebagai Peneliti
              </h3>
              <p className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Tertarik bergabung dalam kegiatan penelitian atau membutuhkan pembimbing riset?
                Silakan hubungi salah satu dosen melalui email yang tersedia.
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

