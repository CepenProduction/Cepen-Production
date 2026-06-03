import { useState } from 'react';
import { ServiceCategory } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import RecentWork from './components/RecentWork';
import Clients from './components/Clients';
import Pricelist from './components/Pricelist';
import Reviews from './components/Reviews';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryView from './components/GalleryView';

export default function App() {
  // Global states
  const [currentView, setCurrentView] = useState<'home' | 'gallery'>('home');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [isPricelistOpen, setIsPricelistOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCategory | 'all'>('wedding');

  const handleNavigate = (view: 'home' | 'gallery', sectionId?: string, albumId?: string) => {
    setCurrentView(view);
    if (albumId) {
      setSelectedAlbumId(albumId);
    } else {
      setSelectedAlbumId(null);
    }

    if (view === 'home') {
      if (sectionId) {
        // Allow time for home view components to mount
        setTimeout(() => {
          const targetEl = document.getElementById(sectionId);
          if (targetEl) {
            const offsetTop = targetEl.offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth',
            });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectServiceCategory = (category: ServiceCategory) => {
    setSelectedService(category);
    // Smooth scroll down to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const offsetTop = contactEl.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenPricelist = () => {
    setIsPricelistOpen(true);
  };

  const handleClosePricelist = () => {
    setIsPricelistOpen(false);
  };

  return (
    <div className="bg-white min-h-screen text-zinc-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      {/* 1. Sticky Navigation Header */}
      <Header 
        onAksesPricelist={handleOpenPricelist} 
        currentPage={currentView}
        onNavigate={handleNavigate}
      />

      {currentView === 'home' ? (
        <>
          {/* 2. Hero Section - Headline, Call to action and Anak Daro Illustration */}
          <Hero onAksesPricelist={handleOpenPricelist} />

          {/* 4. Filterable Project Gallery Showcase with trigger to Dedicated View */}
          <RecentWork onSeeMoreGallery={() => handleNavigate('gallery')} />

          {/* 5. Clients logos strip (corporate verification in grayscale) */}
          <Clients />

          {/* 6. Pricelist Banner Section & overlay packages modal */}
          <Pricelist
            isOpen={isPricelistOpen}
            onOpen={handleOpenPricelist}
            onClose={handleClosePricelist}
            selectedCategory={selectedService}
          />

          {/* 7. Client Reviews testimonial feedback forum */}
          <Reviews />

          {/* 8. About Us Profile (Team image + paragraphs) */}
          <About />

          {/* 9. Contact inquiry form + pre-filled WhatsApp link sender */}
          <Contact preselectedService={selectedService} />

          {/* 11. Visual map & quick links Footer */}
          <Footer />
        </>
      ) : (
        /* Sempurna rendering Dedicated Gallery view */
        <GalleryView 
          onBackToHome={() => handleNavigate('home')} 
          initialAlbumId={selectedAlbumId}
        />
      )}
    </div>
  );
}
