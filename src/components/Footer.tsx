import React from 'react';
import { Sparkles, ArrowUp, Instagram, Youtube, Heart, Facebook } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate?: (view: 'home' | 'gallery', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricelist', href: '#pricelist' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    if (targetId === 'gallery') {
      if (onNavigate) {
        onNavigate('gallery');
      } else {
        const galEl = document.getElementById('gallery');
        if (galEl) {
          window.scrollTo({ top: Math.max(0, galEl.offsetTop - 80), behavior: 'smooth' });
        }
      }
    } else {
      if (onNavigate) {
        onNavigate('home', targetId);
      } else {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          window.scrollTo({ top: Math.max(0, targetEl.offsetTop - 80), behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 text-white pt-20 pb-12 border-t border-zinc-900 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Upper Block */}
        <div id="footer-upper" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Col 1: Brand & Desc (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center">
              <Logo height={32} variant="white" />
            </div>
            <p className="text-zinc-400 text-xs sm:text-[13px] font-light leading-relaxed max-w-sm">
              Membingkai keindahan abadi dan prosesi sakral adat tradisional Minangkabau dengan standar visual premium serta sinematografi layar lebar modern.
            </p>
            <div className="flex flex-wrap gap-3.5 pt-2">
              <a
                href="https://www.instagram.com/cepenproduction/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                title="Instagram Cepen"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@cepenproduction"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors flex items-center justify-center"
                title="TikTok Cepen"
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,46.74,90.58,122.31,122.31,0,0,0,76,21.32Z"></path>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@cepenproduction"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                title="YouTube Cepen"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://web.facebook.com/cepenproduction"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
                title="Facebook Cepen"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://id.pinterest.com/cepenproduction/"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 hover:text-white transition-colors flex items-center justify-center"
                title="Pinterest Cepen"
              >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-166.8 70.7-166.8 155.1 0 38.5 20.4 87.6 54.9 103 6.3 2.8 6.9 1.6 8.3-3.8.9-3.6 3-12.2 4.1-16.5 1.6-6.1 1-8.1-3.5-13.5-12.3-14.7-20-34.1-20-61.8 0-76.3 57.1-151 158.4-151 86.4 0 139.1 53.6 139.1 127.3 0 92-46.7 156.4-109.8 156.4-34.2 0-59.8-28.3-51.6-63 9.8-41.2 28.8-85.7 28.8-115.5 0-26.6-14.3-48.8-43.8-48.8-34.8 0-62.7 36-62.7 84 0 30.7 10.4 51.5 10.4 51.5s-34.7 146.7-41 173.3c-12.2 51.5-1.8 114.6-.9 119.2.4 1.8 2.3 2.3 3.3.9 1.4-1.9 20.1-24.9 26.5-48.1 1.8-6.6 9-35.1 9-35.1 11.4 21.6 44.7 40.6 80.2 40.6 105.7 0 181.8-96.6 181.8-216.5C411 114.8 333 48 248 48 136.6 48 48 135.7 48 242.6c0 82.7 50.2 150.7 122 174.1.2 4.7.4 8.7.1 11.4-44.1-19.4-78.5-51.5-98.1-91.8C27.5 299.7 0 240 0 176 0 78.8 78.8 0 176 0c115 0 208 93 208 208v1c0 30.2 6.5 56.6 18 78.9z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation map (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display font-semibold text-xs text-zinc-300 uppercase tracking-widest">
              Peta Situs
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-zinc-400 hover:text-white text-xs font-light tracking-wide hover:underline transition-colors block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Quick status (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-display font-semibold text-xs text-zinc-300 uppercase tracking-widest">
              Studio Offline
            </h4>
            <div className="space-y-4 text-xs font-light text-zinc-400">
              <p className="leading-relaxed">
                Senin - Sabtu: <span className="text-white font-medium">09.00 - 18.00 WIB</span><br />
                Minggu & Libur Nasional: <span className="text-brand font-medium font-sans">Buka khusus Event</span>
              </p>
              <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-sm flex items-center space-x-3">
                <Sparkles size={16} className="text-brand" />
                <span className="text-[10px] text-zinc-400 leading-normal">
                  Raih rincian penawaran terbatas dengan meng-klik tombol <span className="text-white font-semibold underline">Akses Pricelist</span> di atas.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Block: Copyright + Back to top */}
        <div id="footer-lower" className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1.5">
            <p className="text-[11px] text-zinc-500 font-mono tracking-wide">
              © {new Date().getFullYear()} CEPEN PRODUCTION. All Rights Reserved.
            </p>
            <p className="text-[10px] text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
              <span>Made with Creative Thinking by <strong>Cepen Production</strong></span>
              <span className="text-blue-500 ml-1">💙</span>
            </p>
          </div>

          <button
            id="btn-scroll-top"
            aria-label="Scroll to top"
            onClick={handleScrollToTop}
            className="group flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors text-xs font-mono font-bold tracking-widest uppercase cursor-pointer"
          >
            <span>Back to top</span>
            <span className="p-2 border border-zinc-800 group-hover:border-zinc-500 rounded-full transition-colors shrink-0">
              <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}
