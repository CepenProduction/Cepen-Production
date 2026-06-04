import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Eye, EyeOff, LayoutDashboard, Database, 
  Trash2, Plus, Edit3, Save, X, LogOut, ArrowLeft,
  MessageSquare, HelpCircle, Archive, CheckCircle, Image
} from 'lucide-react';
import { Project, Testimonial, ServiceCategory } from '../types';
import { FAQItem, saveProjects, saveTestimonials, saveFAQs } from '../lib/db';

interface AdminViewProps {
  onBackToHome: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
}

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1616165415772-beff2865ffb4?auto=format&fit=crop&q=80&w=800', label: 'Wedding Tradisional' },
  { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', label: 'Prewedding Tebing' },
  { url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800', label: 'Pacu Jawi Adrenalin' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', label: 'Wisata Pantai Aerial' },
  { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', label: 'Sunset Romantis' },
  { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800', label: 'Suntiang Perak Minimalis' },
];

export default function AdminView({
  onBackToHome,
  projects,
  setProjects,
  testimonials,
  setTestimonials,
  faqs,
  setFaqs
}: AdminViewProps) {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'projects' | 'testimonials' | 'faqs'>('projects');
  
  // Feedback action toast
  const [toastMessage, setToastMessage] = useState('');

  // Modal / Form state
  const [currentEditProject, setCurrentEditProject] = useState<Project | null>(null);
  const [currentEditTestimonial, setCurrentEditTestimonial] = useState<Testimonial | null>(null);
  const [currentEditFaq, setCurrentEditFaq] = useState<FAQItem | null>(null);

  // New item forms
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [isAddingFaq, setIsAddingFaq] = useState(false);

  // Project form fields
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<ServiceCategory>('wedding');
  const [projImageUrl, setProjImageUrl] = useState(PRESET_IMAGES[0].url);
  const [projLocation, setProjLocation] = useState('');
  const [projDate, setProjDate] = useState('');
  const [projClientName, setProjClientName] = useState('');
  const [projDescription, setProjDescription] = useState('');

  // Testimonial form fields
  const [testName, setTestName] = useState('');
  const [testRole, setTestRole] = useState('Pengantin Baru');
  const [testMessage, setTestMessage] = useState('');
  const [testRating, setTestRating] = useState(5);
  const [testLocation, setTestLocation] = useState('');

  // FAQ form fields
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'cen' && password === '1234') {
      setIsLoggedIn(true);
      setLoginError('');
      triggerToast('Berhasil masuk sebagai administrator!');
    } else {
      setLoginError('ID atau Password salah. Silakan coba lagi.');
    }
  };

  // Portfolio CruD Action handlers
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) {
      alert('Judul portfolio wajib diisi.');
      return;
    }

    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: projTitle,
      category: projCategory,
      imageUrl: projImageUrl,
      location: projLocation || 'Sumatera Barat',
      date: projDate || 'Baru saja',
      clientName: projClientName || 'Klien Personal',
      description: projDescription
    };

    const updated = [newProj, ...projects];
    setProjects(updated);
    saveProjects(updated);
    setIsAddingProject(false);
    resetProjectForm();
    triggerToast('Portfolio baru berhasil ditambahkan!');
  };

  const handleStartEditProject = (p: Project) => {
    setCurrentEditProject(p);
    setProjTitle(p.title);
    setProjCategory(p.category);
    setProjImageUrl(p.imageUrl);
    setProjLocation(p.location);
    setProjDate(p.date);
    setProjClientName(p.clientName);
    setProjDescription(p.description);
  };

  const handleSaveEditProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditProject) return;

    const updatedList = projects.map(p => {
      if (p.id === currentEditProject.id) {
        return {
          ...p,
          title: projTitle,
          category: projCategory,
          imageUrl: projImageUrl,
          location: projLocation,
          date: projDate,
          clientName: projClientName,
          description: projDescription
        };
      }
      return p;
    });

    setProjects(updatedList);
    saveProjects(updatedList);
    setCurrentEditProject(null);
    resetProjectForm();
    triggerToast('Portfolio berhasil diperbarui!');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus portfolio ini?')) {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      triggerToast('Portfolio berhasil dihapus.');
    }
  };

  const resetProjectForm = () => {
    setProjTitle('');
    setProjCategory('wedding');
    setProjImageUrl(PRESET_IMAGES[0].url);
    setProjLocation('');
    setProjDate('');
    setProjClientName('');
    setProjDescription('');
  };


  // Testimonial CruD Action handlers
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim() || !testMessage.trim()) {
      alert('Nama dan ulasan wajib diisi.');
      return;
    }

    const newTest: Testimonial = {
      id: `t_${Date.now()}`,
      name: testName,
      role: testRole,
      message: testMessage,
      rating: testRating,
      date: 'Baru saja',
      location: testLocation || 'Sumbar'
    };

    const updated = [newTest, ...testimonials];
    setTestimonials(updated);
    saveTestimonials(updated);
    setIsAddingTestimonial(false);
    resetTestimonialForm();
    triggerToast('Ulasan pelanggan berhasil ditambahkan!');
  };

  const handleStartEditTestimonial = (t: Testimonial) => {
    setCurrentEditTestimonial(t);
    setTestName(t.name);
    setTestRole(t.role);
    setTestMessage(t.message);
    setTestRating(t.rating);
    setTestLocation(t.location);
  };

  const handleSaveEditTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditTestimonial) return;

    const updatedList = testimonials.map(t => {
      if (t.id === currentEditTestimonial.id) {
        return {
          ...t,
          name: testName,
          role: testRole,
          message: testMessage,
          rating: testRating,
          location: testLocation
        };
      }
      return t;
    });

    setTestimonials(updatedList);
    saveTestimonials(updatedList);
    setCurrentEditTestimonial(null);
    resetTestimonialForm();
    triggerToast('Ulasan pelanggan berhasil diperbarui!');
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      saveTestimonials(updated);
      triggerToast('Ulasan telah dihapus.');
    }
  };

  const resetTestimonialForm = () => {
    setTestName('');
    setTestRole('Pengantin Baru');
    setTestMessage('');
    setTestRating(5);
    setTestLocation('');
  };


  // FAQ CruD Action handlers
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqQuestion.trim() || !faqAnswer.trim()) {
      alert('Pertanyaan dan jawaban wajib diisi.');
      return;
    }

    const newFaq: FAQItem = {
      id: `faq_${Date.now()}`,
      question: faqQuestion,
      answer: faqAnswer
    };

    const updated = [...faqs, newFaq];
    setFaqs(updated);
    saveFAQs(updated);
    setIsAddingFaq(false);
    resetFaqForm();
    triggerToast('Pertanyaan FAQ berhasil ditambahkan!');
  };

  const handleStartEditFaq = (f: FAQItem) => {
    setCurrentEditFaq(f);
    setFaqQuestion(f.question);
    setFaqAnswer(f.answer);
  };

  const handleSaveEditFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEditFaq) return;

    const updatedList = faqs.map(f => {
      if (f.id === currentEditFaq.id) {
        return {
          ...f,
          question: faqQuestion,
          answer: faqAnswer
        };
      }
      return f;
    });

    setFaqs(updatedList);
    saveFAQs(updatedList);
    setCurrentEditFaq(null);
    resetFaqForm();
    triggerToast('FAQ berhasil diperbarui!');
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      saveFAQs(updated);
      triggerToast('FAQ berhasil dihapus.');
    }
  };

  const resetFaqForm = () => {
    setFaqQuestion('');
    setFaqAnswer('');
  };

  return (
    <div id="admin-view-root" className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 pb-20 px-6 sm:px-8 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Absolute Toast feedback container */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#2b7fff] text-white px-5 py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl flex items-center gap-2 border border-blue-400"
          >
            <CheckCircle size={14} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoggedIn ? (
        /* Gated Access Login Form */
        <div className="max-w-md mx-auto my-12 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
          
          <div className="text-center mb-8 space-y-3">
            <div className="mx-auto w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center text-blue-500 border border-zinc-700">
              <Lock size={20} />
            </div>
            <p className="font-mono text-[9px] font-bold tracking-[0.25em] text-zinc-500 uppercase">
              CEPEN PRODUCTION HUB
            </p>
            <h2 className="font-display font-black text-2xl tracking-normal text-white uppercase">
              ADMIN LOGIN
            </h2>
            <p className="text-zinc-400 text-xs font-light">
              Masukkan kredensial administrator Anda untuk meluncurkan ruang editing data.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-[11px] font-bold tracking-wider uppercase mb-1.5 pl-1">
                Username / ID
              </label>
              <input
                id="admin-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="cth: cen"
                required
                className="w-full text-xs p-3.5 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 focus:border-[#2b7fff] outline-none rounded-xl text-white transition-all font-mono"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-[11px] font-bold tracking-wider uppercase mb-1.5 pl-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  required
                  className="w-full text-xs p-3.5 pr-11 bg-zinc-950 border border-zinc-850 hover:border-zinc-700 focus:border-[#2b7fff] outline-none rounded-xl text-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-400 text-[11px] bg-red-950/40 border border-red-900 px-3 py-2 rounded-xl text-center">
                {loginError}
              </p>
            )}

            <button
              id="admin-login-submit"
              type="submit"
              className="w-full py-3.5 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>

          <button
            onClick={onBackToHome}
            className="w-full mt-6 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-white rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-750"
          >
            <ArrowLeft size={12} />
            <span>KEMBALI KE BERANDA</span>
          </button>
        </div>
      ) : (
        /* Fully Functional Admin Panel Workspace */
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header Dashboard */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-950 border border-blue-900 flex items-center justify-center text-[#2b7fff]">
                <LayoutDashboard size={20} />
              </div>
              <div>
                <p className="font-mono text-[9px] font-extrabold text-[#2b7fff] tracking-widest uppercase">
                  DASHBOARD KELOLA KONTEN
                </p>
                <h1 className="font-display font-medium text-xl sm:text-2xl text-white">
                  Cepen Production Admin Hub
                </h1>
                <p className="text-zinc-500 text-xs font-light">
                  Anda masuk sebagai <span className="text-white font-mono font-bold">@cen</span> (Super Administrator)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onBackToHome}
                className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-850 hover:text-white text-zinc-400 border border-zinc-800 text-[11px] font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Lihat Web Utama</span>
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  triggerToast('Berhasil keluar dari dashboard.');
                }}
                className="px-5 py-2.5 bg-zinc-950 hover:bg-red-950/30 hover:border-red-900/60 hover:text-red-400 text-zinc-400 border border-zinc-800 text-[11px] font-bold tracking-wider uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">SHOWCASE PORTFOLIO</span>
                <Archive size={14} className="text-[#2b7fff]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{projects.length}</p>
              <p className="text-zinc-500 text-[11px] font-light mt-1">Item galeri diaktifkan di halaman utama</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">TESTIMONIAL PELANGGAN</span>
                <MessageSquare size={14} className="text-[#2b7fff]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{testimonials.length}</p>
              <p className="text-zinc-500 text-[11px] font-light mt-1">Ulasan aktif berperingkat bintang 5</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400 uppercase text-[10px] font-bold tracking-widest">FAQ AKTIF</span>
                <HelpCircle size={14} className="text-[#2b7fff]" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold font-mono text-white">{faqs.length}</p>
              <p className="text-zinc-500 text-[11px] font-light mt-1">Tanya Jawab tersemat sebagai FAQ</p>
            </div>
          </div>

          {/* Dashboard Tabs Select Line */}
          <div className="bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl max-w-lg flex">
            {(['projects', 'testimonials', 'faqs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsAddingProject(false);
                  setIsAddingTestimonial(false);
                  setIsAddingFaq(false);
                  setCurrentEditProject(null);
                  setCurrentEditTestimonial(null);
                  setCurrentEditFaq(null);
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#2b7fff] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab === 'projects' ? 'Portfolio Galeri' : tab === 'testimonials' ? 'Ulasan Klien' : 'Kelola FAQ'}
              </button>
            ))}
          </div>

          {/* Core Content Segment Areas */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 text-left">
            
            {/* 1. PORTFOLIO SEGMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div>
                    <h3 className="font-display font-medium text-lg text-white">Semua Portfolio Showcase</h3>
                    <p className="text-zinc-500 text-xs">Tambah, Sunting, atau Hapus koleksi pameran foto/video di halaman utama</p>
                  </div>
                  {!isAddingProject && !currentEditProject && (
                    <button
                      onClick={() => {
                        resetProjectForm();
                        setIsAddingProject(true);
                      }}
                      className="px-4 py-2.5 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Tambah Baru</span>
                    </button>
                  )}
                </div>

                {/* Form Add or Edit Project Showcase */}
                {(isAddingProject || currentEditProject) && (
                  <form 
                    onSubmit={isAddingProject ? handleAddProject : handleSaveEditProject} 
                    className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-5 animate-slide-up"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2b7fff] flex items-center gap-1.5">
                        <Database size={14} />
                        <span>{isAddingProject ? 'FORM TAMBAH PORTFOLIO BARU' : 'FORM SUNTING PORTFOLIO'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setCurrentEditProject(null);
                          resetProjectForm();
                        }}
                        className="p-1 rounded bg-zinc-855 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Judul Pameran Portfolio</label>
                          <input
                            type="text"
                            value={projTitle}
                            onChange={(e) => setProjTitle(e.target.value)}
                            placeholder="cth: Romansa Klasik Minang di Payakumbuh"
                            required
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Kategori</label>
                            <select
                              value={projCategory}
                              onChange={(e) => setProjCategory(e.target.value as ServiceCategory)}
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            >
                              <option value="wedding">Wedding (Pernikahan)</option>
                              <option value="prewedding">Prewedding</option>
                              <option value="event">Event & Corporate</option>
                              <option value="drone">Aero Cine (Drone)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Nama Klien / Pihak</label>
                            <input
                              type="text"
                              value={projClientName}
                              onChange={(e) => setProjClientName(e.target.value)}
                              placeholder="cth: Fadli & Indah"
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Lokasi Pemotretan</label>
                            <input
                              type="text"
                              value={projLocation}
                              onChange={(e) => setProjLocation(e.target.value)}
                              placeholder="cth: Lembah Harau, Sumbar"
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Waktu Sesi</label>
                            <input
                              type="text"
                              value={projDate}
                              onChange={(e) => setProjDate(e.target.value)}
                              placeholder="cth: April 2026"
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Link Gambar / Foto URL</label>
                          <input
                            type="text"
                            value={projImageUrl}
                            onChange={(e) => setProjImageUrl(e.target.value)}
                            placeholder="Taruh link foto Unsplash cth: https://images.unsplash.com/..."
                            required
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white font-mono"
                          />
                        </div>

                        {/* Preset Quick Images */}
                        <div>
                          <label className="block text-zinc-400 text-[9px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <Image size={10} />
                            <span>Atau klik untuk pakai gambar estetik siap pakai:</span>
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {PRESET_IMAGES.map((img, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setProjImageUrl(img.url)}
                                className={`h-11 rounded-lg border overflow-hidden p-0 relative transition-all cursor-pointer ${
                                  projImageUrl === img.url 
                                    ? 'border-[#2b7fff] ring-1 ring-[#2b7fff]' 
                                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                                }`}
                                title={img.label}
                              >
                                <img src={img.url} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Deskripsi Singkat Karya</label>
                          <textarea
                            value={projDescription}
                            onChange={(e) => setProjDescription(e.target.value)}
                            placeholder="Tuliskan cerita romansa, tantangan visual, atau keunikan dari pameran karya dokumentasi ini..."
                            rows={3}
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setCurrentEditProject(null);
                          resetProjectForm();
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-lg text-[11px] font-bold uppercase tracking-wide cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save size={12} />
                        <span>{isAddingProject ? 'Tambahkan Ke Pameran' : 'Simpan Perubahan'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Portfolio items table/list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-zinc-950 border border-zinc-850 rounded-2xl p-4 flex gap-4 hover:border-zinc-750 transition-colors"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0 border border-zinc-800">
                        <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-zinc-900 text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400 rounded">
                              {p.category}
                            </span>
                            <span className="text-[10px] text-zinc-500 font-mono">{p.date}</span>
                          </div>
                          <h4 className="font-sans font-bold text-sm text-white truncate">{p.title}</h4>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">{p.clientName} | {p.location}</p>
                        </div>

                        <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-zinc-900">
                          <button
                            onClick={() => handleStartEditProject(p)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit3 size={11} />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(p.id)}
                            className="p-1.5 text-red-400/80 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Hapus</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. TESTIMONIALS SEGMENT */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div>
                    <h3 className="font-display font-medium text-lg text-white">Kelola Testimonial Pelanggan</h3>
                    <p className="text-zinc-500 text-xs">Ulasan positif berperingkat bintang 5 untuk dicantumkan di beranda</p>
                  </div>
                  {!isAddingTestimonial && !currentEditTestimonial && (
                    <button
                      onClick={() => {
                        resetTestimonialForm();
                        setIsAddingTestimonial(true);
                      }}
                      className="px-4 py-2.5 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Tambah Ulasan</span>
                    </button>
                  )}
                </div>

                {/* Testimonial Form write */}
                {(isAddingTestimonial || currentEditTestimonial) && (
                  <form 
                    onSubmit={isAddingTestimonial ? handleAddTestimonial : handleSaveEditTestimonial} 
                    className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-5 animate-slide-up"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2b7fff] flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>{isAddingTestimonial ? 'TAMBAH ULASAN BARU' : 'SUNTING ULASAN'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingTestimonial(false);
                          setCurrentEditTestimonial(null);
                          resetTestimonialForm();
                        }}
                        className="p-1 rounded bg-zinc-855 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Nama Klien / Pengulas</label>
                          <input
                            type="text"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="cth: Linda & Farhan"
                            required
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Peran / Kategori Klien</label>
                            <input
                              type="text"
                              value={testRole}
                              onChange={(e) => setTestRole(e.target.value)}
                              placeholder="cth: Pengantin Baru, Ketua PR"
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Asal Daerah / Kota</label>
                            <input
                              type="text"
                              value={testLocation}
                              onChange={(e) => setTestLocation(e.target.value)}
                              placeholder="cth: Padang, Bukittinggi"
                              className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Rating Bintang</label>
                          <select
                            value={testRating}
                            onChange={(e) => setTestRating(parseInt(e.target.value))}
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white font-mono"
                          >
                            <option value="5">★★★★★ (5 Bintang - Sangat Puas)</option>
                            <option value="4">★★★★ (4 Bintang - Puas)</option>
                            <option value="3">★★★ (3 Bintang - Biasa)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <div>
                          <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Isi Ulasan Testimonial</label>
                          <textarea
                            value={testMessage}
                            onChange={(e) => setTestMessage(e.target.value)}
                            placeholder="Tuliskan kata ulasan apresiatif yang diberikan dari klien Cepen Production..."
                            rows={6}
                            required
                            className="w-full text-xs p-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingTestimonial(false);
                          setCurrentEditTestimonial(null);
                          resetTestimonialForm();
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-lg text-[11px] font-bold uppercase tracking-wide cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save size={12} />
                        <span>{isAddingTestimonial ? 'Sematkan Ulasan' : 'Simpan Perubahan'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Testimonial card lists */}
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div 
                      key={t.id}
                      className="bg-zinc-950 border border-zinc-855 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-zinc-750 transition-colors"
                    >
                      <div className="space-y-1.5 text-left flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-white">{t.name}</span>
                          <span className="text-[10px] text-zinc-500">{t.location}</span>
                        </div>
                        <p className="text-[10px] text-[#2b7fff] tracking-wider uppercase font-bold">{t.role}</p>
                        <p className="text-[12px] text-zinc-400 leading-relaxed font-light italic">"{t.message}"</p>
                        <div className="flex text-amber-400 pt-1">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 sm:self-center">
                        <button
                          onClick={() => handleStartEditTestimonial(t)}
                          className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer border border-zinc-800/60"
                        >
                          <Edit3 size={11} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1.5 text-red-400/80 hover:text-red-400 bg-red-950/10 hover:bg-red-950/20 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer border border-red-950/20"
                        >
                          <Trash2 size={11} />
                          <span>Hapus</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. FAQS SEGMENT */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
                  <div>
                    <h3 className="font-display font-medium text-lg text-white">Kelola Pertanyaan FAQ</h3>
                    <p className="text-zinc-500 text-xs">Atur tanya jawab untuk memudahkan konsultasi pra-acara klien Anda</p>
                  </div>
                  {!isAddingFaq && !currentEditFaq && (
                    <button
                      onClick={() => {
                        resetFaqForm();
                        setIsAddingFaq(true);
                      }}
                      className="px-4 py-2.5 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={14} />
                      <span>Tambah FAQ</span>
                    </button>
                  )}
                </div>

                {/* FAQ Form write */}
                {(isAddingFaq || currentEditFaq) && (
                  <form 
                    onSubmit={isAddingFaq ? handleAddFaq : handleSaveEditFaq} 
                    className="bg-zinc-950 border border-zinc-800 p-6 rounded-2xl space-y-5 animate-slide-up"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-[#2b7fff] flex items-center gap-1.5">
                        <HelpCircle size={14} />
                        <span>{isAddingFaq ? 'TAMBAH PERTANYAAN FAQ BARU' : 'SUNTING FAQ'}</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFaq(false);
                          setCurrentEditFaq(null);
                          resetFaqForm();
                        }}
                        className="p-1 rounded bg-zinc-855 hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Pertanyaan FAQ</label>
                        <input
                          type="text"
                          value={faqQuestion}
                          onChange={(e) => setFaqQuestion(e.target.value)}
                          placeholder="cth: Berapa jam pengerjaan foto pranikah?"
                          required
                          className="w-full text-xs p-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1">Jawaban FAQ</label>
                        <textarea
                          value={faqAnswer}
                          onChange={(e) => setFaqAnswer(e.target.value)}
                          placeholder="Tuliskan penjelasan lugas, informatif, dan transparan untuk memudahkan calon klien..."
                          rows={4}
                          required
                          className="w-full text-xs p-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-750 focus:border-[#2b7fff] outline-none rounded-lg text-white resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingFaq(false);
                          setCurrentEditFaq(null);
                          resetFaqForm();
                        }}
                        className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-lg text-[11px] font-bold uppercase tracking-wide cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#2b7fff] hover:bg-blue-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
                      >
                        <Save size={12} />
                        <span>{isAddingFaq ? 'Publikasikan FAQ' : 'Simpan Perubahan'}</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* FAQ items summary list */}
                <div className="space-y-4">
                  {faqs.map((f, i) => (
                    <div 
                      key={f.id}
                      className="bg-zinc-950 border border-zinc-855 rounded-2xl p-5 text-left hover:border-zinc-750 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2 flex-1 min-w-0">
                          <h4 className="font-sans font-bold text-sm text-white flex items-start gap-2.5">
                            <span className="text-[10px] bg-zinc-900 text-blue-500 font-mono px-2 py-0.5 rounded flex-shrink-0 mt-0.5">Q{i + 1}</span>
                            <span>{f.question}</span>
                          </h4>
                          <p className="text-[12px] text-zinc-400 pl-8 leading-relaxed font-light">{f.answer}</p>
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleStartEditFaq(f)}
                            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer border border-zinc-800/60"
                          >
                            <Edit3 size={11} />
                          </button>
                          <button
                            onClick={() => handleDeleteFaq(f.id)}
                            className="p-1.5 text-red-400/85 hover:text-red-400 bg-red-950/10 hover:bg-red-950/20 rounded transition-colors text-[10px] uppercase font-bold flex items-center gap-1 cursor-pointer border border-red-950/20"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
