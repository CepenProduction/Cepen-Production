import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronRight, 
  MessageCircle, 
  ArrowUpRight,
  Filter,
  ChevronDown
} from 'lucide-react';
import Footer from './Footer';

// Let's declare our GalleryAlbum structure
export interface GalleryAlbum {
  id: string;
  title: string;
  category: 'wedding' | 'prewedding' | 'event' | 'drone';
  coverUrl: string;
  location: string;
  date: string;
  clientName: string;
  description: string;
  images: {
    url: string;
    caption: string;
  }[];
}

// Curated high-fidelity project albums
const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album_1',
    title: 'Pernikahan Agung Minangkabau di Istano Basa Pagaruyung',
    category: 'wedding',
    coverUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1250',
    location: 'Batusangkar, Tanah Datar',
    date: 'April 2026',
    clientName: 'Fadel & Raisa',
    description: 'Pernikahan adat Minangkabau megah berselimutkan budaya luhur. Berlatar belakang istana bersejarah Istano Basa Pagaruyung yang ikonik, sepasang kekasih mengenakan Suntiang Gadang emas berkilau dan busana beludru bersulam benang emas murni peninggalan adiluhung.',
    images: [
      { url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200', caption: 'Sisi emosional pertukaran cincin mahar pernikahan adat.' },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200', caption: 'Detail dekorasi pelaminan dengan tabir sulam emas khas Minangkabau.' },
      { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200', caption: 'Pose syahdu pengantin berlatar arsitektur klasik rumah adat.' },
      { url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200', caption: 'Kemegahan dekorasi bersanding dengan kehangatan adat.' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200', caption: 'Genggaman cinta pengantin Minangkabau.' },
      { url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200', caption: 'Senyum hangat kebersamaan keluarga besar pengantin.' }
    ]
  },
  {
    id: 'album_2',
    title: 'Kelana Cinta di Lembah Harau',
    category: 'prewedding',
    coverUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1250',
    location: 'Payakumbuh, Lima Puluh Kota',
    date: 'Maret 2026',
    clientName: 'Adit & Dinda',
    description: 'Sesi prewedding intim bertema petualangan modern minimalis. Diapit tegak oleh megahnya dinding batu granit raksasa berumur jutaan tahun di Lembah Harau, memancarkan kedalaman asmara yang jujur, tenang, bersahaja, dan penuh estetika abadi.',
    images: [
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200', caption: 'Tatapan hangat penuh arti berlatar tebing menjulang tinggi Lembah Harau.' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', caption: 'Menyusuri padang rumput hijau subur di kaki lembah.' },
      { url: 'https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&q=80&w=1200', caption: 'Pemandangan dari atas bukit menghadirkan lanskap harau yang magis.' },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200', caption: 'Cahaya keemasan menembus pepohonan liar di sudut Payakumbuh.' },
      { url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200', caption: 'Sesi santai berjalan tangan bersama di lintasan sawah.' }
    ]
  },
  {
    id: 'album_3',
    title: 'Sesi Senja Romantis Danau Singkarak',
    category: 'prewedding',
    coverUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1250',
    location: 'Solok',
    date: 'Januari 2026',
    clientName: 'Rian & Vanessa',
    description: 'Mengabadikan romansa sederhana tepi danau. Melibatkan perahu kayu nelayan tradisional dengan pancaran matahari tenggelam (sunset) yang membiaskan cahaya keemasan di atas riak air lembut Danau Singkarak, melambangkan perjalanan cinta yang menenangkan jiwa.',
    images: [
      { url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200', caption: 'Sunset keemasan yang sempurna membiaskan siluet romantis di tepi Danau.' },
      { url: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=1200', caption: 'Duduk santai di dermaga kayu tua sembari menikmati angin senja.' },
      { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200', caption: 'Potret berbisik manja dengan detail cahaya backlight dramatis.' },
      { url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200', caption: 'Visual estetika riak air danau berkilau pantulan mentari.' }
    ]
  },
  {
    id: 'album_4',
    title: 'The Modern White Suntiang Wedding',
    category: 'wedding',
    coverUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1250',
    location: 'Padang',
    date: 'Desember 2025',
    clientName: 'Kevin & Amel',
    description: 'Sinergi kemewahan adat Minang tradisional dengan nafas modernitas perkotaan bersih. Menghadirkan warna monokrom berpadu keaggunan Suntiang Perak (Suntiang Putih) murni berkilau tanpa cela, mewujudkan pernikahan impian berstandar sinematik visual tinggi.',
    images: [
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200', caption: 'Keanggunan Suntiang Perak berwarna putih murni nan kontemporer.' },
      { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200', caption: 'Close-up riasan makeup flawless berpadu detail aksesoris rambut.' },
      { url: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&q=80&w=1200', caption: 'Sesi First Look pengantin pria terpana melihat keindahan pengantin wanita.' },
      { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1200', caption: 'Momen keceriaan tawa bersama sahabat terdekat (bridesmaids).' }
    ]
  },
  {
    id: 'album_5',
    title: 'Romansa Hijau Kebun Teh Alahan Panjang',
    category: 'prewedding',
    coverUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1250',
    location: 'Alahan Panjang, Solok',
    date: 'Mei 2026',
    clientName: 'Arya & Fitri',
    description: 'Sesi prewedding berselimutkan kabut pagi putih nan misterius di hamparan hijau perkebunan teh Alahan Panjang. Sejuknya hawa pegunungan berpadu hangatnya benang asmara, diabadikan dalam bingkai foto wide-angle dramatis dan sinematik udara.',
    images: [
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200', caption: 'Berjalan romantis membelah barisan rapi tanaman teh berselimut kabut.' },
      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200', caption: 'Siluet megah pegunungan di pagi hari dengan seberkas matahari terbit.' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200', caption: 'Embun pagi hari di atas dedaunan berkilau alami.' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1250', caption: 'Potret intim jarak dekat pengantin berlatar perkebunan luas tak berujung.' }
    ]
  },
  {
    id: 'album_6',
    title: 'Dokumentasi Festival Budaya Pacu Jawi',
    category: 'event',
    coverUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1250',
    location: 'Sungai Tarab, Tanah Datar',
    date: 'Februari 2026',
    clientName: 'Pemprov Sumatera Barat',
    description: 'Liputan dokumenter kebudayaan berskala nasional. Menangkap dinamika kecepatan bertenaga, cipratan lumpur basah berwarna pekat, ketegangan wajah para joki pemberani, serta gegap gempita penonton saat merayakan tradisi balapan sapi Pacu Jawi Tanah Datar.',
    images: [
      { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200', caption: 'Pekatnya cipratan lumpur membuktikan kecepatan penuh sang joki Pacu Jawi.' },
      { url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200', caption: 'Riuh ramai penonton lokal bersorak mendukung jagoannya di tepi sawah.' },
      { url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200', caption: 'Detail persiapan sapi tangguh dipasangi kayu kemudi sebelum berlaga.' },
      { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200', caption: 'Ekspresi penuh determinasi dari sang joki menaklukan medan sawah berair.' }
    ]
  },
  {
    id: 'album_7',
    title: 'Aero-Cinematografi Highlands Minangkabau',
    category: 'drone',
    coverUrl: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=1255',
    location: 'Puncak Lawang & Bukittinggi',
    date: 'Mei 2026',
    clientName: 'Dinas Pariwisata',
    description: 'Dokumentasi sinematografis lanskap megah Sumatera Barat dari udara. Mengambil keindahan bentang alam Puncak Lawang, Danau Maninjau yang berselimut kabut, serta liukan ngarai hijau legendaris Ngarai Sianok.',
    images: [
      { url: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=1200', caption: 'Lanskap perkebunan hijau subur dari sudut tegak lurus udara.' },
      { url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200', caption: 'Pemandangan lembah berkabut yang megah di pagi hari.' },
      { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200', caption: 'Hutan liar nan rimbun dipeluk kabut murni.' },
      { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200', caption: 'Potret lanskap pegunungan Minang megah.' }
    ]
  },
  {
    id: 'album_8',
    title: 'The Eternal Ballroom Gala Adat Minang',
    category: 'wedding',
    coverUrl: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1255',
    location: 'Grand Ballroom Padang',
    date: 'Maret 2026',
    clientName: 'Reza & Amanda',
    description: 'Kemewahan paripurna pernikahan indoor bernuansa adat Minang klasik berhiaskan jajaran tabir kain adat beludru merah menyala bersulam ukiran emas pusaka, dipadu dengan tata pencahayaan mewah modern.',
    images: [
      { url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=1200', caption: 'Tata meja dekorasi resepsi modern termewah berpadu sentuhan klasik.' },
      { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200', caption: 'Pelaminan bersinar dengan ratusan lampu temaram berestetika tinggi.' },
      { url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=1200', caption: 'Simbolisme sakral mahar emas bersanding dengan aksesoris perhiasan adat.' },
      { url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200', caption: 'Genggaman erat tangan kedua mempelai melambangkan janji setia.' }
    ]
  },
  {
    id: 'album_9',
    title: 'Aero-Exploration Hutan Pinus Lawang',
    category: 'drone',
    coverUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1255',
    location: 'Puncak Lawang, Matur',
    date: 'Januari 2026',
    clientName: 'Cepen Aero Division',
    description: 'Eksplorasi sinematik deretan pohon pinus menjulang tinggi di lereng Puncak Lawang dari ketinggian ekstrim udara. Menyorot keindahan gradasi bayangan dahan pinus di sela-sela sapuan kabut dingin berlatar Danau Maninjau biru merona.',
    images: [
      { url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200', caption: 'Rimbunnya dahan pohon hutan pinus dari atas dengan pola warna gradasi.' },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=1200', caption: 'Kabut tipis menyapu barisan pohon alami di pegunungan Matur.' },
      { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200', caption: 'Lanskap danau biru Maninjau dari kejauhan tebing bukit tinggi.' }
    ]
  }
];

interface GalleryViewProps {
  onBackToHome: () => void;
  initialAlbumId?: string | null;
}

export default function GalleryView({ onBackToHome, initialAlbumId = null }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wedding' | 'prewedding' | 'event' | 'drone'>('all');
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(initialAlbumId);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [visibleAlbumCount, setVisibleAlbumCount] = useState<number>(6);

  // Reset pagination on category change
  useEffect(() => {
    setVisibleAlbumCount(6);
  }, [selectedCategory]);

  // Sync with initial album id prop changes
  useEffect(() => {
    if (initialAlbumId) {
      setActiveAlbumId(initialAlbumId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [initialAlbumId]);

  // Scroll to top on navigation/state shifts
  const selectAlbum = (id: string | null) => {
    setActiveAlbumId(id);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeAlbum = GALLERY_ALBUMS.find(album => album.id === activeAlbumId);

  // Filter album list based on category
  const filteredAlbums = selectedCategory === 'all'
    ? GALLERY_ALBUMS
    : GALLERY_ALBUMS.filter(album => album.category === selectedCategory);

  // Suggestions: Get 2 other albums (exclude active one)
  const getSuggestions = (): GalleryAlbum[] => {
    if (!activeAlbumId) return [];
    const others = GALLERY_ALBUMS.filter(a => a.id !== activeAlbumId);
    // Return first 2 or shuffle
    return others.slice(0, 2);
  };

  const suggestions = getSuggestions();

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && activeAlbum) {
      setLightboxIndex(lightboxIndex === 0 ? activeAlbum.images.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && activeAlbum) {
      setLightboxIndex(lightboxIndex === activeAlbum.images.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <div className="bg-[#fcfcfe] min-h-screen text-zinc-900 font-sans pt-28">
      {/* HEADER SECTION FOR GALLERY */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <AnimatePresence mode="wait">
          {!activeAlbum ? (
            /* ================= ALBUM COVERS LISTING ================= */
            <motion.div
              key="album-list-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-12 pb-24"
            >
              {/* Back breadcrumb */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-6">
                <button
                  onClick={onBackToHome}
                  className="group flex items-center gap-2 text-[11px] font-sans font-bold text-zinc-600 hover:text-blue-500 uppercase tracking-widest cursor-pointer transition-colors"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  Kembali Ke Beranda
                </button>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                  <Sparkles size={11} className="text-blue-500 animate-pulse" />
                  Eksplorasi Karya Premium
                </div>
              </div>

              {/* Title Header */}
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <span className="text-[10px] font-bold text-blue-500 tracking-[0.25em] uppercase block">
                  CEPEN GALERI EKSKLUSIF
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 uppercase leading-none">
                  CREATIVE EXHIBITION
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-lg mx-auto leading-relaxed">
                  Menyajikan dokumentasi komparatif perjalanan cinta & mahakarya Minangkabau dengan tingkat presisi warna dan keindahan sinematik tiada banding.
                </p>
              </div>

              {/* Category Filters bar */}
              <div className="flex justify-center border-y border-zinc-100 py-3">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  {(['all', 'wedding', 'prewedding', 'event', 'drone'] as const).map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[10px] font-sans tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                          isActive ? 'text-blue-500 font-bold' : 'text-zinc-500 hover:text-zinc-950'
                        }`}
                      >
                        {cat === 'all' ? 'Semua' : cat === 'drone' ? 'Aero Cine' : cat}
                        {isActive && (
                          <motion.div
                            layoutId="activeGalleryFilterUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-blue-500"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ALBUM COVERS GRID SECTION (Folder representation) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-4" id="gallery-albums-grid">
                {filteredAlbums.slice(0, visibleAlbumCount).map((album) => (
                  <motion.div
                    layout
                    key={album.id}
                    onClick={() => selectAlbum(album.id)}
                    className="group cursor-pointer flex flex-col space-y-4"
                  >
                    {/* The premium folder design cover */}
                    <div className="aspect-[3/4] relative w-full overflow-hidden rounded-3xl bg-zinc-950 shadow-md group-hover:shadow-[0_20px_45px_rgba(0,71,255,0.12)] border border-zinc-200/40 transition-all duration-500 hover:-translate-y-1">
                      
                      {/* Photo backdrop */}
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.8] saturate-[0.88] transition-transform duration-[1.2s] ease-out group-hover:scale-105 group-hover:brightness-[0.9]"
                      />

                      {/* Cover Dark Gradient and Glass boundary */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 border border-white/5 rounded-3xl" />

                      {/* Number of photos label inside */}
                      <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[9px] font-mono tracking-widest uppercase">
                        {album.images.length} FOTO
                      </div>

                      {/* Category Label */}
                      <div className="absolute top-5 right-5 bg-blue-500 px-3 py-1 rounded-full text-white text-[8px] font-mono tracking-widest uppercase font-bold">
                        {album.category}
                      </div>

                      {/* Bottom display info inside the cover */}
                      <div className="absolute bottom-6 inset-x-6 text-white space-y-2 select-none text-left">
                        <div className="flex items-center gap-1.5 text-blue-400 text-[10px] font-sans font-medium">
                          <MapPin size={10} />
                          <span>{album.location}</span>
                        </div>
                        <h3 className="font-sans font-bold text-lg leading-tight uppercase tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                          {album.title}
                        </h3>
                        <div className="flex justify-between items-center text-[10px] text-zinc-300 border-t border-white/10 pt-2 font-mono">
                          <span>{album.clientName}</span>
                          <span>{album.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Metadata below album cover */}
                    <div className="px-1 text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                          {album.category} PROYEK
                        </span>
                        <span className="text-blue-500 group-hover:translate-x-1 transition-transform">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-[15px] text-zinc-950 uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                        {album.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 font-light line-clamp-2 leading-relaxed">
                        {album.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* SEE MORE PROYEK BUTTON */}
              {filteredAlbums.length > visibleAlbumCount && (
                <div className="flex justify-center mt-6 pt-4" id="gallery-see-more-projects-container">
                  <button
                    onClick={() => setVisibleAlbumCount(prev => prev + 6)}
                    className="group inline-flex items-center justify-center bg-zinc-950 hover:bg-blue-500 border border-zinc-900 text-white text-[11px] font-sans font-bold tracking-widest uppercase px-8 h-12 rounded-full transition-all duration-300 gap-2 shrink-0 shadow-lg hover:shadow-blue-500/10 cursor-pointer"
                  >
                    <span>LIHAT PROYEK LAINNYA (SEE MORE)</span>
                    <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              )}

              {filteredAlbums.length === 0 && (
                <div className="text-center py-24 border border-zinc-200 bg-white rounded-3xl">
                  <p className="text-zinc-400 text-xs uppercase tracking-widest">
                    Tidak ada koleksi galeri di kategori ini.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            /* ================= ALBUM ACTIONS & DETAILED IMAGES ================= */
            <motion.div
              key="album-detail-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-12 pb-24"
            >
              {/* Back navigation Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => selectAlbum(null)}
                    className="group flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 bg-white text-zinc-750 hover:text-blue-500 hover:border-blue-500 cursor-pointer transition-all duration-350"
                    title="Kembali"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  </button>
                  <div className="font-mono text-[9px] text-zinc-450 uppercase tracking-wider flex items-center gap-1.5">
                    OUR PROJECT &nbsp;/&nbsp; <span className="font-bold text-zinc-800">{activeAlbum.title}</span>
                  </div>
                </div>
              </div>

              {/* Cover Banner for Album Detail */}
              <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden shadow-xl border border-zinc-200/50">
                <img
                  src={activeAlbum.coverUrl}
                  alt={activeAlbum.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.7] saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                
                {/* Float Badge */}
                <div className="absolute top-6 left-6 border border-white bg-transparent text-white text-[9px] font-bold font-mono tracking-widest px-4 py-1.5 rounded-full uppercase">
                  {activeAlbum.category.toUpperCase()} WORK
                </div>

                <div className="absolute bottom-8 sm:bottom-10 inset-x-6 sm:inset-x-10 text-white text-left space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-[13px] font-medium text-white">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {activeAlbum.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {activeAlbum.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} /> {activeAlbum.clientName}
                    </span>
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-none max-w-4xl">
                    {activeAlbum.title}
                  </h1>
                </div>
              </div>

              {/* WATERFALL INDEX OF INTERNAL PHOTOS (PINTEREST STYLE MASONRY) */}
              <div className="w-screen relative left-1/2 -translate-x-1/2 px-[10px] max-w-[100vw]">
                <div className="grid grid-cols-3 gap-[10px] w-full" id="album-photos-grid">
                  {activeAlbum.images.map((photo, index) => (
                    <div
                      key={index}
                      className="w-full bg-zinc-100 border border-zinc-200/30 shadow-xs overflow-hidden inline-block"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || `Dokumentasi Proyek ${index + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-auto object-cover block"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= SARAN GALERI LAIN (Bottom Recommendations) ================= */}
              <div className="border-t border-zinc-200 pt-16 space-y-8" id="suggestions-container">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {suggestions.map((sug) => (
                    <div
                      key={sug.id}
                      onClick={() => selectAlbum(sug.id)}
                      className="group cursor-pointer flex flex-col sm:flex-row gap-5 bg-white p-4 rounded-3xl border border-zinc-150 shadow-xs hover:shadow-md transition-all hover:-translate-y-1 text-left"
                    >
                      <div className="aspect-[3/4] w-full sm:w-36 shrink-0 relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-100">
                        <img
                          src={sug.coverUrl}
                          alt={sug.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-[0.88] transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1.5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1 text-blue-500 text-[9px] font-bold tracking-widest uppercase">
                            <Sparkles size={10} />
                            <span>{sug.category}</span>
                          </div>
                          <h4 className="font-sans font-bold text-[15px] sm:text-base text-zinc-950 uppercase tracking-tight leading-tight group-hover:text-blue-500 transition-colors">
                            {sug.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 font-light line-clamp-2 leading-relaxed">
                            {sug.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-zinc-100 pt-3 mt-4 text-[10px] text-zinc-400 font-mono">
                          <span>{sug.location}</span>
                          <span className="text-blue-500 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 font-sans">
                            VIEW WORK <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* DETAILED LIGHTBOX LAYER FOR INDIVIDUAL IMAGES IN THE ALBUM */}
      <AnimatePresence>
        {lightboxIndex !== null && activeAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-55 flex flex-col justify-between p-6 sm:p-10 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top row */}
            <div className="flex items-center justify-between w-full h-12 z-20">
              <span className="font-sans text-[10px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                FOTO {lightboxIndex + 1} DARI {activeAlbum.images.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                className="text-[11px] font-sans font-semibold tracking-[0.2em] text-neutral-400 hover:text-white transition-colors uppercase cursor-pointer"
              >
                [ TUTUP ]
              </button>
            </div>

            {/* Photo slide */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              <button
                onClick={handlePrevImage}
                className="absolute left-0 top-0 bottom-0 w-1/12 min-w-[50px] flex items-center justify-start text-neutral-600 hover:text-white transition-colors focus:outline-none cursor-pointer group z-20"
                title="Foto Sebelumnya"
              >
                <ChevronLeft size={24} className="transform group-hover:-translate-x-1 transition-transform" />
              </button>

              <div
                className="max-w-[85vw] max-h-[60vh] sm:max-h-[68vh] shadow-2xl border border-neutral-900 bg-neutral-950 p-2 sm:p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={activeAlbum.images[lightboxIndex].url}
                  alt={activeAlbum.images[lightboxIndex].caption}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[56vh] sm:max-h-[64vh] object-contain block mx-auto transition-all"
                />
              </div>

              <button
                onClick={handleNextImage}
                className="absolute right-0 top-0 bottom-0 w-1/12 min-w-[50px] flex items-center justify-end text-neutral-600 hover:text-white transition-colors focus:outline-none cursor-pointer group z-20"
                title="Foto Berikutnya"
              >
                <ChevronRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Bottom details */}
            <div
              className="w-full max-w-xl mx-auto text-center space-y-3 pb-4 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-sans font-light text-xs sm:text-sm text-neutral-200 uppercase tracking-widest">
                {activeAlbum.title}
              </h3>
              <p className="text-[12px] sm:text-[13px] text-neutral-400 font-light leading-relaxed">
                {activeAlbum.images[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrated simple footer for the gallery page */}
      <Footer />
    </div>
  );
}
