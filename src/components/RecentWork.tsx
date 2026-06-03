import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { ServiceCategory, Project } from '../types';
import { X, ChevronLeft, ChevronRight, Share2, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecentWorkProps {
  onSeeMoreGallery?: () => void;
}

export default function RecentWork({ onSeeMoreGallery }: RecentWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const categories: { label: string; value: ServiceCategory | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Wedding', value: 'wedding' },
    { label: 'Prewedding', value: 'prewedding' },
    { label: 'Events', value: 'event' },
    { label: 'Aero Cine', value: 'drone' },
  ];

  const openLightbox = (project: Project) => {
    const idx = filteredProjects.findIndex(p => p.id === project.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    } else if (lightboxIndex === 0) {
      setLightboxIndex(filteredProjects.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxIndex < filteredProjects.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    } else if (lightboxIndex === filteredProjects.length - 1) {
      setLightboxIndex(0);
    }
  };

  const currentProjectInLightbox = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="py-32 px-6 sm:px-8 bg-[#f4f4f7] text-zinc-900 border-b border-zinc-200 z-10 relative"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Minimalist Heading Block */}
        <div id="gallery-header" className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-zinc-200 pb-10">
          <div className="text-left space-y-3">
            <span className="font-sans text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1.5 block">
              PORTFOLIO SHOWCASE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 uppercase">
              SELECTED EXHIBITIONS
            </h2>
            <p className="font-sans text-[14px] sm:text-[15px] text-zinc-600 font-light max-w-lg leading-relaxed pt-1">
              Menangkap emosi murni dan keindahan kultural Sumatera Barat secara jujur, abadi, dan minimalis.
            </p>
          </div>

          {/* Slashed Ultra-Minimal filter navigation */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 md:mt-0">
            {categories.map((cat, idx) => (
              <React.Fragment key={cat.value}>
                <button
                  id={`btn-filter-${cat.value}`}
                  onClick={() => {
                    setSelectedCategory(cat.value);
                    setLightboxIndex(null);
                    setVisibleCount(6);
                  }}
                  className={`text-[11px] font-sans tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'text-blue-600 font-bold scale-105'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {cat.label}
                  {selectedCategory === cat.value && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-600"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
                {idx < categories.length - 1 && (
                  <span className="text-zinc-300 font-light text-[10px] select-none">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Elegant & Spaced Portfolio Album Grid (3:4 ratio styled like premium album covers) */}
        <div id="gallery-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedProjects.map((proj) => {
            return (
              <motion.div
                layout
                id={`project-card-${proj.id}`}
                key={proj.id}
                onClick={() => openLightbox(proj)}
                className="group cursor-pointer aspect-[3/4] w-full relative overflow-hidden rounded-[2rem] bg-zinc-900 border border-zinc-200/50 shadow-[0_15px_40px_-5px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,71,255,0.22)] transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* Backlit Background Artwork cover (The photo) */}
                <img
                  src={proj.imageUrl}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out brightness-[0.82] saturate-[0.85] scale-100 group-hover:scale-[1.04] group-hover:brightness-[0.92] group-hover:saturate-100"
                />

                {/* Minimal Dark Ambient Shadow overlay strictly protecting top & bottom text */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/55 via-black/10 to-transparent pointer-events-none" />
                
                {/* Micro Ambient Glass Frame Effect */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/[0.08] pointer-events-none" />

                {/* Album Cover Superposed Metadata HUD Layout */}
                <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 pb-4 sm:pb-5 z-10 select-none">
                  
                  {/* TOP ROW: Album Title (Left), Arrow Up-Right 45° (Right) */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-left space-y-0.5">
                      <h3 className="font-sans font-bold text-base sm:text-[17px] text-white tracking-tight leading-tight group-hover:text-blue-400 transition-colors duration-300">
                        {proj.title}
                      </h3>
                      {proj.clientName && (
                        <p className="font-sans text-[10px] tracking-wide text-neutral-450 font-normal opacity-85">
                          by {proj.clientName}
                        </p>
                      )}
                    </div>

                    {/* Classic 45-degree Up-Right Arrow inside an elegant pill button */}
                    <div className="w-8.5 h-8.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/95 group-hover:bg-[#2b7fff] group-hover:text-white group-hover:border-transparent transition-all duration-300 transform group-hover:rotate-45 shrink-0 shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* BOTTOM ROW: Category / Jenis (Left) & Location / Lokasi (Right) - Tighter & Smaller */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    
                    {/* Jenis (wedding, prewedding, event, drone, etc.) */}
                    <div className="text-left">
                      <span className="text-[9px] font-sans font-semibold text-white tracking-widest uppercase py-0.5 px-2.5 rounded bg-white/10 border border-white/10 backdrop-blur-xs">
                        {proj.category}
                      </span>
                    </div>

                    {/* Lokasi (e.g. Batusangkar, Tanah Datar) */}
                    <div className="text-right">
                      <span className="text-[10px] sm:text-[11px] font-sans font-normal text-neutral-300 tracking-wide">
                        {proj.location}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Accent glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-[#2b7fff] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Empty Collection State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-zinc-200 bg-white rounded-2xl">
            <p className="text-zinc-400 font-sans text-xs uppercase tracking-[0.15em]">
              Koleksi karya sedang dikurasi.
            </p>
          </div>
        )}

        {/* Dynamic & Luxurious "See More" Button */}
        <div className="flex justify-center mt-16" id="see-more-container">
          <button
            id="btn-gallery-see-more"
            onClick={onSeeMoreGallery || (() => setVisibleCount(prev => prev + 6))}
            className="group inline-flex items-center justify-center bg-zinc-950 hover:bg-[#2b7fff] border border-zinc-900 text-white text-[11px] font-sans font-bold tracking-widest uppercase px-8 h-12 rounded-full transition-all duration-300 gap-2 shrink-0 shadow-lg hover:shadow-blue-500/10 cursor-pointer"
          >
            <span>LIHAT SEMUA GALERI (SEE MORE)</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* IMMERSIVE LUXURY SILENT LIGHTBOX */}
      <AnimatePresence>
        {currentProjectInLightbox && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="lightbox-container"
            className="fixed inset-0 bg-black z-55 flex flex-col justify-between p-6 sm:p-10 select-none"
            onClick={closeLightbox}
          >
            {/* Soft Top Navigation Row */}
            <div className="flex items-center justify-between w-full h-12 z-20">
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                EXHIBIT {lightboxIndex + 1} OF {filteredProjects.length}
              </span>
              <button
                id="btn-close-lightbox"
                onClick={closeLightbox}
                className="text-[11px] font-sans font-semibold tracking-[0.2em] text-neutral-400 hover:text-white transition-colors uppercase focus:outline-none cursor-pointer"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Immersive Photo Display Space */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              {/* Prev Trigger */}
              <button
                id="btn-lightbox-prev"
                onClick={handlePrev}
                className="absolute left-0 top-0 bottom-0 w-1/12 min-w-[50px] flex items-center justify-start text-neutral-600 hover:text-white transition-colors focus:outline-none cursor-pointer group z-20"
                title="Previous Image"
              >
                <ChevronLeft size={24} className="transform group-hover:-translate-x-1 transition-transform" />
              </button>

              {/* Central Premium Image */}
              <div 
                className="max-w-[85vw] max-h-[60vh] sm:max-h-[68vh] shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-neutral-900 bg-neutral-950 p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={currentProjectInLightbox.imageUrl}
                  alt={currentProjectInLightbox.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[56vh] sm:max-h-[64vh] object-contain block mx-auto saturate-100 transition-all duration-700"
                />
              </div>

              {/* Next Trigger */}
              <button
                id="btn-lightbox-next"
                onClick={handleNext}
                className="absolute right-0 top-0 bottom-0 w-1/12 min-w-[50px] flex items-center justify-end text-neutral-600 hover:text-white transition-colors focus:outline-none cursor-pointer group z-20"
                title="Next Image"
              >
                <ChevronRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Down aligned minimalist curatorial text details */}
            <div
              id="lightbox-panel"
              className="w-full max-w-2xl mx-auto text-center space-y-4 pb-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-4 text-[10px] font-sans font-semibold tracking-wider text-neutral-500 uppercase">
                <span>{currentProjectInLightbox.location}</span>
                <span>•</span>
                <span>{currentProjectInLightbox.date}</span>
                <span>•</span>
                <span className="text-white">{currentProjectInLightbox.category}</span>
              </div>
              
              <h3 className="font-sans font-light text-base sm:text-lg text-white uppercase tracking-widest">
                {currentProjectInLightbox.title}
              </h3>
              
              <p className="text-[12px] sm:text-[13px] text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
                {currentProjectInLightbox.description}
              </p>

              {/* Minimalist Inquiry & Share actions */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <button
                  id="btn-lightbox-inquire"
                  onClick={() => {
                    closeLightbox();
                    const contactEl = document.getElementById('contact');
                    if (contactEl) {
                      window.scrollTo({
                        top: contactEl.offsetTop - 80,
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className="text-[10px] font-sans font-semibold tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors uppercase cursor-pointer"
                >
                  <span>Inquire this shoot</span>
                  <ArrowRight size={10} />
                </button>

                <span className="text-neutral-800 text-xs">|</span>

                <button
                  className="text-[10px] font-sans font-semibold tracking-wider text-neutral-450 hover:text-white transition-colors uppercase cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                >
                  Copy share link
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
