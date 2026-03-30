export const translations = {
  id: {
    nav: {
      home: 'Beranda', about: 'Tentang Kami', research: 'Penelitian',
      team: 'Tim Dosen', news: 'Berita', contact: 'Kontak', cta: 'Hubungi Kami',
    },
    hero: {
      badge: 'Institut Teknologi Sepuluh Nopember — Surabaya',
      dept: 'Departemen Teknik Geomatika',
      desc: 'Mengembangkan ilmu dan teknologi geodesi serta geodinamika bertaraf nasional dan internasional melalui penelitian inovatif dan kolaborasi strategis.',
      cta1: 'Eksplorasi Penelitian', cta2: 'Tim Dosen', scroll: 'Scroll',
    },
    stats: {
      researchers: 'Dosen Peneliti', researchAreas: 'Bidang Riset',
      yearsActive: 'Tahun Aktif', publications: 'Publikasi Ilmiah',
    },
    sections: {
      vision: 'Visi Kami', research: 'Area Penelitian', news: 'Berita & GG Insight',
      team: 'Peneliti & Dosen', contact: 'Bergabunglah',
      viewAll: 'Semua Berita', meetTeam: 'Kenali Tim Kami',
      exploreResearch: 'Lihat Penelitian', learnMore: 'Selengkapnya',
      contactUs: 'Hubungi Kami', seeRoadmap: 'Lihat Roadmap Lengkap',
    },
    about: {
      title: 'Tentang Laboratorium', subtitle: 'Tentang Kami',
      visionTitle: 'Visi', missionTitle: 'Misi',
      goalsTitle: 'Tujuan', expertiseTitle: 'Bidang Keahlian',
    },
    research: {
      title: 'Penelitian', subtitle: 'Research & Development',
      areasTitle: 'Area Penelitian Utama',
      roadmapTitle: 'Peta Jalan Penelitian',
      dataTitle: 'Data Penelitian',
      dataDesc: 'Dataset dan data pengamatan yang tersedia dari jaringan instrumentasi Laboratorium Geodesi dan Geodinamika ITS.',
      available: 'Tersedia', comingSoon: 'Segera Hadir',
    },
    team: { title: 'Tim Dosen', subtitle: 'Our Team', viewDetail: 'Lihat Detail', hide: 'Sembunyikan' },
    news: { title: 'Berita & GG Insight', subtitle: 'News & Updates', filterAll: 'Semua' },
    contact: {
      title: 'Hubungi Kami', subtitle: 'Contact Us',
      sendMessage: 'Kirim Pesan', name: 'Nama Lengkap', email: 'Email',
      subject: 'Subjek', message: 'Pesan', send: 'Kirim',
      address: 'Alamat', location: 'Lokasi',
    },
    footer: {
      desc: 'Laboratorium berstandar nasional dan internasional dalam pengembangan ilmu dan teknologi di bidang Geodesi dan Geodinamika.',
      nav: 'Navigasi', expertise: 'Bidang Keahlian', follow: 'Ikuti Kami',
      rights: 'Hak cipta dilindungi.',
    },
    search: {
      placeholder: 'Cari penelitian, dosen, berita...', noResults: 'Tidak ada hasil ditemukan.',
      results: 'hasil ditemukan', pressEsc: 'tekan ESC untuk menutup',
    },
  },
  en: {
    nav: {
      home: 'Home', about: 'About Us', research: 'Research',
      team: 'Faculty', news: 'News', contact: 'Contact', cta: 'Contact Us',
    },
    hero: {
      badge: 'Institut Teknologi Sepuluh Nopember — Surabaya',
      dept: 'Department of Geomatics Engineering',
      desc: 'Advancing geodesy and geodynamics science and technology at national and international standards through innovative research and strategic collaboration.',
      cta1: 'Explore Research', cta2: 'Meet Faculty', scroll: 'Scroll',
    },
    stats: {
      researchers: 'Research Faculty', researchAreas: 'Research Areas',
      yearsActive: 'Years Active', publications: 'Publications',
    },
    sections: {
      vision: 'Our Vision', research: 'Research Areas', news: 'News & GG Insight',
      team: 'Researchers & Faculty', contact: 'Join Us',
      viewAll: 'All News', meetTeam: 'Meet Our Team',
      exploreResearch: 'View Research', learnMore: 'Learn More',
      contactUs: 'Contact Us', seeRoadmap: 'View Full Roadmap',
    },
    about: {
      title: 'About the Laboratory', subtitle: 'About Us',
      visionTitle: 'Vision', missionTitle: 'Mission',
      goalsTitle: 'Goals', expertiseTitle: 'Areas of Expertise',
    },
    research: {
      title: 'Research', subtitle: 'Research & Development',
      areasTitle: 'Key Research Areas',
      roadmapTitle: 'Research Roadmap',
      dataTitle: 'Research Data',
      dataDesc: 'Datasets and observational data available from the instrumentation network of the Geodesy and Geodynamics Laboratory, ITS.',
      available: 'Available', comingSoon: 'Coming Soon',
    },
    team: { title: 'Faculty Members', subtitle: 'Our Team', viewDetail: 'View Details', hide: 'Hide' },
    news: { title: 'News & GG Insight', subtitle: 'News & Updates', filterAll: 'All' },
    contact: {
      title: 'Contact Us', subtitle: 'Contact Us',
      sendMessage: 'Send a Message', name: 'Full Name', email: 'Email Address',
      subject: 'Subject', message: 'Message', send: 'Send',
      address: 'Address', location: 'Location',
    },
    footer: {
      desc: 'A national and international standard laboratory for the development of science and technology in Geodesy and Geodynamics.',
      nav: 'Navigation', expertise: 'Expertise', follow: 'Follow Us',
      rights: 'All rights reserved.',
    },
    search: {
      placeholder: 'Search research, faculty, news...', noResults: 'No results found.',
      results: 'results found', pressEsc: 'press ESC to close',
    },
  },
};

export function useT(lang) {
  return translations[lang] || translations.id;
}
