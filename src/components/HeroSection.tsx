import { useSupabaseSingle } from '@/hooks/useSupabaseQuery';

const HeroSection = () => {
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

  const backgroundImage = heroContent?.background_image || 'https://img.freepik.com/free-photo/aerial-view-cargo-ship-cargo-container-harbor_335224-1380.jpg';
  const title = heroContent?.title || 'Smart, Reliable Logistics Solutions';
  const subtitle = heroContent?.subtitle || 'in Singapore';
  const description = heroContent?.description || 'Delivering excellence in cold chain, warehousing, and B2B/B2C delivery since 2005.';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
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
          {/* Fallback background image if video doesn't load */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`
            }}
          />
        </video>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
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
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {title}
              {subtitle && (
                <span className="block text-blue-300 mt-2">{subtitle}</span>
              )}
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-blue-100 max-w-4xl mx-auto px-4">
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