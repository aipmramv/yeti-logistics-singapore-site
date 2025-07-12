
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import BookingRequestModal from "./BookingRequestModal";

const HeroSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
              backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')`
            }}
          />
        </video>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Fixed Book Now Button - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <Button 
          onClick={() => setIsBookingModalOpen(true)}
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Book Now
          <Calendar className="ml-2 h-5 w-5" />
        </Button>
      </div>
      
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
              Smart, Reliable
              <span className="block text-blue-300 mt-2">Logistics Solutions</span>
              <span className="block text-base sm:text-lg lg:text-xl xl:text-2xl font-normal mt-3 md:mt-4 text-blue-100">
                in Singapore
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-blue-100 max-w-4xl mx-auto px-4">
              Delivering excellence in cold chain, warehousing, and B2B/B2C delivery since 2005.
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

      {/* Booking Modal */}
      <BookingRequestModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;
