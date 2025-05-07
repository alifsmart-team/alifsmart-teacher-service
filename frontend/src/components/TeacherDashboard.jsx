import React, { useState, useEffect } from 'react';
import { 
  FiHome, FiSettings, FiLogOut, FiPlus, FiEdit, FiTrash2, 
  FiClock, FiCheck, FiImage, FiStar, FiCalendar, FiBell,
  FiMenu, FiX, FiSun, FiMoon, FiSearch, FiUsers, FiBook, FiAward
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const TeacherDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mock data
  const attendance = { present: 4, total: 15, percentage: 26.67 };
  
  const todaySchedule = [
    { time: '09:00', activity: 'Checklist Harian', participation: 80 },
    { time: '10:30', activity: 'Kuis' }
  ];
  
  const weeklySchedule = [
    'Tracing Angka',
    'Tebak Binatang',
    'Hitung Buah'
  ];
  
  const tasks = [
    { name: 'Sikat Gigi', type: 'Harian', deadline: '08:00 AM', progress: '2/15' },
    { name: 'Kuis Dongeng Kancil', type: 'Harian', deadline: '10:00 AM', progress: '2/15' },
    { name: 'Cuci Tangan', type: 'Harian', deadline: '11:00 AM', progress: '1/15' },
    { name: 'Hitung Buah', type: 'Mingguan', deadline: '30/10', progress: '2/15' },
    { name: 'Tebak Binatang', type: 'Mingguan', deadline: '30/10', progress: '1/15' },
    { name: 'Tracing Huruf & Angka', type: 'Mingguan', deadline: '30/10', progress: '1/15' }
  ];
  
  const meetings = [
    { title: 'Peran orang tua dalam mengembangkan potensi anak', date: '26 OKTOBER 2025, 10:00 AM' }
  ];
  
  const students = [
    {
      name: 'ALIKA (Kelas A)',
      progress: 50,
      dailyTasks: [
        { name: 'Sikat Gigi', status: 'Dalam Penilaian', image: 'alika.jpg', score: null },
        { name: 'Cuci Tangan', status: 'Dalam Penilaian', image: 'alika.jpg', score: null },
        { name: 'Tracing Huruf & Angka', status: 'Dalam Penilaian', image: 'alika.jpg', score: null }
      ],
      weeklyTasks: [
        { name: 'Tebak Binatang', status: '-', score: null },
        { name: 'Hitung Buah', status: 'Sudah Mengerjakan', score: 100 },
        { name: 'Kuis & Cerita Dongeng "Kancil"', status: 'Sudah Mengerjakan', score: 85 }
      ]
    },
    {
      name: 'BAIM (Kelas A)',
      progress: 100,
      dailyTasks: [
        { name: 'Sikat Gigi', status: 'Sudah Mengerjakan', image: 'baim.png', score: 100 },
        { name: 'Tracing Huruf & Angka', status: 'Sudah Mengerjakan', image: 'tracing.jpg', score: 89 },
        { name: 'Cuci Tangan', status: 'Dalam Penilaian', image: 'baimwong.jpg', score: 90 }
      ],
      weeklyTasks: [
        { name: 'Tebak Binatang', status: 'Sudah Mengerjakan', score: 90 },
        { name: 'Hitung Buah', status: 'Sudah Mengerjakan', score: 92 },
        { name: 'Kuis & Cerita Dongeng "Kancil"', status: 'Sudah Mengerjakan', score: 78 }
      ]
    }
  ];

  const renderStars = (score) => {
    if (!score) return null;
    const stars = Math.round(score / 20);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar 
            key={i} 
            className={`${i < stars ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-500'}`} 
            size={14}
          />
        ))}
      </div>
    );
  };

  // Glassmorphism background style
  const glassStyle = {
    backdropFilter: 'blur(12px)',
    backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900'}`}>
      {/* Mobile Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={glassStyle}
        className="lg:hidden flex items-center justify-between p-4 fixed top-0 left-0 right-0 z-50 rounded-b-lg shadow-sm"
      >
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <h1 className="text-xl font-bold">Kelas A Dashboard</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </motion.header>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <AnimatePresence>
          {windowWidth < 1024 ? (
            mobileMenuOpen && (
              <motion.aside 
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed z-40 w-64 h-screen"
                style={glassStyle}
              >
                <div className="p-4 border-b dark:border-gray-700">
                  <h1 className="text-xl font-bold">Kelas A</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard Guru</p>
                </div>

                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveTab('dashboard');
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'dashboard'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100 shadow-sm'
                          : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                          }`}
                      >
                        <FiHome className="mr-3" />
                        Beranda
                      </motion.button>
                    </li>
                    <li>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveTab('settings');
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'settings'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100 shadow-sm'
                          : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                          }`}
                      >
                        <FiSettings className="mr-3" />
                        Pengaturan
                      </motion.button>
                    </li>
                    <li>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-red-600 dark:text-red-400 transition-all"
                      >
                        <FiLogOut className="mr-3" />
                        Keluar
                      </motion.button>
                    </li>
                  </ul>
                </nav>
              </motion.aside>
            )
          ) : (
            <motion.aside 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-64 h-screen flex-shrink-0"
              style={glassStyle}
            >
              <div className="p-4 border-b dark:border-gray-700">
                <h1 className="text-xl font-bold">Kelas A</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard Guru</p>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('dashboard')}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'dashboard'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100 shadow-sm'
                        : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                        }`}
                    >
                      <FiHome className="mr-3" />
                      Beranda
                    </motion.button>
                  </li>
                  <li>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('settings')}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${activeTab === 'settings'
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-100 shadow-sm'
                        : 'hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                        }`}
                    >
                      <FiSettings className="mr-3" />
                      Pengaturan
                    </motion.button>
                  </li>
                  <li>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center p-3 rounded-lg hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-red-600 dark:text-red-400 transition-all"
                    >
                      <FiLogOut className="mr-3" />
                      Keluar
                    </motion.button>
                  </li>
                </ul>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={glassStyle}
            className="rounded-xl p-4 lg:p-6 mb-6 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">
                  AlifSmart
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                  <span className="flex items-center bg-indigo-100/50 dark:bg-indigo-900/20 px-2 py-1 rounded-full whitespace-nowrap">
                    👋 Selamat Pagi, Bu Guru
                  </span>
                  <span className="flex items-center whitespace-nowrap">
                    <FiCalendar className="mr-1 flex-shrink-0" /> 
                    <span className="truncate">1 OKTOBER 2025</span>
                  </span>
                  <span className="flex items-center whitespace-nowrap">
                    <FiClock className="mr-1 flex-shrink-0" /> 
                    <span className="truncate">08:45 WIB</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 flex-shrink-0">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
                <div className="relative flex-shrink-0">
                  <FiBell size={20} className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiAward className="mr-2 flex-shrink-0" /> STATISTIK REAL-TIME
            </h2>
            <motion.div 
              style={glassStyle}
              className="rounded-xl shadow-sm p-4"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div 
                  className="border dark:border-gray-700 rounded-xl p-4 transition-all hover:shadow-md"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3 flex-shrink-0">
                      <FiUsers className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-medium truncate">Kehadiran</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-bold whitespace-nowrap">{attendance.present}/{attendance.total}</span>
                    <span className="text-sm bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-2 py-1 rounded-full whitespace-nowrap">
                      {attendance.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" 
                      style={{ width: `${attendance.percentage}%` }}
                    ></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="border dark:border-gray-700 rounded-xl p-4 transition-all hover:shadow-md"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3 flex-shrink-0">
                      <FiCheck className="text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium truncate">Tugas Selesai</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-bold whitespace-nowrap">12/45</span>
                    <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300 px-2 py-1 rounded-full whitespace-nowrap">
                      26.67%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" 
                      style={{ width: `26.67%` }}
                    ></div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="border dark:border-gray-700 rounded-xl p-4 transition-all hover:shadow-md"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg mr-3 flex-shrink-0">
                      <FiBook className="text-amber-600 dark:text-amber-400" />
                    </div>
                    <h3 className="font-medium truncate">Materi Baru</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-bold whitespace-nowrap">3</span>
                    <span className="text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300 px-2 py-1 rounded-full whitespace-nowrap">
                      Minggu Ini
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full" 
                      style={{ width: `60%` }}
                    ></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Schedule Section */}
          <section className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              style={glassStyle}
              className="rounded-xl shadow-sm p-5"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiClock className="mr-2 flex-shrink-0" /> JADWAL HARI INI
              </h2>
              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mt-1 mr-3 text-indigo-600 dark:text-indigo-400">
                      <FiClock />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.time} | {item.activity}</p>
                      {item.participation && (
                        <div className="flex items-center mt-2">
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2 flex-shrink-0">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full" 
                              style={{ width: `${item.participation}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.participation}% Partisipasi</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              style={glassStyle}
              className="rounded-xl shadow-sm p-5"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiCalendar className="mr-2 flex-shrink-0" /> JADWAL MINGGU INI
              </h2>
              <ul className="space-y-3">
                {weeklySchedule.map((item, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 mr-3 text-indigo-600 dark:text-indigo-400">
                      <FiCheck />
                    </div>
                    <span className="truncate">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </section>

          {/* Tasks Section */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
              <h2 className="text-lg font-semibold flex items-center whitespace-nowrap">
                <FiBook className="mr-2 flex-shrink-0" /> MANAGE TUGAS & MEETING
              </h2>
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <motion.button 
                  className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-md transition-all whitespace-nowrap flex-shrink-0"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPlus size={16} className="mr-1 flex-shrink-0" /> TUGAS BARU
                </motion.button>
                <motion.button 
                  className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:shadow-md transition-all whitespace-nowrap flex-shrink-0"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiPlus size={16} className="mr-1 flex-shrink-0" /> MEETING BARU
                </motion.button>
              </div>
            </div>

            <motion.div 
              style={glassStyle}
              className="rounded-xl shadow-sm overflow-hidden mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Nama Tugas</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Jenis</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Deadline</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Progress</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tasks.map((task, index) => (
                      <motion.tr 
                        key={index}
                        className="hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                        whileHover={{ scale: 1.005 }}
                      >
                        <td className="px-4 py-3 whitespace-nowrap font-medium truncate max-w-xs">{task.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                            task.type === 'Harian' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          }`}>
                            {task.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{task.deadline}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-indigo-400 to-blue-500 h-1.5 rounded-full" 
                              style={{ width: `${(parseInt(task.progress.split('/')[0]) / parseInt(task.progress.split('/')[1])) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">{task.progress}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <motion.button 
                              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiEdit size={16} />
                            </motion.button>
                            <motion.button 
                              className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiTrash2 size={16} />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div 
              style={glassStyle}
              className="rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Meeting</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Waktu</th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {meetings.map((meeting, index) => (
                      <motion.tr 
                        key={index}
                        className="hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                        whileHover={{ scale: 1.005 }}
                      >
                        <td className="px-4 py-3 font-medium truncate max-w-xs">{meeting.title}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{meeting.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <motion.button 
                            className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiEdit size={16} />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </section>

          {/* Verification Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiCheck className="mr-2 flex-shrink-0" /> VERIFIKASI
            </h2>
            
            <div className="space-y-6">
              {students.map((student, index) => (
                <motion.div 
                  key={index} 
                  style={glassStyle}
                  className="rounded-xl shadow-sm p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                    <h3 className="font-bold text-lg truncate">{student.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium whitespace-nowrap">PROGRESS: {student.progress}%</span>
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-shrink-0">
                        <div 
                          className={`h-2 rounded-full ${student.progress === 100 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-indigo-600 dark:text-indigo-400">TUGAS HARIAN</h4>
                    <div className="space-y-4">
                      {student.dailyTasks.map((task, i) => (
                        <motion.div 
                          key={i} 
                          className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-800 p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                {task.status === 'Sudah Mengerjakan' ? (
                                  <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mr-2 flex-shrink-0">
                                    <FiCheck className="text-green-500" size={14} />
                                  </div>
                                ) : (
                                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-2 flex-shrink-0">
                                    <FiClock className="text-amber-500" size={14} />
                                  </div>
                                )}
                                <span className="font-medium truncate">{task.name}</span>
                              </div>
                              {task.image && (
                                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
                                  <FiImage className="mr-1 flex-shrink-0" /> 
                                  <motion.button 
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Lihat Gambar
                                  </motion.button>
                                </div>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 inline-block whitespace-nowrap">
                                {task.status}
                              </div>
                              {task.score && (
                                <div className="flex items-center justify-end mt-2 gap-2">
                                  <span className="font-medium whitespace-nowrap">{task.score}</span>
                                  {renderStars(task.score)}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {task.status === 'Sudah Mengerjakan' ? (
                              <>
                                <motion.button 
                                  className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors whitespace-nowrap"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FiEdit className="inline mr-1" /> EDIT
                                </motion.button>
                              </>
                            ) : (
                              <>
                                <motion.button 
                                  className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center whitespace-nowrap"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  📩 NOTIF ORTU
                                </motion.button>
                                <motion.button 
                                  className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors whitespace-nowrap"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  NILAI
                                </motion.button>
                                <motion.button 
                                  className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  KOMENTAR
                                </motion.button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 text-indigo-600 dark:text-indigo-400">TUGAS MINGGUAN</h4>
                    <div className="space-y-4">
                      {student.weeklyTasks.map((task, i) => (
                        <motion.div 
                          key={i} 
                          className="pl-4 border-l-2 border-indigo-200 dark:border-indigo-800 p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
                          whileHover={{ x: 3 }}
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                {task.status === 'Sudah Mengerjakan' ? (
                                  <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-full mr-2 flex-shrink-0">
                                    <FiCheck className="text-green-500" size={14} />
                                  </div>
                                ) : task.status === 'Dalam Penilaian' ? (
                                  <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded-full mr-2 flex-shrink-0">
                                    <FiClock className="text-amber-500" size={14} />
                                  </div>
                                ) : (
                                  <div className="w-5 mr-2 flex-shrink-0"></div>
                                )}
                                <span className="font-medium truncate">{task.name}</span>
                              </div>
                              {task.image && (
                                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
                                  <FiImage className="mr-1 flex-shrink-0" /> 
                                  <motion.button 
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Lihat Gambar
                                  </motion.button>
                                </div>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 inline-block whitespace-nowrap">
                                {task.status}
                              </div>
                              {task.score && (
                                <div className="flex items-center justify-end mt-2 gap-2">
                                  <span className="font-medium whitespace-nowrap">{task.score}</span>
                                  {renderStars(task.score)}
                                </div>
                              )}
                            </div>
                          </div>
                          {task.status === 'Dalam Penilaian' && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              <motion.button 
                                className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                📩 NOTIF ORTU
                              </motion.button>
                              <motion.button 
                                className="text-xs px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                NILAI
                              </motion.button>
                              <motion.button 
                                className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                KOMENTAR
                              </motion.button>
                            </div>
                          )}
                          {/* Removed the edit button section for weekly tasks */}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;