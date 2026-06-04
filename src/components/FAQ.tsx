import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, MessageSquare, Sparkles } from 'lucide-react';
import { FAQItem } from '../lib/db';

interface FAQProps {
  faqs?: FAQItem[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    question: "Apakah Cepen Production melayani klien di luar wilayah Sumatera Barat?",
    answer: "Ya, tentu saja. Kami melayani dokumentasi prewedding, wedding, event, maupun aerial drone cinematic di seluruh Indonesia hingga destinasi internasional. Untuk proyek di luar area Sumatera Barat, biaya tambahan akomodasi, transportasi, dan perizinan lokal (bila ada) akan disesuaikan secara transparan dalam penawaran khusus."
  },
  {
    id: "faq2",
    question: "Berapa lama estimasi pengerjaan editing foto dan video cinematic?",
    answer: "Kami menjaga kualitas kurasi dan grading warna dengan sangat teliti. Pratinjau foto pilihan (sneak peek) biasanya siap dikirim dalam 3 hari kerja. File foto kurasi lengkap siap dikirim secara digital dalam 14–20 hari kerja. Sementara album cetak berkualitas premium (Wooden Box Fine-Art) dan video cinematic berdurasi penuh diselesaikan dalam kurun waktu 30–45 hari kerja sesuai antrean produksi."
  },
  {
    id: "faq3",
    question: "Bagaimana sistem pembayaran dan ketentuan booking tanggal?",
    answer: "Untuk mengamankan slot tanggal eksklusif Anda, silakan melakukan Down Payment (DP) sebesar 30% dari total nilai paket. Pelunasan sisa 70% dilakukan selambat-lambatnya H-3 sebelum pelaksanaan hari H acara atau sesi pemotretan dimulai. Pembayaran dilakukan secara resmi melalui transfer bank yang tertata rapi dalam sistem penagihan (invoice) kami."
  },
  {
    id: "faq4",
    question: "Apakah kami bisa meminta file mentah (raw files) dari dokumentasi?",
    answer: "Semua paket kami sudah menyediakan hasil foto ter-retouch dan video cinematic terbaik yang dikurasi dengan detail profesional. Namun, apabila Anda membutuhkan seluruh file mentah (raw files) untuk keperluan arsip pribadi, Anda dapat menambahkannya sebagai addon dengan menyediakan media penyimpanan harddisk eksternal berkapasitas memadai secara gratis atau membelinya langsung di pricelist addon kami."
  },
  {
    id: "faq5",
    question: "Apakah pilot drone Cepen Production bersertifikat resmi?",
    answer: "Betul sekali. Seluruh kru penerbang aerial drone kami merupakan pilot profesional yang memiliki sertifikasi pilot drone resmi dari lembaga berwenang (APDI/FASI). Kami mengedepankan keamanan terbang serta pemahaman regulasi udara untuk memastikan dokumentasi visual bernilai tinggi berjalan aman tanpa hambatan hukum di lokasi acara."
  },
  {
    id: "faq6",
    question: "Bisakah kami memilih musik latar (soundtrack) untuk video pernikahan kami?",
    answer: "Kami sangat merekomendasikan sinergi pemilihan lagu. Tim kreatif kami memiliki akses ke pustaka audio berlisensi premium yang sangat cocok untuk storytelling emosional. Namun, kami juga sangat terbuka mendengar masukan referensi lagu favorit Anda yang memiliki nilai kenangan personal tinggi agar video cinematic terasa semakin dekat di hati."
  }
];

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqList = faqs || FAQ_ITEMS;

  return (
    <section id="faq" className="py-24 bg-zinc-50 border-t border-zinc-200/50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header Block */}
        <div id="faq-heading" className="flex flex-col items-center justify-center text-center mb-16">
          <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-[#2b7fff] uppercase mb-2 flex items-center justify-center gap-1.5">
            <Sparkles size={11} className="text-[#2b7fff] animate-pulse" />
            PERTANYAAN UMUM
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="w-16 h-1 bg-[#2b7fff] rounded mt-3 mb-4" />
          <p className="font-sans text-sm text-zinc-500 font-light max-w-lg mx-auto">
            Temukan jawaban cepat seputar proses kerja, sistem pembayaran, dan pelaksanaan dokumentasi kreatif bersama Cepen Production.
          </p>
        </div>

        {/* Interactive Accordion List */}
        <div className="space-y-4">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-card-${index}`}
                className={`bg-white border transition-all duration-300 rounded-2xl overflow-hidden ${
                  isOpen 
                    ? 'border-blue-500/30 shadow-[0_12px_24px_rgba(0,71,255,0.04)] bg-white' 
                    : 'border-zinc-200/80 hover:border-zinc-300/100 shadow-sm'
                }`}
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors select-none"
                >
                  <div className="flex items-start gap-4 pr-4">
                    <span className="mt-1 flex-shrink-0 text-zinc-400">
                      <HelpCircle size={18} className={isOpen ? 'text-blue-500' : 'text-zinc-400'} />
                    </span>
                    <span className={`font-sans font-bold text-[14px] sm:text-[15px] tracking-tight leading-snug transition-colors ${
                      isOpen ? 'text-blue-600' : 'text-zinc-800'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                      isOpen 
                        ? 'border-blue-200/50 bg-blue-50 text-blue-600' 
                        : 'border-zinc-200 bg-zinc-50 text-zinc-500'
                    }`}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-zinc-100/80 text-left">
                        <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-zinc-600 font-light pt-4 pl-0 sm:pl-8">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Dynamic CTA Footer inside FAQ */}
        <div className="mt-12 text-center p-6 bg-zinc-100/50 border border-zinc-200/40 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <MessageSquare size={18} />
            </div>
            <div>
              <h4 className="font-sans font-bold text-[13px] text-zinc-900 tracking-tight">Kebutuhan Anda belum terjawab?</h4>
              <p className="font-sans text-[11px] text-zinc-500">Hubungi langsung tim kreatif kami untuk diskusi kustomisasi acara.</p>
            </div>
          </div>
          <button
            onClick={() => {
              const contactEl = document.getElementById('contact');
              if (contactEl) {
                contactEl.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-2.5 bg-zinc-950 text-white rounded-xl text-[11px] font-bold tracking-wider hover:bg-blue-600 transition-colors uppercase cursor-pointer text-center"
          >
            Konsultasi Gratis
          </button>
        </div>

      </div>
    </section>
  );
}
