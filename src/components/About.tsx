import { IMAGES } from '../data';
import { Award, Heart, CheckCircle, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Award size={18} className="text-blue-600" />,
      title: 'Standar Visual Premium',
      description: 'Seluruh materi direkam menggunakan kamera sensor penuh (full-frame) 4K Ultra High-Definition.'
    },
    {
      icon: <Heart size={18} className="text-blue-600" />,
      title: 'Sensitivitas Tradisi Adat',
      description: 'Sangat memahami prosesi dan detil estetika pakaian adat Minang (Anak Daro & Marapulai Suntiang).'
    },
    {
      icon: <Users size={18} className="text-blue-600" />,
      title: 'Sinergi Tim Kreatif',
      description: 'Diarahkan oleh fotografer veteran dan pilot drone udara komersial bersertifikasi profesional.'
    }
  ];

  return (
    <section
      id="about"
      className="py-24 px-6 sm:px-8 bg-white border-b border-zinc-100"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Core Layout Grid */}
        <div id="about-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Generative Team Photo Card */}
          <div id="about-team-photo" className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] sm:max-w-[430px]">
              
              {/* Architectural layout border lines */}
              <div className="absolute top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-blue-600 pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-zinc-200 pointer-events-none" />
              
              {/* Heavy backing container */}
              <div className="absolute inset-0 bg-zinc-100 -translate-x-3 translate-y-3 rounded-xs -z-10 border border-zinc-200" />

              {/* Core Image box Frame */}
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xl relative rounded-xs group">
                <img
                  src={IMAGES.aboutTeam}
                  alt="Cepen Production Creative Team Studio Photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
                
                {/* Vignette bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 pointer-events-none" />

                {/* Overlaid Team badge */}
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="font-mono text-[9px] text-blue-400 uppercase tracking-widest font-extrabold block">
                    Main Office & Creative Studio
                  </span>
                  <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mt-1">
                    Cepen Production Crew
                  </h4>
                  <p className="font-mono text-[9px] text-zinc-300 mt-0.5">
                    Creative Minds Shaping Premium Motion & Still Images
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Paragraphs / Introductions */}
          <div id="about-info" className="lg:col-span-7 text-left space-y-6">
            
            {/* Header info */}
            <div>
              <p className="font-mono text-[10px] sm:text-[11px] font-bold tracking-widest text-blue-600 uppercase mb-2">
                05 / Visual Craftsman
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
                Tentang Cepen Production
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded mt-3 mb-4" />
            </div>

            {/* Paragraphs requested by user */}
            <div className="space-y-4 text-zinc-600 text-[14px] sm:text-[15px] font-light leading-relaxed">
              <p>
                Cepen Production didirikan dari kecintaan mendalam terhadap seni bercerita melalui media visual. 
                Kami mengkhususkan diri dalam dokumentasi pernikahan kelas premium, film pendek komersial, prewedding landscape, 
                dan sinematografi udara bersertifikasi. Kami memahami bahwa sebuah foto tidak sekadar gambar mati, 
                melainkan pintu gerbang emosional yang siap membawa Anda kembali ke momen terhangat dalam hidup.
              </p>
              <p>
                Berbasis di jantung Sumatera Barat, kami memadukan kekayaan tradisi budaya khas Minangkabau—seperti kemegahan 
                Suntiang Gadang dan ritual adat sakral lainnya—dengan teknik editing warna modern bertema monokromatik 
                serta grading biru hangat yang eksklusif (*Cepen Signature Wash*). Setiap bingkai diolah secara presisi 
                oleh editor tersertifikasi demi hasil visual berkelas internasional.
              </p>
            </div>

            {/* Core Values Bullets Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-100">
              {values.map((val, vIdx) => (
                <div key={vIdx} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 bg-blue-50 text-blue-600 rounded">
                      {val.icon}
                    </span>
                    <h5 className="font-display font-semibold text-[11px] text-zinc-800 uppercase tracking-wider">
                      {val.title}
                    </h5>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-light leading-normal">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlighted Slogan */}
            <div className="p-4 bg-zinc-50 border-l-[3px] border-blue-600 rounded-r text-left">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block font-bold">
                Philosophy
              </span>
              <p className="text-[12px] text-zinc-700 italic font-medium leading-relaxed mt-1">
                "Kami tidak sekadar merekam kehadiran fisik raga, namun kami membingkai desau tawa, sela air mata, dan kehangatan tatapan yang membuat kenangan Anda bernyawa selamanya."
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
