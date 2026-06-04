import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { ServiceCategory, Project } from '../types';
import { X, ChevronLeft, ChevronRight, Share2, ArrowRight, ArrowUpRight, ChevronDown, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecentWorkProps {
  onSeeMoreGallery?: () => void;
  onSelectProject?: (albumId: string) => void;
  projects?: Project[];
}

const getAlbumIdForProject = (projId: string): string => {
  const mapping: Record<string, string> = {
    'proj1': 'album_1',
    'proj2': 'album_2',
    'proj3': 'album_6', // Pacu Jawi!
    'proj4': 'album_9',
    'proj5': 'album_3',
    'proj6': 'album_4',
    'proj7': 'album_5',
    'proj8': 'album_8',
    'proj9': 'album_7',
    'proj10': 'album_6',
    'proj11': 'album_1',
    'proj12': 'album_7',
  };
  return mapping[projId] || 'album_1';
};

export default function RecentWork({ onSeeMoreGallery, onSelectProject, projects }: RecentWorkProps) {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const projectsList = projects || PROJECTS;

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'all'
    ? projectsList
    : projectsList.filter(p => p.category === selectedCategory);

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
        <div id="gallery-header" className="flex flex-col items-center text-center justify-center gap-6 mb-16 pb-4">
          <div className="flex flex-col items-center justify-center text-center">
            <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2b7fff] uppercase mb-2 flex items-center justify-center gap-1.5">
              <Sparkles size={11} className="text-[#2b7fff] animate-pulse" />
              PORTFOLIO SHOWCASE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              SELECTED EXHIBITIONS
            </h2>
            <div className="w-16 h-1 bg-[#2b7fff] rounded mt-3 mb-4" />
            <p className="font-sans text-[14px] sm:text-[15px] text-zinc-600 font-light max-w-lg leading-relaxed pt-1 mx-auto">
              Menangkap emosi murni dan keindahan kultural Sumatera Barat secara jujur, abadi, dan minimalis.
            </p>
          </div>

          {/* Capsule layout styled like the pricelist popup category selections */}
          <div className="flex flex-wrap gap-1 bg-zinc-200/50 border border-zinc-200/80 p-1.5 rounded-lg max-w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                id={`btn-filter-${cat.value}`}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setLightboxIndex(null);
                  setVisibleCount(6);
                }}
                className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-zinc-950 text-white shadow-md font-extrabold'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/50'
                }`}
              >
                {cat.label}
              </button>
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
                onClick={() => {
                  if (onSelectProject) {
                    onSelectProject(getAlbumIdForProject(proj.id));
                  } else {
                    openLightbox(proj);
                  }
                }}
                className="group cursor-pointer flex flex-col space-y-4"
              >
                {/* The premium folder design cover */}
                <div className="aspect-[3/4] relative w-full overflow-hidden rounded-3xl bg-zinc-950 shadow-md group-hover:shadow-[0_20px_45px_rgba(0,71,255,0.12)] border border-zinc-200/40 transition-all duration-500 hover:-translate-y-1">
                  
                  {/* Photo backdrop */}
                  <img
                    src={proj.imageUrl}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] saturate-[0.88] transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-hover:brightness-[0.9]"
                  />

                  {/* Cover Dark Gradient and Glass boundary */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 border border-white/5 rounded-3xl" />

                  {/* Category Label */}
                  <div className="absolute top-5 right-5 border border-white/60 bg-transparent px-3 py-1 rounded-full text-white text-[8px] font-mono tracking-widest uppercase font-bold">
                    {proj.category}
                  </div>

                  {/* Bottom display info inside the cover */}
                  <div className="absolute bottom-6 inset-x-6 text-white space-y-2 select-none text-left">
                    <div className="flex items-center gap-1.5 text-white text-[10px] font-sans font-medium">
                      <MapPin size={10} />
                      <span>{proj.location}</span>
                    </div>
                    <h3 className="font-sans font-bold text-lg leading-tight uppercase tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {proj.title}
                    </h3>
                    <div className="flex justify-between items-center text-[10px] text-zinc-300 border-t border-white/10 pt-2 font-mono">
                      <span>{proj.clientName}</span>
                      <span>{proj.date}</span>
                    </div>
                  </div>
                </div>


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
