import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface HeaderProps {
  onAksesPricelist: () => void;
  currentPage?: 'home' | 'gallery';
  onNavigate?: (view: 'home' | 'gallery', sectionId?: string) => void;
}

export default function Header({ onAksesPricelist, currentPage = 'home', onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSegment, setActiveSegment] = useState('home');

  useEffect(() => {
    if (currentPage === 'gallery') {
      setActiveSegment('gallery');
      const handleScrollMinimal = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScrollMinimal);
      return () => window.removeEventListener('scroll', handleScrollMinimal);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section for indicators
      const sections = ['home', 'gallery', 'pricelist', 'about', 'contact'];
      let currentSection = 'home';
      for (const sectionId of sections) {
        const checkEl = document.getElementById(sectionId);
        if (checkEl) {
          const rect = checkEl.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSegment(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const menuItems = [
    { label: 'Gallery', href: '#gallery', key: 'gallery' },
    { label: 'Pricelist', href: '#pricelist', key: 'pricelist' },
    { label: 'About', href: '#about', key: 'about' },
    { label: 'Contact', href: '#contact', key: 'contact' },
  ];

  const handleScrollToSegment = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (targetId === 'gallery') {
      if (onNavigate) {
        onNavigate('gallery');
      }
    } else {
      if (currentPage === 'gallery') {
        if (onNavigate) {
          onNavigate('home', targetId);
        }
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offsetTop = targetEl.offsetTop - 80; // height of sticking header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 w-full z-45 flex justify-center pointer-events-none transition-all duration-300"
    >
      <motion.div
        layout
        id="header-inner-container"
        className={`pointer-events-auto flex items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'mt-4 px-4 gap-3 w-full max-w-[95%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl justify-center'
            : 'w-full max-w-7xl px-6 sm:px-8 py-6 justify-between'
        }`}
      >
        {/* THE BLACK CAPSULE (Contains Logo, Navigation, Mobile Menu Trigger) */}
        <motion.div
          layout
          id="header-capsule"
          className={`flex items-center transition-all duration-500 ease-in-out ${
            isScrolled
              ? 'bg-zinc-950 text-white rounded-full h-12 px-5 sm:px-6 gap-6 md:gap-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] w-full justify-between lg:w-auto lg:flex-none lg:justify-center'
              : 'bg-transparent text-zinc-900 justify-between w-full flex-1'
          }`}
        >
          {/* Logo container */}
          <motion.div
            layout
            className={`transition-all duration-500 flex items-center ${
              isScrolled 
                ? 'w-auto flex-none' 
                : 'w-48 sm:w-60 md:w-64 flex justify-start'
            }`}
          >
            <a
              id="brand-logo"
              href="#home"
              onClick={(e) => handleScrollToSegment(e, 'home')}
              className="group flex items-center shrink-0"
            >
              <Logo 
                height={isScrolled ? 26 : 32} 
                variant={isScrolled ? 'white-icon' : 'black'} 
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            layout
            id="desktop-nav" 
            className={`hidden lg:flex items-center transition-all duration-500 ${
              isScrolled 
                ? 'w-auto flex-none space-x-1 sm:space-x-2' 
                : 'w-auto flex-1 justify-center space-x-1 sm:space-x-2'
            }`}
          >
            {menuItems.map((item) => {
              const isActive = activeSegment === item.key;
              return (
                <a
                  id={`nav-${item.key}`}
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleScrollToSegment(e, item.key)}
                  className="text-[14px] font-sans font-semibold tracking-wide px-3 sm:px-4 py-2 rounded-md transition-all duration-300 relative group"
                >
                  <span className={`relative z-10 duration-300 ${
                    isActive 
                      ? (isScrolled ? 'text-white' : 'text-zinc-950') 
                      : (isScrolled ? 'text-zinc-400 hover:text-white' : 'text-zinc-550 hover:text-zinc-950')
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Underline for active state */}
                  {isActive && (
                    <span className={`absolute bottom-1.5 left-3 right-3 h-[2px] rounded-full z-0 transition-colors duration-300 ${isScrolled ? 'bg-blue-500' : 'bg-[#2b7fff]'}`} />
                  )}
                  
                  {/* Subtle hover dash */}
                  {!isActive && (
                    <span className={`absolute bottom-1.5 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200 z-0 ${isScrolled ? 'bg-white/40' : 'bg-zinc-300'}`} />
                  )}
                </a>
              );
            })}
          </motion.nav>

          {/* Mobile menu trigger */}
          <button
            id="btn-mobile-menu"
            aria-label="Toggle Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 focus:outline-none transition-all cursor-pointer ${
              isScrolled ? 'text-white hover:text-blue-400' : 'text-zinc-950 hover:text-[#2b7fff]'
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>

        {/* Action Button wrapper */}
        <motion.div 
          layout
          className={`hidden lg:flex transition-all duration-500 ${
            isScrolled 
              ? 'w-auto flex-none' 
              : 'w-48 sm:w-60 md:w-64 justify-end shrink-0 ml-4'
          }`}
        >
          <button
            id="header-btn-pricelist"
            onClick={onAksesPricelist}
            className={`hidden lg:flex items-center justify-center space-x-2 bg-zinc-950 hover:bg-[#2b7fff] text-white text-[13px] md:text-[14px] font-semibold h-12 rounded-full select-none transition-all duration-300 cursor-pointer shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6)] ${
              isScrolled 
                ? 'px-5 sm:px-6' 
                : 'px-5 sm:px-6 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <span>Akses Pricelist</span>
            <ArrowRight size={14} className="text-white/80" />
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-nav-panel" 
            key="mobile-nav-panel-motion"
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className={`lg:hidden fixed inset-x-4 rounded-2xl border shadow-xl px-6 py-6 flex flex-col space-y-3 z-50 pointer-events-auto transition-all duration-300 ${
              isScrolled 
                ? 'top-[76px] bg-black/95 backdrop-blur-md border-white/10 text-white' 
                : 'top-[80px] bg-white border-zinc-200/80 text-zinc-950'
            }`}
          >
            {menuItems.map((item) => {
              const isActive = activeSegment === item.key;
              return (
                <a
                  id={`nav-mob-${item.key}`}
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleScrollToSegment(e, item.key)}
                  className={`text-sm font-semibold tracking-wider uppercase py-2.5 px-4 rounded transition-all flex items-center justify-end gap-2 text-right ${
                    isActive
                      ? (isScrolled 
                          ? 'bg-zinc-900 border-r-2 border-blue-500 text-white font-semibold' 
                          : 'bg-zinc-50 border-r-2 border-[#2b7fff] text-zinc-950 font-semibold')
                      : (isScrolled
                          ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                          : 'text-zinc-650 hover:text-zinc-950 hover:bg-zinc-50/50')
                  }`}
                >
                  {isActive && <span className={`w-1.5 h-1.5 rounded-full ${isScrolled ? 'bg-blue-500' : 'bg-[#2b7fff]'}`} />}
                  <span>{item.label}</span>
                </a>
              );
            })}
            <button
              id="mobile-btn-pricelist"
              onClick={() => {
                setIsMobileMenuOpen(false);
                onAksesPricelist();
              }}
              className={`w-full mt-3 text-[13px] font-semibold py-3.5 rounded-full text-center transition-all duration-300 flex items-center justify-center space-x-2 ${
                isScrolled
                  ? 'bg-white hover:bg-zinc-100 text-zinc-950'
                  : 'bg-zinc-950 hover:bg-[#2b7fff] text-white'
              }`}
            >
              <span>Akses Pricelist Sekarang</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
