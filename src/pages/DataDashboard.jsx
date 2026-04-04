import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, ShoppingCart, X, CheckCircle, Satellite,
  LogOut, Info, FileText, Database, CloudRain
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/* ── helpers ── */
function getDOY(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function formatDOY(n) {
  return String(n).padStart(3, '0');
}

function dateRange(start, end) {
  const dates = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

/** Seeded pseudo-random to decide which dates are "unavailable" (~5%) */
function seedRand(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(s) / 0xffffffff;
  };
}

/* ── data config ── */
const DATA_CATEGORIES = [
  {
    id: 'cors',
    label: 'Data CORS ITSN',
    icon: Satellite,
    color: 'blue',
    description: 'Continuously Operating Reference Station ITS Nopember — data pengamatan GNSS RINEX',
    types: [
      { id: 'obs', label: 'Observation (.xxO)', ext: 'O', desc: 'RINEX observation file' },
      { id: 'nav', label: 'Navigation (.xxN)', ext: 'N', desc: 'GNSS navigation message' },
    ],
  },
  {
    id: 'met',
    label: 'GNSS Meteorologi',
    icon: CloudRain,
    color: 'teal',
    description: 'Data Precipitable Water Vapor (PWV) dan Zenith Total Delay (ZTD) dari pengamatan GNSS kampus ITS',
    types: [
      { id: 'pwv', label: 'Precipitable Water Vapor (PWV)', ext: 'csv', desc: 'PWV harian dalam milimeter (mm)' },
      { id: 'ztd', label: 'Zenith Total Delay (ZTD)', ext: 'csv', desc: 'ZTD time series per 30 menit' },
    ],
  },
];

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/* ── month calendar block ── */
function MonthCalendar({ year, month, windowStart, windowEnd, today, availSet, selectedSet, onToggle }) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = (firstDay.getDay() + 6) % 7; // Monday=0
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <h3 className="font-heading font-bold text-slate-800 text-sm mb-3">
        {MONTH_NAMES[month]} {year}
      </h3>
      <div className="grid grid-cols-7 mb-1">
        {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((d) => (
          <div key={d} className="text-center text-[10px] font-medium text-slate-400 py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((date, i) => {
          if (!date) return <div key={`pad-${i}`} />;
          const key = date.toISOString().split('T')[0];
          const inWindow = date >= windowStart && date <= windowEnd;
          const isToday = date.toDateString() === today.toDateString();
          const isAvail = inWindow && availSet.has(key);
          const isSel = selectedSet.has(key);

          let cls = 'relative flex flex-col items-center justify-center rounded-lg h-9 text-[11px] font-medium transition-all cursor-default select-none';

          if (!inWindow) {
            cls += ' text-slate-200';
          } else if (!isAvail) {
            cls += ' text-slate-300';
          } else if (isSel) {
            cls += ' bg-blue-600 text-white shadow-sm cursor-pointer hover:bg-blue-700';
          } else {
            cls += ' bg-green-50 text-green-700 border border-green-200 cursor-pointer hover:bg-green-100';
          }

          if (isToday && inWindow) cls += ' ring-2 ring-orange-400 ring-offset-1';

          const doy = getDOY(date);
          const doyEl = isAvail ? (
            <span className={`text-[8px] leading-none mt-0.5 ${isSel ? 'text-blue-200' : 'text-green-500'}`}>
              {formatDOY(doy)}
            </span>
          ) : null;

          return (
            <button
              key={key}
              onClick={() => isAvail && onToggle(date, key)}
              className={cls}
              title={isAvail ? `DOY ${formatDOY(doy)} — ${key}` : undefined}
            >
              {date.getDate()}
              {doyEl}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── main component ── */
export default function DataDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('cors');
  const [fileTypeId, setFileTypeId] = useState('obs');
  const [cart, setCart] = useState([]);
  const [downloaded, setDownloaded] = useState(false);

  const category = DATA_CATEGORIES.find(c => c.id === activeCategory);
  const fileType = category.types.find(t => t.id === fileTypeId) || category.types[0];

  // Rolling 1-year window
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const windowStart = useMemo(() => {
    const d = new Date(today);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return d;
  }, [today]);

  // Availability: ~5% random gaps, seeded differently per data category+type
  const availSet = useMemo(() => {
    const seed = activeCategory === 'cors' ? 42 : 77;
    const rand = seedRand(seed);
    const set = new Set();
    dateRange(windowStart, today).forEach((d) => {
      if (rand() > 0.05) set.add(d.toISOString().split('T')[0]);
    });
    return set;
  }, [activeCategory, windowStart, today]);

  const selectedSet = useMemo(() => new Set(cart), [cart]);

  function toggleDate(date, key) {
    setCart(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
    setDownloaded(false);
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(k => k !== key));
  }

  function clearCart() { setCart([]); setDownloaded(false); }

  function buildFileName(dateKey) {
    const d = new Date(dateKey);
    const doy = getDOY(d);
    const yy = String(d.getFullYear()).slice(-2);
    if (activeCategory === 'cors') {
      return `ITSN${formatDOY(doy)}0.${yy}${fileType.ext}`;
    }
    // met data
    const yyyy = d.getFullYear();
    return `ITSN_${fileType.id.toUpperCase()}_${yyyy}${formatDOY(doy)}.${fileType.ext}`;
  }

  function handleDownload() {
    if (cart.length === 0) return;
    const fileList = cart.sort().map(buildFileName).join('\n');
    alert(`📦 Simulasi Download (${cart.length} file)\n\n${fileList}\n\n✅ File siap diunduh dari server Lab Geodesi & Geodinamika ITS.`);
    setDownloaded(true);
  }

  function switchCategory(catId) {
    setActiveCategory(catId);
    const cat = DATA_CATEGORIES.find(c => c.id === catId);
    setFileTypeId(cat.types[0].id);
    setCart([]);
    setDownloaded(false);
  }

  function switchFileType(typeId) {
    setFileTypeId(typeId);
    setCart([]);
    setDownloaded(false);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const months = useMemo(() => {
    const result = [];
    const cur = new Date(windowStart.getFullYear(), windowStart.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 1);
    while (cur <= end) {
      result.push({ year: cur.getFullYear(), month: cur.getMonth() });
      cur.setMonth(cur.getMonth() + 1);
    }
    return result;
  }, [windowStart, today]);

  const colorMap = {
    blue: { tab: 'bg-blue-600 text-white', tabInactive: 'text-blue-600 hover:bg-blue-50', badge: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'text-blue-500' },
    teal: { tab: 'bg-teal-600 text-white', tabInactive: 'text-teal-600 hover:bg-teal-50', badge: 'bg-teal-50 text-teal-700 border-teal-200', icon: 'text-teal-500' },
  };
  const cc = colorMap[category.color];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/its-logo.png"
              alt="ITS"
              className="w-9 h-9 object-contain flex-shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div>
              <p className="font-heading font-bold text-slate-900 text-sm leading-none">Portal Data GNSS</p>
              <p className="text-slate-400 text-xs mt-0.5">Lab. Geodesi &amp; Geodinamika — ITS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="font-medium">{user?.name}</span>
              {user?.institution && (
                <span className="text-slate-400 text-xs">· {user.institution}</span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-sm font-medium transition-all"
            >
              <LogOut size={14} /> Keluar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">

          {/* ── Sidebar ── */}
          <div className="w-72 flex-shrink-0 space-y-5">

            {/* Data category tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Database size={15} className="text-slate-500" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Jenis Data</h2>
              </div>
              <div className="space-y-2">
                {DATA_CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const c = colorMap[cat.color];
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => switchCategory(cat.id)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${
                        isActive
                          ? `border-${cat.color}-300 bg-${cat.color}-50`
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <Icon size={16} className={`flex-shrink-0 mt-0.5 ${isActive ? c.icon : 'text-slate-400'}`} />
                      <div>
                        <p className={`font-semibold text-sm ${isActive ? (cat.color === 'blue' ? 'text-blue-700' : 'text-teal-700') : 'text-slate-700'}`}>
                          {cat.label}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 leading-snug">{cat.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* File type selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={15} className="text-slate-500" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Tipe File</h2>
              </div>
              <div className="space-y-2">
                {category.types.map((ft) => (
                  <button
                    key={ft.id}
                    onClick={() => switchFileType(ft.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      fileTypeId === ft.id
                        ? activeCategory === 'cors'
                          ? 'border-blue-400 bg-blue-50'
                          : 'border-teal-400 bg-teal-50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${
                      fileTypeId === ft.id
                        ? activeCategory === 'cors' ? 'text-blue-700' : 'text-teal-700'
                        : 'text-slate-700'
                    }`}>
                      {ft.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{ft.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Info panel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Info size={15} className="text-slate-400" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Keterangan</h2>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-green-50 border border-green-200 flex-shrink-0" />
                  <span>Data tersedia — klik untuk pilih</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600 flex-shrink-0" />
                  <span>Dipilih / di keranjang</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-white border-2 border-orange-400 flex-shrink-0" />
                  <span>Hari ini</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-slate-100 flex-shrink-0" />
                  <span>Tidak tersedia / di luar periode</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 text-slate-400">
                  Angka kecil = DOY (Day of Year)
                </div>
              </div>
            </div>
          </div>

          {/* ── Main area ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-heading font-black text-2xl text-slate-900">{category.label}</h1>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cc.badge}`}>
                    Stasiun ITSN
                  </span>
                </div>
                <p className="text-slate-500 text-sm">
                  Periode:{' '}
                  <span className="font-medium text-slate-700">
                    {windowStart.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {' '}–{' '}
                  <span className="font-medium text-slate-700">
                    {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </p>
              </div>

              <button
                onClick={() => cart.length > 0 && handleDownload()}
                disabled={cart.length === 0}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm ${
                  cart.length > 0
                    ? downloaded
                      ? 'bg-green-600 text-white shadow-green-500/20'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20 hover:shadow-blue-500/30'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {downloaded ? <CheckCircle size={16} /> : <Download size={16} />}
                {downloaded ? 'Downloaded' : `Download (${cart.length})`}
              </button>
            </div>

            {/* Cart */}
            {cart.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={15} className="text-blue-600" />
                    <span className="font-semibold text-blue-800 text-sm">{cart.length} file dipilih</span>
                  </div>
                  <button onClick={clearCart} className="text-xs text-blue-500 hover:text-red-500 font-medium">
                    Hapus semua
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {[...cart].sort().map(key => (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-blue-200 text-xs font-mono text-blue-700 shadow-sm"
                    >
                      {buildFileName(key)}
                      <button onClick={() => removeFromCart(key)} className="ml-0.5 text-blue-400 hover:text-red-500">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Calendar grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {months.map(({ year, month }) => (
                <MonthCalendar
                  key={`${year}-${month}-${activeCategory}-${fileTypeId}`}
                  year={year}
                  month={month}
                  windowStart={windowStart}
                  windowEnd={today}
                  today={today}
                  availSet={availSet}
                  selectedSet={selectedSet}
                  onToggle={toggleDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
