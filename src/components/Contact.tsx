import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Youtube, Send, Check, MessageCircle, Sparkles, Facebook } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ContactProps {
  preselectedService: ServiceCategory | 'all';
}

export default function Contact({ preselectedService }: ContactProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [service, setService] = useState<ServiceCategory | 'all'>('wedding');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state with preselected service from Services component clicks
  useEffect(() => {
    if (preselectedService && preselectedService !== 'all') {
      setService(preselectedService);
      // Smooth scroll to contact block on change
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        window.scrollTo({
          top: contactEl.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  }, [preselectedService]);

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !location.trim()) {
      alert('Mohon isi Nama, No .WhatsApp, dan Lokasi Acara Anda.');
      return;
    }

    // Build Indonesia-standard WhatsApp URL query
    // Cepen Production's phone number as requested
    const targetPhoneNumber = '6285173233233'; // Cen - Cepen Production
    const customText = `Halo Cepen Production!
Saya ingin melakukan konsultasi booking layanan perkiraan rincian sbb:

- Nama Klien: ${name}
- No. WhatsApp: ${phone}
- Kategori Layanan: ${service.toUpperCase()}
- Rencana Tanggal Acara: ${date || 'Segera didiskusikan'}
- Lokasi Acara (Kab/Kota): ${location}
- Pesan Tambahan: ${message || '-'}

Mohon informasi ketersediaan tanggal dan penawaran terbaiknya. Terima kasih banyak!`;

    const encodedText = encodeURIComponent(customText);
    const waUrl = `https://wa.me/${targetPhoneNumber}?text=${encodedText}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      // Open WhatsApp in a safe manner
      window.open(waUrl, '_blank');
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 sm:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section header info */}
        <div id="contact-header" className="max-w-3xl mb-16 text-left">
          <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-2">
            07 / Direct Inquiry
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Hubungi Studio Kami
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded mt-3 mb-4" />
          <p className="text-[14px] sm:text-[15px] text-zinc-500 font-light leading-relaxed">
            Punya konsep idaman atau pertanyaan spesifik mengenai paket? Silahkan isi form cepat di bawah. 
            Tekan tombol WhatsApp untuk langsung mengirim draft pemesanan rapi secara otomatis ke admin kami.
          </p>
        </div>

        {/* Form and info split container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left panel: studio contact information details */}
          <div className="lg:col-span-4 text-left space-y-10">
            
            <div className="space-y-6">
              <h4 className="font-display text-base font-bold text-zinc-950 uppercase tracking-wider">
                Informasi Kontak
              </h4>
              <p className="text-xs text-zinc-500 font-light leading-relaxed">
                Kami siap melayani kebutuhan dokumentasi di seluruh kota/kabupaten Sumatera Barat dan regional sekitarnya.
              </p>
            </div>

            {/* Practical detail bullet channels */}
            <div className="space-y-6 text-zinc-600">
              <div className="flex items-start space-x-4">
                <span className="p-2.5 bg-blue-50 text-blue-600 rounded mt-1">
                  <MapPin size={18} />
                </span>
                <div>
                  <h5 className="font-display font-semibold text-xs text-zinc-950 uppercase tracking-wider">
                    Cepen Production Head Quarter (HQ)
                  </h5>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed">
                    Jl. Raya Pasia, Pasia, Kec. Ampek Angkek, Kabupaten Agam, Sumatera Barat 26191
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="p-2.5 bg-blue-50 text-blue-600 rounded mt-1">
                  <Phone size={18} />
                </span>
                <div>
                  <h5 className="font-display font-semibold text-xs text-zinc-950 uppercase tracking-wider">
                    Hotline & WhatsApp
                  </h5>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    +62 851-7323-3233 (Cen)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="p-2.5 bg-blue-50 text-blue-600 rounded mt-1">
                  <Mail size={18} />
                </span>
                <div>
                  <h5 className="font-display font-semibold text-xs text-zinc-950 uppercase tracking-wider">
                    E-mail Korespondensi
                  </h5>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    cepenproduction@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels connected below */}
            <div className="space-y-4 pt-4 border-t border-zinc-100">
              <h5 className="font-display font-semibold text-xs text-zinc-950 uppercase tracking-wider">
                Media Sosial Kami
              </h5>
              <div className="flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/cepenproduction/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-blue-50 text-zinc-600 hover:text-blue-600 border border-zinc-200 hover:border-blue-200 transition-all rounded"
                  title="Instagram Cepen"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.tiktok.com/@cepenproduction"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-zinc-900 hover:text-white text-zinc-600 border border-zinc-200 hover:border-zinc-800 transition-all rounded flex items-center justify-center"
                  title="TikTok Cepen"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,46.74,90.58,122.31,122.31,0,0,0,76,21.32Z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@cepenproduction"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-red-50 text-zinc-600 hover:text-red-500 border border-zinc-200 hover:border-red-200 transition-all rounded"
                  title="YouTube Cepen"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="https://web.facebook.com/cepenproduction"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-blue-100 text-zinc-600 hover:text-blue-700 border border-zinc-200 hover:border-blue-300 transition-all rounded"
                  title="Facebook Cepen"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://id.pinterest.com/cepenproduction/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-red-50 text-zinc-600 hover:text-red-600 border border-zinc-200 hover:border-red-200 transition-all rounded flex items-center justify-center block"
                  title="Pinterest Cepen"
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-166.8 70.7-166.8 155.1 0 38.5 20.4 87.6 54.9 103 6.3 2.8 6.9 1.6 8.3-3.8.9-3.6 3-12.2 4.1-16.5 1.6-6.1 1-8.1-3.5-13.5-12.3-14.7-20-34.1-20-61.8 0-76.3 57.1-151 158.4-151 86.4 0 139.1 53.6 139.1 127.3 0 92-46.7 156.4-109.8 156.4-34.2 0-59.8-28.3-51.6-63 9.8-41.2 28.8-85.7 28.8-115.5 0-26.6-14.3-48.8-43.8-48.8-34.8 0-62.7 36-62.7 84 0 30.7 10.4 51.5 10.4 51.5s-34.7 146.7-41 173.3c-12.2 51.5-1.8 114.6-.9 119.2.4 1.8 2.3 2.3 3.3.9 1.4-1.9 20.1-24.9 26.5-48.1 1.8-6.6 9-35.1 9-35.1 11.4 21.6 44.7 40.6 80.2 40.6 105.7 0 181.8-96.6 181.8-216.5C411 114.8 333 48 248 48 136.6 48 48 135.7 48 242.6c0 82.7 50.2 150.7 122 174.1.2 4.7.4 8.7.1 11.4-44.1-19.4-78.5-51.5-98.1-91.8C27.5 299.7 0 240 0 176 0 78.8 78.8 0 176 0c115 0 208 93 208 208v1c0 30.2 6.5 56.6 18 78.9z"></path>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: the inquiry form */}
          <div className="lg:col-span-8 bg-zinc-50 border border-zinc-200 p-6 sm:p-10 rounded-xs text-left relative">
            <span className="absolute top-4 right-4 text-zinc-200">
              <Sparkles size={36} className="opacity-40 animate-pulse" />
            </span>

            <h3 className="font-display font-bold text-sm sm:text-base text-zinc-900 uppercase tracking-widest mb-6">
              FORM PEMESANAN / KONSULTASI PENAWARAN
            </h3>

            {isSubmitted ? (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-sm text-center flex flex-col items-center justify-center space-y-3 py-16 animate-fade-in mb-4">
                <Check size={32} className="text-blue-600 animate-bounce" />
                <h4 className="font-display font-bold text-base text-blue-950 uppercase tracking-wide">
                  MENGALIHKAN KE WHATSAPP...
                </h4>
                <p className="text-xs font-light max-w-sm">
                  Draft berisi data acara Anda sedang disiapkan. Silakan klik "Kirim" pada aplikasi WhatsApp Anda untuk menyelesaikan rincian rilis proposal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendWhatsApp} className="space-y-5">
                
                {/* Name / Phone and Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: Linda Fitriani"
                      className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                      No. WhatsApp Aktif *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 08126789xxxx"
                      className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all"
                    />
                  </div>
                </div>

                {/* Date / Services and Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                      Rencana Tanggal Acara
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all text-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                      Kategori Layanan *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value as ServiceCategory)}
                      className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all text-zinc-600"
                    >
                      <option value="wedding">Wedding Documentation</option>
                      <option value="prewedding">Prewedding Session</option>
                      <option value="event">Event & Corporate</option>
                      <option value="drone">Aerial Drone Cinema</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                      Lokasi Acara (Kab/Kota) *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Contoh: Padang / Bukittinggi"
                      className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all"
                    />
                  </div>
                </div>

                {/* Event Message detailed block */}
                <div>
                  <label className="block font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-1.5">
                    Pesan Tambahan (Konsep Acara Mandiri / Pertanyaan Khusus)
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Contoh: Tema adat Minang modern bertema kustom monokromatik semi-outdoor, membutuhkan liputan drone untuk resepsi..."
                    className="w-full text-xs p-3.5 border border-zinc-200 bg-white hover:border-zinc-300 focus:border-blue-600 outline-none rounded-xs transition-all resize-none"
                  />
                </div>

                {/* Call actions submit keys */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <p className="text-[10px] text-zinc-400 leading-normal max-w-sm">
                    * Data dikirimkan secara pribadi tanpa disimpan di database pihak ketiga. Kebijakan perlindungan privasi berlaku.
                  </p>
                  
                  <button
                    type="submit"
                    className="whitespace-nowrap bg-blue-600 hover:bg-zinc-950 text-white text-[11px] font-bold tracking-widest uppercase px-6 py-4.5 rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <MessageCircle size={15} className="fill-white" />
                    <span>Dapatkan Harga via WhatsApp</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
