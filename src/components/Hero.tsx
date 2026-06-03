import React from 'react';
import { Sparkles, ArrowDown, Image as ImageIcon } from 'lucide-react';
import { IMAGES } from '../data';

interface HeroProps {
  onAksesPricelist: () => void;
}

export default function Hero({ onAksesPricelist }: HeroProps) {
  const handleGalleryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      const offsetTop = galleryEl.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  // 5 high-quality wedding / couple-oriented client avatars
  // Overlapping stack: first (left) is blurred, getting gradually sharper towards the rightmost which is fully clear on top
  const clientAvatars = [
    {
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      alt: 'Client 5',
      blurClass: 'blur-[2.5px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      alt: 'Client 4',
      blurClass: 'blur-[1.8px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      alt: 'Client 3',
      blurClass: 'blur-[1.2px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      alt: 'Client 2',
      blurClass: 'blur-[0.5px]',
    },
    {
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      alt: 'Client 1',
      blurClass: 'blur-none',
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen bg-white flex items-center overflow-hidden pt-28 pb-20 px-6 sm:px-8 border-b border-zinc-100"
    >
      {/* Dynamic Fullscreen aspect-ratio background with customizable premium overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={IMAGES.heroAnakDaro}
            alt="Anak Daro Suntiang Minang"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[55%_center] lg:object-[58%_center]"
          />
        </div>
        {/* Custom requested filter: 20% solid pure white, 30% gradient white-to-trans, remaining 50% transparent */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(to right, #ffffff 0%, #ffffff 20%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Columns: Text Content Area */}
          <div id="hero-content" className="lg:col-span-7 space-y-8 text-left max-w-2xl">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-zinc-50 border border-zinc-150 shadow-xs px-3.5 py-1.5 rounded-full">
              <Sparkles size={13} className="text-blue-600 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider text-zinc-650 uppercase">
                Event & Wedding Fotografer Bukittinggi, Sumatera Barat
              </span>
            </div>

            {/* Core Headlines - Maintained exactly as requested */}
            <div className="space-y-4">
              <h1 className="font-sans text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-zinc-950 leading-[1.12]">
                Mendokumentasikan <br className="hidden sm:inline" />
                <span className="relative inline-block text-zinc-950 font-extrabold decoration-blue-600/30 underline decoration-4 underline-offset-4">
                  Keindahan Abadi
                </span>
                <br />
                Kisah Sempurna Anda.
              </h1>
              <p className="max-w-lg text-[14px] sm:text-[15px] lg:text-[16px] text-zinc-505 leading-relaxed font-light text-zinc-500">
                Cepen Production hadir sebagai pelopor sinematografi dan fotografi modern di Ranah Minang. 
                Membingkai prosesi sakral, emosi magis Pernikahan, Prewedding alam bebas, 
                hingga video udara lanskap sinematik berbekal standar visual premium dan estetika bercitarasa tinggi.
              </p>
            </div>

            {/* Action Buttons - Reformatted back to round capsule buttons with custom wording */}
            <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                id="hero-btn-pricelist"
                onClick={onAksesPricelist}
                className="group inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-900 border border-zinc-950 hover:border-zinc-900 text-white text-[13px] sm:text-sm font-semibold px-6 sm:px-8 h-12 rounded-full transition-all duration-300 gap-2 shrink-0 shadow-lg shadow-zinc-950/10 cursor-pointer"
              >
                <span>Akses Pricelist</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-130 transition-transform" />
              </button>

              <button
                id="hero-btn-gallery"
                onClick={handleGalleryClick}
                className="inline-flex items-center justify-center bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 text-[13px] sm:text-sm font-semibold px-6 sm:px-8 h-12 rounded-full transition-all duration-300 gap-2 shrink-0 shadow-xs cursor-pointer"
              >
                <span>Gallery</span>
              </button>
            </div>

            {/* Client overlap stack and descriptive tagline - depth of field blurred */}
            <div className="pt-6 border-t border-zinc-100 max-w-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex -space-x-3 items-center shrink-0">
                  {clientAvatars.map((avatar, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-full"
                      style={{ zIndex: idx + 10 }}
                    >
                      <img
                        src={avatar.img}
                        alt={avatar.alt}
                        referrerPolicy="no-referrer"
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white object-cover shadow-sm ${avatar.blurClass} transition-all duration-300 hover:scale-105 hover:z-20`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-zinc-650 text-xs sm:text-[13px] font-normal leading-relaxed text-zinc-500">
                  Bergabunglah bersama <span className="font-bold text-zinc-900 font-sans">300++ happy client</span> yang sudah bekerjasama dengan Cepen Production
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Elegant scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 z-10 hidden md:flex">
        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest animate-pulse">
          Scroll Down
        </span>
        <ArrowDown size={14} className="text-blue-500 animate-bounce" />
      </div>
    </section>
  );
}
