import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, ShoppingCart, X, CheckCircle, Satellite,
  Calendar, LogOut, ChevronDown, Info, FileText, Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

/* ── helpers ── */
function getDOY(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  return Math.floor((date - start) / 86400000);
}

function formatDOY(n) {
  return String(n).padStart(3, '0');
}

/** Generate all dates in [startDate, endDate] inclusive */
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

const STATIONS = [
  {
    id: 'CMJT', name: 'CMJT', fullName: 'Stasiun GNSS Cemara Jaya',
    location: 'Surabaya, Jawa Timur', available: true,
    color: 'blue', dot: 'bg-green-400',
  },
  {
    id: 'ITSN', name: 'ITSN', fullName: 'Stasiun GNSS ITS North',
    location: 'Kampus ITS, Surabaya', available: false,
    color: 'slate', dot: 'bg-amber-400',
  },
];

const FILE_TYPES = [
  { id: 'obs', label: 'Observation (.xxO)', ext: 'O', desc: 'RINEX observation data' },
  { id: 'nav', label: 'Navigation (.xxN)', ext: 'N', desc: 'GNSS navigation message' },
];

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/* ── month calendar block ── */
function MonthCalendar({ year, month, allDates, windowStart, windowEnd, today, availSet, selectedSet, onToggle }) {
  // first day of this month, last day
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // days in the calendar grid (pad start)
  const startPad = (firstDay.getDay() + 6) % 7; // Monday=0
  const cells = [];
  for (let i = 0; i < startPad; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
      <h3 className="font-heading font-bold text-slate-800 text-sm mb-3">
        {MONTH_NAMES[month]} {year}
      </h3>
      {/* Day headers */}
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
          let doyEl = null;

          if (!inWindow) {
            cls += ' text-slate-200';
          } else if (!isAvail) {
            cls += ' text-slate-300';
          } else if (isSel) {
            cls += ' bg-blue-600 text-white shadow-sm cursor-pointer hover:bg-blue-700';
          } else {
            cls += ' bg-green-50 text-green-700 border border-green-200 cursor-pointer hover:bg-green-100';
          }

          if (isToday && inWindow) {
            cls += ' ring-2 ring-orange-400 ring-offset-1';
          }

          const doy = getDOY(date);
          doyEl = isAvail ? (
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
  const { isDark } = useApp();
  const navigate = useNavigate();

  const [station, setStation] = useState('CMJT');
  const [fileType, setFileType] = useState('obs');
  const [cart, setCart] = useState([]); // array of date strings
  const [stationDropOpen, setStationDropOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

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

  // Generate "available" set (exclude ~5% randomly + unavailable station)
  const availSet = useMemo(() => {
    if (station !== 'CMJT') return new Set();
    const rand = seedRand(42);
    const set = new Set();
    dateRange(windowStart, today).forEach((d) => {
      if (rand() > 0.05) set.add(d.toISOString().split('T')[0]);
    });
    return set;
  }, [station, windowStart, today]);

  const selectedSet = useMemo(() => new Set(cart), [cart]);

  function toggleDate(date, key) {
    setCart(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
    setDownloaded(false);
  }

  function removeFromCart(key) {
    setCart(prev => prev.filter(k => k !== key));
  }

  function clearCart() {
    setCart([]);
    setDownloaded(false);
  }

  function buildFileName(dateKey) {
    const d = new Date(dateKey);
    const doy = getDOY(d);
    const yy = String(d.getFullYear()).slice(-2);
    const ft = FILE_TYPES.find(f => f.id === fileType);
    return `${station}${formatDOY(doy)}0.${yy}${ft.ext}`;
  }

  function handleDownload() {
    if (cart.length === 0) return;
    const fileList = cart.sort().map(buildFileName).join('\n');
    alert(`📦 Simulasi Download (${cart.length} file):\n\n${fileList}\n\n✅ File siap diunduh dari server GNSS Lab.`);
    setDownloaded(true);
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  // Build months to display: from windowStart month to today month
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

  const stationObj = STATIONS.find(s => s.id === station);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo + title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow">
              <Database size={16} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-slate-900 text-sm leading-none">Portal Data GNSS</p>
              <p className="text-slate-400 text-xs mt-0.5">Lab. Geodesi &amp; Geodinamika — ITS</p>
            </div>
          </div>

          {/* Right: user info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="font-medium">{user?.name}</span>
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

            {/* Station selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Satellite size={15} className="text-blue-500" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Stasiun GNSS</h2>
              </div>
              <div className="space-y-2">
                {STATIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => s.available && setStation(s.id)}
                    disabled={!s.available}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      station === s.id
                        ? 'border-blue-400 bg-blue-50'
                        : s.available
                          ? 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                          : 'border-slate-100 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                    <div className="min-w-0">
                      <p className={`font-bold text-sm ${station === s.id ? 'text-blue-700' : 'text-slate-700'}`}>{s.id}</p>
                      <p className="text-xs text-slate-400 truncate">{s.location}</p>
                    </div>
                    {!s.available && (
                      <span className="ml-auto text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        Soon
                      </span>
                    )}
                    {station === s.id && (
                      <CheckCircle size={14} className="ml-auto text-blue-500 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* File type */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={15} className="text-purple-500" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Tipe File</h2>
              </div>
              <div className="space-y-2">
                {FILE_TYPES.map((ft) => (
                  <button
                    key={ft.id}
                    onClick={() => { setFileType(ft.id); setCart([]); }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      fileType === ft.id
                        ? 'border-purple-400 bg-purple-50'
                        : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                    }`}
                  >
                    <p className={`font-semibold text-sm ${fileType === ft.id ? 'text-purple-700' : 'text-slate-700'}`}>
                      {ft.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{ft.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Info size={15} className="text-slate-400" />
                <h2 className="font-heading font-bold text-slate-800 text-sm">Keterangan</h2>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-green-50 border border-green-200 flex-shrink-0" />
                  <span>Data tersedia</span>
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
                  <span>Tidak tersedia / di luar jangkauan</span>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 text-slate-400">
                  Angka kecil di bawah tanggal = DOY (Day of Year)
                </div>
              </div>
            </div>
          </div>

          {/* ── Main area ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="font-heading font-black text-2xl text-slate-900">Data GNSS RINEX</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Periode:{' '}
                  <span className="font-medium text-slate-700">
                    {windowStart.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {' '}–{' '}
                  <span className="font-medium text-slate-700">
                    {today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </p>
              </div>

              {/* Cart summary button */}
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
            {stationObj?.available ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {months.map(({ year, month }) => (
                  <MonthCalendar
                    key={`${year}-${month}`}
                    year={year}
                    month={month}
                    allDates={dateRange(windowStart, today)}
                    windowStart={windowStart}
                    windowEnd={today}
                    today={today}
                    availSet={availSet}
                    selectedSet={selectedSet}
                    onToggle={toggleDate}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4">
                  <Satellite size={28} className="text-amber-500" />
                </div>
                <h3 className="font-heading font-bold text-slate-800 text-lg mb-2">Stasiun Segera Hadir</h3>
                <p className="text-slate-500 text-sm max-w-sm">
                  Data untuk stasiun <strong>{station}</strong> sedang dalam persiapan dan akan segera tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
