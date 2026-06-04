import React, { useState } from 'react';
import { TESTIMONIALS } from '../data';
import { Testimonial } from '../types';
import { Star, MessageSquare, Plus, Check, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Testimonial[]>(TESTIMONIALS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Pengantin Baru');
  const [newMessage, setNewMessage] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newLoc, setNewLoc] = useState('Padang');
  const [submitted, setSubmitted] = useState(false);

  // Index pointer for the left-most visible card of the main center trio
  const [currentIndex, setCurrentIndex] = useState(0);

  // Submitting review function
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newObj: Testimonial = {
      id: `t_${Date.now()}`,
      name: newName,
      role: newRole,
      message: newMessage,
      rating: newRating,
      date: 'Baru saja',
      location: newLoc
    };

    setReviewsList([newObj, ...reviewsList]);
    setNewName('');
    setNewMessage('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
    }, 2000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  // Safe cyclic indices extractor
  const getTestimonialIndex = (offset: number) => {
    const len = reviewsList.length;
    if (len === 0) return 0;
    return (currentIndex + offset + len * 10) % len;
  };

  // Render 5 items:
  // Offset -1: partially visible on left with blur & fade
  // Offset 0, 1, 2: 3 fully visible ones in center
  // Offset 3: partially visible on right with blur & fade
  const offsets = [-1, 0, 1, 2, 3];

  return (
    <section
      id="reviews"
      className="py-24 bg-[#f4f4f7] border-b border-zinc-200 text-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-25">
        
        {/* Section Heading info */}
        <div id="reviews-header" className="flex flex-col items-center justify-center text-center mb-12">
          <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2b7fff] uppercase mb-2 flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-[#2b7fff] animate-pulse" />
            TESTIMONIALS
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Kata mereka tentang kami
          </h2>
          <div className="w-16 h-1 bg-[#2b7fff] rounded mt-3" />
        </div>

        {/* Dynamic Add Review Form */}
        {isFormOpen && (
          <div
            id="write-review-panel"
            className="mb-12 bg-white border border-blue-500/20 p-6 sm:p-8 rounded-2xl shadow-xl max-w-2xl mx-auto text-left animate-slide-up"
          >
            <h3 className="font-display font-bold text-zinc-950 text-sm sm:text-base uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Plus size={16} className="text-[#2b7fff]" />
              <span>Tulis Ulasan Anda Untuk Cepen Production</span>
            </h3>

            {submitted ? (
              <div className="bg-blue-50 border border-blue-100 p-4 text-blue-900 text-xs rounded-xl flex items-center space-x-2">
                <Check size={16} className="text-blue-500" />
                <span>Terima kasih! Ulasan Anda berhasil ditambahkan di halaman ini.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Contoh: Linda & Farhan"
                      className="w-full text-xs p-3 border border-zinc-200 bg-zinc-50 hover:border-zinc-300 focus:border-[#2b7fff] focus:bg-white outline-none rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Kategori Client / Hubungan
                    </label>
                    <input
                      type="text"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="Contoh: Pengantin Wanita, Corporate PR"
                      className="w-full text-xs p-3 border border-zinc-200 bg-zinc-50 hover:border-zinc-300 focus:border-[#2b7fff] focus:bg-white outline-none rounded-lg transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Kabupaten / Kota Domisili
                    </label>
                    <input
                      type="text"
                      value={newLoc}
                      onChange={(e) => setNewLoc(e.target.value)}
                      placeholder="Contoh: Bukittinggi, Padang, Solok"
                      className="w-full text-xs p-3 border border-zinc-200 bg-zinc-50 hover:border-zinc-300 focus:border-[#2b7fff] focus:bg-white outline-none rounded-lg transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Rating Bintang
                    </label>
                    <div className="flex items-center space-x-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setNewRating(starVal)}
                          className="hover:scale-115 transition-transform cursor-pointer"
                        >
                          <Star
                            size={18}
                            className={
                              starVal <= newRating
                                ? 'text-orange-500 fill-orange-500'
                                : 'text-zinc-200 fill-zinc-200'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                    Isi Komentar / Pengalaman
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tuliskan pengalaman berkesan Anda saat bekerja bersama tim fotografer dan videografer Cepen Production..."
                    className="w-full text-xs p-3 border border-zinc-200 bg-zinc-50 hover:border-zinc-300 focus:border-[#2b7fff] focus:bg-white outline-none rounded-lg transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 text-[10px] font-mono tracking-widest uppercase text-zinc-400 hover:text-zinc-900 border border-transparent transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-zinc-950 hover:bg-zinc-900 text-white text-[10px] font-bold tracking-widest uppercase rounded-lg transition-colors cursor-pointer"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* 5-Card Slider Container */}
      <div className="relative w-full overflow-hidden py-4 my-2 flex justify-center">
        {/* Left and Right blur-gradients overlapping edges to look exactly like the reference */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 md:w-64 lg:w-96 bg-gradient-to-r from-[#f4f4f7] via-[#f4f4f7]/85 to-transparent pointer-events-none z-15" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 md:w-64 lg:w-96 bg-gradient-to-l from-[#f4f4f7] via-[#f4f4f7]/85 to-transparent pointer-events-none z-15" />

        {/* Slidable Carousel Deck centered */}
        <div className="flex items-stretch justify-center gap-6 md:gap-12 max-w-[1800px] w-full px-4 overflow-visible">
          <AnimatePresence mode="popLayout" initial={false}>
            {offsets.map((offset) => {
              const elementIdx = getTestimonialIndex(offset);
              const test = reviewsList[elementIdx];
              if (!test) return null;

              // Check if it is left edge or right edge (partially visible, blurred & faded)
              const isEdge = offset === -1 || offset === 3;

              return (
                <motion.div
                  key={`${test.id}-${offset}`}
                  layout
                  initial={{ opacity: 0, x: offset * 35 }}
                  animate={{
                    opacity: isEdge ? 0.35 : 1,
                    scale: isEdge ? 0.90 : 1,
                    filter: isEdge ? 'blur(4px)' : 'blur(0px)',
                  }}
                  exit={{ opacity: 0, x: offset * -35 }}
                  transition={{ 
                    type: 'tween', 
                    ease: [0.3, 0, 0.2, 1], // Slow 20% -> Fast 60% -> Slow 20%
                    duration: 0.65 
                  }}
                  className={`flex-shrink-0 w-[260px] sm:w-[320px] md:w-[360px] p-4 flex flex-col justify-between transition-all duration-300 text-left min-h-[220px] bg-transparent border-0 shadow-none select-none ${
                    isEdge ? 'pointer-events-none text-zinc-400' : 'text-zinc-800'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Rating 5-stars shown as premium orange stars */}
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, fstarIdx) => (
                        <Star
                          key={fstarIdx}
                          size={14}
                          className={
                            fstarIdx < test.rating
                              ? 'text-orange-500 fill-orange-500'
                              : 'text-zinc-200'
                          }
                        />
                      ))}
                    </div>

                    {/* Testimonial Quote Message */}
                    <p className={`text-xs sm:text-[13.5px] leading-relaxed ${
                      isEdge ? 'text-zinc-400' : 'text-zinc-700 font-medium'
                    }`}>
                      "{test.message}"
                    </p>
                  </div>

                  {/* Reviewer Signature (Name and Location, matching screenshot) */}
                  <div className="pt-3 mt-4 text-left font-sans">
                    <p className={`text-xs sm:text-[13.5px] font-bold ${isEdge ? 'text-zinc-400' : 'text-zinc-900'}`}>
                      — {test.name}
                    </p>
                    <p className="text-[10.5px] sm:text-xs text-zinc-400 font-light mt-0.5 pl-4">
                      di {test.location}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Control row with minimalist arrows and written feedback toggle action button stacked strictly under */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col items-center justify-center gap-5 relative z-30">
        
        {/* Playful and subtle Left/Right navigation arrow buttons */}
        <div className="flex items-center space-x-6">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-zinc-300 hover:border-zinc-950 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer bg-white"
            title="Saran Sebelumnya"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-zinc-300 hover:border-zinc-950 text-zinc-600 hover:text-zinc-950 flex items-center justify-center transition-all duration-300 transform active:scale-95 cursor-pointer bg-white"
            title="Saran Selanjutnya"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Minimal write review drawer button placed nicely BELOW the arrow controls */}
        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="group inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 border border-zinc-950 hover:border-zinc-900 text-white text-[13px] sm:text-sm font-semibold px-6 sm:px-8 h-12 rounded-full transition-all duration-300 gap-2 shrink-0 shadow-lg shadow-zinc-950/10 cursor-pointer mt-2"
          >
            <span>Tuliskan Review Kamu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-130 transition-transform" />
          </button>
        )}
      </div>

    </section>
  );
}
