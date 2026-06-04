import { useState } from 'react';
import { ServiceCategory, Project, Testimonial } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import RecentWork from './components/RecentWork';
import Clients from './components/Clients';
import Pricelist from './components/Pricelist';
import Reviews from './components/Reviews';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GalleryView from './components/GalleryView';
import AdminView from './components/AdminView';
import { getProjects, getTestimonials, getFAQs, saveTestimonials, FAQItem } from './lib/db';

export default function App() {
  // Global states
  const [currentView, setCurrentView] = useState<'home' | 'gallery' | 'admin'>('home');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [isPricelistOpen, setIsPricelistOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCategory | 'all'>('wedding');

  // Dynamic admin-managed states
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getTestimonials());
  const [faqs, setFaqs] = useState<FAQItem[]>(() => getFAQs());

  const handleNavigate = (view: 'home' | 'gallery' | 'admin', sectionId?: string, albumId?: string) => {
    setCurrentView(view);
    if (albumId) {
      setSelectedAlbumId(albumId);
    } else {
      setSelectedAlbumId(null);
    }

    if (view === 'home') {
      const targetId = sectionId || 'home';
      // Allow time for home view components to mount fully
      setTimeout(() => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offsetTop = Math.max(0, targetEl.offsetTop - 80);
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
      }, 100);
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

  const handleAddTestimonial = (newReview: Testimonial) => {
    const updated = [newReview, ...testimonials];
    setTestimonials(updated);
    saveTestimonials(updated);
  };

  return (
    <div className="bg-white min-h-screen text-zinc-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
      {/* 1. Sticky Navigation Header */}
      <Header 
        onAksesPricelist={handleOpenPricelist} 
        currentPage={currentView}
        onNavigate={handleNavigate}
      />

      {currentView === 'admin' ? (
        /* Gated Admin Hub & Dashboard Area */
        <>
          <AdminView 
            onBackToHome={() => handleNavigate('home')}
            projects={projects}
            setProjects={setProjects}
            testimonials={testimonials}
            setTestimonials={setTestimonials}
            faqs={faqs}
            setFaqs={setFaqs}
          />
          <Footer onNavigate={handleNavigate} currentView={currentView} />
        </>
      ) : currentView === 'home' ? (
        <>
          {/* 2. Hero Section - Headline, Call to action and Anak Daro Illustration */}
          <Hero onAksesPricelist={handleOpenPricelist} />

          {/* 4. Filterable Project Gallery Showcase with trigger to Dedicated View */}
          <RecentWork 
            projects={projects}
            onSeeMoreGallery={() => handleNavigate('gallery')} 
            onSelectProject={(albumId) => handleNavigate('gallery', undefined, albumId)}
          />

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
          <Reviews 
            testimonials={testimonials}
            onAddTestimonial={handleAddTestimonial}
          />

          {/* 8. About Us Profile (Team image + paragraphs) */}
          <About />

          {/* 8.5. Frequently Asked Questions accordion block */}
          <FAQ faqs={faqs} />

          {/* 9. Contact inquiry form + pre-filled WhatsApp link sender */}
          <Contact preselectedService={selectedService} />

          {/* 11. Visual map & quick links Footer */}
          <Footer onNavigate={handleNavigate} currentView={currentView} />
        </>
      ) : (
        /* Sempurna rendering Dedicated Gallery view */
        <>
          <GalleryView 
            onBackToHome={(sectionId) => handleNavigate('home', sectionId)} 
            initialAlbumId={selectedAlbumId}
          />
        </>
      )}
    </div>
  );
}
