import { Project, Testimonial } from '../types';
import { PROJECTS as INITIAL_PROJECTS, TESTIMONIALS as INITIAL_TESTIMONIALS } from '../data';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const INITIAL_FAQS: FAQItem[] = [
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

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  const stored = localStorage.getItem('cp_projects');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_PROJECTS;
    }
  }
  localStorage.setItem('cp_projects', JSON.stringify(INITIAL_PROJECTS));
  return INITIAL_PROJECTS;
};

export const saveProjects = (projects: Project[]) => {
  localStorage.setItem('cp_projects', JSON.stringify(projects));
};

export const getTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return INITIAL_TESTIMONIALS;
  const stored = localStorage.getItem('cp_testimonials');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_TESTIMONIALS;
    }
  }
  localStorage.setItem('cp_testimonials', JSON.stringify(INITIAL_TESTIMONIALS));
  return INITIAL_TESTIMONIALS;
};

export const saveTestimonials = (testimonials: Testimonial[]) => {
  localStorage.setItem('cp_testimonials', JSON.stringify(testimonials));
};

export const getFAQs = (): FAQItem[] => {
  if (typeof window === 'undefined') return INITIAL_FAQS;
  const stored = localStorage.getItem('cp_faqs');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return INITIAL_FAQS;
    }
  }
  localStorage.setItem('cp_faqs', JSON.stringify(INITIAL_FAQS));
  return INITIAL_FAQS;
};

export const saveFAQs = (faqs: FAQItem[]) => {
  localStorage.setItem('cp_faqs', JSON.stringify(faqs));
};
