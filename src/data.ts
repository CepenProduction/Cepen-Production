import { Service, Project, Client, Testimonial, PricingPackage, ProductItem } from './types';

// Let's import the concrete generated images
// Wait, we define them physically so there's no dynamic import issue
export const IMAGES = {
  heroAnakDaro: '/src/assets/images/HeroSection_CP.jpg',
  aboutTeam: '/src/assets/images/team_photo_1780379094552.png',
  pricelistBanner: '/src/assets/images/pricelist_banner_1780379151382.png'
};

export const SERVICES: Service[] = [
  {
    id: 'wedding',
    category: 'wedding',
    title: 'Wedding Documentation',
    description: 'Menangkap sakralnya hari bahagia Anda mulai dari Akad Nikah hingga resepsi dengan gaya dokumenter artistik dan sinematik.',
    iconName: 'Heart',
    longDescription: 'Dokumentasi pernikahan menyeluruh yang memadukan keindahan adat istiadat, kemeriahan pesta, dan sisi emosional yang intim. Kami memastikan setiap momen berharga terjaga selamanya dalam album fisik premium dan sinematografi resolusi tinggi.',
    features: [
      '2 Photographers & 2 Videographers Professional',
      'Premium Custom Wedding Book Album (10R, 30 Halaman)',
      'Cinematic Highlight Video (3-5 Menit) & Full Video Dokumenter',
      'Unlimited Photoshoot & Professional Color Grading',
      'Penyerahan via Flashdisk Custom Box & Online Gallery Link'
    ],
    startingPrice: 'Rp 6.500.000'
  },
  {
    id: 'prewedding',
    category: 'prewedding',
    title: 'Prewedding Session',
    description: 'Sesi foto konseptual di alam terbuka atau studio yang menceritakan perjalanan cinta unik Anda sebelum melangkah ke pelaminan.',
    iconName: 'Camera',
    longDescription: 'Sesi intim yang dipersiapkan khusus untuk mencerminkan karakter unik pasangan. Mulai dari penentuan konsep, wardrobe styling, pencarian lokasi epik di Ranah Minang, hingga pengolahan warna foto bercitarasa tinggi.',
    features: [
      'Sesi Pemotretan Full Day / Half Day',
      'Dua Lokasi Pilihan Unik (Alam atau Perkotaan/Situs Adat)',
      '20 Edited Photos & Full Raw Files Delivered',
      'Cetak Frame Canvas Premium (Ukuran 20R dengan Frame Minimalis)',
      'Sinematik Prewedding Teaser Video (60 Detik untuk Undangan Digital)'
    ],
    startingPrice: 'Rp 3.500.000'
  },
  {
    id: 'event',
    category: 'event',
    title: 'Event & Corporate Coverage',
    description: 'Liputan dokumentasi untuk seminar, peluncuran produk, festival budaya, konser, hingga acara kenegaraan dengan standar profesional.',
    iconName: 'Calendar',
    longDescription: 'Untuk kegiatan komersial, corporate gathering, atau festival budaya besar. Kami menyediakan cakupan penuh waktu secara real-time, pengiriman file secepat mungkin untuk kebutuhan media sosial/PR, dengan ketajaman audio-visual kelas siaran.',
    features: [
      'Multi-camera Full Documentation (FHD / 4K)',
      'Sistem Audio Lapangan Profesional (Wireless System)',
      'Foto Liputan Real-time & Same-day Web Link Delivery',
      'Video Highlight Pendek & Teaser Reels Teroptimasi',
      'Penyuntingan Profesional & Hak Lisensi Penuh Komersial'
    ],
    startingPrice: 'Rp 4.000.000'
  },
  {
    id: 'drone',
    category: 'drone',
    title: 'Aerial & Drone Cinema',
    description: 'Pengambilan gambar dramatis dari udara untuk lanskap, video profil perusahaan, pariwisata, hingga dokumentasi epik skala besar.',
    iconName: 'Wind',
    longDescription: 'Layanan drone sinematik tersertifikasi menggunakan armada terkini untuk hasil video lanskap 4K ultra-stabil atau dynamic FPV chasing. Sempurna untuk menyajikan kemegahan arsitektur Ranah Minang dan keindahan alam dari sudut pandang elang.',
    features: [
      'Pilot Drone Tersertifikasi APDI (Asosiasi Pilot Drone Indonesia)',
      'Perekaman 4K Cinematic Log-Profile berkualitas ultra tajam',
      'Drone FPV (First Person View) untuk Cinematic Dynamic Shots',
      'Sempurna untuk Company Profile & Pemetaan Wisata Alam',
      'Izin terbang resmi & koordinasi wilayah udara aman'
    ],
    startingPrice: 'Rp 2.000.000'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'Pernikahan Agung Minangkabau di Istano Basa Pagaruyung',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1616165415772-beff2865ffb4?auto=format&fit=crop&q=80&w=800',
    location: 'Batusangkar, Tanah Datar',
    date: 'April 2026',
    clientName: 'Fadel & Raisa',
    description: 'Pernikahan adat Minang sarat nilai budaya di ikon kemegahan Ranah Minang. Menggunakan Suntiang Gadang emas dengan perpaduan latar arsitektur Rumah Gadang nan megah.'
  },
  {
    id: 'proj2',
    title: 'Kelana Cinta di Lembah Harau',
    category: 'prewedding',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
    location: 'Payakumbuh, Lima Puluh Kota',
    date: 'Maret 2026',
    clientName: 'Adit & Dinda',
    description: 'Sesi prewedding bertema modern-minimalist diapit oleh tebing granit raksasa Lembah Harau yang dramatis dan menenangkan.'
  },
  {
    id: 'proj3',
    title: 'Dokumentasi Festival Budaya Pacu Jawi',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
    location: 'Sungai Tarab, Tanah Datar',
    date: 'Februari 2026',
    clientName: 'Pemprov Sumatera Barat',
    description: 'Liputan dinamis penuh adrenalin dari tradisi balapan sapi Pacu Jawi. Fokus pada cipratan lumpur, ketegangan joki, dan emosional penonton.'
  },
  {
    id: 'proj4',
    title: 'Lanskap Udara Pulau Mandeh 4K Cinematic',
    category: 'drone',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    location: 'Pesisir Selatan',
    date: 'Mei 2026',
    clientName: 'Dinas Pariwisata Sumbar',
    description: 'Aerial dokumenter pariwisata Pulau Mandeh, mengabadikan kemiripan estetikanya dengan Raja Ampat dari langit biru berkabut.'
  },
  {
    id: 'proj5',
    title: 'Sesi Senja Romantis Danau Singkarak',
    category: 'prewedding',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800',
    location: 'Solok',
    date: 'Januari 2026',
    clientName: 'Rian & Vanessa',
    description: 'Mengambil latar belakang perahu nelayan tradisional dan kemilau air beralun lembut keemasan saat sunset di tepi Danau Singkarak.'
  },
  {
    id: 'proj6',
    title: 'The Modern White Suntiang Wedding',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
    location: 'Padang',
    date: 'Desember 2025',
    clientName: 'Kevin & Amel',
    description: 'Pernikahan berkonsep modern minimalis bertema monokrom, dipadukan keanggunan Suntiang Perak putih murni nan memikat.'
  },
  {
    id: 'proj7',
    title: 'Romansa Hijau Kebun Teh Alahan Panjang',
    category: 'prewedding',
    imageUrl: 'https://images.unsplash.com/photo-1558005530-a7958896ec60?auto=format&fit=crop&q=80&w=800',
    location: 'Alahan Panjang, Solok',
    date: 'Mei 2026',
    clientName: 'Arya & Fitri',
    description: 'Sesi foto prewedding berselimut kabut pagi tipis di hamparan hijau perkebunan teh Alahan Panjang yang sejuk nan romantis.'
  },
  {
    id: 'proj8',
    title: 'Simfoni Sakral di Masjid Raya Sumbar',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf34eb9757b?auto=format&fit=crop&q=80&w=800',
    location: 'Padang',
    date: 'Maret 2026',
    clientName: 'Romi & Indah',
    description: 'Dokumentasi akad nikah khidmat di Masjid Raya Sumatera Barat dengan arsitektur gonjong modern yang megah berpendar cahaya mentari sore.'
  },
  {
    id: 'proj9',
    title: 'Pesona Kelok Sembilan dari Angkasa',
    category: 'drone',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    location: 'Limapuluh Kota',
    date: 'April 2026',
    clientName: 'Kementerian PUPR',
    description: 'Karya drone sinematik spektakuler mengabadikan kemegahan jembatan layang Kelok Sembilan yang membelah tebing hijau subur Sumatera Barat.'
  },
  {
    id: 'proj10',
    title: 'Semarak Minang International Art Festival',
    category: 'event',
    imageUrl: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800',
    location: 'Bukittinggi',
    date: 'Januari 2026',
    clientName: 'Tari Minang Kolosal',
    description: 'Liputan dokumenter panggung seni tari kolosal dari berbagai sanggar budaya Minang dengan warna kostum menyala berlatar Jam Gadang.'
  },
  {
    id: 'proj11',
    title: 'Kisah Kasih Klasik Rumah Gadang Solok',
    category: 'wedding',
    imageUrl: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=800',
    location: 'Solok nan Indah',
    date: 'November 2025',
    clientName: 'Doni & Vina',
    description: 'Sentuhan detail foto klasik murni di beranda Rumah Gadang tua yang sarat ukiran kayu otentik berwarna jingga hangat bertekstur.'
  },
  {
    id: 'proj12',
    title: 'Keindahan Air Terjun Lembah Anai 4K',
    category: 'drone',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
    location: 'Padang Panjang',
    date: 'Desember 2025',
    clientName: 'Wonderful Indonesia',
    description: 'Visual udara megah mengabadikan aliran air terjun Lembah Anai legendaris di pinggir jalan raya trans-Sumatera berselimut embun air abadi.'
  }
];

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Bank Nagari', logoUrl: 'BANK NAGARI' },
  { id: 'c2', name: 'Semen Padang', logoUrl: 'SEMEN PADANG' },
  { id: 'c3', name: 'Pemprov Sumbar', logoUrl: 'PEMPROV SUMBAR' },
  { id: 'c4', name: 'Dinas Pariwisata', logoUrl: 'DISPAR SUMBART' },
  { id: 'c5', name: 'Kementerian Pariwisata', logoUrl: 'KEMENPAREKRAF' },
  { id: 'c6', name: 'Suku Project', logoUrl: 'SUKU COFFEE' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Amalia',
    role: 'Pengantin Wanita (Adat Minang)',
    message: 'Tim Cepen sangat profesional! Walaupun pakaikan Suntiang Gadang yang berat, tim tahu sudut pemotretan yang mempesona dan tidak bikin cape. Hasil video cinematictnya bikin mewek pas nonton bareng keluarga!',
    rating: 5,
    date: 'April 2026',
    location: 'Padang'
  },
  {
    id: 't2',
    name: 'Pratama Adi',
    role: 'Pengantin Pria',
    message: 'Gokil, sangat sabar pas ngarahin gaya kami yang kaku. Pas prewedding di Harau kemarin kedinginan banget tapi timnya asyik dibikin ketawa terus. Foto cetak canvas-nya eksklusif sekali, pajangan favorit di rumah baru.',
    rating: 5,
    date: 'Maret 2026',
    location: 'Bukittinggi'
  },
  {
    id: 't3',
    name: 'Hendri Saputra',
    role: 'Ketua Panitia Festival Budaya',
    message: 'Liputan komersial yang luar biasa cepat. Link foto same-day langsung dikirim sore hari untuk rilis berita PR kami. Kualitas footage drone FPV-nya sangat halus dan dramatis.',
    rating: 5,
    date: 'Februari 2026',
    location: 'Tanah Datar'
  },
  {
    id: 't4',
    name: 'Nadia Safitri',
    role: 'Corporate Marketing Lead',
    message: 'Udah langganan drone cinematic untuk profile resort kami sama Cepen Production. Kerjanya rapi, patuh izin terbang, dan hasil color grading cinematic birunya itu berkelas sekali. Sangat direkomendasikan.',
    rating: 5,
    date: 'Mei 2026',
    location: 'Pesisir Selatan'
  }
];

export const PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Fine-Art Wooden Box Album',
    description: 'Album cetak premium dengan cover kulit berukir hand-craft ditambah kotak penyimpanan kayu mahoni eksklusif berlapis beludru.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    features: ['Ukuran 10R Portrait (25x30 cm)', 'Kertas Matte Fuji Premium anti gores', '30 Halaman Flat-Lay seamless layout', 'Pelindung khusus anti rayap dan lembab'],
    priceEst: 'Mulai dari Rp 1.800.000',
    badge: 'Terpopuler'
  },
  {
    id: 'p2',
    name: 'Modern Floating Canvas Frame',
    description: 'Cetak foto kanvas beresolusi ultra dengan frame terapung minimalis modern berwarna hitam doff atau kayu jati.',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    features: ['Ukuran 20R (50x60 cm)', 'Kanvas serat katun premium bertekstur', 'Tinta pigmen tahan luntur 50 tahun', 'Frame terapung elegan jarak 1cm'],
    priceEst: 'Mulai dari Rp 750.000',
    badge: 'Eksklusif'
  },
  {
    id: 'p3',
    name: 'Digital CineBook & Custom USB Drive',
    description: 'Kotak kado akrilik mewah berisi flashdisk kayu berukir laser yang memuat seluruh file foto RAW & video 4K Anda.',
    imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600',
    features: ['USB 3.0 Kayu Ramah Lingkungan 64GB', 'Seluruh foto Hi-Resolution (Edited & Raw)', 'Cover akrilik kustom cetak nama emas', 'Tautan unduhan cloud aktif selama 1 tahun'],
    priceEst: 'Mulai dari Rp 450.000'
  }
];

export const PRICING_PACKAGES: PricingPackage[] = [
  // Wedding
  {
    id: 'price_w1',
    category: 'wedding',
    title: 'Paket Basandiang (Half-Day)',
    subtitle: 'Sempurna untuk akad dan resepsi intim skala menengah.',
    price: 'Rp 6.500.000',
    features: [
      '1 Lead Photographer & 1 Lead Videographer',
      'Waktu kerja maksimal 6 Jam',
      '1 Premium Wedding Book Album (10R, 20 Halaman)',
      'Video Cinematic Highlight (3 Menit)',
      '1 Cetak Canvas Minimalis 16R',
      'Semua raw files diserahkan dalam Cloud Link'
    ]
  },
  {
    id: 'price_w2',
    category: 'wedding',
    title: 'Paket Sakral Suntiang (Full-Day)',
    subtitle: 'Paket paling disukai untuk upacara adat tradisional komplit.',
    price: 'Rp 9.500.000',
    isPopular: true,
    features: [
      '2 Photographers & 2 Videographers',
      'Liputan Full Day (Akad Pagi, Resepsi hingga Malam)',
      '1 Premium Custom Wedding Book dengan Wooden Box (10R, 30 Halaman)',
      'Video Cinematic Highlight (5 Menit) & Full Video Dokumenter (20 Menit)',
      '2 Cetak Canvas Premium 20R',
      'Flashdisk Custom Box berisi seluruh file'
    ]
  },
  {
    id: 'price_w3',
    category: 'wedding',
    title: 'Paket Cinema Royal (The Ultimate)',
    subtitle: 'Dokumentasi layar lebar termewah termasuk liputan udara.',
    price: 'Rp 14.800.000',
    features: [
      '3 Photographers & 3 Videographers',
      'Liputan Full Day & Sesi Drone Aerial Cinematic',
      '2 Premium Custom Wedding Book dengan Leather Cover Box',
      'Video Cinematic Highlight & Film Dokumenter 4K (30 Menit)',
      '3 Cetak Canvas Premium 24R dengan Frame Jati Terapung',
      'Wooden Gift Slate dengan USB 3.0 dan cetak foto rilis cepat'
    ]
  },
  // Prewedding
  {
    id: 'price_p1',
    category: 'prewedding',
    title: 'Paket Lokal Kelana',
    subtitle: 'Sesi santai outdoor di satu area lokal eksotis.',
    price: 'Rp 3.500.000',
    features: [
      '1 Photographer & 1 Asst. Lighting',
      'Sesi Pemotretan 4 Jam',
      '15 Edited Photos & Raw Files Delivery',
      '1 Cetak Canvas Premium 16R',
      'Penyerahan via Cloud Storage'
    ]
  },
  {
    id: 'price_p2',
    category: 'prewedding',
    title: 'Paket Ranah Minang Cinematic',
    subtitle: 'Sesi penuh konsep berlatar alam menakjubkan Sumbar.',
    price: 'Rp 5.500.000',
    isPopular: true,
    features: [
      '2 Photographers & 1 Videographer',
      'Sesi Pemotretan Full Day (Dua Lokasi Bebas, misal Harau & Singkarak)',
      '30 Edited Photos + Unlimited RAW files',
      'Video Prewedding Teaser (60 Detik untuk Instastory/Undangan)',
      '2 Cetak Canvas Premium 20R dengan Bingkai Kayu',
      'Custom USB Flashdisk Delivery'
    ]
  },
  // Event & Drone
  {
    id: 'price_e1',
    category: 'event',
    title: 'Corporate gathering & Event Coverage',
    subtitle: 'Liputan dokumentasi andal untuk kelancaran promosi Anda.',
    price: 'Rp 4.500.000',
    features: [
      '2 Event Photographers (Cepat tanggap)',
      'Waktu kerja maksimal 8 Jam',
      'Same-day Delivery for Social Media (10 Highlight Photos)',
      '300+ High-quality Edited Photos via Link',
      'Penyimpanan aman awan 6 bulan'
    ]
  },
  {
    id: 'price_d1',
    category: 'drone',
    title: 'Cinematic Drone Premium',
    subtitle: 'Paket penunjang film pariwisata atau komersial dari udara.',
    price: 'Rp 3.000.000',
    features: [
      '1 Professional certified Drone Pilot & 1 Spotter',
      'Resolusi perekaman up to 4K 60fps / 10-bit Log Profile',
      '6 jam operasional di lokasi',
      'Dynamic FPV Footage & Clean Cinematic Slow-Panning',
      'Termasuk Color Graded Footage & Video Mentah'
    ]
  }
];
