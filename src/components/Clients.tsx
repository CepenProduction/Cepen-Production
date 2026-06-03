import React from 'react';
import { Sparkles } from 'lucide-react';

const SupremeLogo = () => (
  <div className="bg-zinc-900 text-white font-black tracking-tight px-7 py-2 text-[20px] uppercase italic select-none">
    Supreme
  </div>
);

const StussyLogo = () => (
  <div className="font-serif italic font-extrabold text-[27px] text-zinc-800 tracking-tighter select-none">
    Stüssy
  </div>
);

const OffWhiteLogo = () => (
  <div className="flex items-center space-x-2.5 select-none">
    <svg className="w-7 h-7 fill-current text-zinc-700" viewBox="0 0 24 24">
      <path d="M3 2v2h11.59l-11.3 11.29 1.41 1.41 11.3-11.3v11.6h2v-15h-15zm15.29 17.29l-11.3 11.3 1.41 1.41 11.3-11.3v11.3h2v-15h-15v2h11.59z" />
    </svg>
    <span className="font-sans font-black tracking-widest text-[16.5px] text-zinc-800">OFF-WHITE™</span>
  </div>
);

const BalenciagaLogo = () => (
  <div className="text-zinc-800 tracking-[0.35em] font-sans font-extrabold text-[18px] uppercase select-none">
    BALENCIAGA
  </div>
);

const FearOfGodLogo = () => (
  <div className="flex flex-col items-center justify-center text-center select-none">
    <span className="text-zinc-800 tracking-[0.25em] font-sans font-semibold text-[16.5px] uppercase">ESSENTIALS</span>
    <span className="text-zinc-400 tracking-[0.14em] font-sans text-[10.5px] uppercase">FEAR OF GOD</span>
  </div>
);

const PalaceLogo = () => (
  <div className="flex items-center space-x-2 select-none">
    <svg className="w-6.5 h-6.5 fill-none stroke-current stroke-2 text-zinc-700" viewBox="0 0 24 24">
      <polygon points="12,2 22,20 2,20" />
    </svg>
    <span className="font-sans font-black tracking-widest text-[16.5px] text-zinc-850 uppercase">PALACE</span>
  </div>
);

const KithLogo = () => (
  <div className="border border-zinc-900 bg-transparent text-zinc-900 font-serif font-semibold tracking-wide px-4.5 py-1 text-[18px] uppercase select-none">
    KITH
  </div>
);

const BapeLogo = () => (
  <div className="text-zinc-800 tracking-[0.08em] font-mono font-bold text-[16.5px] uppercase select-none">
    A BATHING APE®
  </div>
);

const CdgLogo = () => (
  <div className="flex items-center space-x-3 select-none">
    <svg className="w-7 h-7 fill-current text-zinc-700" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
    <span className="font-sans font-extrabold tracking-widest text-[17px] text-zinc-800 uppercase">PLAY</span>
  </div>
);

const VansLogo = () => (
  <div className="flex flex-col items-center select-none">
    <span className="font-sans font-black tracking-tighter text-[19px] text-zinc-800 uppercase relative">
      V<span className="border-t-2 border-zinc-800 absolute top-2.5 left-2.5 w-[52px]"></span>ANS
    </span>
    <span className="text-[9px] tracking-widest uppercase text-zinc-400 mt-[-2px]">"OFF THE WALL"</span>
  </div>
);

const CarharttLogo = () => (
  <div className="flex items-center space-x-2 select-none">
    <svg className="w-6.5 h-6.5 fill-current text-zinc-700" viewBox="0 0 24 24">
      <path d="M12 2a10 10 0 0 0-10 10c0 4.4 2.8 8.1 6.8 9.4c-.5-1.4-.8-2.9-.8-4.4c0-4.4 3.6-8 8-8c1.5 0 3 .3 4.4.8C19.1 5.8 15.8 3 12 3z" />
    </svg>
    <span className="font-sans font-bold text-[19px] text-zinc-800">carhartt</span>
  </div>
);

const HufLogo = () => (
  <div className="font-sans font-black tracking-normal text-[22px] text-zinc-900 uppercase select-none">
    HUF
  </div>
);

const ObeyLogo = () => (
  <div className="bg-zinc-950 text-white font-sans font-black tracking-tighter text-[19px] uppercase px-7 py-1.5 select-none">
    OBEY
  </div>
);

const UndefeatedLogo = () => (
  <div className="flex items-center space-x-2 select-none">
    <svg className="w-7 h-7 fill-none stroke-current stroke-3 text-zinc-700" viewBox="0 0 24 24">
      <line x1="5" y1="4" x2="9" y2="20" />
      <line x1="9" y1="4" x2="13" y2="20" />
      <line x1="13" y1="4" x2="17" y2="20" />
      <line x1="17" y1="4" x2="21" y2="20" />
      <line x1="3" y1="18" x2="21" y2="6" />
    </svg>
    <span className="font-sans font-black tracking-tight text-[17px] text-zinc-800 uppercase">UNDEFEATED</span>
  </div>
);

const DimeLogo = () => (
  <div className="font-sans font-black tracking-wide text-[19.5px] italic text-zinc-800 uppercase select-none">
    Dime
  </div>
);

const DiorLogo = () => (
  <div className="font-serif italic font-semibold text-[22px] text-zinc-800 tracking-wider lowercase select-none">
    Dior
  </div>
);

export default function Clients() {
  const row1Logos = [
    <SupremeLogo />,
    <StussyLogo />,
    <OffWhiteLogo />,
    <BalenciagaLogo />,
    <FearOfGodLogo />,
    <PalaceLogo />,
    <KithLogo />,
    <BapeLogo />,
  ];

  const row2Logos = [
    <CdgLogo />,
    <VansLogo />,
    <CarharttLogo />,
    <HufLogo />,
    <ObeyLogo />,
    <UndefeatedLogo />,
    <DimeLogo />,
    <DiorLogo />,
  ];

  return (
    <section id="clients" className="py-20 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Heading Label */}
        <div id="clients-heading" className="flex flex-col items-center justify-center text-center mb-14">
          <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2b7fff] uppercase mb-2 flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-[#2b7fff] animate-pulse" />
            03 / Trusted Partners
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Our Happy Clients
          </h2>
          <div className="w-16 h-1 bg-[#2b7fff] rounded mt-3" />
        </div>
      </div>

      {/* Looping Marquees Container */}
      <div className="space-y-6 max-w-full">
        
        {/* Row 1 - Scroll Left (30s) */}
        <div className="relative w-full flex overflow-hidden py-4 bg-transparent">
          {/* Subtle edge fades for modern aesthetic */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-marquee">
            <div className="flex items-center shrink-0">
              {row1Logos.map((Logo, index) => (
                <div 
                  key={`r1-1-${index}`} 
                  className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-10 h-20 transform hover:scale-105"
                >
                  {Logo}
                </div>
              ))}
            </div>
            <div className="flex items-center shrink-0">
              {row1Logos.map((Logo, index) => (
                <div 
                  key={`r1-2-${index}`} 
                  className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-10 h-20 transform hover:scale-105"
                >
                  {Logo}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Scroll Left slightly slower (38s) to create interesting parallax layer */}
        <div className="relative w-full flex overflow-hidden pb-4 bg-transparent">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-marquee" style={{ animationDuration: '38s' }}>
            <div className="flex items-center shrink-0">
              {row2Logos.map((Logo, index) => (
                <div 
                  key={`r2-1-${index}`} 
                  className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-12 h-20 transform hover:scale-105"
                >
                  {Logo}
                </div>
              ))}
            </div>
            <div className="flex items-center shrink-0">
              {row2Logos.map((Logo, index) => (
                <div 
                  key={`r2-2-${index}`} 
                  className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-12 h-20 transform hover:scale-105"
                >
                  {Logo}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
