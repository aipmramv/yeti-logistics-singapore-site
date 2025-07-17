
import React, { useEffect } from 'react';
import { useSupabaseSingle } from '@/hooks/useSupabaseQuery';
import FloatingNavigation from './FloatingNavigation';

const HeroSection = () => {
  // All hooks must be called unconditionally and at the top
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.getElementById('emboss-style')) {
      const style = document.createElement('style');
      style.id = 'emboss-style';
      style.innerHTML = `
        .text-shadow-emboss {
          text-shadow:
            0 2px 4px rgba(0,0,0,0.5),
            0 1px 0 #fff,
            0 -1px 0 #fff,
            1px 0 0 #fff,
            -1px 0 0 #fff;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Slideshow images
  const slideshowImages = [
    'https://img.freepik.com/free-photo/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.jpg',
    'https://img.freepik.com/free-photo/aerial-shot-large-shipping-containers-area_181624-3151.jpg?t=st=1752771066~exp=1752774666~hmac=ea2edfffd620f414c7dbb749d2689c94fa072aaf1bd5c06bd7c64b56bec580f3&w=1800',
    'https://img.freepik.com/free-photo/warehouse-industrial-building-interior-with-people-forklifts-handling-goods-storage-area_342744-1498.jpg?t=st=1752771230~exp=1752774830~hmac=1f20084498582141c5dce849dc30db5d931c3db44431bb16fb6c70677ef71a25&w=1800',
    'https://img.freepik.com/free-photo/futuristic-technology-concept_23-2151908130.jpg?t=st=1752771529~exp=1752775129~hmac=800c11c8b95816891cef2b91fd1f95390bdad1cc6babcc39e53b2ca338568a76&w=1800',
  ];
  const [currentSlide, setCurrentSlide] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  const { data: heroContent, loading } = useSupabaseSingle<{
    title: string;
    subtitle: string | null;
    description: string | null;
    cta_text: string | null;
    background_image: string | null;
  }>('hero_content', '*', { is_active: true });

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="animate-pulse text-center text-white">
          <div className="h-8 w-64 bg-white/20 rounded mx-auto mb-4"></div>
          <div className="h-4 w-96 bg-white/20 rounded mx-auto"></div>
        </div>
      </section>
    );
  }
  const title = heroContent?.title || 'Smart, Reliable Logistics Solutions';
  const subtitle = heroContent?.subtitle || 'in Singapore';
  const description = heroContent?.description || 'Delivering excellence in cold chain, warehousing, and B2B/B2C delivery since 2005.';

  return (
    <section className="hero-section-sticky-check relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Slideshow Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          {slideshowImages.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt={`Slideshow ${idx + 1}`}
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${currentSlide === idx ? 'opacity-100' : 'opacity-0'}`}
              style={{transitionProperty: 'opacity'}}
            />
          ))}
        </div>
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://cdn.pixabay.com/video/2022/12/06/142127-778648327_large.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto text-shadow-emboss">
          <div className="animate-fade-in space-y-6 md:space-y-8">
            {/* Yeti Logistics Logo */}
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/806298c1-9e37-4717-a687-adf03c5cf581.png" 
                alt="Yeti Logistics Logo" 
                className="h-20 sm:h-28 lg:h-36 w-auto object-contain"
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-shadow-emboss">
                <span
                  style={{
                    color: '#218943', // Deep green for main title
                  }}
                >
                  Your Trusted Cold Chain & Logistics Partner
                </span>
                <br />
                <span
                  style={{
                    color: '#3a8dde', // Strong blue for subtitle
                    fontWeight: 600
                  }}
                >
                  Professional Logistics Solutions
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl max-w-4xl mx-auto px-4" style={{ color: '#fff', textShadow: 'none' }}>
                {description}
              </p>
            </div>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    
  );
};

export default HeroSection;