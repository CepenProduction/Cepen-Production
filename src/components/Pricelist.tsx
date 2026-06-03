import { useState } from 'react';
import { IMAGES, PRICING_PACKAGES } from '../data';
import { ServiceCategory } from '../types';
import { X, Check, ArrowRight, Calendar, Sparkles, MapPin, MessageSquare, FileText, ChevronRight, ShoppingCart, User, Phone } from 'lucide-react';

interface PricelistProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  selectedCategory: ServiceCategory | 'all';
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ServiceCategory | 'all';
}

const ADD_ONS: AddOn[] = [
  {
    id: 'addon_sde',
    category: 'wedding',
    name: 'Same-Day Edit (SDE) Teaser Video',
    price: 1500000,
    description: 'Video teaser 1 menit diedit & diputar di hari yang sama saat resepsi.'
  },
  {
    id: 'addon_drone',
    category: 'wedding',
    name: 'Drone Aerial Cinematic Tambahan',
    price: 1000000,
    description: 'Pengambilan footage udara 4K ultra-sharp ekstra 2 baterai terbang.'
  },
  {
    id: 'addon_album',
    category: 'wedding',
    name: 'Ekstra Copy Wedding Book Album',
    price: 1200000,
    description: 'Satu album kolase cetak 10R tambahan (30 Halaman) untuk orang tua.'
  },
  {
    id: 'addon_canvas',
    category: 'wedding',
    name: 'Cetak Canvas 24R + Bingkai Jati',
    price: 800050,
    description: 'Cetak ukuran 60x90 cm dengan frame kayu jati premium elegan.'
  },
  // Prewedding Add-ons
  {
    id: 'addon_prewed_drone',
    category: 'prewedding',
    name: 'Drone Aerial Cinematic',
    price: 1000000,
    description: 'Footage udara megah untuk meningkatkan nuansa cinematic video prewedding.'
  },
  {
    id: 'addon_prewed_extra',
    category: 'prewedding',
    name: 'Ekstra 1 Hari Sesi Pemotretan',
    price: 2000000,
    description: 'Penambahan waktu 1 hari penuh untuk opsi lokasi yang lebih jauh.'
  },
  // Event Coverage Add-ons
  {
    id: 'addon_event_sde',
    category: 'event',
    name: 'Same-Day Photo Delivery (Fast Response)',
    price: 750000,
    description: 'Penyerahan 15 foto highlight dalam waktu 3 jam setelah acara untuk pers/PR.'
  },
  {
    id: 'addon_event_stream',
    category: 'event',
    name: 'Live Streaming Multi-Cam Setup',
    price: 3500000,
    description: 'Sistem multicam dengan switcher Atem Mini disiarkan langsung ke YouTube.'
  },
  // Drone Cinema Add-ons
  {
    id: 'addon_drone_fpv',
    category: 'drone',
    name: 'FPV Dynamic Chasing Drone',
    price: 1800000,
    description: 'Drone FPV berkecepatan tinggi untuk mengambil footage objek dinamis.'
  }
];

export default function Pricelist({ isOpen, onOpen, onClose, selectedCategory }: PricelistProps) {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('wedding');
  
  // Interactive Step States:
  // 1: Choose Package & Add-ons
  // 2: Enter Event Details (Date, Location, Name)
  // 3: Confirmation page (Download PDF / Submit to WhatsApp)
  const [step, setStep] = useState<number>(1);
  
  // Reservation/Checkout States
  const [selectedPackageId, setSelectedPackageId] = useState<string>('price_w2'); // Default selected to the popular package
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  
  // Form inputs
  const [clientName, setClientName] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');

  // Download PDF states
  const [isDownloadOpen, setIsDownloadOpen] = useState<boolean>(false);
  const [dlName, setDlName] = useState<string>('');
  const [dlPhone, setDlPhone] = useState<string>('');
  const [dlDate, setDlDate] = useState<string>('');
  const [dlLocation, setDlLocation] = useState<string>('');

  const isDlFormValid = dlName.trim() !== '' && dlPhone.trim() !== '' && dlDate.trim() !== '' && dlLocation.trim() !== '';

  // Handle opening modal and pre-selecting tab
  const handleOpenPricingModal = (cat?: ServiceCategory) => {
    if (cat) {
      setActiveTab(cat);
      // Automatically preselect the popular package of that category
      const popularOfCat = PRICING_PACKAGES.find(pkg => pkg.category === cat && pkg.isPopular);
      if (popularOfCat) {
        setSelectedPackageId(popularOfCat.id);
      } else {
        const firstOfCat = PRICING_PACKAGES.find(pkg => pkg.category === cat);
        if (firstOfCat) setSelectedPackageId(firstOfCat.id);
      }
    }
    // Clear state when opening
    setStep(1);
    setSelectedAddOnIds([]);
    setClientName('');
    setEventDate('');
    setEventLocation('');
    setSpecialNotes('');
    setValidationError('');
    onOpen();
  };

  // When tab is switched, select a package from that category automatically
  const handleTabChange = (category: ServiceCategory) => {
    setActiveTab(category);
    // Clear add-ons of different category
    setSelectedAddOnIds([]);
    const popularOfCat = PRICING_PACKAGES.find(pkg => pkg.category === category && pkg.isPopular);
    if (popularOfCat) {
      setSelectedPackageId(popularOfCat.id);
    } else {
      const firstOfCat = PRICING_PACKAGES.find(pkg => pkg.category === category);
      if (firstOfCat) setSelectedPackageId(firstOfCat.id);
    }
  };

  const filteredPackages = PRICING_PACKAGES.filter(
    pkg => pkg.category === activeTab
  );

  const availableAddOns = ADD_ONS.filter(
    addon => addon.category === activeTab
  );

  const selectedPackageObject = PRICING_PACKAGES.find(p => p.id === selectedPackageId);

  // Parse price string of selected package (remove Rp, dots, etc.)
  const getNumericPrice = (pStr: string): number => {
    const cleaned = pStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  };

  const packagePriceNum = selectedPackageObject ? getNumericPrice(selectedPackageObject.price) : 0;
  
  // Calculate total add-on cost
  const addOnsTotalNum = selectedAddOnIds.reduce((sum, id) => {
    const found = ADD_ONS.find(a => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);

  const grandTotalNum = packagePriceNum + addOnsTotalNum;

  // Format currency back to Indonesian rupiah notation
  const formatRupiah = (num: number): string => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  // Toggle add-ons check
  const handleToggleAddOn = (addonId: string) => {
    if (selectedAddOnIds.includes(addonId)) {
      setSelectedAddOnIds(selectedAddOnIds.filter(id => id !== addonId));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, addonId]);
    }
  };

  // Step 1 Validation & Proceed
  const handleGoToStep2 = () => {
    if (!selectedPackageId) {
      setValidationError('Silakan pilih salah satu paket terlebih dahulu.');
      return;
    }
    setValidationError('');
    setStep(2);
  };

  // Step 2 Validation & Proceed
  const handleGoToStep3 = () => {
    if (!clientName.trim()) {
      setValidationError('Silakan isi nama lengkap Anda.');
      return;
    }
    if (!eventDate) {
      setValidationError('Silakan tentukan perkiraan tanggal acara Anda.');
      return;
    }
    if (!eventLocation.trim()) {
      setValidationError('Silakan isi rencana lokasi/gedung acara Anda.');
      return;
    }
    setValidationError('');
    setStep(3);
  };

  // Build WhatsApp pre-filled text
  const buildWhatsAppUrl = () => {
    if (!selectedPackageObject) return '#';
    
    const chosenAddonList = selectedAddOnIds
      .map(id => {
        const a = ADD_ONS.find(item => item.id === id);
        return a ? `   • ${a.name} (${formatRupiah(a.price)})` : '';
      })
      .filter(Boolean)
      .join('\n');

    const formattedAddons = chosenAddonList ? `${chosenAddonList}` : '   - (Tidak ada)';

    const textPayload = `Halo Cepen Production! 👋

Saya telah mengisi rincian rencana acara saya di Booking Engine Website. Berikut detail konsultasi dan paket yang saya pilih:

📌 *INFORMASI PESANAN*
   Kategori Layanan: ${activeTab.toUpperCase()}
   Nama Paket: ${selectedPackageObject.title}
   Harga Paket: ${selectedPackageObject.price}

➕ *LAYANAN TAMBAHAN (ADD-ONS)*
${formattedAddons}

💰 *ESTIMASI TOTAL INVESTASI*
   *${formatRupiah(grandTotalNum)}*

🗓️ *RINCIAN ACARA*
   Nama Lengkap: ${clientName}
   Tanggal Acara: ${eventDate}
   Lokasi/Venue: ${eventLocation}
   Catatan Khusus: ${specialNotes ? specialNotes : '-'}

Mohon informasi mengenai ketersediaan tim dan petunjuk pembayaran uang muka (DP). Terima kasih!`;

    const encodedText = encodeURIComponent(textPayload);
    return `https://wa.me/6281267894567?text=${encodedText}`; // Replace with actual WhatsApp phone if provided, otherwise standard placeholder
  };

  // Simulates or initiates an printable high-fidelity PDF invoice view
  const handleDownloadInvoicePDF = () => {
    // Generate simple printable element or trigger window.print() natively
    window.print();
  };

  const generateBeautifulPricelistHTML = (name: string, phone: string, date: string, location: string) => {
    const categories: { key: ServiceCategory; label: string }[] = [
      { key: 'wedding', label: 'Wedding Archive' },
      { key: 'prewedding', label: 'Prewedding Creative' },
      { key: 'event', label: 'Event Coverage' },
      { key: 'drone', label: 'Aerial & Drone Cinema' }
    ];

    let packagesHTML = '';
    categories.forEach(cat => {
      const catPkgs = PRICING_PACKAGES.filter(p => p.category === cat.key);
      if (catPkgs.length === 0) return;

      packagesHTML += `
        <div class="section-title">${cat.label} Packages</div>
        <table class="package-table">
          <thead>
            <tr>
              <th style="width: 70%;">Detail Paket Layanan</th>
              <th style="width: 30%; text-align: right;">Biaya Investasi</th>
            </tr>
          </thead>
          <tbody>
      `;

      catPkgs.forEach(p => {
        const featuresList = p.features.map(f => `<li>${f}</li>`).join('');
        packagesHTML += `
            <tr>
              <td>
                <div class="pkg-title">${p.title} ${p.isPopular ? '<span class="popular-tag">SANGAT DISUKAI</span>' : ''}</div>
                <div class="pkg-desc">${p.subtitle}</div>
                <ul class="pkg-features">
                  ${featuresList}
                </ul>
              </td>
              <td class="pkg-price">${p.price} <span class="nett-label">NETT</span></td>
            </tr>
        `;
      });

      packagesHTML += `
          </tbody>
        </table>
      `;
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Pricelist Cepen Production - ${name}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;550;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono:wght@400;550&display=swap');
            
            body {
              font-family: 'Plus Jakarta Sans', sans-serif;
              color: #121214;
              background-color: #ffffff;
              margin: 0;
              padding: 40px;
              line-height: 1.5;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #eaeaea;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo-placeholder {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              font-weight: bold;
              letter-spacing: -0.5px;
              color: #09090b;
            }
            .logo-subtitle {
              font-family: 'JetBrains Mono', monospace;
              font-size: 9px;
              color: #2563eb;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-top: -2px;
            }
            .doc-title {
              text-align: right;
            }
            .doc-title h1 {
              font-size: 22px;
              margin: 0;
              font-weight: 800;
              letter-spacing: 1px;
              text-transform: uppercase;
              color: #09090b;
            }
            .doc-title p {
              margin: 5px 0 0 0;
              font-size: 11px;
              color: #71717a;
              font-family: 'JetBrains Mono', monospace;
            }
            .client-card {
              background-color: #f4f4f5;
              border: 1px solid #e4e4e7;
              border-radius: 8px;
              padding: 24px;
              margin-bottom: 35px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }
            .client-item {
              font-size: 13px;
              color: #18181b;
            }
            .client-item strong {
              display: block;
              font-size: 9px;
              text-transform: uppercase;
              color: #71717a;
              margin-bottom: 4px;
              letter-spacing: 1px;
            }
            .section-title {
              font-family: 'Playfair Display', serif;
              font-size: 18px;
              border-left: 3px solid #2563eb;
              padding-left: 10px;
              margin-top: 35px;
              margin-bottom: 15px;
              font-weight: bold;
              color: #09090b;
            }
            .package-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .package-table th {
              background-color: #181af5;
              background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
              color: #ffffff;
              text-align: left;
              padding: 12px 18px;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .package-table td {
              border-bottom: 1px solid #e4e4e7;
              padding: 18px;
              vertical-align: top;
            }
            .pkg-title {
              font-weight: 700;
              font-size: 15px;
              color: #09090b;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .popular-tag {
              background-color: #2563eb;
              color: white;
              font-size: 8px;
              font-weight: 800;
              letter-spacing: 1px;
              padding: 2px 6px;
              border-radius: 4px;
            }
            .pkg-desc {
              font-size: 11px;
              color: #52525b;
              margin-top: 4px;
              font-weight: 300;
            }
            .pkg-price {
              font-weight: 800;
              font-size: 16px;
              color: #2563eb;
              text-align: right;
              white-space: nowrap;
            }
            .nett-label {
              font-size: 9px;
              font-family: 'JetBrains Mono', monospace;
              color: #a1a1aa;
              font-weight: normal;
              margin-left: 2px;
            }
            .pkg-features {
              font-size: 11px;
              color: #27272a;
              margin-top: 10px;
              padding-left: 15px;
              line-height: 1.6;
            }
            .pkg-features li {
              margin-bottom: 4px;
              color: #3f3f46;
            }
            .footer {
              margin-top: 60px;
              border-top: 1px solid #e4e4e7;
              padding-top: 25px;
              text-align: center;
              font-size: 10px;
              color: #71717a;
              page-break-inside: avoid;
            }
            .stamp {
              border: 2px solid #2563eb;
              color: #2563eb;
              display: inline-block;
              padding: 6px 16px;
              font-weight: 800;
              font-size: 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
              border-radius: 4px;
              margin-top: 10px;
              transform: rotate(-3deg);
            }
            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo-placeholder">Cepen Production</div>
              <div class="logo-subtitle">Premium Minangkabau Documentaries</div>
            </div>
            <div class="doc-title">
              <h1>Official Pricelist Brochure</h1>
              <p>REF: CP-PL-${Math.floor(Date.now() / 10000).toString().substring(3)}</p>
            </div>
          </div>

          <div class="client-card">
            <div class="client-item">
              <strong>Prepared For / Nama Klien</strong>
              ${name}
            </div>
            <div class="client-item">
              <strong>WhatsApp Contact No.</strong>
              ${phone}
            </div>
            <div class="client-item">
              <strong>Rencana Tanggal Peristiwa</strong>
              ${date}
            </div>
            <div class="client-item">
              <strong>Lokasi / Venue Rencana</strong>
              ${location}
            </div>
          </div>

          <p style="font-size: 12px; color: #52525b; margin-bottom: 25px; font-style: italic;">
            Berikut adalah daftar paket investasi resmi dari Cepen Production untuk dijadikan acuan diskusi bersama keluarga besar Anda. Seluruh penawaran bersifat transparan.
          </p>

          ${packagesHTML}

          <div class="footer">
            <div class="stamp">OFFICIAL DOCUMENT</div>
            <p style="margin-top: 15px; font-weight: 600;">Cepen Production © 2026. All rights reserved.</p>
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 8px;">Membingkai keindahan abadi dan prosesi sakral adat tradisional Minangkabau.</p>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            }
          </script>
        </body>
      </html>
    `;
  };

  const handleDownloadPdfAction = () => {
    if (!isDlFormValid) return;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(generateBeautifulPricelistHTML(dlName, dlPhone, dlDate, dlLocation));
      printWindow.document.close();
    } else {
      const fileData = `========================================================
CEPEN PRODUCTION - OFFICIAL INVESTMENT PRICELIST
========================================================

PREPARED FOR: ${dlName}
WHATSAPP CONTACT: ${dlPhone}
EVENT DATE: ${dlDate}
EVENT LOCATION: ${dlLocation}

--------------------------------------------------------
I. WEDDING ARCHIVE PACKAGES
--------------------------------------------------------
${PRICING_PACKAGES.filter(p => p.category === 'wedding').map(p => `
* ${p.title} (${p.price} NETT)
  ${p.subtitle}
  Layanan:
  ${p.features.map(f => `  - ${f}`).join('\n')}
`).join('\n')}

--------------------------------------------------------
II. PREWEDDING CREATIVE PACKAGES
--------------------------------------------------------
${PRICING_PACKAGES.filter(p => p.category === 'prewedding').map(p => `
* ${p.title} (${p.price} NETT)
  ${p.subtitle}
  Layanan:
  ${p.features.map(f => `  - ${f}`).join('\n')}
`).join('\n')}

--------------------------------------------------------
III. EVENT & AERIAL DRONE CINEMA
--------------------------------------------------------
${PRICING_PACKAGES.filter(p => p.category === 'event' || p.category === 'drone').map(p => `
* ${p.title} (${p.price} NETT)
  ${p.subtitle}
  Layanan:
  ${p.features.map(f => `  - ${f}`).join('\n')}
`).join('\n')}

Thank you for choosing Cepen Production.
We shape timeless memories of Minangkabau sacred traditions.
========================================================`;
      
      const blob = new Blob([fileData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Cepen_Production_Pricelist_${dlName.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setIsDownloadOpen(false);
    setDlName('');
    setDlPhone('');
    setDlDate('');
    setDlLocation('');
  };

  const tabs: { label: string; value: ServiceCategory }[] = [
    { label: 'Wedding Archive', value: 'wedding' },
    { label: 'Prewedding', value: 'prewedding' },
    { label: 'Event Coverage', value: 'event' },
    { label: 'Drone Cinema', value: 'drone' },
  ];

  return (
    <>
      {/* 1. Large Wide Banner Section with access label at bottom center */}
      <section
        id="pricelist"
        className="relative py-32 md:py-48 px-6 sm:px-8 bg-zinc-950 flex flex-col items-center justify-end overflow-hidden border-b border-zinc-900 group"
      >
        {/* Deep parallax background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.pricelistBanner}
            alt="Pricelist Cinematic Cinematic Banner - Cepen Production"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 duration-700 ease-out fill-zinc-950"
          />
          {/* Edge vignettes & deep bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-zinc-950/85" />
          
          {/* Tech decorative target scope circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 border border-white/5 rounded-full pointer-events-none" />
        </div>

        {/* Branding label & Content Center */}
        <div className="relative z-10 w-full max-w-4xl text-center space-y-6 flex flex-col items-center">
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-blue-400 font-extrabold pb-1">
            03 / Exclusive Investments
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase max-w-3xl leading-snug">
            Ciptakan Warisan Visual Indah Anda Hari Ini.
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Investasi berharga untuk kenangan seumur hidup. Seluruh rincian paket disusun transparan tanpa biaya tersembunyi.
          </p>

          {/* Trigger button centered at bottom of section */}
          <button
            id="btn-trigger-pricelist"
            onClick={() => handleOpenPricingModal('wedding')}
            className="mt-8 transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white hover:bg-zinc-100 text-zinc-950 text-xs sm:text-sm font-bold tracking-widest uppercase px-8 sm:px-12 py-4 sm:py-5 border border-white flex items-center space-x-3 shadow-2xl relative overflow-hidden group/btn cursor-pointer rounded-xs">
              <span className="relative z-10 text-zinc-950 group-hover/btn:text-blue-600 transition-colors duration-300">
                Pilih Paket & Cek Biaya
              </span>
              <ArrowRight size={14} className="text-zinc-400 group-hover/btn:text-blue-500 transition-colors group-hover/btn:translate-x-1 duration-300 shrink-0" />
            </div>
          </button>
        </div>
      </section>

      {/* 2. Full-Screen Interactive Sheet Modal */}
      {isOpen && (
        <div
          id="pricelist-modal-container"
          className="fixed inset-0 bg-zinc-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in overflow-y-auto"
          onClick={onClose}
        >
          <div
            id="pricelist-modal-panel"
            className="w-full max-w-5xl bg-zinc-50 text-zinc-900 border border-zinc-200 flex flex-col rounded-lg shadow-2xl relative my-6 overflow-hidden md:h-auto max-h-[96vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal close button */}
            <button
              id="btn-close-pricelist-modal"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-850 hover:text-zinc-950 rounded-full transition-all cursor-pointer focus:outline-none z-20 shadow-xs"
              title="Tutup"
            >
              <X size={18} />
            </button>

            {/* Stepper Header Indication */}
            <div className="bg-white border-b border-zinc-150 px-6 py-4 flex flex-row items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles size={16} className="text-blue-600 animate-spin-slow" />
                <span className="font-sans font-bold text-sm sm:text-base text-zinc-950 uppercase tracking-wider">
                  Cepen Booking Engine
                </span>
              </div>
              
              {/* Process Bar Indicators */}
              <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold text-zinc-405">
                <span className={`${step === 1 ? 'text-blue-600 font-extrabold' : 'text-zinc-400'}`}>1. Paket</span>
                <ChevronRight size={10} className="text-zinc-300" />
                <span className={`${step === 2 ? 'text-blue-600 font-extrabold' : 'text-zinc-400'}`}>2. Detail Acara</span>
                <ChevronRight size={10} className="text-zinc-300" />
                <span className={`${step === 3 ? 'text-blue-600 font-extrabold' : 'text-zinc-400'}`}>3. Selesai</span>
              </div>
            </div>

            {/* MAIN STEP CONTENT AREA */}
            <div className="overflow-y-auto max-h-[calc(84vh-120px)] p-5 sm:p-7 bg-white">
              
              {validationError && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-md text-left font-sans">
                  ⚠️ {validationError}
                </div>
              )}

              {/* STEP 1: SELECT PACKAGE & ADD-ONS */}
              {step === 1 && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="space-y-1">
                    <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-zinc-900 tracking-tight">
                      PILIH LAYANAN & ESTIMASI BIAYA
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 font-light max-w-2xl leading-normal">
                      Pilih kategori yang Anda kehendaki menggunakan tab di bawah, pilih paket utama, lalu centang add-ons (opsional) sesuai dengan selera Anda.
                    </p>
                  </div>

                  {/* Kategori Tab Selector & Download PDF Pricelist Button Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Kategori Tab Selector Layout */}
                    <div className="flex flex-wrap gap-1 bg-zinc-50 border border-zinc-200 p-1.5 rounded-lg max-w-max">
                      {tabs.map(tab => (
                        <button
                          key={tab.value}
                          onClick={() => handleTabChange(tab.value)}
                          className={`px-4 py-2 rounded-md text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                            activeTab === tab.value
                              ? 'bg-zinc-950 text-white shadow-md font-extrabold'
                              : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Download PDF Pricelist Button */}
                    <button
                      onClick={() => setIsDownloadOpen(true)}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-zinc-950 text-white text-[11px] font-bold tracking-wider uppercase rounded-lg shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer self-start md:self-center select-none"
                    >
                      <FileText size={14} className="animate-pulse" />
                      <span>Download PDF Pricelist</span>
                    </button>
                  </div>

                  {/* Package Comparison Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {filteredPackages.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          className={`relative border p-5 flex flex-col justify-between rounded-xl cursor-pointer transition-all duration-300 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/10 ring-2 ring-blue-500/20 shadow-md'
                              : 'border-zinc-200 bg-white hover:border-zinc-400 shadow-xs'
                          }`}
                          onClick={() => {
                            setSelectedPackageId(pkg.id);
                            setValidationError('');
                          }}
                        >
                          {pkg.isPopular && (
                            <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[8px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                              Terfavorit
                            </span>
                          )}

                          <div className="space-y-4 text-left">
                            {/* Check Circle on Top Right corner */}
                            <div className="flex justify-between items-start">
                              <span className="p-1 rounded bg-zinc-100 text-[10px] font-mono uppercase tracking-widest font-semibold text-zinc-500">
                                {activeTab.toUpperCase()}
                              </span>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                isSelected ? 'bg-blue-650 border-blue-600 text-white bg-blue-600' : 'border-zinc-300'
                              }`}>
                                {isSelected && <Check size={12} />}
                              </div>
                            </div>

                            {/* Info Block */}
                            <div>
                              <h4 className="font-sans font-bold text-base text-zinc-950 leading-tight">
                                {pkg.title}
                              </h4>
                              <p className="text-[11px] text-zinc-450 font-normal leading-relaxed text-zinc-500 mt-1 min-h-[40px]">
                                {pkg.subtitle}
                              </p>
                            </div>

                            {/* Price Plate */}
                            <div className="text-left font-sans font-extrabold text-lg text-zinc-900 border-t border-zinc-150 pt-2.5">
                              {pkg.price}
                              <span className="text-[9px] font-mono uppercase text-zinc-400 font-medium ml-1.5 tracking-wide">
                                NETT
                              </span>
                            </div>

                            {/* Small bullets List */}
                            <div className="space-y-2 pt-1">
                              {pkg.features.slice(0, 4).map((f, i) => (
                                <div key={i} className="flex gap-1.5 items-start">
                                  <Check size={11} className="text-zinc-600 shrink-0 mt-0.5" />
                                  <span className="text-[10px] sm:text-[11px] text-zinc-600 line-clamp-1 leading-tight">{f}</span>
                                </div>
                              ))}
                              {pkg.features.length > 4 && (
                                <span className="text-[10px] text-zinc-400 font-mono italic">
                                  +{pkg.features.length - 4} detail lainnya...
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* LAYANAN TAMBAHAN (ADD-ONS) CHECKBOX REGION */}
                  {availableAddOns.length > 0 && (
                    <div className="bg-zinc-50/50 border border-zinc-200 rounded-xl p-5 space-y-4">
                      <div>
                        <h4 className="font-sans font-bold text-[13px] sm:text-sm text-zinc-950 uppercase tracking-wide flex items-center gap-1.5">
                          <ShoppingCart size={15} className="text-blue-600" />
                          Layanan Tambahan / Add-ons yang Bisa Ditambahkan (Opsional):
                        </h4>
                        <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                          Sempurnakan dokumentasi Anda dengan layanan premium ekstra dengan ceklis di bawah ini.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableAddOns.map((addon) => {
                          const isChecked = selectedAddOnIds.includes(addon.id);
                          return (
                            <div
                              key={addon.id}
                              onClick={() => handleToggleAddOn(addon.id)}
                              className={`flex items-start justify-between p-3.5 border rounded-lg cursor-pointer select-none transition-all ${
                                isChecked
                                  ? 'border-blue-500 bg-white shadow-xs'
                                  : 'border-zinc-200 bg-white hover:border-zinc-300'
                              }`}
                            >
                              <div className="flex items-start space-x-3 text-left">
                                <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-all ${
                                  isChecked ? 'bg-blue-600 border-blue-500 text-white' : 'border-zinc-300'
                                }`}>
                                  {isChecked && <Check size={10} />}
                                </div>
                                <div className="space-y-0.5">
                                  <span className="font-sans font-bold text-xs text-zinc-900 leading-tight block">
                                    {addon.name}
                                  </span>
                                  <span className="text-[10px] text-zinc-500 font-light block leading-normal">
                                    {addon.description}
                                  </span>
                                </div>
                              </div>
                              <span className="font-sans font-bold text-xs text-blue-600 shrink-0 ml-2">
                                +{formatRupiah(addon.price)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Real-Time Calc summary banner */}
                  <div className="p-4 bg-blue-50/20 border border-blue-200/50 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left space-y-0.5">
                      <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-semibold block">
                        ESTIMASI TOTAL INVESTASI (SEMENTARA)
                      </span>
                      <h4 className="font-sans font-extrabold text-xl text-zinc-950">
                        {formatRupiah(grandTotalNum)}
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        Dipilih: {selectedPackageObject?.title} {selectedAddOnIds.length > 0 && `+ ${selectedAddOnIds.length} Add-ons`}
                      </p>
                    </div>

                    <button
                      onClick={handleGoToStep2}
                      className="w-full sm:w-auto px-6 h-11 bg-zinc-950 text-white text-xs font-bold tracking-widest uppercase hover:bg-zinc-900 rounded-md flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-zinc-900/10"
                    >
                      <span>Lanjut Isi Rencana Acara</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: LOKASI & TANGGAL ACARA */}
              {step === 2 && (
                <div className="space-y-6 text-left max-w-xl mx-auto animate-fade-in py-4">
                  <div className="space-y-1">
                    <h3 className="font-sans font-extrabold text-xl text-zinc-900 tracking-tight">
                      INFORMASI RENCANA ACARA
                    </h3>
                    <p className="text-xs text-zinc-500 font-light">
                      Lengkapi detail acara Anda di bawah ini untuk memeriksa jadwal ketersediaan tim Cepen Production.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Input Nama */}
                    <div className="space-y-1.5 text-left">
                      <label className="font-sans font-bold text-xs text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
                        <User size={13} />
                        Nama Lengkap Calon Pengantin / Klien <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Sarah Aulia & Fadel"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full h-11 px-3.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs placeholder-zinc-400 font-light transition-all focus:outline-none"
                      />
                    </div>

                    {/* Input Tanggal & Lokasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div className="space-y-1.5 text-left">
                        <label className="font-sans font-bold text-xs text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar size={13} />
                          Tanggal Rencana Acara <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full h-11 px-3.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-350 focus:border-zinc-950 rounded-md text-xs font-light focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5 text-left">
                        <label className="font-sans font-bold text-xs text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin size={13} />
                          Lokasi / Gedung Acara <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: UPI Convention Center, Padang"
                          value={eventLocation}
                          onChange={(e) => setEventLocation(e.target.value)}
                          className="w-full h-11 px-3.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs placeholder-zinc-400 font-light transition-all focus:outline-none"
                        />
                      </div>

                    </div>

                    {/* Input Catatan */}
                    <div className="space-y-1.5 text-left">
                      <label className="font-sans font-bold text-xs text-zinc-800 uppercase tracking-widest block">
                        Catatan Tambahan / Request Khusus (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tuliskan warna dekorasi, waktu mulai acara, atau detail logistik khusus lainnya..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="w-full p-3.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-910 rounded-md text-xs placeholder-zinc-400 font-light resize-none focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Wizard control buttons block */}
                  <div className="flex gap-3 pt-4 border-t border-zinc-150">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 border border-zinc-250 text-zinc-800 hover:bg-zinc-50 text-[11px] font-bold tracking-widest uppercase rounded-md transition-all cursor-pointer text-center"
                    >
                      ← Kembali
                    </button>
                    <button
                      onClick={handleGoToStep3}
                      className="flex-1 py-3 bg-zinc-950 text-white hover:bg-zinc-900 text-[11px] font-bold tracking-widest uppercase rounded-md transition-all cursor-pointer text-center"
                    >
                      Lanjut Ringkasan →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUMMARY & CALL TO ACTIONS */}
              {step === 3 && selectedPackageObject && (
                <div className="space-y-6 text-left animate-fade-in">
                  <div className="text-center space-y-2 py-2">
                    <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600">
                      <Check size={24} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-sans font-extrabold text-xl text-zinc-900 tracking-tight uppercase">
                        Rincian Pesanan Siap Dikirim!
                      </h3>
                      <p className="text-xs text-zinc-500 font-light max-w-md mx-auto leading-normal">
                        Rencana pesanan Anda telah tersusun rapi. Silakan pilih opsi aksi untuk menghubungi admin via WhatsApp atau mengunduh invoice dalam bentuk PDF.
                      </p>
                    </div>
                  </div>

                  {/* Elegant Invoice Summary Panel */}
                  <div className="border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden max-w-2xl mx-auto shadow-xs">
                    <div className="bg-zinc-100/70 border-b border-zinc-200/80 px-5 py-3.5 flex justify-between items-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-extrabold">
                        Rincian Invoice Estimasi / Quotation Summary
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        ID: CP-{Math.floor(Math.random() * 90000) + 10000}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 space-y-4">
                      {/* Client information plate */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-zinc-200/80 pb-3 text-xs">
                        <div>
                          <p className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Nama Klien:</p>
                          <p className="font-sans font-bold text-zinc-800">{clientName}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Tanggal Peristiwa:</p>
                          <p className="font-sans font-medium text-zinc-800">{eventDate}</p>
                        </div>
                        <div className="col-span-2 pt-1">
                          <p className="text-[10px] uppercase font-mono text-zinc-400 font-bold tracking-wider">Lokasi / Venue Acara:</p>
                          <p className="font-sans font-medium text-zinc-800">{eventLocation}</p>
                        </div>
                      </div>

                      {/* Packages & add-ons breakdown */}
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-start text-xs sm:text-[13px]">
                          <div className="space-y-0.5 max-w-[70%]">
                            <span className="font-sans font-extrabold text-zinc-950 block">
                              {selectedPackageObject.title}
                            </span>
                            <span className="text-[10px] text-zinc-500 block leading-normal">
                              Kategori: {activeTab.toUpperCase()} ({selectedPackageObject.subtitle})
                            </span>
                          </div>
                          <span className="font-sans font-bold text-zinc-900 shrink-0">
                            {selectedPackageObject.price}
                          </span>
                        </div>

                        {selectedAddOnIds.length > 0 && (
                          <div className="border-t border-zinc-200/60 pt-2.5 space-y-2">
                            <p className="text-[10px] uppercase font-mono tracking-wider font-bold text-zinc-400">
                              Layanan Tambahan (Add-ons):
                            </p>
                            {selectedAddOnIds.map(id => {
                              const a = ADD_ONS.find(item => item.id === id);
                              if (!a) return null;
                              return (
                                <div key={a.id} className="flex justify-between items-center text-xs text-zinc-650">
                                  <span className="text-zinc-600 font-light flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    {a.name}
                                  </span>
                                  <span className="font-sans font-semibold text-zinc-800">
                                    {formatRupiah(a.price)}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Total Bar */}
                      <div className="border-t-2 border-dashed border-zinc-200 pt-3.5 flex justify-between items-center font-sans">
                        <span className="text-xs uppercase tracking-widest font-mono font-extrabold text-zinc-500">
                          Total Estimasi Investasi
                        </span>
                        <div className="text-right">
                          <span className="text-base sm:text-lg font-black text-blue-600 block leading-none">
                            {formatRupiah(grandTotalNum)}
                          </span>
                          <span className="text-[9px] text-zinc-450 font-mono tracking-wider uppercase font-semibold text-zinc-400 block mt-1">
                            * BELUM TERMASUK DISKON / CASHBACK PROMO
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Primary Call-to-actions */}
                  <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-2">
                    <button
                      onClick={handleDownloadInvoicePDF}
                      className="flex-1 h-12 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-805 hover:text-zinc-950 rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all shadow-xs cursor-pointer"
                    >
                      <FileText size={15} className="text-zinc-500 animate-pulse" />
                      <span>Cetak Rian Invoice / PDF</span>
                    </button>

                    <a
                      href={buildWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-green-600/15 cursor-pointer text-center"
                    >
                      <MessageSquare size={15} className="text-white" />
                      <span>Kirim ke WhatsApp Admin</span>
                    </a>
                  </div>

                  <div className="max-w-md mx-auto text-center pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="text-zinc-400 hover:text-zinc-900 text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
                    >
                      ← Edit Rencana Jadwal Acara
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Sticky footer notes inside modal */}
            <div className="p-4 bg-zinc-50 border-t border-zinc-200/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wide">
                * Biaya akomodasi luar kota Padang / Bukittinggi disesuaikan dengan jarak lokasi acara.
              </span>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-950 text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-all"
              >
                Kembali Ke Landing Page
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. Download PDF Pricelist Modal Popup */}
      {isDownloadOpen && (
        <div
          id="pdf-download-modal"
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsDownloadOpen(false)}
        >
          <div
            id="pdf-download-panel"
            className="w-full max-w-md bg-white text-zinc-900 border border-zinc-200 rounded-xl shadow-2xl p-6 sm:p-8 relative space-y-5 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close pop-up button */}
            <button
              id="btn-close-pdf-modal"
              onClick={() => setIsDownloadOpen(false)}
              className="absolute top-4 right-4 p-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 rounded-full transition-all cursor-pointer"
              title="Tutup"
            >
              <X size={16} />
            </button>

            <div className="space-y-1.5 text-center pb-3 border-b border-zinc-150">
              <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                <FileText size={20} />
              </div>
              <h3 className="font-sans font-black text-base text-zinc-900 uppercase tracking-tight">
                Download PDF Pricelist
              </h3>
              <p className="text-xs text-zinc-500 leading-normal font-light">
                Masukkan info rincian rencana Anda untuk mengunduh brosur penawaran resmi Cepen Production.
              </p>
            </div>

            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div className="space-y-1 text-left">
                <label className="font-sans font-bold text-[10px] text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={12} className="text-zinc-400" />
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sarah Amalia"
                  value={dlName}
                  onChange={(e) => setDlName(e.target.value)}
                  className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs placeholder-zinc-400 font-normal focus:outline-none transition-all font-sans"
                  required
                />
              </div>

              {/* No WhatsApp */}
              <div className="space-y-1 text-left">
                <label className="font-sans font-bold text-[10px] text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone size={12} className="text-zinc-400" />
                  No. HP / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={dlPhone}
                  onChange={(e) => setDlPhone(e.target.value)}
                  className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs placeholder-zinc-400 font-normal focus:outline-none transition-all font-sans"
                  required
                />
              </div>

              {/* Tanggal Rencana Acara & Lokasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="font-sans font-bold text-[10px] text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={12} className="text-zinc-400" />
                    Tanggal Acara <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dlDate}
                    onChange={(e) => setDlDate(e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs font-normal focus:outline-none transition-all font-sans"
                    required
                  />
                </div>

                <div className="space-y-1 text-left">
                  <label className="font-sans font-bold text-[10px] text-zinc-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={12} className="text-zinc-400" />
                    Lokasi Acara <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Padang"
                    value={dlLocation}
                    onChange={(e) => setDlLocation(e.target.value)}
                    className="w-full h-10 px-3 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 focus:border-zinc-950 rounded-md text-xs placeholder-zinc-400 font-normal focus:outline-none transition-all font-sans"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Downloader Trigger Button */}
            <div className="pt-2">
              <button
                disabled={!isDlFormValid}
                onClick={handleDownloadPdfAction}
                className={`w-full h-12 rounded-lg font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  isDlFormValid
                    ? 'bg-blue-600 hover:bg-zinc-950 text-white hover:text-white'
                    : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
                }`}
              >
                <FileText size={15} />
                <span>Download Pricelist PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
