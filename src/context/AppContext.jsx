import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext({
  isDark: true, lang: 'id',
  toggleTheme: () => {}, toggleLang: () => {},
  searchOpen: false, setSearchOpen: () => {},
});

export function AppProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('gg-theme') !== 'light'; } catch { return true; }
  });
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('gg-lang') || 'id'; } catch { return 'id'; }
  });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDark);
    root.classList.toggle('light', !isDark);
    try { localStorage.setItem('gg-theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  useEffect(() => {
    try { localStorage.setItem('gg-lang', lang); } catch {}
  }, [lang]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(p => !p);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AppContext.Provider value={{
      isDark, lang,
      toggleTheme: () => setIsDark(d => !d),
      toggleLang: () => setLang(l => l === 'id' ? 'en' : 'id'),
      searchOpen, setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
