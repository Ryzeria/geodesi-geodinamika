import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Team from './pages/Team';
import News from './pages/News';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <SearchModal />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<About />} />
          <Route path="/penelitian" element={<Research />} />
          <Route path="/tim" element={<Team />} />
          <Route path="/berita" element={<News />} />
          <Route path="/kontak" element={<Contact />} />
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <p className="text-blue-400 font-mono text-sm uppercase tracking-widest mb-4">404</p>
        <h1 className="font-heading text-5xl font-black text-white mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-400 mb-8">Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
        <a href="/" className="btn-primary inline-flex">Kembali ke Beranda</a>
      </div>
    </div>
  );
}
