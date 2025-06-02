
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import BookingRequestModal from "./BookingRequestModal";

const HeroSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 overflow-hidden">
      {/* Background Image - Singapore Port/Logistics */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="animate-fade-in">
          {/* Yeti Logistics Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/806298c1-9e37-4717-a687-adf03c5cf581.png" 
              alt="Yeti Logistics Logo" 
              className="h-24 sm:h-32 lg:h-40 w-auto object-contain"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Smart, Reliable
            <span className="block text-blue-300">Logistics Solutions</span>
            <span className="block text-lg sm:text-xl lg:text-2xl font-normal mt-4">in Singapore</span>
          </h1>
          
          <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Delivering excellence in cold chain, warehousing, and B2B/B2C delivery since 2005.
          </p>
          
          <Button 
            onClick={() => setIsBookingModalOpen(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Now
            <Calendar className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
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
