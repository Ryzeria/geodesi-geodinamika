import { useState } from 'react';
import { Mail, MapPin, Globe, ExternalLink, Send, CheckCircle } from 'lucide-react';
import PageHero from '../components/PageHero';
import ScrollReveal from '../components/ScrollReveal';
import { useApp } from '../context/AppContext';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Alamat',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    lines: [
      'Laboratorium Geodesi dan Geodinamika',
      'Departemen Teknik Geomatika',
      'Institut Teknologi Sepuluh Nopember',
      'Kampus ITS Sukolilo, Surabaya 60111',
      'Jawa Timur, Indonesia',
    ],
  },
  {
    icon: Mail,
    label: 'Email',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    lines: [
      'ekoyh@its.ac.id',
      'i.anjasmara@its.ac.id',
    ],
    isEmail: true,
  },
  {
    icon: Globe,
    label: 'Website',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    lines: ['geomatika.its.ac.id'],
    isLink: true,
    href: 'https://www.its.ac.id/geomatika',
  },
];

const dosenContacts = [
  { name: 'Prof. Dr. Eko Yuli Handoko', email: 'ekoyh@its.ac.id', role: 'Guru Besar', initials: 'EH', color: 'bg-amber-700' },
  { name: 'Ira Mutiara Anjasmara, Ph.D.', email: 'i.anjasmara@its.ac.id', role: 'Lektor Kepala', initials: 'IA', color: 'bg-purple-700' },
  { name: 'Akbar Kurniawan, S.T., M.T.', email: 'akbar@its.ac.id', role: 'Lektor', initials: 'AK', color: 'bg-teal-700' },
  { name: 'Putra Maulida, Ph.D.', email: 'putra@its.ac.id', role: 'Asisten Ahli', initials: 'PM', color: 'bg-cyan-700' },
];

export default function Contact() {
  const { isDark } = useApp();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const titleClass = isDark ? 'text-white' : 'text-slate-900';
  const bodyText = isDark ? 'text-slate-400' : 'text-slate-600';
  const cardBase = isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm';
  const labelClass = isDark ? 'text-slate-300' : 'text-slate-700';
  const inputClass = isDark
    ? 'bg-white/[0.05] border-white/10 text-white placeholder-slate-500 focus:border-blue-500/50 focus:bg-white/[0.08]'
    : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:bg-blue-50/30';
  const inputErrorClass = isDark ? 'border-red-500/50' : 'border-red-400';

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nama wajib diisi';
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Email tidak valid';
    if (!form.subject.trim()) e.subject = 'Subjek wajib diisi';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Pesan terlalu pendek';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    // Compose mailto
    const mailto = `mailto:ekoyh@its.ac.id?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Dari: ${form.name} (${form.email})\n\n${form.message}`)}`;
    window.location.href = mailto;
    setSent(true);
  };

  return (
    <div>
      <PageHero
        title="Hubungi Kami"
        subtitle="Contact Us"
        breadcrumb={[{ label: 'Kontak' }]}
        description="Sampaikan pertanyaan, kolaborasi penelitian, atau informasi lain yang ingin Anda tanyakan kepada kami."
      />

      {/* Contact info + form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Info */}
            <div className="space-y-6">
              <ScrollReveal type="reveal-left">
                <div>
                  <p className="section-subtitle mb-3">Informasi</p>
                  <h2 className={`section-title mb-6 ${titleClass}`}>
                    Mari <span className="gradient-text">Terhubung</span>
                  </h2>
                  <p className={`leading-relaxed ${bodyText}`}>
                    Kami terbuka untuk diskusi penelitian, kerjasama institusi, pertanyaan akademik,
                    maupun informasi umum tentang Laboratorium Geodesi dan Geodinamika ITS.
                  </p>
                </div>
              </ScrollReveal>

              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.label} type="reveal-left" delay={i * 100}>
                    <div className={`flex gap-4 p-5 rounded-2xl border ${isDark ? `${item.bg} ${item.border}` : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${isDark ? `${item.bg} ${item.border}` : `bg-slate-100 border-slate-200`}`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <div>
                        <p className={`text-xs font-mono uppercase tracking-wider ${item.color} mb-2`}>{item.label}</p>
                        {item.isLink ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-blue-400 transition-colors flex items-center gap-1.5 text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}
                          >
                            {item.lines[0]}
                            <ExternalLink size={12} />
                          </a>
                        ) : item.isEmail ? (
                          <div className="space-y-1">
                            {item.lines.map((l) => (
                              <a key={l} href={`mailto:${l}`} className={`hover:text-blue-400 transition-colors flex items-center gap-1.5 text-sm block ${isDark ? 'text-white' : 'text-slate-800'}`}>
                                {l}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            {item.lines.map((l, j) => (
                              <p key={j} className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{l}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}

              {/* Dosen contacts */}
              <ScrollReveal type="reveal-left" delay={400}>
                <div className={`p-5 rounded-2xl border ${cardBase}`}>
                  <p className={`text-xs font-mono uppercase tracking-wider mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Kontak Dosen</p>
                  <div className="space-y-3">
                    {dosenContacts.map((d) => (
                      <a
                        key={d.email}
                        href={`mailto:${d.email}`}
                        className={`flex items-center gap-3 rounded-xl p-2 -mx-2 transition-colors group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${d.color} flex items-center justify-center text-xs font-bold font-heading text-white flex-shrink-0 overflow-hidden`}>
                          <img
                            src={`/images/team/${d.initials.toLowerCase()}.jpg`}
                            alt={d.initials}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.textContent = d.initials; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate group-hover:text-blue-400 transition-colors ${isDark ? 'text-white' : 'text-slate-800'}`}>{d.name}</p>
                          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{d.email}</p>
                        </div>
                        <Mail size={14} className={`transition-colors flex-shrink-0 group-hover:text-blue-400 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right: Form */}
            <ScrollReveal type="reveal-right">
              <div className={`rounded-2xl p-8 border border-blue-500/10 ${isDark ? 'card-glass' : 'bg-white shadow-sm'}`}>
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle size={60} className="text-green-400 mx-auto mb-5" />
                    <h3 className={`font-heading text-2xl font-bold mb-3 ${titleClass}`}>Terima Kasih!</h3>
                    <p className={`mb-6 ${bodyText}`}>
                      Email client Anda telah terbuka. Silakan kirim pesan untuk menghubungi kami.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-secondary">
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <p className="section-subtitle mb-2">Formulir</p>
                      <h3 className={`font-heading text-2xl font-bold ${titleClass}`}>Kirim Pesan</h3>
                    </div>

                    {/* Name */}
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${labelClass}`}>
                        Nama Lengkap <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Masukkan nama Anda"
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${errors.name ? inputErrorClass : ''} ${inputClass}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${labelClass}`}>
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="nama@email.com"
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${errors.email ? inputErrorClass : ''} ${inputClass}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${labelClass}`}>
                        Subjek <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Topik pesan Anda"
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all ${errors.subject ? inputErrorClass : ''} ${inputClass}`}
                      />
                      {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-sm mb-2 font-medium ${labelClass}`}>
                        Pesan <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tuliskan pesan Anda di sini..."
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all resize-none ${errors.message ? inputErrorClass : ''} ${inputClass}`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center">
                      <Send size={18} />
                      Kirim Pesan
                    </button>

                    <p className={`text-xs text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Form ini akan membuka email client Anda. Anda dapat juga menghubungi langsung via email di atas.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl h-80">
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

