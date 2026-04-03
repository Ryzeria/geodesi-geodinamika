import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gg-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function login(email, password) {
    if (!email || !password) throw new Error('Email dan password wajib diisi');
    const session = { email, name: email.split('@')[0], institution: '', loginAt: Date.now() };
    localStorage.setItem('gg-user', JSON.stringify(session));
    setUser(session);
  }

  function register(name, email, password, institution) {
    if (!name || !email || !password) throw new Error('Semua field wajib diisi');
    const session = { email, name, institution: institution || '', loginAt: Date.now() };
    localStorage.setItem('gg-user', JSON.stringify(session));
    setUser(session);
  }

  function logout() {
    localStorage.removeItem('gg-user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
